import { FastifyInstance } from 'fastify';
import { guardarRecaudo } from './RecaudosRouter';

export const initRoutes = async (application: FastifyInstance): Promise<void> => {
    application.post(`/recaudos`, guardarRecaudo);
};
