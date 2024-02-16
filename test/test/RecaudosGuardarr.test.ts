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
        tipo_recurso: 6,
        recurso: '1',
        tipo_recurso_responsable: 1,
        responsable: '301034',
        valor_recaudo: 200,
        medio_pago: 1,
        fecha_hora_accion: '2023-10-12 12:12:12',
        tipo_recaudo: 22,
        origen_recaudo: 2,
        recaudo_anticipado: false,
        tipo_recurso_referencias: 4,
        referencias: [
            {
                referencia: '1111',
                valor: 100,
            },
            {
                referencia: '1111',
                valor: 100,
            },
        ],
        info_complementaria: [
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
            payload: { ...payload, tipo_recurso: 16 },
        });

        const result = response.json();

        expect(response.statusCode).toBe(500);
        expect(result.isError).toBe(true);
        expect(result.message).toBe(
            'insert or update on table "tipos_recursos" violates foreign key constraint on table "fk_recursos_id_tipo_recurso"',
        );
    });

    it('Guardar recaudo error validacion 1', async () => {
        const response = await application.inject({
            method: 'POST',
            url: `${PREFIX}/recaudos`,
            payload: { ...payload, tipo_recurso: undefined },
        });

        const result = response.json();

        expect(response.statusCode).toBe(500);
        expect(result.isError).toBe(true);
        expect(result.message).toBe('Los valores de entrada no son correctos.');
        expect(result.cause).toEqual([
            {
                message: 'El campo tipo_recurso es obligatorio',
                path: 'tipo_recurso',
            },
        ]);
    });

    it('Guardar recaudo error validacion 2', async () => {
        const response = await application.inject({
            method: 'POST',
            url: `${PREFIX}/recaudos`,
        });

        const result = response.json();

        expect(response.statusCode).toBe(500);
        expect(result.isError).toBe(true);
        expect(result.message).toBe('mensaje indefinido');
    });
});
