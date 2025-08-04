export const guardarRecaudoSchema = {
    schema: {
        description: 'Guardar Recaudo',
        tags: ['Recaudo'],
        summary: 'Guardar Recaudo',
        body: {
            type: 'object',
            properties: {
                recaudo_id: { type: 'string', example: 'vmashcovu' },
                terminal: { type: 'number', example: 12 },
                valor_recaudo: { type: 'number', example: 200 },
                medio_pago: { type: 'number', example: 1 },
                fecha_hora_accion: { type: 'string', example: '2023-10-12 12:12:12' },
                tipo_recaudo: { type: 'number', example: 22 },
                origen_recaudo: { type: 'number', example: 2 },
                recaudo_anticipado: { type: 'boolean', example: false },
                recursos: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            tipo: { type: 'number', example: 1 },
                            valor: { type: 'string', example: '1-1' },
                            detalle: { type: 'string', example: '1-1', optional: true },
                        },
                    },
                },
            },
        },
        responses: {
            '200': {
                description: 'Recaudo guardado exitosamente',
                type: 'object',
                properties: {
                    isError: { type: 'boolean', example: false },
                    data: { type: 'number', example: 1 },
                    timestamp: { type: 'string', example: '2023-10-12T12:12:12Z' },
                    id: { type: 'string', example: '8e19538b79e' },
                },
            },
            '400': {
                description: 'Valores de entrada incorrecta',
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
