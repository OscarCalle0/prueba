export const procesarRecaudoSchema = {
    schema:{
        description: 'Procesar Recaudo',
        tags: ['Recaudos'],
        response: {
            '200': {
                description: 'Recaudo procesado',
                type: 'object',
                properties: {
                    isError: { type: 'boolean', example: false },
                    data: { type: 'boolean', example: true },
                    timestamp: { type: 'string', format: 'date-time', example: '2023-03-22T20:55:57.020Z' },
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
}