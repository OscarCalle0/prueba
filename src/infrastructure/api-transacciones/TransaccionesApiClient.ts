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
            const response = await got.post<IResponseAliados>(`${TRANSACCIONES_URL}recaudos/procesar`, {
                json: data,
            });
            return response.body;
        } catch (e) {
            console.error(`Error en el servicio de procesar recaudo`, e);
            throw new Error(`Error en el servicio de procesar recaudo ${e}`);
        }
    }
}
