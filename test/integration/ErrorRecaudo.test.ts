import 'reflect-metadata';
import { Result } from '@domain/response';
import { Redis } from '@infrastructure/repositories/redis';
import { RecaudosAppService } from '@application/services';

jest.mock('@infrastructure/repositories/redis');
jest.mock('@domain/repository');
jest.mock('@infrastructure/repositories/postgres/dao/RecaudosDao');
jest.mock('@infrastructure/pubsub/IBolsilloPubSub');

describe('RecaudosAppService', () => {
    let service: RecaudosAppService;
    let redisClient: jest.Mocked<Redis>;

    beforeEach(() => {
        redisClient = new Redis() as jest.Mocked<Redis>;

        service = new RecaudosAppService();
    });

    it('should set redisData to 1 when redisData is null', async () => {
        redisClient.get.mockResolvedValue(null);
        const data = { id_transaccion: 123, operacion: '' };
        const result = await service.guardarErrorBolsillo(data);

        expect(result).toEqual(Result.ok(null));
    });
});
