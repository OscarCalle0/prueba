import { application } from '@infrastructure/api/Application';
import { Firestore } from '@google-cloud/firestore';
import MockFirebase from 'mock-cloud-firestore';
import { TYPES, DEPENDENCY_CONTAINER, createDependencyContainer } from '@configuration';

const MockFirestore = new MockFirebase();
const firestore = MockFirestore.firestore();

describe('Testing App Request', () => {
    beforeAll(() => {
        createDependencyContainer();
        DEPENDENCY_CONTAINER.rebind<Firestore>(TYPES.Firestore).toConstantValue(firestore);
    });

    it('debería retornar 404', async () => {
        const response = await application.inject({
            method: 'GET',
            url: '/route-not-found',
        });
        expect(response.statusCode).toBe(404);
    });

    it('debería retornar 200', async () => {
        const response = await application.inject({
            method: 'GET',
            url: '/',
        });
        expect(response.statusCode).toBe(200);
    });
});
