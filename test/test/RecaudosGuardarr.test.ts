import 'reflect-metadata';
import { DEPENDENCY_CONTAINER, createDependencyContainer } from '@configuration/DependecyContainer';
import { crearDB } from '../__mocks__';
import { IDataBase } from '@infrastructure/repositories/postgres';
import { IMain } from 'pg-promise';
import { TYPES } from '@configuration';
import { application } from '@infrastructure/api/Application';
import { PREFIX } from '@util';

describe('RecaudosGuardar', () => {
    const db = crearDB();
    beforeAll(async () => {
        createDependencyContainer();

        DEPENDENCY_CONTAINER.rebind<IDataBase<IMain>>(TYPES.Pg).toConstantValue(db);
    });

    const payload = {
        recaudo_id: '3421131sx241112',
        terminal: '1',
        valor_recaudo: 200,
        medio_pago: 1,
        fecha_hora_accion: '2023-10-12 12:12:12',
        tipo_recaudo: 22,
        origen_recaudo: 2,
        recaudo_anticipado: false,
        recursos: [
            {
                valor: 'ass41282351rf',
                tipo: 6,
            },
            {
                valor: '2000',
                tipo: 1,
            },
        ],
    };

    it('Guardar recaudo exitoso', async () => {
        const response = await application.inject({
            method: 'POST',
            url: `${PREFIX}/recaudos`,
            payload: payload,
        });

        const result = response.json();

        expect(response.statusCode).toBe(201);
        expect(result.isError).toBe(false);
        expect(result.data).toBe('ok');
    });

    it('Guardar recaudo error', async () => {
        const response = await application.inject({
            method: 'POST',
            url: `${PREFIX}/recaudos`,
            payload: { ...payload },
        });

        const result = response.json();

        expect(response.statusCode).toBe(500);
        expect(result.isError).toBe(true);
        expect(result.message).toBe(
            `insert into "recaudos" (id_recaudo, id_medio_pago, fecha_hora_recaudo, valor, terminal, id_tipo_recaudo) values ($1, $2, $3, $4, $5, $6) returning "id_recaudo" - duplicate key value violates unique constraint "recaudos_pkey"`,
        );
    });

    it('Guardar recaudo error validacion 1', async () => {
        const response = await application.inject({
            method: 'POST',
            url: `${PREFIX}/recaudos`,
            payload: { ...payload, medio_pago: undefined },
        });

        const result = response.json();

        expect(response.statusCode).toBe(400);
        expect(result.isError).toBe(true);
        expect(result.message).toBe('Los valores de entrada no son correctos.');
        expect(result.cause).toEqual([
            {
                message: 'El campo medio_pago es obligatorio',
                path: 'medio_pago',
            },
        ]);
    });

    it('Guardar recaudo error validacion 2', async () => {
        const response = await application.inject({
            method: 'POST',
            url: `${PREFIX}/recaudos`,
        });

        const result = response.json();

        expect(response.statusCode).toBe(400);
        expect(result.isError).toBe(true);
        expect(result.message).toBe('mensaje indefinido');
    });
});
