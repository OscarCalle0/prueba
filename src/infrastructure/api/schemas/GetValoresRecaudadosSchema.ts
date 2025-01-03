import JoiImport from 'joi';
import DateExtension from '@joi/date';
const Joi = JoiImport.extend(DateExtension) as typeof JoiImport;
import { messages } from './Messages';
import { IValoresRecaudadosConsulta } from '@application/data/in/IValoresRecaudadosConsulta';

export const GetValoresRecaudadosSchema = Joi.object<IValoresRecaudadosConsulta>({
    id_equipo: Joi.string().required().messages(messages('id_equipo')),
    fecha_inicial: Joi.string().required().messages(messages('fecha_inicial')),
    fecha_final: Joi.string().optional().messages(messages('fecha_final')),
});
