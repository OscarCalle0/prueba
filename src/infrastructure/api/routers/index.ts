import { FastifyInstance } from 'fastify';
import { guardarRecaudo, healtCheck } from './RecaudosRouter';

export const initRoutes = async (application: FastifyInstance): Promise<void> => {
    application.post(`/recaudos`, guardarRecaudo);
    application.get(`/healt-check`, healtCheck);
};
