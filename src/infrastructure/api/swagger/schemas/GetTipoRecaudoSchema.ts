export const GetTipoRecaudoSchema = {
    schema: {
        description: 'Endpoint para consultar tipo de recaudo de guias asociadas a id_equipo y id_medio_pago',
        tags: ['TRG'],
        params: {
            type: 'object',
            properties: {
                id_equipo: { type: 'string', example: '12345-1', description: '(Obligatorio)' },
                fecha_inicial: { type: 'string', example: '2023-01-01', description: '(Obligatorio)' },
                fecha_final: { type: 'string', example: '2023-12-31', description: '(Opcional)' },
                id_medio_pago: { type: 'number', example: 1, description: '(Obligatorio)' },
            },
            required: ['id_equipo', 'fecha_inicial', 'id_medio_pago'],
        },
        response: {
            '200': {
                description: 'Guias encontradas exitosamente',
                type: 'object',
                properties: {
                    isError: { type: 'boolean', example: false },
                    data: { type: 'array', example: [] },
                    timestamp: { type: 'string', format: 'date-time', example: '2023-03-22T20:55:57.020Z' },
                    id: { type: 'string', example: 'f3e3e3e3-3e3e-3e3e-3e3e-3e3e3e3e3e3e' },
                },
            },
            '400': {
                description: 'Valores de entrada incorrecta',
                type: 'object',
                properties: {
                    isError: { type: 'boolean', example: true },
                    message: { type: 'string', example: 'Los valores de entrada no son correctos.' },
                    code: { type: 'string', example: 'BAD_MESSAGE' },
                    cause: { type: 'null', example: 'null' },
                    timestamp: { type: 'string', format: 'date-time', example: '2023-03-22T21:00:00.000Z' },
                    statusCode: { type: 'number', example: '400' },
                    id: { type: 'string', example: 'f3e3e3e3-3e3e-3e3e-3e3e-3e3e3e3e3e3e' },
                },
            },
            '500': {
                description: 'Error de servidor',
                type: 'object',
                properties: {
                    isError: { type: 'boolean', example: true },
                    message: {
                        type: 'string',
                        example: 'Error al consultar codigo droopError: getaddrinfo ENOTFOUND dbcmtest.loc',
                    },
                    code: { type: 'string', example: 'UNKNOWN_ERROR' },
                    cause: { type: 'string', example: 'Default translator error' },
                    timestamp: { type: 'string', format: 'date-time', example: '2023-03-22T20:52:41.413Z' },
                    statusCode: { type: 'number', example: '500' },
                    id: { type: 'string', example: '9085d074fd57bb27361465acffa3f4f6f439af7b' },
                },
            },
        },
    },
};
