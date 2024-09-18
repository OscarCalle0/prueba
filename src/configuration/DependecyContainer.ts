import { Container } from 'inversify';
import { RecaudosAppService } from '@application/services';
import { RecaudosDao, cmDAO, cmDB, db } from '@infrastructure/repositories';
import { TYPES } from './Types';
import { IDatabase, IMain } from 'pg-promise';
import { FirestoreRepository } from '@domain/repository';
import { firestore, RecaudosFSDao } from '@infrastructure/repositories/firestore';
import { Firestore } from '@google-cloud/firestore';
import { TransaccionesApiClient } from '@infrastructure/api-transacciones';

export const DEPENDENCY_CONTAINER = new Container();

export const createDependencyContainer = (): void => {
    DEPENDENCY_CONTAINER.bind<IDatabase<IMain>>(TYPES.Pg).toConstantValue(db);
    DEPENDENCY_CONTAINER.bind<IDatabase<IMain>>(TYPES.cm).toConstantValue(cmDB);
    DEPENDENCY_CONTAINER.bind(RecaudosAppService).toSelf().inSingletonScope();
    DEPENDENCY_CONTAINER.bind(RecaudosDao).toSelf().inSingletonScope();
    DEPENDENCY_CONTAINER.bind(cmDAO).toSelf().inSingletonScope();
    DEPENDENCY_CONTAINER.bind(TransaccionesApiClient).toSelf().inSingletonScope();
    DEPENDENCY_CONTAINER.bind<Firestore>(TYPES.Firestore).toConstantValue(firestore);
    DEPENDENCY_CONTAINER.bind<FirestoreRepository>(TYPES.firestoreDao).to(RecaudosFSDao).inSingletonScope();
};
