export interface ITipoRecaudoConsulta {
    id_equipo: string;
    id_medio_pago: string;
    fecha_inicial: string;
    fecha_final?: string | null;
}
