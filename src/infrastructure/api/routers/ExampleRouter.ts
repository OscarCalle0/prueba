import { ExampleAppService } from '@application/services';
import { DEPENDENCY_CONTAINER } from '@configuration';
import { FastifyRequest, FastifyReply } from 'fastify';

export const example = async (req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply | void> => {
    const exampleService = DEPENDENCY_CONTAINER.get(ExampleAppService);
    const { id } = req;
    const response = await exampleService.example();
    return reply.send({ ...response, id });
};
