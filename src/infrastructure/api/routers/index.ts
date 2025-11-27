import { FastifyInstance } from 'fastify';
import {
    //GetTipoRecaudoSchema,
    //GetValoresRecaudadosSchema,
    ConsultarRCESchema,
    /*
    guardarRecaudoSchema,
    procesarRecaudoSchema,
    errorBolsilloSchema,
    publicarPitagorasSchema,
    */
} from '../swagger';
import {
    //guardarRecaudo,
    healtCheck,
    consultaRecaudoEfectivo,
    /*
    procesarRecaudo,
    getValoresRecaudados,
    getTipoRecaudo,
    errorBolsilloRouter,
    */
} from './RecaudosRouter';
// import { insertPitagoras } from './PitagorasRouter';

export const initRoutes = async (application: FastifyInstance): Promise<void> => {
    /*
    application.post(`/recaudos`, guardarRecaudoSchema, guardarRecaudo);
    application.get(`/recaudos/tarea`, procesarRecaudoSchema, procesarRecaudo);
    */
    application.get(`/recaudos/rce-efectivo-guia/:codigo_remision`, ConsultarRCESchema, consultaRecaudoEfectivo);
    application.get(`/healt-check`, healtCheck);
    
    application.get(`/bolsillo`, healtCheck);
    /*
    application.post(`/recaudos/error-bolsillo`, errorBolsilloSchema, errorBolsilloRouter);
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
    application.post(`/pitagoras`, publicarPitagorasSchema, insertPitagoras);
    */
};
