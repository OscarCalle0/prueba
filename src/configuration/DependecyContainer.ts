import { Container } from 'inversify';
import { RecaudosAppService } from '@application/services';
import { RecaudosDao, cmDAO, cmDB, db } from '@infrastructure/repositories';
import { TYPES } from './Types';
import { IDatabase, IMain } from 'pg-promise';

export const DEPENDENCY_CONTAINER = new Container();

export const createDependencyContainer = (): void => {
    DEPENDENCY_CONTAINER.bind<IDatabase<IMain>>(TYPES.Pg).toConstantValue(db);
    DEPENDENCY_CONTAINER.bind<IDatabase<IMain>>(TYPES.cm).toConstantValue(cmDB);

    DEPENDENCY_CONTAINER.bind(RecaudosAppService).toSelf().inSingletonScope();
    DEPENDENCY_CONTAINER.bind(RecaudosDao).toSelf().inSingletonScope();
    DEPENDENCY_CONTAINER.bind(cmDAO).toSelf().inSingletonScope();
};
