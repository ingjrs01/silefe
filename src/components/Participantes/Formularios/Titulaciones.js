import { Liferay } from '../../../common/services/liferay/liferay';
import { GenericForm } from '../../../includes/GenericForm';

export const form = {
    ...GenericForm,
    title: Liferay.Language.get('Titulaciones'),
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
        ini: {
            key:2,
            type: "date",
            label: Liferay.Language.get('Fecha Inicio'),
            name: "ini",
            value:"",
            yearmin: 110,
            yearmax: 0,
            placeholder:Liferay.Language.get('YYYY-MM-DD'),
            className: 'col-3',
            conditions:['required']
        },
        fin: {
            key:3,
            type: "date",
            label: Liferay.Language.get('Fecha Fin'),
            name: "fin",
            value:"",
            yearmin: 110,
            yearmax: 0,
            placeholder:Liferay.Language.get('YYYY-MM-DD'),
            className: 'col-3',
            conditions: []
        },
        titulacionTipoId: {
            key:4,
            type: "select",
            label: Liferay.Language.get('Tipo'),
            name: "titulacionTipoId",
            enabled:true,
            conditions: [],
            options: [{label: "Seleccionar", value: 0}],
            className: 'col-2',
            change: () => {console.log("cambiando el tipo contrato")}
        },
        titulacionNivelId: {
            key:5,
            type: "select",
            label: Liferay.Language.get('Nivel'),
            name: "titulacionNivelId",
            enabled:true,
            conditions: [],
            options: [{label: "Seleccionar", value: 0}],
            className: 'col-2',
            change: () => {console.log("cambiando el tipo contrato")}
        },
        titulacionFamiliaId: {
            key:6,
            type: "select",
            label: Liferay.Language.get('Familia'),
            name: "titulacionFamiliaId",
            enabled:true,
            conditions: [],
            options: [{label: "Seleccionar", value: 0}],
            className: 'col-2',
            change: () => {console.log("cambiando el tipo contrato")}
        },
        titulacionId: {
            key:7,
            type: "select",
            label: Liferay.Language.get('Titulación'),
            name: "titulacionId",
            enabled:true,
            conditions: [],
            options: [{label: "Seleccionar", value: 0}],
            className: 'col-2',
            change: () => {console.log("cambiando el tipo contrato")}
        },        
        comentarios: {
            key:8,
            type: "text",
            label: Liferay.Language.get('Comentarios'),
            name: "comentarios",
            value:"",
            enabled:true,
            //className: 'col-2',
            conditions: []
        }
    },
    rows: [
        {
            key:101,
            cols: ['ini', 'fin']
        },
        {
            key:102,
            cols: [ 'titulacionTipoId', 'titulacionNivelId', 'titulacionFamiliaId']
        },
        {
            key:103,
            cols: ['titulacionId']
        },
        {
            key:104,
            cols: ['comentarios']
        },
    ],
    table: {
        id: {
            columnTitle: "Id",
            columnType: "checkbox",
            key: "tc1",
        },
        documento: {
            columnTitle: Liferay.Language.get('Documento'),
            columnType: "dni",
            key: "tc2",
        },
        nombre: {
            columnTitle: Liferay.Language.get('Nombre'),
            columnType: "string",
            key: "tc3",
        },
        apellido1: {
            columnTitle: Liferay.Language.get('Apellido1'),
            columnType: "string",
            key: "tc4",
        },
        //provincia: {
        //    columnTitle: Liferay.Language.get('Provincia'),
        //    columnType: "multilang",
        //    key: "tc5",
        //},
        localidad: {
            columnTitle: Liferay.Language.get('Localidad'),
            columnType: "multilang",
            key: "tc6",
        },
        telefono: {
            columnTitle: Liferay.Language.get('Teléfono'),
            columnType: "phone",
            key: "tc7",
        },
        email: {
            columnTitle: Liferay.Language.get('Email'),
            columnType: "email",
            key: "tc8",
        },
    },
    searchFields: ['nombre', 'documento','apellidos','provinciaId', 'municipio','admiteEnvios'],
    searchField: 'nombre',
};
