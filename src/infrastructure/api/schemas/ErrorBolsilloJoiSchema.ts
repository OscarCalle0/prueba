import JoiImport from 'joi';
import DateExtension from '@joi/date';
const Joi = JoiImport.extend(DateExtension) as typeof JoiImport;
import { messages } from './Messages';
import { IErrorBolsilloDataIn } from '@application/data/in/IErrorBolsilloDataIn';

export const ErrorBolsilloJoiSchema = Joi.object<IErrorBolsilloDataIn>({
    id_transaccion: Joi.number().required().messages(messages('id_transaccion')),
    operacion: Joi.string().required().messages(messages('operacion')),
});
