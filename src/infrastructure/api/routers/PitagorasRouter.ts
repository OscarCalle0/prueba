import { DEPENDENCY_CONTAINER } from '@configuration';
import { FastifyRequest, FastifyReply } from 'fastify';
import { validateData } from '../util';
import { IpitagorasTransaccion } from '@application/data';
import { PitagorasJoiSchema } from '../schemas';
import { PitagorasAppService } from '@application/services';

export const insertPitagoras = async (req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply | void> => {
    const pitagorasService = DEPENDENCY_CONTAINER.get(PitagorasAppService);
    const data = validateData<IpitagorasTransaccion>(PitagorasJoiSchema, req.body);
    const response = await pitagorasService.insertPitagoras(data.idTransaccion);
    return reply.status(response.code).send({ ...response, id: req.id });
};
