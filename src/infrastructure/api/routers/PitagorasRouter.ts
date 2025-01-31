import { DEPENDENCY_CONTAINER } from '@configuration';
import { FastifyRequest, FastifyReply } from 'fastify';
import { validateDataPubSub } from '../util';
import { IpitagorasTransaccion } from '@application/data';
import { PitagorasJoiSchema } from '../schemas';
import { PitagorasAppService } from '@application/services';

export const insertPitagoras = async (req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply | void> => {
    const data = validateDataPubSub<IpitagorasTransaccion>(PitagorasJoiSchema, req.body);
    const pitagorasService = DEPENDENCY_CONTAINER.get(PitagorasAppService);
    const response = await pitagorasService.insertPitagoras(data.idTransaccion);
    return reply.status(response.code).send({ ...response, id: req.id });
};

export const healtCheck = async (_req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply | void> => {
    return reply.send({ data: 'ok' });
}

