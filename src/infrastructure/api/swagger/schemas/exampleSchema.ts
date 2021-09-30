export const examplePostSchema = {
    schema: {
        description: 'post some data',
        tags: ['post_example_template'],
        body: {
            type: 'object',
            properties: {
                equipo: { type: 'string', example: '10' },
                numero_entrega: { type: 'number', example: 3 },
                estado: { type: 'boolean', example: true },
                cliente: {
                    type: 'object',
                    properties: {
                        nit: { type: 'string', example: '900358833' },
                        razon_social: { type: 'string', example: null },
                        div: { type: 'string', example: '03' },
                    },
                },
            },
        },
        response: {
            '200-OK': {
                description: 'Succesful response',
                type: 'object',
                properties: {
                    isError: { type: 'boolean', example: false },
                    data: { type: 'object', properties: { id: { type: 'string', example: 'f53nMjS5pC3naOdjonwS' } } },
                    timestamp: { type: 'string', format: 'date-time', example: '2030-07-21T17:32:28Z' },
                },
            },
            '400-BAD_REQUEST': {
                description: 'Bad Request',
                type: 'object',
                properties: {
                    isError: { type: 'boolean', example: false },
                    message: { type: 'string', example: 'La cagué' },
                    code: { type: 'string', example: 'La recagué' },
                    statusCode: { type: 'number', example: 400 },
                    cause: { type: ['string', 'null'], example: 'Me mandaron lo que no era' },
                },
            },
        },
    },
};
export const exampleGetSchema = {
    schema: {
        description: 'post some data',
        tags: ['get_example_template'],
        query: {
            type: 'object',
            properties: {
                equipo: { type: 'string', example: '10' },
            },
        },
        params: {
            type: 'object',
            properties: {
                terminal: { type: 'string', example: '1' },
            },
        },
        response: {
            '200-OK': {
                description: 'Succesful response',
                type: 'object',
                properties: {
                    isError: { type: 'boolean', example: false },
                    data: { type: 'object', properties: { id: { type: 'string', example: 'f53nMjS5pC3naOdjonwS' } } },
                    timestamp: { type: 'string', format: 'date-time', example: '2030-07-21T17:32:28Z' },
                },
            },
            '400-BAD_REQUEST': {
                description: 'Bad Request',
                type: 'object',
                properties: {
                    isError: { type: 'boolean', example: false },
                    message: { type: 'string', example: 'La cagué' },
                    code: { type: 'string', example: 'La recagué' },
                    statusCode: { type: 'number', example: 400 },
                    cause: { type: ['string', 'null'], example: 'Me mandaron lo que no era' },
                },
            },
        },
    },
};
