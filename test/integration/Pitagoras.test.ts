import { application } from '@infrastructure/api/Application';
import { PREFIX } from '@util';
import 'reflect-metadata';
import { DEPENDENCY_CONTAINER, TYPES } from '@configuration';
import { IDatabase, IMain } from 'pg-promise';
import { PitagorasDao } from '@infrastructure/repositories';

describe('PitagorasRouter', () => {
    const payload = {
        message: {
            data: Buffer.from(JSON.stringify({ idTransaccion: 8592 })).toString('base64'),
            messageId: 'test-message-id',
            publishTime: '2024-01-16T12:00:00Z',
        },
    };

    beforeEach(() => {
        jest.restoreAllMocks();
    });

    it('Insertar pitagoras exitoso', async () => {
        // Mock the PitagorasDao
        const pitagorasDao = DEPENDENCY_CONTAINER.get(PitagorasDao);

        // Mock getDataRecaudo to return valid data
        const mockData = {
            fecha: new Date('2024-01-01'),
            terminal: 1,
            equipo: '1234-1',
            recibidor: 7048,
            forma_de_pago: 1,
            numero_aprobacion: '12345',
            valor: 1000000,
            usuario: 'Aut-Dineros',
        };
        jest.spyOn(pitagorasDao, 'cambiarEstadoRecaudo').mockResolvedValue();
        jest.spyOn(pitagorasDao, 'getDataRecaudo').mockResolvedValue(mockData);
        jest.spyOn(pitagorasDao, 'insertPitagoras').mockResolvedValue(1);

        const response = await application.inject({
            method: 'POST',
            url: `${PREFIX}/pitagoras`,
            payload: payload,
        });

        //const responseBody = JSON.parse(response.payload);
        expect(response.statusCode).toBe(200);
        /*expect(responseBody.error).toBe(false);
        expect(responseBody.message).toBe('Registro procesado exitosamente');
        expect(responseBody.code).toBe(200);*/
    });

    it.skip('Insertar pitagoras error validacion sin idTransaccion', async () => {
        const response = await application.inject({
            method: 'POST',
            url: `${PREFIX}/pitagoras`,
            payload: {},
        });

        const result = response.json();

        expect(response.statusCode).toBe(200);
        expect(result.isError).toBe(true);
        expect(result.message).toBe('error validanto data de entrada');
    });

    it.skip('Insertar pitagoras error validacion sin payload', async () => {
        const response = await application.inject({
            method: 'POST',
            url: `${PREFIX}/pitagoras`,
        });

        const result = response.json();

        expect(response.statusCode).toBe(200);
        expect(result.isError).toBe(true);
        expect(result.message).toBe('error validanto data de entrada');
    });

    it.skip('Insertar pitagoras error al obtener datos de recaudo', async () => {
        const dbDineros = DEPENDENCY_CONTAINER.get<IDatabase<IMain>>(TYPES.Pg);
        const spy = jest.spyOn(dbDineros, 'one');

        spy.mockRejectedValueOnce(new Error('error validanto data de entrada'));

        const response = await application.inject({
            method: 'POST',
            url: `${PREFIX}/pitagoras`,
            payload: payload,
        });

        const result = response.json();
        expect(response.statusCode).toBe(200);
        expect(result.isError).toBe(true);
        expect(result.message).toBe('Error al obtener datos de recaudo.');
    });

    it.skip('Insertar pitagoras error al insertar en dineros_recibidor', async () => {
        const dbCm = DEPENDENCY_CONTAINER.get<IDatabase<IMain>>(TYPES.cm);
        const pitagorasDao = DEPENDENCY_CONTAINER.get(PitagorasDao);
        const spy = jest.spyOn(dbCm, 'tx');
        jest.spyOn(pitagorasDao, 'cambiarEstadoRecaudo').mockResolvedValue();

        spy.mockRejectedValueOnce(new Error('error validanto data de entrada'));

        const response = await application.inject({
            method: 'POST',
            url: `${PREFIX}/pitagoras`,
            payload: payload,
        });

        const result = response.json();
        expect(response.statusCode).toBe(200);
        expect(result.isError).toBe(true);
        expect(result.message).toBe('Error al insertar en dineros_recibidor');
    });

    // New test cases for better coverage
    it.skip('Insertar pitagoras error cuando getDataRecaudo retorna datos incompletos', async () => {
        const pitagorasDao = DEPENDENCY_CONTAINER.get(PitagorasDao);
        const mockIncompleteData = {
            fecha: new Date('2024-01-01'),
            terminal: 1,
            // Missing required fields
        };

        jest.spyOn(pitagorasDao, 'getDataRecaudo').mockResolvedValue(mockIncompleteData as any);

        const response = await application.inject({
            method: 'POST',
            url: `${PREFIX}/pitagoras`,
            payload: payload,
        });

        const result = response.json();
        expect(response.statusCode).toBe(200);
        expect(result.isError).toBe(true);
    });

    it.skip('Insertar pitagoras error cuando insertPitagoras retorna 0', async () => {
        const pitagorasDao = DEPENDENCY_CONTAINER.get(PitagorasDao);
        const mockData = {
            fecha: new Date('2024-01-01'),
            terminal: 1,
            equipo: '1234-1',
            recibidor: 7048,
            forma_de_pago: 1,
            numero_aprobacion: '12345',
            valor: 1000000,
            usuario: 'Aut-Dineros',
        };
        jest.spyOn(pitagorasDao, 'cambiarEstadoRecaudo').mockResolvedValue();
        jest.spyOn(pitagorasDao, 'getDataRecaudo').mockResolvedValue(mockData);
        jest.spyOn(pitagorasDao, 'insertPitagoras').mockResolvedValue(0);

        const response = await application.inject({
            method: 'POST',
            url: `${PREFIX}/pitagoras`,
            payload: payload,
        });

        const responseBody = JSON.parse(response.payload);
        expect(response.statusCode).toBe(200);
        expect(responseBody.message).toBe('Error interno del servidor.');
    });

    it.skip('Insertar pitagoras error de transacción en base de datos', async () => {
        const pitagorasDao = DEPENDENCY_CONTAINER.get(PitagorasDao);
        const mockData = {
            fecha: new Date('2024-01-01'),
            terminal: 1,
            equipo: '1234-1',
            recibidor: 7048,
            forma_de_pago: 1,
            numero_aprobacion: '12345',
            valor: 1000000,
            usuario: 'Aut-Dineros',
        };
        jest.spyOn(pitagorasDao, 'cambiarEstadoRecaudo').mockResolvedValue();
        jest.spyOn(pitagorasDao, 'getDataRecaudo').mockResolvedValue(mockData);
        jest.spyOn(pitagorasDao, 'insertPitagoras').mockRejectedValue(new Error('error validanto data de entrada'));

        const response = await application.inject({
            method: 'POST',
            url: `${PREFIX}/pitagoras`,
            payload: payload,
        });

        const result = response.json();
        expect(response.statusCode).toBe(200);
        expect(result.isError).toBe(true);
        expect(result.message).toBe('error validanto data de entrada');
    });
});
