import { IRecaudosIn, IRecursoOut } from '@application/data/';
import { DEPENDENCY_CONTAINER, TYPES } from '@configuration';
import { injectable } from 'inversify';
import { IDatabase, IMain, as } from 'pg-promise';
import { pgp } from '../adapter';
import { PostgresError } from '@domain/exceptions';

@injectable()
export class RecaudosDao {
    private db = DEPENDENCY_CONTAINER.get<IDatabase<IMain>>(TYPES.Pg);

    public async guardarRecaudo(data: IRecaudosIn): Promise<void> {
        await this.db
            .tx(async (t) => {
                let idRecurso = null;
                if (data.recurso && data.tipo_recurso && data.recaudo_anticipado === false) {
                    const sqlRecursos = this.updsertRecaudoSql(data.recurso, data.tipo_recurso);
                    const recurso = await t.one<IRecursoOut>(sqlRecursos);
                    idRecurso = recurso.id_recurso;
                }

                let idResponsable = null;
                if (data.responsable && data.tipo_recurso_responsable && data.recaudo_anticipado === false) {
                    const sqlRecursos = this.updsertRecaudoSql(data.responsable, data.tipo_recurso_responsable);
                    const responsable = await t.one<IRecursoOut>(sqlRecursos);
                    idResponsable = responsable.id_recurso;
                }

                const sqlRecaudo = `INSERT INTO recaudos
                                (id_recaudo, id_medio_pago, fecha_hora_recaudo, valor, terminal, id_tipo_recaudo, id_responsable, id_recurso, id_tipo_recurso_referencias)
                                VALUES ($/id_recaudo/, $/id_medio_pago/, $/fecha_hora_recaudo/, $/valor/, $/terminal/, $/id_tipo_recaudo/, $/id_responsable/, $/id_recurso/, $/id_tipo_recurso_referencias/)
                                RETURNING id_recaudo;`;

                const resultadoRecaudo = await t.one<{ id_recaudo: number }>(sqlRecaudo, {
                    id_recaudo: data.recaudo_id,
                    id_medio_pago: data.medio_pago,
                    fecha_hora_recaudo: data.fecha_hora_accion,
                    valor: data.valor_recaudo,
                    terminal: data.terminal,
                    id_tipo_recaudo: data.origen_recaudo + '-' + data.tipo_recaudo,
                    id_responsable: idResponsable,
                    id_recurso: idRecurso,
                    id_tipo_recurso_referencias: data.tipo_recurso_referencias,
                });

                const sqlTrasacciones = `INSERT INTO transacciones
                    (id_tipo_transaccion, valor_transaccion, fecha_hora_transaccion, ingreso_dinero, id_movimiento)
                    values ($/id_tipo_transaccion/, $/valor_transaccion/, $/fecha_hora_transaccion/, $/ingreso_dinero/, $/id_movimiento/)`;

                await t.none(sqlTrasacciones, {
                    id_tipo_transaccion: 1,
                    valor_transaccion: data.valor_recaudo,
                    fecha_hora_transaccion: data.fecha_hora_accion,
                    ingreso_dinero: true,
                    id_movimiento: resultadoRecaudo.id_recaudo,
                });

                if (data.referencias.length > 0) {
                    const referencias = data.referencias.map((item) => {
                        return {
                            id_recaudo: resultadoRecaudo.id_recaudo,
                            referencia_recaudo: item.referencia,
                            valor_recaudo: item.valor,
                        };
                    });

                    const sqlInsert = pgp.helpers.insert(
                        referencias,
                        ['id_recaudo', 'referencia_recaudo', 'valor_recaudo'],
                        'recaudos_referencias',
                    );

                    await t.none(sqlInsert);
                }

                if (data.info_complementaria.length > 0) {
                    const complemetariasPromise = data.info_complementaria.map(async (item) => {
                        const sqlRecursos = this.updsertRecaudoSql(item.valor, item.tipo);
                        const recurso = await t.one<IRecursoOut>(sqlRecursos);

                        return {
                            id_recaudo: resultadoRecaudo.id_recaudo,
                            id_recurso: recurso.id_recurso,
                        };
                    });

                    const complemetarias = await Promise.all(complemetariasPromise);

                    const sqlInsert = pgp.helpers.insert(
                        complemetarias,
                        ['id_recaudo', 'id_recurso'],
                        'recaudos_recursos',
                    );

                    await t.none(sqlInsert);
                }
            })
            .catch((error) => {
                //console.log('error', JSON.stringify(error));
                throw new PostgresError(error.code, error?.data?.error || error.message);
            });
    }

    public updsertRecaudoSql(recurso: string, idTipoRecurso: number): string {
        const sql = `WITH consultar AS (
                        SELECT id_recurso FROM recursos where identificador_recurso = $/identificador_recurso/ and id_tipo_recurso = $/id_tipo_recurso/
                    ),
                    insertar AS (
                        INSERT INTO recursos (identificador_recurso, id_tipo_recurso) 
                        SELECT $/identificador_recurso/, $/id_tipo_recurso/ WHERE 1 NOT IN (SELECT 1 FROM consultar)
                        ON CONFLICT (identificador_recurso, id_tipo_recurso)
                        DO UPDATE SET id_tipo_recurso=EXCLUDED.id_tipo_recurso 
                        RETURNING id_recurso
                    ),
                    tmp AS (
                        SELECT id_recurso FROM insertar
                        UNION ALL
                        SELECT id_recurso FROM consultar
                    )
                    SELECT DISTINCT id_recurso FROM tmp;`;

        return as.format(sql, {
            identificador_recurso: recurso,
            id_tipo_recurso: idTipoRecurso,
        });
    }
}
