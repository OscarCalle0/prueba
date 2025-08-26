import 'reflect-metadata';
import { injectable } from 'inversify';
import { CONSULTA_RECURSOS_URL } from '@util';
import { IRespuestaRecurso } from './interfaces';
import axios from 'axios';

@injectable()
export class RecursosApiClient {
    async getRecursosApiClient(recurso: string): Promise<IRespuestaRecurso> {
        try {
            const response = await axios<IRespuestaRecurso>({
                method: 'get',
                url: `${CONSULTA_RECURSOS_URL}responsable/${recurso}`,
            });
            return response.data;
        } catch (error: any) {
            console.error('Error al consultar responsable', error.response.data);
            return {
                isError: true,
                date: error.response.data.details,
                data: 'null',
                message: error.response.data.message,
                statusCode: error.response.data.statusCode,
            };
        }
    }
}
