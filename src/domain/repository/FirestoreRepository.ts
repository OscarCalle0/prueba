import { IFirestoreStageResponse } from '@infrastructure/repositories/firestore copy/interfaces/IFirestoreStageResponse';

export interface FirestoreRepository {
    getDataRecaudo(): Promise<IFirestoreStageResponse[]>;
    updateRecaudoEstado(recaudoID: string, error?: string, estado?: string): Promise<void>;
}
