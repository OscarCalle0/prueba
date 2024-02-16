export interface IRecaudosIn {
    recaudo_id: string;
    terminal: number;
    tipo_recurso?: number;
    recurso?: string;
    tipo_recurso_responsable?: number;
    responsable?: string;
    valor_recaudo: number;
    medio_pago: number;
    fecha_hora_accion: string;
    tipo_recaudo: number;
    origen_recaudo: number;
    recaudo_anticipado: boolean;
    tipo_recurso_referencias: number;
    referencias: IReferenciaIn[];
    info_complementaria: IInfoComplementariaIn[];
}

export interface IReferenciaIn {
    referencia: string;
    valor: number;
}

export interface IInfoComplementariaIn {
    valor: string;
    tipo: number;
}
