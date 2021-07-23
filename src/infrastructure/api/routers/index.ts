import { example } from './ExampleRouter';
import { FastifyInstance } from 'fastify';

export const initRoutes = (application: FastifyInstance): void => {
    application.get('/', example);
    application.post('/', example);
};
