CREATE TABLE public.tipos_recursos (
	id_tipo_recurso serial4 NOT NULL,
	descripcion_recursos varchar(40) NOT NULL,
	CONSTRAINT pk_tipos_recursos PRIMARY KEY (id_tipo_recurso)
);



CREATE TABLE public.tipos_transacciones (
	id_tipo_transaccion serial4 NOT NULL,
	descripcion_transaccion varchar(50) NOT NULL,
	CONSTRAINT pk_tipos_transacciones PRIMARY KEY (id_tipo_transaccion)
);




CREATE TABLE public.medios_pagos (
	id_medio_pago int4 NOT NULL,
	descripcion_medio_pago varchar(40) NOT NULL,
	CONSTRAINT pk_medios_pagos PRIMARY KEY (id_medio_pago)
);



CREATE TABLE public.tipos_recaudos (
	id_tipo_recaudo varchar(10) NOT NULL,
	descripcion_recaudo varchar(40) NOT NULL,
	is_guia bool NOT NULL,
	CONSTRAINT pk_tipos_recaudos PRIMARY KEY (id_tipo_recaudo)
);



CREATE TABLE public.recursos (
	id_recurso serial4 NOT NULL,
	id_tipo_recurso int4 NOT NULL,
	identificador_recurso varchar(50) NOT NULL,
	CONSTRAINT pk_recursos PRIMARY KEY (id_recurso),
	CONSTRAINT uq_tip_iden UNIQUE (identificador_recurso, id_tipo_recurso),
	CONSTRAINT fk_recursos_id_tipo_recurso FOREIGN KEY (id_tipo_recurso) REFERENCES public.tipos_recursos(id_tipo_recurso)
);



CREATE TABLE public.recaudos (
	id_recaudo varchar(40) NOT NULL,
	id_medio_pago int4 NOT NULL,
	fecha_hora_recaudo timestamp NOT NULL,
	valor numeric NOT NULL,
	terminal numeric NOT NULL,
	id_tipo_recaudo varchar(10) NULL,
	id_responsable int4 NOT NULL,
	id_recurso int4 NOT NULL,
	id_tipo_recurso_referencias int4 NOT NULL,
	CONSTRAINT pk_recaudos PRIMARY KEY (id_recaudo),
	CONSTRAINT fk_recaudos_id_tipo_recaudo FOREIGN KEY (id_tipo_recaudo) REFERENCES public.tipos_recaudos(id_tipo_recaudo),
	CONSTRAINT fk_recaudos_id_tipo_recursso FOREIGN KEY (id_tipo_recurso_referencias) REFERENCES public.tipos_recursos(id_tipo_recurso),
	CONSTRAINT fk_recaudos_relations_medios_p FOREIGN KEY (id_medio_pago) REFERENCES public.medios_pagos(id_medio_pago),
	CONSTRAINT fk_recurs_recaudo FOREIGN KEY (id_recurso) REFERENCES public.recursos(id_recurso),
	CONSTRAINT fk_recurs_respon FOREIGN KEY (id_responsable) REFERENCES public.recursos(id_recurso)
);



CREATE TABLE public.recaudos_referencias (
	id_recaudo_referencia serial4 NOT NULL,
	id_recaudo varchar(40) NOT NULL,
	referencia_recaudo varchar(40) NOT NULL,
	valor_recaudo numeric NOT NULL DEFAULT 0,
	CONSTRAINT pk_guias_recaudadas PRIMARY KEY (id_recaudo_referencia),
	CONSTRAINT recaudos_referencias_fk FOREIGN KEY (id_recaudo) REFERENCES public.recaudos(id_recaudo)
);



CREATE TABLE public.recaudos_recursos (
	id_recurso int4 NOT NULL,
	id_recaudo varchar(40) NOT NULL,
	CONSTRAINT pk_com_rec_tr_re PRIMARY KEY (id_recurso, id_recaudo),
	CONSTRAINT fk_recursos_relations_recaudos FOREIGN KEY (id_recaudo) REFERENCES public.recaudos(id_recaudo),
	CONSTRAINT fk_recursos_relations_recursos FOREIGN KEY (id_recurso) REFERENCES public.recursos(id_recurso)
);



CREATE TABLE public.transacciones (
	id_transaccion serial4 NOT NULL,
	id_tipo_transaccion int4 NOT NULL,
	valor_transaccion numeric NOT NULL,
	fecha_hora_transaccion timestamp NOT NULL,
	ingreso_dinero bool NOT NULL,
	id_movimiento varchar(100) NULL,
	CONSTRAINT pk_transacciones PRIMARY KEY (id_transaccion),
	CONSTRAINT fk_transacc_relations_tipos_tr FOREIGN KEY (id_tipo_transaccion) REFERENCES public.tipos_transacciones(id_tipo_transaccion)
);