import { FastifyInstance } from 'fastify';
import { consultaRecaudoEfectivo, guardarRecaudo } from './RecaudosRouter';
import { ConsultarRCESchema } from '../swagger/schemas/ConsultarRCESchema';

export const initRoutes = async (application: FastifyInstance): Promise<void> => {
    application.post(`/recaudos`, guardarRecaudo);
    application.get(`/recaudos/rce-efectivo-guia/:codigo_remision`, ConsultarRCESchema, consultaRecaudoEfectivo);
};
