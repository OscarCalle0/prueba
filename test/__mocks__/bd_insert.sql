INSERT INTO public.tipos_recursos(id_tipo_recurso, descripcion_recursos) VALUES(1, 'Persona');
INSERT INTO public.tipos_recursos(id_tipo_recurso, descripcion_recursos) VALUES(3, 'Responsable');
INSERT INTO public.tipos_recursos(id_tipo_recurso, descripcion_recursos) VALUES(4, 'Guia');
INSERT INTO public.tipos_recursos(id_tipo_recurso, descripcion_recursos) VALUES(2, 'Equipo');
INSERT INTO public.tipos_recursos(id_tipo_recurso, descripcion_recursos) VALUES(6, 'Factura Wompi');



INSERT INTO public.medios_pagos(id_medio_pago, descripcion_medio_pago)VALUES(1, 'Efectivo');
INSERT INTO public.medios_pagos(id_medio_pago, descripcion_medio_pago)VALUES(2, 'Cheque Local');
INSERT INTO public.medios_pagos(id_medio_pago, descripcion_medio_pago)VALUES(4, 'Transferencia Electronica');
INSERT INTO public.medios_pagos(id_medio_pago, descripcion_medio_pago)VALUES(5, 'Tarjeta');
INSERT INTO public.medios_pagos(id_medio_pago, descripcion_medio_pago)VALUES(9, 'PSE');
INSERT INTO public.medios_pagos(id_medio_pago, descripcion_medio_pago)VALUES(10, 'Credito');



INSERT INTO public.tipos_recaudos(id_tipo_recaudo, descripcion_recaudo, is_guia)VALUES('1-7', 'Flete pago internacional', true);
INSERT INTO public.tipos_recaudos(id_tipo_recaudo, descripcion_recaudo, is_guia)VALUES('1-1', 'Flete pago', true);
INSERT INTO public.tipos_recaudos(id_tipo_recaudo, descripcion_recaudo, is_guia)VALUES('1-6', 'Flete contra entrega', true);
INSERT INTO public.tipos_recaudos(id_tipo_recaudo, descripcion_recaudo, is_guia)VALUES('2-22', 'Recaudo Contra Entrega', true);
INSERT INTO public.tipos_recaudos(id_tipo_recaudo, descripcion_recaudo, is_guia)VALUES('2-105', 'Recaudo Contra Entrega Mismo Dia', true);
INSERT INTO public.tipos_recaudos(id_tipo_recaudo, descripcion_recaudo, is_guia)VALUES('2-106', 'Recaudo Contra Entrega AM', true);
INSERT INTO public.tipos_recaudos(id_tipo_recaudo, descripcion_recaudo, is_guia)VALUES('3-1', 'Servicios publicos', false);



INSERT INTO public.tipos_transacciones(id_tipo_transaccion, descripcion_transaccion)VALUES(1, 'Recaudo');
INSERT INTO public.tipos_transacciones(id_tipo_transaccion, descripcion_transaccion)VALUES(2, 'Traslado');
INSERT INTO public.tipos_transacciones(id_tipo_transaccion, descripcion_transaccion)VALUES(3, 'Inconsistencia');
INSERT INTO public.tipos_transacciones(id_tipo_transaccion, descripcion_transaccion)VALUES(4, 'Legalizacion');



INSERT INTO public.recursos(id_recurso, id_tipo_recurso, identificador_recurso) VALUES(1063, 6, '1');