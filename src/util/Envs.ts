export const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'local';

export const GCP_PROJECT = process.env.GCP_PROJECT ?? 'cm-dineros-dev';

export const PREFIX = `/${process.env.DOMAIN}/${process.env.SERVICE_NAME}`;

export const HOST = process.env.HOST || 'localhost';

export const TRANSACCIONES_URL =
    process.env.TRANSACCIONES_URL ?? 'https://apiv2-dev.coordinadora.com/dineros/cm-dineros-transacciones/';

export const REDIS_HOST = process.env.REDIS_HOST ?? 'localhost';

export const REDIS_PORT = process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379;

export const REDIS_CONNECTION_LOCAL_ENV = process.env.REDIS_CONNECTION_LOCAL_ENV ?? false;

export const REDIS_TIEMPO_VENCIMIENTO = process.env.REDIS_TIEMPO_VENCIMIENTO ?? '3600';

export const TOPIC_PUBSUB_BOLSILLO = process.env.TOPIC_PUBSUB_BOLSILLO ?? 'recaudo-bolsillo';

