
- Datos de ejecución

- Formación teórica
    - Impartición
        - ini
        - fin
        - horario mañana
        - horario tarde
        - dias

    - Entidad impartidora
        - empresa
        - tipodocumento
        - documento
        - nombre

    - Lugar de impartición
        - pais, cp, municipio, ...


- Formación práctica

- Formación grupal


SI: formación, autoempleo  1,3

NO: intermediación, orientación  2,4


FormacionAccion
 accionId: long, 
 tipoFormacion: teorica, practica, grupal
 inicio: date
 fin: date
 hIni1: hora
 hFin1
 hIni2: 
 hFin2: 
 dias json
 entidadId: long
 lugarId: long   // Guardar los lugares en otros sitio, para no repetir los datos
 


