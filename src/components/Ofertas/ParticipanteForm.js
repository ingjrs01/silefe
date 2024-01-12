import { Liferay } from '../../common/services/liferay/liferay';
import { GenericForm } from '../../includes/GenericForm';

export const form = {
    ...GenericForm,
    title: Liferay.Language.get('Candidato'),
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
        tipoDoc: {
            key:11,
            type: "select",
            label: Liferay.Language.get('TipoDocumento'),
            name: "tipoDoc",
            enabled:true,
            conditions: [],
            options: [],
            className: 'col-2',
            change: () => {console.log("cambiando el tipo de documento")}
        },
        documento: {
            key:12,
            type: "dni",
            label: Liferay.Language.get('Documento'),
            name: "documento",
            value:"documento",
            className: 'col-3',
            enabled:false,
            placeholder: Liferay.Language.get('Documento'),
            conditions: []
        },
        sexo: {
            key:13,
            type: "radio",
            label: Liferay.Language.get('Sexo'),
            name: "sexo",
            change: ()=>{console.log("cambia sexo");},
            className: 'col-3'
            //conditions: []
        },
        nombre: {
            key:3,
            type: "text",
            label: Liferay.Language.get('Nombre'),
            name: "nombre",
            value:"nombre",
            enabled:false,
            placeholder: Liferay.Language.get('Nombre'),
            conditions: ["text"]
        },
        apellido1: {
            key:4,
            type: "text",
            label: Liferay.Language.get('Apellido1'),
            name: "apellido1",
            value:"apellido1",
            placeholder: Liferay.Language.get('Apellido1'),
            conditions: ["text"]
        },
        apellido2: {
            key:5,
            type: "text",
            label: Liferay.Language.get('Apellido2'),
            name: "apellido2",
            value:"apellido2",
            placeholder: Liferay.Language.get('Apellido2'),
            conditions: ["text"]
        },
        fechaNacimiento: {
            key:14,
            type: "date",
            label: Liferay.Language.get('FechaNacimiento'),
            name: "fechaNacimiento",
            value:"",
            yearmin: 110,
            yearmax: 0,
            placeholder:Liferay.Language.get('YYYY-MM-DD'),
            className: 'col-3',
            conditions:[]
        },
        provinciaId: {
            key:15,
            type: "select",
            label: Liferay.Language.get('Provincia'),
            name: "provinciaId",
            value:"",
            enabled:true,
            options: [],
            className: 'col-3',
            conditions: []
        },
        municipioId: {
            key:16,
            type: "select",
            label: Liferay.Language.get('Municipio'),
            name: "municipioId",
            value:"",
            enabled:true,
            options: [],
            className: 'col-3',
            conditions: []
        },
        localidad: {
            key:17,
            type: "text",
            label: Liferay.Language.get('Localidad'),
            name: "Localidad",
            value:"localidad",
            placeholder: Liferay.Language.get('Localidad'),
            className: 'col-6',
            conditions: ["text"]
        },
        tipoviaId: {
            key:6,
            type: "select",
            label: Liferay.Language.get('TipoVia'),
            name: "tipoviaId",
            value:"",
            change: () => {console.log("tipoViaId")},
            enabled:true,
            options: [],
            className: 'col-2',
            conditions: []
        },
        nombreVia: {
            key: 18,
            type: "text",
            label: Liferay.Language.get('NombreVia'),
            name: "nombreVia",
            value:"",
            className: 'col-6',
            placeholder: Liferay.Language.get('NombreVia'),
            conditions: []
        },
        numero: {
            key: 19,
            type: "text",
            label: Liferay.Language.get('Numero'),
            name: "numero",
            value:"",
            placeholder: Liferay.Language.get('Numero'),
            className: 'col-2', 
            conditions: ["number"]
        },
        piso: {
            key: 20,
            type: "text",
            label: Liferay.Language.get('Piso'),
            name: "piso",
            value:"",
            placeholder: Liferay.Language.get('Piso'),
            className: 'col-2',
            conditions: []
        },
        email: {
            key: 22,
            type: "email",
            label: Liferay.Language.get('Email'),
            name: "email",
            values: [],
            placeholder: Liferay.Language.get('Email'),
            conditions: ["text"]
        },
        telefono: {
            key: 23,
            type: "phone",
            label: Liferay.Language.get('Telefono'),
            name: "telefono",
            values: [], 
            placeholder: Liferay.Language.get('Telefono'),
            conditions: ["text"]
        },
        situacionLaboral: {
            key:6,
            type: "select",
            label: Liferay.Language.get('SituacionLaboral'),
            name: "situacionLaboral",
            value:"",
            enabled:true,
            options: [],
            conditions: []
        },
        insercion: {
            key:7,
            type: "toggle",
            label: Liferay.Language.get('Insercion'),
            name: "insercion",
            value:"",
            conditions: []
        },
        busca_empleo: {
            key:8,
            type: "toggle",
            label: Liferay.Language.get('BuscaEmpleo'),
            name: "busca_empleo",
            value:"",
            conditions: []
        },
        autoempleo: {
            key:9,
            type: "toggle",
            label: Liferay.Language.get('Autoempleo'),
            name: "autoempleo",
            value:"",
            conditions: []
        },
        rangoSalarialId: {
            key:10,
            type: "select",
            label: Liferay.Language.get('RangoSalarial'),
            name: "rangoSalarialId",
            value:"",
            enabled:true,
            options: [],
            conditions: []
        },
        jornadaId: {
            key:11,
            type: "select",
            label: Liferay.Language.get('Jornada'),
            name: "jornadaId",
            value:"",
            enabled: true,
            options: [],
            conditions: []
        },
        disponibilidad: {
            key:12,
            type: "toggle",
            label: Liferay.Language.get('Disponibilidad'),
            name: "disponibilidad",
            enabled: true,
            conditions: [],
            change: ()=>{console.log("disponibilidad");},
        },
        estadoParticipacionId: {
            key:27,
            type: "select",
            label: Liferay.Language.get('Estado'),
            name: "estadoParticipacionId",
            value:"",
            enabled:true,
            options: [],
            conditions: [],
            className: "col-3"
        },
        observacionesParticipacion: {
            key: 28,
            type: "text",
            label: Liferay.Language.get('Observaciones'),
            name: "observacionesParticipacion",
            value:"",
            placeholder: Liferay.Language.get('Observaciones'),
            className: 'col-9',
            conditions: []
        }
    },
    rows: [
        {
            key:41,
            cols: ['documento', 'nombre', 'apellido1']
        },
        {
            key:43,
            cols: [ "estadoParticipacionId", "observacionesParticipacion"]
        },
//        {
//            key:44,
//            cols: ['provinciaId', 'municipioId', 'localidad']
//        },
//        {
//            key:45,
//            cols: ['tipoviaId','nombreVia','numero','piso']
//        },
//        {
//            key:46,
//            cols: ['email','telefono']
//        },
//        {
//            key: 48,
//            cols: ['admiteEnvios']
//        },
    ],
    table: [
        {
            columnName: "documento",
            columnTitle: Liferay.Language.get('Documento'),
            columnType: "string",
            key: "tc2",
        },
        {
            columnName: "nombre", 
            columnTitle: Liferay.Language.get('Nombre'),
            columnType: "string",
            key: "tc3",
        },
        {
            columnName: "apellido1", 
            columnTitle: Liferay.Language.get('Apellido1'),
            columnType: "string",
            key: "tc4",
        },
        //provincia: {
        //    columnTitle: Liferay.Language.get('Provincia'),
        //    columnType: "multilang",
        //    key: "tc5",
        //},
        //{
        //    columnName: "localidad", 
        //    columnTitle: Liferay.Language.get('Localidad'),
        //    columnType: "multilang",
        //    key: "tc6",
        //},
        {
            columnName: "telefono", 
            columnTitle: Liferay.Language.get('Teléfono'),
            columnType: "string",
            key: "tc7",
        },
        {
            columnName: "email",
            columnTitle: Liferay.Language.get('Email'),
            columnType: "string",
            key: "tc8",
        },
        {
            columnName: "estadoParticipacionId",
            columnTitle: Liferay.Language.get('Estado'),
            columnType: "select",
            key: "tc9",
        },

    ],
    searchFields: ['nombre', 'documento','apellido1'],
};
