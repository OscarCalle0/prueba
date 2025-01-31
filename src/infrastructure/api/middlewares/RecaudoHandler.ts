import { handler } from 'cm-idempotencia';

export const RecaudoHandler = handler({
    serviceName: 'cm-dineros-recaudos-ms',
    keyId: 'idTransaccion',
    isPubsub: true,
});
