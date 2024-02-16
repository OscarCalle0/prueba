import JoiImport from 'joi';
import DateExtension from '@joi/date';
const Joi = JoiImport.extend(DateExtension) as typeof JoiImport;
import { messages } from './Messages';
import { IInfoComplementariaIn, IRecaudosIn, IReferenciaIn } from '@application/data';

export const GuardarRecaudosJoiSchema = Joi.object<IRecaudosIn>({
    recaudo_id: Joi.string().required().messages(messages('recaudo_id')),
    terminal: Joi.number().required().messages(messages('terminal')),
    tipo_recurso: Joi.when('recaudo_anticipado', {
        is: true,
        then: Joi.forbidden(),
        otherwise: Joi.number().required().messages(messages('tipo_recurso')),
    }),
    recurso: Joi.when('recaudo_anticipado', {
        is: true,
        then: Joi.forbidden(),
        otherwise: Joi.string().required().messages(messages('recurso')),
    }),
    tipo_recurso_responsable: Joi.when('recaudo_anticipado', {
        is: true,
        then: Joi.forbidden(),
        otherwise: Joi.number().required().messages(messages('tipo_recurso_responsable')),
    }),
    responsable: Joi.when('recaudo_anticipado', {
        is: true,
        then: Joi.forbidden(),
        otherwise: Joi.string().required().messages(messages('responsable')),
    }),
    valor_recaudo: Joi.number().required().messages(messages('valor_recaudo')),
    medio_pago: Joi.number().required().messages(messages('medio_pago')),
    fecha_hora_accion: Joi.date()
        .format('YYYY-MM-DD HH:mm:ss')
        .raw()
        .required()
        .messages(messages('fecha_hora_accion')),
    tipo_recaudo: Joi.number().required().messages(messages('tipo_recaudo')),
    origen_recaudo: Joi.number().required().messages(messages('origen_recaudo')),
    recaudo_anticipado: Joi.boolean().required().messages(messages('recaudo_anticipado')),
    tipo_recurso_referencias: Joi.number().required().messages(messages('tipo_recurso_referencias')),
    referencias: Joi.array().items(
        Joi.object<IReferenciaIn>({
            referencia: Joi.string().required().messages(messages('referencia')),
            valor: Joi.number().required().messages(messages('valor')),
        }),
    ),
    info_complementaria: Joi.array().items(
        Joi.object<IInfoComplementariaIn>({
            valor: Joi.string().required().messages(messages('valor')),
            tipo: Joi.number().required().messages(messages('tipo')),
        }),
    ),
});
