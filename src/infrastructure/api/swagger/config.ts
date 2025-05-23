import { PREFIX, HOST, NODE_ENV } from '@util';
import { FastifyDynamicSwaggerOptions } from '@fastify/swagger';

export let swagger_config: FastifyDynamicSwaggerOptions | undefined = {};

if (NODE_ENV !== 'production') {
    swagger_config = {
        routePrefix: `${PREFIX}/docs`,
        swagger: {
            info: {
                title: 'Microservicio de Maestros de Dineros',
                description: 'Este microservicio se encarga de gestionar los maestros de dineros',
                version: '0.1.0',
                contact: {
                    name: 'Coordinadora Mercantil S.A',
                    url: 'https://www.coordinadora.com/',
                    email: 'it@coordinadora.com',
                },
            },
            host: HOST,
            schemes: NODE_ENV === 'local' ? ['http'] : ['https'],
            consumes: ['application/json'],
            produces: ['application/json'],
        },
        exposeRoute: true,
        hideUntagged: true,
    };
}