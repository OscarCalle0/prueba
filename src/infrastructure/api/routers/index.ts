import { FastifyInstance } from 'fastify';
import { ConsultarRCESchema } from '../swagger/schemas/ConsultarRCESchema';
import { GetValoresRecaudadosSchema } from '../swagger/schemas/GetValoresRecaudadosSchema';
import { GetTipoRecaudoSchema } from '../swagger/schemas/GetTipoRecaudoSchema';
import {
    guardarRecaudo,
    healtCheck,
    consultaRecaudoEfectivo,
    procesarRecaudo,
    getValoresRecaudados,
    getTipoRecaudo,
} from './RecaudosRouter';
import { insertPitagoras } from './PitagorasRouter';

export const initRoutes = async (application: FastifyInstance): Promise<void> => {
    application.post(`/recaudos`, guardarRecaudo);
    application.get(`/recaudos/tarea`, procesarRecaudo);
    application.get(`/recaudos/rce-efectivo-guia/:codigo_remision`, ConsultarRCESchema, consultaRecaudoEfectivo);
    application.get(`/healt-check`, healtCheck);
    application.get(`/bolsillo`, healtCheck);
    application.get(
        `/medios-pago/:id_equipo/:fecha_inicial/:fecha_final?`,
        GetValoresRecaudadosSchema,
        getValoresRecaudados,
    );
    application.get(
        `/tipo-recaudo/:id_equipo/:id_medio_pago/:fecha_inicial/:fecha_final?`,
        GetTipoRecaudoSchema,
        getTipoRecaudo,
    );
    application.post(`/pitagoras`, insertPitagoras);
};
