export const errorBolsilloSchema = {
    schema:{
        description: 'Guardar Recaudo',
        tags: ['Recaudo'],
        summary: 'Guardar Recaudo',
        body: {
            type: 'object',
            properties: {
                message: {
                    type: 'object',
                    properties: {
                        data: {
                            type: 'string',
                            example: 'ewoJIm9wZXJhY2lvbiI6InJlY2F1ZG8iLAoJImlkX3RyYW5zYWNjaW9uIjo2Cn0='
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
        responses: {
            '201': {
                description: 'Recaudo guardado exitosamente',
                type: 'object',
                properties: {
                    isError: { type: 'boolean', example: false },
                    data: { type: 'number', example: 1 },
                    timestamp: { type: 'string', example: '2023-10-12T12:12:12Z' },
                    id: { type: 'string', example: '8e19538b79e' },
                }
            },
            '400': {
                description: 'Valores de entrada incorrecta',
                type: 'object',
                properties: {
                    isError: { type: 'boolean', example: true },
                    message: { type: 'string', example: 'Los valores de entrada no son correctos.' },
                    code: { type: 'string', example: 'BAD_MESSAGE' },
                    cause: { type: 'string', example: 'Error al insertar en dineros_recibidor' },
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