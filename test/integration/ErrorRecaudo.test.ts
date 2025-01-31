import 'reflect-metadata';
import { Result } from '@domain/response';
import { IErrorBolsilloDataIn } from '@application/data/in/IErrorBolsilloDataIn';
import { RecaudosAppService } from '@application/services';
import redisMock from 'redis-mock';
import { Firestore } from '@google-cloud/firestore';
import { DEPENDENCY_CONTAINER, TYPES } from '@configuration';
import MockFirebase from 'mock-cloud-firestore';
import { FirestoreMockDataTareaRecaudo } from '../mocks/data';

jest.mock('@infrastructure/repositories/redis');
jest.mock('@domain/repository');
jest.mock('@infrastructure/repositories/postgres/dao/RecaudosDao');
jest.mock('@infrastructure/pubsub/IBolsilloPubSub');

describe('RecaudosAppService', () => {
    let recaudosAppService: RecaudosAppService;

    beforeEach(() => {
        recaudosAppService = new RecaudosAppService();
    });

    beforeAll(() => {
        const mockfirebase = new MockFirebase(FirestoreMockDataTareaRecaudo);
        const firestore = mockfirebase.firestore();
        DEPENDENCY_CONTAINER.rebind<Firestore>(TYPES.Firestore).toConstantValue(firestore);
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
