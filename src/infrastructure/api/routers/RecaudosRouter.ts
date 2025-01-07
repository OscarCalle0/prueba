import { RecaudosAppService } from '@application/services';
import { DEPENDENCY_CONTAINER } from '@configuration';
import { FastifyRequest, FastifyReply } from 'fastify';
import { validateData } from '../util';
import { IRecaudosIn, ITipoRecaudoConsulta } from '@application/data';
import { GuardarRecaudosJoiSchema } from '../schemas/GuardaRecaudosJoiSchema';
import { ConsultaRCESchema } from '../schemas/ConsultarRCESchema';
import { GetValoresRecaudadosSchema } from '../schemas/GetValoresRecaudadosSchema';
import { GetTipoRecaudoSchema } from '../schemas/GetTipoRecaudoSchema';
import { IRecaudosConsulta } from '@application/data/in/IRecaudosConsulta';
import { IValoresRecaudadosConsulta } from '@application/data/in/IValoresRecaudadosConsulta';
import { validateFechas } from '../util/validateFechas';

export const guardarRecaudo = async (req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply | void> => {
    const recaudosService = DEPENDENCY_CONTAINER.get(RecaudosAppService);
    const data = validateData<IRecaudosIn>(GuardarRecaudosJoiSchema, req.body);
    const response = await recaudosService.guardarRecaudo(data);
    return reply.status(201).send({ ...response, id: req.id });
};

export const healtCheck = async (_req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply | void> => {
    return reply.send({ data: 'ok' });
};

export const consultaRecaudoEfectivo = async (
    req: FastifyRequest,
    reply: FastifyReply,
): Promise<FastifyReply | void> => {
    const recaudosService = DEPENDENCY_CONTAINER.get(RecaudosAppService);
    const data = validateData<IRecaudosConsulta>(ConsultaRCESchema, req.params);
    const response = await recaudosService.consultarRecaudoRCE(data);
    return reply.status(200).send({ ...response, id: req.id });
};

export const procesarRecaudo = async (req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply | void> => {
    const recaudosService = DEPENDENCY_CONTAINER.get(RecaudosAppService);
    const response = await recaudosService.procesarRecaudo();
    return reply.status(200).send({ ...response, id: req.id });
};

export const getValoresRecaudados = async (req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply | void> => {
    const recaudosService = DEPENDENCY_CONTAINER.get(RecaudosAppService);
    const data = validateData<IValoresRecaudadosConsulta>(GetValoresRecaudadosSchema, req.params);
    if (!validateFechas(data.fecha_inicial, data.fecha_final)) {
        return reply.status(400).send({ isError: true, message: 'Las fechas no son válidas', id: req.id });
    }
    const response = await recaudosService.consultarValoresRecaudados(data);
    return reply.status(200).send({ ...response, id: req.id });
};

export const getTipoRecaudo = async (req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply | void> => {
    const recaudosService = DEPENDENCY_CONTAINER.get(RecaudosAppService);
    const data = validateData<ITipoRecaudoConsulta>(GetTipoRecaudoSchema, req.params);
    if (!validateFechas(data.fecha_inicial, data.fecha_final)) {
        return reply.status(400).send({ isError: true, message: 'Las fechas no son válidas', id: req.id });
    }
    const response = await recaudosService.consultarGuiasRecaudadas(data);
    return reply.status(200).send({ ...response, id: req.id });
};
