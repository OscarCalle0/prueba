import 'reflect-metadata';
import { Result } from '@domain/response';
import { IErrorBolsilloDataIn } from '@application/data/in/IErrorBolsilloDataIn';
import { RecaudosAppService } from '@application/services';
import redisMock from 'redis-mock';

jest.mock('@infrastructure/repositories/redis');
jest.mock('@domain/repository');
jest.mock('@infrastructure/repositories/postgres/dao/RecaudosDao');
jest.mock('@infrastructure/pubsub/IBolsilloPubSub');

describe('RecaudosAppService', () => {
    let recaudosAppService: RecaudosAppService;

    beforeEach(() => {
        recaudosAppService = new RecaudosAppService();
    });

    it('should set redis data to 1 when redisData is null', async () => {
        const data: IErrorBolsilloDataIn = { id_transaccion: 1, operacion: '' };
        const redisClient = redisMock.createClient();
        jest.spyOn(redisClient, 'set');
        jest.spyOn(redisClient, 'get').mockImplementation((_, callback) => {
            if (callback) {
                callback(null, null);
            }
            return true;
        });

        const result = await recaudosAppService.guardarErrorBolsillo(data);
        expect(result).toEqual(Result.ok(null));
    });
});
