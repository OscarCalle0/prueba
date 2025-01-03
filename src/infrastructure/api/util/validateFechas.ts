import { IValoresRecaudadosConsulta } from '@application/data/in/IValoresRecaudadosConsulta';
export const validateFechas = (data: IValoresRecaudadosConsulta): boolean => {
    const fechaInicial = new Date(data.fecha_inicial);
    const fechaFinal = data.fecha_final ? new Date(data.fecha_final) : fechaInicial;

    return fechaInicial <= fechaFinal;
};
