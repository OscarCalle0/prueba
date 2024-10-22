import { injectable } from 'inversify';
import { DEPENDENCY_CONTAINER, TYPES } from '@configuration';
import { Result, Response } from '@domain/response';
import { RecaudosDao } from '@infrastructure/repositories/postgres/dao/RecaudosDao';
import { IRecaudosIn } from '@application/data';
import { IRecaudosConsulta } from '@application/data/in/IRecaudosConsulta';
import { cmDAO } from '@infrastructure/repositories';
import { log, time, timeEnd } from 'console';
import { TransaccionesApiClient } from '@infrastructure/api-transacciones';
import { FirestoreRepository } from '@domain/repository';
import { INovedades } from '@infrastructure/api/interfaces/INovedades';
import { NovedadesRepository } from '@domain/repository/NovedadesRepository';

@injectable()
export class RecaudosAppService {
    private readonly recaudosDao = DEPENDENCY_CONTAINER.get(RecaudosDao);
    private readonly cmDAO = DEPENDENCY_CONTAINER.get(cmDAO);
    private readonly novedadesRepository = DEPENDENCY_CONTAINER.get<NovedadesRepository>(TYPES.NovedadesRepository);
    private readonly firestoreRepository = DEPENDENCY_CONTAINER.get<FirestoreRepository>(TYPES.FirestoreRepository);
    private readonly recaudoApi = DEPENDENCY_CONTAINER.get(TransaccionesApiClient);
    private readonly ID_TIPO_NOVEDAD_RECAUDO = 3;

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
        const recaudos = await this.firestoreRepository.getDataRecaudo();
        for (const recaudo of recaudos) {
            await this.firestoreRepository.updateRecaudoEstado(recaudo.recaudo_id, '', 'procesando');
            delete recaudo.estado;
            delete recaudo.ultimo_error;
            const response = await this.recaudoApi.postRecaudosTarea(recaudo);
            log('response', response);
            if (response?.isError) {
                if (response.statusCode < 500) {
                    const novedad: INovedades = {
                        id_tipo_novedad: this.ID_TIPO_NOVEDAD_RECAUDO,
                        detalle: JSON.stringify(recaudo),
                        descripcion: response.message,
                    };
                    await this.novedadesRepository.insertar(novedad);
                    await this.firestoreRepository.updateRecaudoEstado(recaudo.recaudo_id, response.message, 'error');
                } else {
                    await this.firestoreRepository.updateRecaudoEstado(
                        recaudo.recaudo_id,
                        response.message,
                        'reintentar',
                    );
                }
                return Result.okBool(false);
            }
            await this.firestoreRepository.deleteRecaudo(recaudo.recaudo_id);
        }
        return Result.okBool(true);
    }
}
