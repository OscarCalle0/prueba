import Joi from 'joi';
import { parse, decode } from '@util';
import { pubSubSchema, PubSubPayload } from '@infrastructure/api/schemas';

type Schema = Joi.ObjectSchema | Joi.ArraySchema;
type Body = Record<string, unknown> | undefined | unknown;

export const validateData = <T>(schema: Schema, dataToValidate: Body): T => {
    if (dataToValidate) {
        const { error, value } = schema.validate(dataToValidate, { convert: true });
        if (error) {
            console.error(`schemaError: ${JSON.stringify(error)}`);
            throw new Error(error.message);
        }
        return value;
    }
    throw new Error('mensaje indefinido');
};

export const validateDataPubSub = <T>(schema: Schema, dataToValidate: Body): T => {
    if (dataToValidate) {
        const pubSubPayload = validatePubSub(dataToValidate);
        if (pubSubPayload) {
            const decodeMessage = parse(decode(pubSubPayload.message.data));
            const { error, value } = schema.validate(decodeMessage, { convert: true });
            if (error) {
                console.error(`schemaError: ${JSON.stringify(error)}`);
                throw new Error(error.message);
            }
            return value;
        }
    }
    throw new Error('mensaje indefinido');
};

export const validatePubSub = (dataToValidate: Body): PubSubPayload | null => {
    if (dataToValidate) {
        const { error, value } = pubSubSchema.validate(dataToValidate, { convert: true });
        if (!error) return value;
    }
    return null;
};
