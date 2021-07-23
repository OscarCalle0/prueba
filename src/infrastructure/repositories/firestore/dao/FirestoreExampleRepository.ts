import { injectable } from 'inversify';
import { DEPENDENCY_CONTAINER, TYPES } from '@configuration';
import { Firestore } from '@google-cloud/firestore';
import { ExampleRepository } from '@domain/repository';
import { ExampleEntity } from '@domain/entities';
@injectable()
export class FirestoreExampleRepository implements ExampleRepository {
    private firestore = DEPENDENCY_CONTAINER.get<Firestore>(TYPES.Firestore);
    private collection = 'testing';

    async save(model: ExampleEntity): Promise<void> {
        await this.firestore.collection(this.collection).add({ ...model });
    }
}
