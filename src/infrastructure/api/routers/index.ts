import { example } from './ExampleRouter';
import { FastifyInstance } from 'fastify';
import { PREFIX } from '@util';

export const initRoutes = (application: FastifyInstance): void => {
    application.get(`/${PREFIX}/`, example);
    application.post(`/${PREFIX}/`, example);
};
