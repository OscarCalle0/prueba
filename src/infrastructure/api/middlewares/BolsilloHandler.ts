import { handler } from 'cm-idempotencia';

export const recaudoHandler = handler({
    serviceName: 'cm-dineros-recaudos-ms',
    keyId: 'idTransaccion',
    isPubsub: true,
});
