import Joi from 'joi';

export interface PubSubPayload {
    message: Message;
}

interface Message {
    data: string;
    publishTime: string;
    messageId: string;
}

export const pubSubSchema = Joi.object<PubSubPayload>({
    message: Joi.object({
        data: Joi.string()
            .pattern(/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/)
            .required(),
        publishTime: Joi.string()
            .pattern(/^[a-zA-Z0-9_.:-]+$/)
            .required(),
        messageId: Joi.string()
            .pattern(/^[a-zA-Z0-9_-]+$/)
            .required(),
    })
        .unknown(true)
        .required(),
}).unknown(true);
