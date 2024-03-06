import { application } from '@infrastructure/api/Application';
import { TYPES, DEPENDENCY_CONTAINER, createDependencyContainer } from '@configuration';
import { IDataBase } from '@infrastructure/repositories';
import { IMain } from 'pg-promise';
import { crearDB } from './__mocks__';

describe('Testing App Request', () => {
    beforeAll(() => {
        const db = crearDB();

        createDependencyContainer();
        DEPENDENCY_CONTAINER.rebind<IDataBase<IMain>>(TYPES.Pg).toConstantValue(db);
    });

    it('test de prueba con error 404', async () => {
        const response = await application.inject({
            method: 'POST',
            url: '/route-not-found',
        });
        expect(response.statusCode).toBe(404);
    });
});
