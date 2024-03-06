import { Liferay } from '../../common/services/liferay/liferay';
import { GenericForm } from '../../includes/GenericForm';

export const form = {
    ...GenericForm,
    title: Liferay.Language.get('Ejecucion'),
    fields: {
        id: {
            key:1,
            type: "text",
            label: "ID",
            name: "id",
            value:"lalala",
            placeholder:"Identifier",
            conditions: ["number"]
        },
        accionId: {
            key:6,
            type: "text",
            label: "accion",
            name: "id",
            value:"lalala",
        },
        accionTipoId : {
            key:2,
            type: "select",
            label: Liferay.Language.get('Tipo'),
            name: "accionTipoId",
            enabled:true,
            conditions: [],
            options: []
        },
        accionTipoFormacionId : {
            key:3,
            type: "select",
            label: Liferay.Language.get('TipoFormación'),
            name: "accionTipoFormacionId",
            enabled:true,
            conditions: [],
            options: []
        },
        empresaId: {
            key:4,
            type: "select",
            label: Liferay.Language.get('Empresa'),
            name: "empresaId",
            value: 0,
            options: [],
            enabled:true,
        },
        lugarId: {
            key:5,
            type: "select",
            label: Liferay.Language.get('Lugar'),
            name: "lugarId",
            value: 0,
            options: [],
            enabled:true,
        },
        inicio: {
            key:7,
            type: "date",
            label: Liferay.Language.get('FechaInicio'),
            name: "inicio",
            value:"",
            yearmin: 110,
            yearmax: 0,
            placeholder:Liferay.Language.get('YYYY-MM-DD'),
            className: 'col-3',
            conditions:['date', 'required']
        },
        fin: {
            key:8,
            type: "date",
            label: Liferay.Language.get('FechaFin'),
            name: "fin",
            value:"",
            yearmin: 110,
            yearmax: 0,
            placeholder:Liferay.Language.get('YYYY-MM-DD'),
            className: 'col-3',
            conditions:['date', 'required']
        },
        hIni1: {
            key: 21,  
            type: "hour",
            label: Liferay.Language.get('Hora Inicio M.'),
            name: "hIni1",
            value:"",
            placeholder:Liferay.Language.get('YYYY-MM-DD'), 
            className: 'col-2',
            conditions:[] 
        },
        hFin1: {
            key: 22,  
            type: "hour",
            label: Liferay.Language.get('Hora Fin M.'),
            name: "hFin1",
            value:"",
            placeholder:Liferay.Language.get('YYYY-MM-DD'), 
            className: 'col-2',
            conditions:[] 
        },
        hIni2: {
            key: 23,  
            type: "hour",
            label: Liferay.Language.get('Hora Inicio T.'),
            name: "hIni2",
            value:"",
            placeholder:Liferay.Language.get('YYYY-MM-DD'), 
            className: 'col-2',
            conditions:[] 
        },
        hFin2: {
            key: 24,  
            type: "hour",
            label: Liferay.Language.get('Hora Fin T.'),
            name: "hFin2",
            value:"",
            placeholder:Liferay.Language.get('YYYY-MM-DD'), 
            className: 'col-2',
            conditions:[] 
        }, 
    },
    rows: [
        {
            key:9,
            cols: ['id']
        },
        {
            key:8,
            cols: ['accionTipoId', 'nombre'],
        },
        {
            key:10,
            cols: ['accionTipoFormacionId', 'teorica', 'practica', 'grupal'],
        },
        {
            key:11,
            cols: ['horas'],
        },
        {
            key:12,
            cols: ['tecnicoId'],
        },
    ],
    table: {
        id: {
            columnTitle: "Id",
            columnType: "checkbox",
            key: "c1",
        },
//        acctionTipo: {
//            columnTitle: Liferay.Language.get('Tipo'),
//            columnType: "string",
//            key: "c2",
//        },
        tipo: {
            columnTitle: Liferay.Language.get('Tipo'),
            columnType: "multilang",
            key: "c4",
        },
        nombre: {
            columnTitle: Liferay.Language.get('Nombre'),
            columnType: "multilang",
            key: "c3",
        },
        formacion: {
            columnTitle: Liferay.Language.get('Formacion'),
            columnType: "multilang",
            key: "c9",
        },
        teorica: {
            columnTitle: Liferay.Language.get('Teórica'),
            columnType: "boolean",
            key: "c5",
        },
        practica: {
            columnTitle: Liferay.Language.get('Práctica'),
            columnType: "boolean",
            key: "c6",
        },
        grupal: {
            columnTitle: Liferay.Language.get('Grupal'),
            columnType: "boolean",
            key: "c7",
        },
        horas: {
            columnTitle: Liferay.Language.get('Horas'),
            columnType: "string",
            key: "c8",
        },
    },
    searchFields: ['accionTipoId','nombre','accionTipoFormacionId'],
};
