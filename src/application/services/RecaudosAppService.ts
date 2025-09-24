import { injectable } from 'inversify';
import { DEPENDENCY_CONTAINER, TYPES } from '@configuration';
import { Result, Response } from '@domain/response';
import { RecaudosDao } from '@infrastructure/repositories/postgres/dao/RecaudosDao';
import { IRecaudosIn, ITipoRecaudoConsulta, IGuiasTipoRecaudoOut } from '@application/data';
import { IRecaudosConsulta } from '@application/data/in/IRecaudosConsulta';
import { cmDAO } from '@infrastructure/repositories';
import { time, timeEnd } from 'console';
import { TransaccionesApiClient } from '@infrastructure/api-transacciones';
import { FirestoreRepository } from '@domain/repository';
import { INovedades } from '@infrastructure/api/interfaces/INovedades';
import { NovedadesRepository } from '@domain/repository/NovedadesRepository';
import { IResponseAliados } from '@infrastructure/api-transacciones/interfaces';
import { IFirestoreStageResponse } from '@infrastructure/repositories/firestore/interfaces/IFirestoreStageResponse';
import { IValoresRecaudadosConsulta } from '@application/data/in/IValoresRecaudadosConsulta';
import { IValoresRecaudadosOut } from '@application/data/out/IValoresRecaudadosOut';
import { IErrorBolsilloDataIn } from '@application/data/in/IErrorBolsilloDataIn';
import { Redis } from '@infrastructure/repositories/redis';
import { IBolsilloPubSubRepository } from '@infrastructure/pubsub/IBolsilloPubSub';
import { RecursosApiClient } from '@infrastructure/api-recursos';
import { IGuiasTipoRecaudoResponse } from '@infrastructure/repositories/postgres/dao/interfaces/IGuiasTipoRecaudoResponse';
import { StatusCode } from '@domain/exceptions';

@injectable()
export class RecaudosAppService {
    private readonly recaudosDao = DEPENDENCY_CONTAINER.get(RecaudosDao);
    private readonly cmDAO = DEPENDENCY_CONTAINER.get(cmDAO);
    private readonly novedadesRepository = DEPENDENCY_CONTAINER.get<NovedadesRepository>(TYPES.NovedadesRepository);
    private readonly firestoreRepository = DEPENDENCY_CONTAINER.get<FirestoreRepository>(TYPES.FirestoreRepository);
    private readonly recaudoApi = DEPENDENCY_CONTAINER.get(TransaccionesApiClient);
    private readonly ID_TIPO_NOVEDAD_RECAUDO = 3;
    private readonly redisClient: Redis = DEPENDENCY_CONTAINER.get(TYPES.RedisClient);
    private readonly pubsubPublisher = DEPENDENCY_CONTAINER.get<IBolsilloPubSubRepository>(TYPES.PubSubBolsillo);
    private readonly consultaRecursosApi = DEPENDENCY_CONTAINER.get(RecursosApiClient);

    async guardarRecaudo(data: IRecaudosIn): Promise<Response<number | null>> {
        const key = `GUARDAR RECAUDO ${data.recaudo_id}, Guias => ${data.recursos.length}`;
        time(key);
        const transaccion = await this.recaudosDao.guardarRecaudo(data);
        timeEnd(key);
        return Result.ok(transaccion);
    }

    async consultarRecaudoRCE(data: IRecaudosConsulta): Promise<Response<boolean | null>> {
        const responseConsulta = await this.cmDAO.consultaRecaudoRCE(data);
        if (!responseConsulta) return Result.okBool(false);
        if (responseConsulta.fechahora_recaudo) return Result.okBool(true);
        const historico = await this.cmDAO.consultaHistoricoPagos(data);
        if (historico) return Result.okBool(true);
        return Result.okBool(false);
    }

