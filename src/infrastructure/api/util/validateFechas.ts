export const validateFechas = (fecha_inicial: string, fecha_final: string | null | undefined): boolean => {
    const fechaInicial = new Date(fecha_inicial);
    const fechaFinal = fecha_final ? new Date(fecha_final) : fechaInicial;
    return fechaInicial <= fechaFinal;
};