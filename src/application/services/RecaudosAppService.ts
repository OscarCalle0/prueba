import { injectable } from 'inversify';
import { DEPENDENCY_CONTAINER, TYPES } from '@configuration';
import { Result, Response } from '@domain/response';
import { RecaudosDao } from '@infrastructure/repositories/postgres/dao/RecaudosDao';
import { IRecaudosIn } from '@application/data';
import { IRecaudosConsulta } from '@application/data/in/IRecaudosConsulta';
import { cmDAO } from '@infrastructure/repositories';
import { time, timeEnd } from 'console';
import { TransaccionesApiClient } from '@infrastructure/api-transacciones';
import { FirestoreRepository } from '@domain/repository';

@injectable()
export class RecaudosAppService {
    private recaudosDao = DEPENDENCY_CONTAINER.get(RecaudosDao);
    private cmDAO = DEPENDENCY_CONTAINER.get(cmDAO);
    private firestoreDAO = DEPENDENCY_CONTAINER.get<FirestoreRepository>(TYPES.firestoreDao);
    private recaudoApi = DEPENDENCY_CONTAINER.get(TransaccionesApiClient);

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
        const recaudos = await this.firestoreDAO.getDataRecaudo();
        for (const recaudo of recaudos) {
            await this.firestoreDAO.updateRecaudoEstado(recaudo.recaudo_id, '', 'procesando');
            delete recaudo.estado;
            delete recaudo.ultimo_error;
            const response = await this.recaudoApi.postRecaudosTarea(recaudo);
            console.log('response', response);
            if (response && response.isError) {
                await this.firestoreDAO.updateRecaudoEstado(recaudo.recaudo_id, '', 'error');
                return Result.okBool(false);
            }
            await this.firestoreDAO.updateRecaudoEstado(recaudo.recaudo_id, '', 'procesado');
        }
        return Result.okBool(true);
    }
}
