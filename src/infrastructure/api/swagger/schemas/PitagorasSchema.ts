import { FastifySchema } from 'fastify';

export const PitagorasSchema: FastifySchema = {
    description: 'Endpoint para insertar registros en la tabla dineros_recibidor de Pitagoras',
    tags: ['Pitagoras'],
    body: {
        type: 'object',
        properties: {
            idTransaccion: {
                type: 'number',
                example: 8592,
                description: 'ID de la transacción (Obligatorio)',
            },
        },
        required: ['idTransaccion'],
    },
    response: {
        '201': {
            description: 'Registro insertado exitosamente',
            type: 'object',
            properties: {
                message: { type: 'string', example: 'Registro procesado exitosamente' },
                code: { type: 'number', example: 201 },
                error: { type: 'boolean', example: false },
                id: { type: 'string', example: 'f3e3e3e3-3e3e-3e3e-3e3e-3e3e3e3e3e3e' },
            },
        },
        '400': {
            description: 'Error de validación en los datos de entrada',
            type: 'object',
            properties: {
                isError: { type: 'boolean', example: true },
                message: { type: 'string', example: 'Los valores de entrada no son correctos.' },
                code: { type: 'string', example: 'BAD_MESSAGE' },
                cause: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            message: { type: 'string', example: 'El campo idTransaccion es obligatorio' },
                            path: { type: 'string', example: 'idTransaccion' },
                        },
                    },
                },
                timestamp: { type: 'string', format: 'date-time', example: '2024-01-01T00:00:00.000Z' },
                statusCode: { type: 'number', example: 400 },
                id: { type: 'string', example: 'f3e3e3e3-3e3e-3e3e-3e3e-3e3e3e3e3e3e' },
            },
        },
        '500': {
            description: 'Error interno del servidor',
            type: 'object',
            properties: {
                isError: { type: 'boolean', example: true },
                message: { type: 'string', example: 'Error interno del servidor.' },
                code: { type: 'string', example: 'REPOSITORY_ERROR' },
                cause: { type: 'string', example: 'Error al insertar en dineros_recibidor' },
                timestamp: { type: 'string', format: 'date-time', example: '2024-01-01T00:00:00.000Z' },
                statusCode: { type: 'number', example: 500 },
                id: { type: 'string', example: 'f3e3e3e3-3e3e-3e3e-3e3e-3e3e3e3e3e3e' },
            },
        },
    },
};
