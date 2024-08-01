import 'reflect-metadata';
import { injectable } from 'inversify';
import { Firestore } from '@google-cloud/firestore';
import { IFirestoreStageResponse } from '../interfaces/IFirestoreStageResponse';
import { DEPENDENCY_CONTAINER, TYPES } from '@configuration';
import { FirestoreRepository } from '@domain/repository';
import { DatabaseError } from '@domain/exceptions';

@injectable()
export class RecaudosFSDao implements FirestoreRepository {
    private firestore = DEPENDENCY_CONTAINER.get<Firestore>(TYPES.Firestore);
    private collection = 'recaudo_temporal_guias';
    async getDataRecaudo(): Promise<IFirestoreStageResponse[]> {
        console.log('getDataRecaudo');
        const recaudos: IFirestoreStageResponse[] = [];
        await this.firestore
            .collection(this.collection)
            .where('estado', '==', 'pendiente')
            .limit(100)
            .get()
            .then((querySnapshot: any) => {
                querySnapshot.forEach((doc: any) => {
                    recaudos.push(doc.data() as IFirestoreStageResponse);
                });
            });
        return recaudos;
    }

    async updateRecaudoEstado(recaudoID: string, error?: string, estado?: string): Promise<void> {
        await this.firestore
            .collection(this.collection)
            .doc(recaudoID)
            .update({
                estado: estado ?? 'error',
                ultimo_error: error ?? null,
            })
            .catch((error) => {
                console.error('Error al actualizar la fecha de creación', 'recaudo', error);
                throw new DatabaseError('Error al actualizar la fecha de creación', error);
            });
    }
}
