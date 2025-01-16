import { DEPENDENCY_CONTAINER, TYPES } from '@configuration';
import { injectable } from 'inversify';
import { IDatabase, IMain } from 'pg-promise';
import { DatabaseError } from '@domain/exceptions';
import { IPitagorasIn } from '@application/data';

@injectable()
export class PitagorasDao {
    private dbCm = DEPENDENCY_CONTAINER.get<IDatabase<IMain>>(TYPES.cm);
    private dbDineros = DEPENDENCY_CONTAINER.get<IDatabase<IMain>>(TYPES.Pg);

    public async getDataRecaudo(idTransaccion: number): Promise<IPitagorasIn> {
        try {
            const queryConsultaDataRecaudo = `SELECT r.fecha_hora_recaudo as fecha,r.terminal,r.id_medio_pago AS forma_de_pago,
                    MAX(CASE WHEN re.id_tipo_recurso = 1 THEN re.identificador_recurso END) as equipo,
                    MAX(CASE WHEN re.id_tipo_recurso = 2 THEN re.identificador_recurso END) as recibidor,
                    MAX(CASE WHEN re.id_tipo_recurso = 4 THEN re.identificador_recurso END) as numero_aprobacion,
                    r.valor,'Aut-Dineros' as usuario
                FROM recaudos r
                INNER JOIN recaudos_recursos rr on rr.id_recaudo = r.id_recaudo
                INNER JOIN recursos re on rr.id_recurso = re.id_recurso
                WHERE r.id_recaudo = (select id_movimiento from transacciones where id_transaccion = ${idTransaccion})
                    AND re.id_tipo_recurso IN (1,2,4)
                GROUP BY r.fecha_hora_recaudo, r.terminal,r.valor,r.id_medio_pago;`;
            return await this.dbDineros.one(queryConsultaDataRecaudo);
        } catch (error) {
            console.error(`Error al obtener datos de recaudo transacción ${idTransaccion}:`, error);
            throw new Error('Error al obtener datos de recaudo.'); // Lanzar error genérico o personalizarlo según el caso
        }
    }

    public async insertPitagoras(data: IPitagorasIn, idTransaccion: number): Promise<number> {
        try {
            return await this.dbCm.tx(async (t1) => {
                const queryRegistroSesion = `select * from func_registrar_sesion('dineros','cm-dineros-recaudos') as respuesta`;
                await t1.one(queryRegistroSesion);

                try {
                    const result = await t1.one<{ id: number }>(
                        `INSERT INTO public.dineros_recibidor
                    (fecha, terminal, equipo, recibidor, forma_de_pago, numero_aprobacion, valor, usuario)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                    RETURNING id`,
                        [
                            data.fecha,
                            data.terminal,
                            data.equipo,
                            data.recibidor,
                            data.forma_de_pago,
                            data.numero_aprobacion,
                            data.valor,
                            data.usuario,
                        ],
                    );

                    try {
                        await this.dbDineros.tx(async (t2) => {
                            const updateQuery = `UPDATE public.recaudos SET id_estado=9 WHERE id_recaudo = select id_movimiento from transacciones where id_transaccion = $1`;
                            await t2.none(updateQuery, [idTransaccion]); // Throws if the update fails
                            await t1.query('COMMIT'); // Manually commit dbCm
                        });
                    } catch (dbError) {
                        await t1.query('ROLLBACK');
                        throw dbError; // Re-throw
                    }

                    return result.id;
                } catch (error: any) {
                    const updateQuery = `UPDATE public.recaudos SET id_estado=10 WHERE id_recaudo = select id_movimiento from transacciones where id_transaccion = $1`;
                    await this.dbDineros.none(updateQuery, [idTransaccion]);
                    throw new DatabaseError(error, 'Error al insertar en dineros_recibidor');
                }
            });
        } catch (error: any) {
            throw new DatabaseError(error, 'Error al insertar en dineros_recibidor');
        }
    }

    public async cambiarEstadoRecaudo(idTransaccion: number): Promise<void> {
        try {
            const query = `UPDATE public.recaudos SET id_estado=8 WHERE id_recaudo = select id_movimiento from transacciones where id_transaccion = $1`;
            await this.dbDineros.none(query, [idTransaccion]);
        } catch (error) {
            console.error(`Error al cambiar estado de recaudo transacción ${idTransaccion}:`, error);
            throw new Error('Error al cambiar estado de recaudo.');
        }
    }
}
