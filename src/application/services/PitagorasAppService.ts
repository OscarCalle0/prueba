import { injectable } from 'inversify';
import { DEPENDENCY_CONTAINER } from '@configuration';
import { PitagorasDao } from '@infrastructure/repositories';

@injectable()
export class PitagorasAppService {
    private readonly pitagorasDao = DEPENDENCY_CONTAINER.get(PitagorasDao);

    async insertPitagoras(idTransaccion: number): Promise<{ message: string; code: number; error: boolean }> {
        const dataRecaudo = await this.pitagorasDao.getDataRecaudo(idTransaccion);
        const idInsertPitagoras = await this.pitagorasDao.insertPitagoras(dataRecaudo, idTransaccion);

        if (idInsertPitagoras > 0) {
            return {
                message: 'Registro procesado exitosamente',
                code: 201,
                error: false,
            };
        }
        return {
            message: 'Error interno del servidor.',
            code: 500,
            error: true,
        };
    }
}
