import { Liferay } from '../../../common/services/liferay/liferay';
import { GenericForm } from '../../../includes/GenericForm';

export const form = {
    ...GenericForm,
    title: Liferay.Language.get('Experiencias'),
    showSearchBar: true,
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
        inicio: {
            key:2,
            type: "date",
            label: Liferay.Language.get('Fecha Inicio'),
            name: "inicio",
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
            conditions:['required']
        },
        tipoContratoId: {
            key:4,
            type: "select",
            label: Liferay.Language.get('TipoContrato'),
            name: "tipoContratoId",
            enabled:true,
            conditions: [],
            options: [{label: "Seleccionar", value: 0}],
            className: 'col-2',
            change: () => {console.log("cambiando el tipo contrato")}
        },
        cif: {
            key:5,
            type: "text",
            label: Liferay.Language.get('CIF'),
            name: "cif",
            value:"",
            placeholder: Liferay.Language.get('cif'),
            conditions: ["text"]
        },
        razonSocial: {
            key:6,
            type: "text",
            label: Liferay.Language.get('Razón Social'),
            name: "razonSocial",
            value:"",
            placeholder: Liferay.Language.get('razonSocial'),
            conditions: ["text"]
        },
        puesto: {
            key:7,
            type: "text",
            label: Liferay.Language.get('Puesto'),
            name: "puesto",
            value:"",
            placeholder: Liferay.Language.get('Puesto'),
            conditions: ["text"]
        },
        ocupacionId: {
            key:8,
            type: "select",
            label: Liferay.Language.get('Ocupacion'),
            name: "ocupacionId",
            value:"",
            enabled:true,
            options: [{label: "Seleccionar", value: 0}],
            className: 'col-3',
            conditions: []
        },
        duracion: {
            key:9,
            type: "text",
            label: Liferay.Language.get('Duración'),
            name: "duracion",
            value:"",
            enabled:true,
            className: 'col-3',
            conditions: []
        },
        motivoBajaId: {
            key:10,
            type: "select",
            label: Liferay.Language.get('MotivoBaja'),
            name: "motivoBajaId",
            value:"",
            enabled:true,
            options: [{label: "Seleccionar", value: 0}],
            className: 'col-3',
            conditions: []
        },
        observaciones: {
            key:11,
            type: "text",
            label: Liferay.Language.get('Observaciones'),
            name: "observaciones",
            value:"",
            enabled:true,
            //className: 'col-2',
            conditions: []
        },
        //tipoExperiencia: {
        //    key:8,
        //    type: "select",
        //    label: Liferay.Language.get('Experiencia'),
        //    name: "tipoExperiencia",
        //    value:"",
        //    enabled:true,
        //    options: [{label: "Seleccionar", value: "0", key:"expt-0"}, {label: "Docencia", value: "1", key:"expt-1"},{label: "Laboral", value: "2", key:"expt-2"}],
        //    className: 'col-3',
        //    conditions: []
        //},
        esFormacion: {
            key: 12,
            type: "toggle",
            label: Liferay.Language.get('Formación'),
            name: "esFormacion",
            value:"",
            options: [],
            change: ()=>{console.log("cambia fondos propios");}
        },
        formacion: {
            key: 13,
            type: "text",
            label: Liferay.Language.get('Formación'),
            name: "formacion",
            value:"",
        },
    },
    rows: [
        {
            key:101,
            cols: ['ini', 'fin','tipoContratoId', 'esFormacion']
        },
        {
            key:102,
            cols: [ 'cif', 'razonSocial', 'puesto']
        },
        {
            key:103,
            cols: ['ocupacionId', 'duracion', 'motivoBajaId']
        },
        {
            key:104,
            cols: ['observaciones']
        },
    ],
    table: [
        //id: {
        //    columnTitle: "Id",
        //    columnType: "checkbox",
        //    key: "tc1",
        //},
        {
            columnName: 'ini',
            columnTitle: Liferay.Language.get('Inicio'),
            columnType: "string",
            key: "tc2",
        },
        {
            columnName: 'fin',
            columnTitle: Liferay.Language.get('Fin'),
            columnType: "string",
            key: "tc3",
        },
        {
            columnName: 'puesto',
            columnTitle: Liferay.Language.get('Puesto'),
            columnType: "string",
            key: "tc4",
        },
        {
            columnName: 'formacion',
            columnTitle: Liferay.Language.get('Formación'),
            columnType: "string",
            key: "tc5",
        },

        //localidad: {
        //    columnTitle: Liferay.Language.get('Localidad'),
        //    columnType: "multilang",
        //    key: "tc6",
        //},
        //telefono: {
        //    columnTitle: Liferay.Language.get('Teléfono'),
        //    columnType: "phone",
        //    key: "tc7",
        //},
        //email: {
        //    columnTitle: Liferay.Language.get('Email'),
        //    columnType: "email",
        //    key: "tc8",
        //},
    ],
    searchFields: ['inicio', 'fin', 'razonSocial','esFormacion','motivoBajaId', 'tipoContratoId'],
    searchField: 'razonSocial',
};
