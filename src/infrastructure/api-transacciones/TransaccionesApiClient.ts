import 'reflect-metadata';
import { injectable } from 'inversify';
import got from 'got';
import { IResponseAliados } from './interfaces/IResponseAliados';
import { IFirestoreStageResponse } from '@infrastructure/repositories/firestore copy/interfaces/IFirestoreStageResponse';
import { TRANSACCIONES_URL } from '@util';

@injectable()
export class TransaccionesApiClient {
    async postRecaudosTarea(data: IFirestoreStageResponse): Promise<IResponseAliados | null> {
        try {
            console.log('postRecaudosTarea', data);
            const response = await got.post<IResponseAliados>(`${TRANSACCIONES_URL}recaudos/procesar`, {
                json: data,
                responseType: 'json',
            });
            return response.body;
        } catch (error: any) {
            console.error('Error al procesar recaudo', error);
            return {
                isError: true,
                date: error.details,
                data: 'null',
                message: error.message,
            };
        }
    }
}
