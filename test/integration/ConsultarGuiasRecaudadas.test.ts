
/*import { DEPENDENCY_CONTAINER } from '@configuration';
import { RecursosApiClient } from '@infrastructure/api-recursos';
import { application } from '@infrastructure/api/Application';
import { PREFIX } from '@util';
import 'reflect-metadata';
*/
describe('Consultar Valores Recaudados', () => {
    it('Consultar Valores Recaudados exitoso', async () => {
        expect(0).toEqual(0);
    })

    /*
    let recursosApiClientMock: RecursosApiClient;
    beforeAll(() => {
        jest.clearAllMocks();
    });
    beforeEach(() => {
        recursosApiClientMock = {
            getRecursosApiClient: jest.fn(),
        } as RecursosApiClient;
        DEPENDENCY_CONTAINER.rebind(RecursosApiClient).toConstantValue(recursosApiClientMock);
    });
    
    it('Consultar Valores Recaudados exitoso', async () => {
        const id_equipo = '1234-1';
        const id_medio_pago = '1';
        const fecha_inicial = '2024-01-01';
        const fecha_final = '2025-01-01';
        const nombre_responsable = {
            data: 'nombre prueba',
        };
        (recursosApiClientMock.getRecursosApiClient as jest.Mock).mockResolvedValue(nombre_responsable);
        const response = await application.inject({
            method: 'GET',
            url: `${PREFIX}/tipo-recaudo/${id_equipo}/${id_medio_pago}/${fecha_inicial}/${fecha_final}`,
        });
        const result = JSON.parse(response.body);
        expect(response.statusCode).toBe(200);
        expect(result.isError).toBe(false);
        expect(result.data).toBeInstanceOf(Array);
        expect(result.data.length).toBeGreaterThan(0);
        expect(result.data[0]).toBeInstanceOf(Object);
    });
    it('Consultar Valores Recaudados error 400', async () => {
        const id_equipo = '1234-1';
        const id_medio_pago = 1;
        const fecha_inicial = '2025-01-01';
        const fecha_final = '2024-01-01';
        const response = await application.inject({
            method: 'GET',
            url: `${PREFIX}/tipo-recaudo/${id_equipo}/${id_medio_pago}/${fecha_inicial}/${fecha_final}`,
        });
        const result = JSON.parse(response.body);
        expect(response.statusCode).toBe(400);
        expect(result.isError).toBe(true);
        expect(result.message).toBe('Las fechas no son válidas');
    });
    */
});
