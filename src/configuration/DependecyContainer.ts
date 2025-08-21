import { Container } from 'inversify';
import { PitagorasAppService, RecaudosAppService } from '@application/services';
import { NovedadesDao, PitagorasDao, RecaudosDao, cmDAO, cmDB, db, replicaDB } from '@infrastructure/repositories';
import { TYPES } from './Types';
import { IDatabase, IMain } from 'pg-promise';
import { FirestoreRepository } from '@domain/repository';
import { firestore, RecaudosFSDao } from '@infrastructure/repositories/firestore';
import { Firestore } from '@google-cloud/firestore';
import { TransaccionesApiClient } from '@infrastructure/api-transacciones';
import { NovedadesRepository } from '@domain/repository/NovedadesRepository';
import { PubSub } from '@google-cloud/pubsub';
import { pubsub } from '@infrastructure/pubsub/pubsub/config/PubSubConfig';
import { BolsilloPubsub } from '@infrastructure/pubsub/pubsub';
import { IBolsilloPubSubRepository } from '@infrastructure/pubsub/IBolsilloPubSub';
import { Redis } from '@infrastructure/repositories/redis';
import { RecursosApiClient } from '@infrastructure/api-recursos';

export const DEPENDENCY_CONTAINER = new Container();

export const createDependencyContainer = (): void => {
    DEPENDENCY_CONTAINER.bind<IDatabase<IMain>>(TYPES.Pg).toConstantValue(db);
    DEPENDENCY_CONTAINER.bind<IDatabase<IMain>>(TYPES.cm).toConstantValue(cmDB);
    DEPENDENCY_CONTAINER.bind<IDatabase<IMain>>(TYPES.replicaDB).toConstantValue(replicaDB);
    DEPENDENCY_CONTAINER.bind(RecaudosAppService).toSelf().inSingletonScope();
    DEPENDENCY_CONTAINER.bind(RecaudosDao).toSelf().inSingletonScope();
    DEPENDENCY_CONTAINER.bind(cmDAO).toSelf().inSingletonScope();
    DEPENDENCY_CONTAINER.bind<NovedadesRepository>(TYPES.NovedadesRepository).to(NovedadesDao).inSingletonScope();
    DEPENDENCY_CONTAINER.bind(TransaccionesApiClient).toSelf().inSingletonScope();
    DEPENDENCY_CONTAINER.bind<Firestore>(TYPES.Firestore).toConstantValue(firestore);
    DEPENDENCY_CONTAINER.bind<FirestoreRepository>(TYPES.FirestoreRepository).to(RecaudosFSDao).inSingletonScope();
    DEPENDENCY_CONTAINER.bind(PitagorasDao).toSelf().inSingletonScope();
    DEPENDENCY_CONTAINER.bind(PitagorasAppService).toSelf().inSingletonScope();
    DEPENDENCY_CONTAINER.bind<PubSub>(TYPES.PubSub).toConstantValue(pubsub);
    DEPENDENCY_CONTAINER.bind<IBolsilloPubSubRepository>(TYPES.PubSubBolsillo).to(BolsilloPubsub).inSingletonScope();
    DEPENDENCY_CONTAINER.bind(TYPES.RedisClient).to(Redis).inSingletonScope();
    DEPENDENCY_CONTAINER.bind(RecursosApiClient).toSelf().inSingletonScope();
};
