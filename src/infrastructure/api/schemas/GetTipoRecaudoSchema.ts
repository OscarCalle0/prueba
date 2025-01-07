import JoiImport from 'joi';
import DateExtension from '@joi/date';
const Joi = JoiImport.extend(DateExtension) as typeof JoiImport;
import { messages } from './Messages';
import { ITipoRecaudoConsulta } from '@application/data/in/ITipoRecaudoConsulta';

export const GetTipoRecaudoSchema = Joi.object<ITipoRecaudoConsulta>({
    id_equipo: Joi.string().required().messages(messages('id_equipo')),
    id_medio_pago: Joi.number().required().messages(messages('id_medio_pago')),
    fecha_inicial: Joi.string().required().messages(messages('fecha_inicial')),
    fecha_final: Joi.string().optional().messages(messages('fecha_final')),
});