    async procesarRecaudo(): Promise<Response<boolean | null>> {
        const CENTESIMA = 100;
        const recaudos = await this.firestoreRepository.getDataRecaudo();
        for (const recaudo of recaudos) {
            await this.firestoreRepository.updateRecaudoEstado(recaudo.recaudo_id, '', 'procesando');

            const conDecimalesError = recaudo.valor_recaudo
                ? Math.floor(recaudo.valor_recaudo * CENTESIMA) !== recaudo.valor_recaudo * CENTESIMA
                : false;

            if (conDecimalesError) {
                this.gestionarNovedadDecimalesConError(recaudo);
                return Result.okBool(true);
            }
            delete recaudo.estado;
            delete recaudo.ultimo_error;
            const responseApiTransacciones = await this.recaudoApi.postRecaudosTarea(recaudo);
            if (responseApiTransacciones?.isError) {
                this.gestionarErrorApiTransacciones(recaudo, responseApiTransacciones);
                return Result.okBool(false);
            }
            await this.firestoreRepository.deleteRecaudo(recaudo.recaudo_id);
        }
        return Result.okBool(true);
    }

    async gestionarNovedadDecimalesConError(recaudo: IFirestoreStageResponse) {
        const novedad: INovedades = {
            id_tipo_novedad: this.ID_TIPO_NOVEDAD_RECAUDO,
            detalle: JSON.stringify(recaudo),
            descripcion: 'Valor del recaudo con mas de dos decimales',
        };
        await this.novedadesRepository.insertar(novedad);
        await this.firestoreRepository.deleteRecaudo(recaudo.recaudo_id);
    }

    async gestionarErrorApiTransacciones(
        recaudo: IFirestoreStageResponse,
        responseApiTransacciones: IResponseAliados,
    ): Promise<void> {
        if (+responseApiTransacciones.statusCode < +StatusCode.INTERNAL_ERROR) {
            const novedad: INovedades = {
                id_tipo_novedad: this.ID_TIPO_NOVEDAD_RECAUDO,
                detalle: JSON.stringify(recaudo),
                descripcion: responseApiTransacciones.message,
            };
            await this.novedadesRepository.insertar(novedad);
            await this.firestoreRepository.deleteRecaudo(recaudo.recaudo_id);
        } else {
            await this.firestoreRepository.updateRecaudoEstado(
                recaudo.recaudo_id,
                responseApiTransacciones.message,
                'reintentar',
            );
        }
    }

    async consultarValoresRecaudados(
        data: IValoresRecaudadosConsulta,
    ): Promise<Response<IValoresRecaudadosOut[] | null>> {
        if (!data.fecha_final) data.fecha_final = data.fecha_inicial;
        const resultValoresRecaudados = await this.recaudosDao.consultarValoresRecaudados(data);
        return Result.ok(resultValoresRecaudados);
    }

    async consultarGuiasRecaudadas(data: ITipoRecaudoConsulta): Promise<Response<IGuiasTipoRecaudoOut[] | null>> {
        if (!data.fecha_final) data.fecha_final = data.fecha_inicial;
        const resultGuiasTipoRecaudo = await this.recaudosDao.consultarGuiasTipoRecaudo(data);
        const respustaRecurso = await this.consultarNombreResponsable(resultGuiasTipoRecaudo);
        return Result.ok(respustaRecurso);
    }

    async consultarNombreResponsable(
        guiasTipoRecaudo: IGuiasTipoRecaudoResponse[] | null,
    ): Promise<IGuiasTipoRecaudoOut[] | null> {
        if (guiasTipoRecaudo === null) return guiasTipoRecaudo;
        const asignarNombreRecurso = await Promise.all(
            guiasTipoRecaudo.map(async (guia) => {
                const recurso = await this.consultaRecursosApi.getRecursosApiClient(guia.id_responsable);
                return {
                    ...guia,
                    nombre_responsable: recurso.data ?? 'null',
                };
            }),
        );
        return asignarNombreRecurso;
    }

    async guardarErrorBolsillo(data: IErrorBolsilloDataIn): Promise<Response<number | null>> {
        const idTransaccion = String(data.id_transaccion);

        const redisData = await this.redisClient.get<number>(idTransaccion);
        if (redisData === null) {
            await this.redisClient.set(idTransaccion, 1);
        } else if (redisData < 10) {
            await this.redisClient.set(idTransaccion, redisData + 1);
        } else {
            await this.firestoreRepository.guardarNovedad(data);
            return Result.ok(null);
        }

        await this.recaudosDao.updateEstadoRecaudo(data.id_transaccion);
        await this.pubsubPublisher.publicarBolsillo(data);

        return Result.ok(redisData === null ? 1 : redisData + 1);
    }
}
