import { IFirestoreStageResponse } from '@infrastructure/repositories/firestore copy/interfaces/IFirestoreStageResponse';

export interface FirestoreRepository {
    getDataRecaudo(): Promise<IFirestoreStageResponse[]>;
}
