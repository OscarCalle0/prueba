import { injectable } from 'inversify';
import { DEPENDENCY_CONTAINER } from '@configuration';
import { Result, Response } from '@domain/response';
import { RecaudosDao } from '@infrastructure/repositories/postgres/dao/RecaudosDao';
import { IRecaudosIn } from '@application/data';
import { IRecaudosConsulta } from '@application/data/in/IRecaudosConsulta';
import { cmDAO } from '@infrastructure/repositories';
import { time, timeEnd } from 'console';

@injectable()
export class RecaudosAppService {
    private recaudosDao = DEPENDENCY_CONTAINER.get(RecaudosDao);
    private cmDAO = DEPENDENCY_CONTAINER.get(cmDAO);

    async guardarRecaudo(data: IRecaudosIn): Promise<Response<string | null>> {
        const key = `GUARDAR RECAUDO ${data.recaudo_id}`;
        time(key);
        await this.recaudosDao.guardarRecaudo(data);
        timeEnd(key);
        return Result.ok('ok');
    }

    async consultarRecaudoRCE(data: IRecaudosConsulta): Promise<Response<boolean | null>> {
        const responseConsulta = await this.cmDAO.consultaRecaudoRCE(data);
        if (!responseConsulta) return Result.okBool(false);
        if (responseConsulta.fechahora_recaudo) return Result.okBool(true);
        const historico = await this.cmDAO.consultaHistoricoPagos(data);
        if (historico) return Result.okBool(true);
        return Result.okBool(false);
    }
}
