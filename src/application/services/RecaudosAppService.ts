import { injectable } from 'inversify';
import { DEPENDENCY_CONTAINER } from '@configuration';
import { Result, Response } from '@domain/response';
import { RecaudosDao } from '@infrastructure/repositories/postgres/dao/RecaudosDao';
import { IRecaudosIn } from '@application/data';

@injectable()
export class RecaudosAppService {
    private recaudosDao = DEPENDENCY_CONTAINER.get(RecaudosDao);

    async guardarRecaudo(data: IRecaudosIn): Promise<Response<string | null>> {
        await this.recaudosDao.guardarRecaudo(data);
        return Result.ok('ok');
    }
}
