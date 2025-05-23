export const publicarPitagorasSchema = {
    schema:{
        description: 'Publicar Pitagoras',
        tags: ['Pitagoras'],
        summary: 'Publicar Pitagoras',
        body: {
            type: 'object',
            properties: {
                message: {
                    type: 'object',
                    properties: {
                        data: {
                            type: 'string',
                            example: 'ewoJImlkX3RyYW5zYWNjaW9uIjoxMjQKfQ=='
                        },
                        publishTime: {
                            type: 'string',
                            example: '1734644732541'
                        },
                        messageId: {
                            type: 'string',
                            example: '21213121'
                        }
                    }
                },
            },
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
                description: 'Error al publicar la Pitagoras',
                type: 'object',
                properties: {
                    isError: { type: 'boolean', example: true },
                    message: { type: 'string', example: 'Error al publicar la Pitagoras' },
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
                    timestap: { type: 'string', format: 'date-time', example: '2023-03-22T21:00:00.000Z' },
                    statusCode: { type: 'number', example: '400' },
                    id: { type: 'string', example: 'f3e3e3e3-3e3e-3e3e-3e3e-3e3e3e3e3e3e' },
                },
            },
            '500': {
                description: 'Error interno del servidor',
                type: 'object',
                properties: {
                    isError: { type: 'boolean', example: true },
                    message: { type: 'string', example: 'Error interno del servidor' },
                    code: { type: 'string', example: 'SERVER_ERROR' },
                    cause: { type: 'string', example: 'Error al insertar en dineros_recibidor' },
                    timestap: { type: 'string', format: 'date-time', example: '2023-03-22T21:00:00.000Z' },
                    statusCode: { type: 'number', example: '500' },
                    id: { type: 'string', example: 'f3e3e3e3-3e3e-3e3e-3e3e-3e3e3e3e3e3e' },
                },
            },
        },
    },
};