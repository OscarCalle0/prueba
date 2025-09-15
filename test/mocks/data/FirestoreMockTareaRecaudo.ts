export const FirestoreMockDataTareaRecaudo = {
    __collection__: {
        recaudo_temporal_guias: {
            __doc__: {
                '001': {
                    estado: 'pendiente',
                    fecha_hora_accion: '2024-07-30T11:34:00.000Z',
                    ultimo_error: '',
                    recaudo_id: '001',
                    terminal: 1,
                    medio_pago: 1,
                    origen_recaudo: 1,
                    tipo_recaudo: 3,
                },
                '002': {
                    estado: 'pendiente',
                    fecha_hora_accion: '2024-07-30T11:34:00.000Z',
                    ultimo_error: '',
                    recaudo_id: '002',
                    terminal: 1,
                    medio_pago: 1,
                    origen_recaudo: 1,
                    tipo_recaudo: 3,
                    valor_recaudo: 4000.12,
                },
                '003': {
                    estado: 'procesado',
                    fecha_hora_accion: '2024-07-30T11:34:00.000Z',
                    ultimo_error: '',
                    recaudo_id: '003',
                    terminal: 1,
                    medio_pago: 1,
                    origen_recaudo: 1,
                    tipo_recaudo: 3,
                },
            },
        },
    },
};

export const FirestoreMockDataTareaRecaudoConDecimales = {
    __collection__: {
        recaudo_temporal_guias: {
            __doc__: {
                '55515334': {
                    recaudo_id: '55515334',
                    terminal: 2,
                    valor_recaudo: 4000.123,
                    medio_pago: 1,
                    fecha_hora_accion: '2025-09-05 14:25:07',
                    tipo_recaudo: 22,
                    origen_recaudo: 2,
                    recaudo_anticipado: false,
                    recursos: [
                        { tipo: 1, valor: '36-2' },
                        { tipo: 2, valor: '39812' },
                        { tipo: 3, valor: 'prueba recaudo', detalle: '4000.123' },
                    ],
                    estado: 'pendiente',
                },
            },
        },
    },
};
