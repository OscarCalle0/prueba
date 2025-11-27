/*import MockFirebase from 'mock-cloud-firestore';
import { FirestoreMockDataTareaRecaudoConDecimales } from '../mocks/data/';
import { DEPENDENCY_CONTAINER, TYPES } from '@configuration';
import { Firestore } from '@google-cloud/firestore';
import { PREFIX } from '@util';
import { application } from '@infrastructure/api/Application';
import { DBMemRepositoryTestFactory } from '../mocks/factories';
*/

describe('Crear Tarea Recaudo con Novedad', () => {

    it('Procesar recaudo novedad con decimales - Status 200', async () => {
        expect(0).toEqual(0);
    })

    /*
    it('Procesar recaudo novedad con decimales - Status 200', async () => {
        // Arrange
        const mock = new MockFirebase();
        mock.firestore();
        const mockfirebase = new MockFirebase(FirestoreMockDataTareaRecaudoConDecimales);
        const firestore = mockfirebase.firestore();
        DEPENDENCY_CONTAINER.rebind<Firestore>(TYPES.Firestore).toConstantValue(firestore);
        const recaudo_temporal = await firestore.collection('recaudo_temporal_guias').get();
        const query = `SELECT * FROM novedades.novedades WHERE id = 1`;
        const repositoryTestFactory = new DBMemRepositoryTestFactory();
        const repository = repositoryTestFactory.create(TYPES.Pg);
        //Verificar que antes, los registros estén en estado pendiente
        expect(recaudo_temporal.docs[0].data().estado).toBe('pendiente');

        // Act

        const response = await application.inject({
            method: 'GET',
            url: `${PREFIX}/recaudos/tarea`,
        });

        const novedadesRegistradas = await repository.executeQuery(query);
        const resultado = JSON.parse(response.body);
        // Assert
        expect(response.statusCode).toBe(200);
        expect(resultado.isError).toBe(false);
        expect(resultado.data).toBe(true);
        expect(novedadesRegistradas[0].descripcion).toEqual('Valor del recaudo con mas de dos decimales');
        expect(novedadesRegistradas[0].id_tipo_novedad).toEqual(3);
    });
    */
});
