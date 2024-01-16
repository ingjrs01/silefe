import { Liferay } from '../../common/services/liferay/liferay';
import { GenericForm } from '../../includes/GenericForm';

export const form = {
    ...GenericForm,
    title: Liferay.Language.get('Docentes'),
    fields: {
        id: {
            key:1,
            type: "text",
            label: "ID",
            name: "id",
            value:"lalala",
            placeholder:"Identifier",
            conditions: ["number"],
            validate: false,
        },
        documento: {
            key:5,
            type: "dni",
            label: "Documento",
            name: "documento",
            value:"",
            placeholder:"",
            conditions: ["text"],
            className: "col-2",
        },
        nombre: {
            key:2,
            type: "text",
            label: "Nombre",
            name: "nombre",
            value:"lalala",
            placeholder:"Nombre",
            conditions: ["text"],
        },
        apellido1: {
            key:3,
            type: "text",
            label: "Apellido 1",
            name: "apellido1",
            value:"lalala",
            placeholder:"",
            conditions: ["text"],
            className: "col-3",
        },
        apellido2: {
            key:4,
            type: "text",
            label: "Apellido 2",
            name: "apellido2",
            value:"lalala",
            placeholder:"",
            conditions: ["text"],
            className: "col-3"
        },
        fechaNacimiento: {
            key:12,
            type: "date",
            label: Liferay.Language.get('FechaNacimiento'),
            name: "fechaNacimiento",
            value:"",
            yearmin: 110,
            yearmax: 15,
            placeholder:Liferay.Language.get('YYYY-MM-DD'),
            conditions:['required'],
            className: 'col-3'
        },
        numero: {
            key:8,
            type: "text",
            label: "Número",
            name: "numero",
            value:"",
            placeholder:"",
            conditions: [],
            className: "col-2"
        },
        piso: {
            key:9,
            type: "text",
            label: "Piso",
            name: "piso",
            value:"",
            placeholder:"",
            conditions: [],
            className: "col-2",
        },
        tipoDoc: {
            key:10,
            type: "select",
            label: Liferay.Language.get('TipoDocumento'),
            name: "tipoDoc",
            enabled:true,
            conditions: [],
            change: () => {console.log("cambiando el tipo de documento")},
            className: 'col-2',
        },
        sexo: {
            key:11,
            type: "radio",
            label: Liferay.Language.get('Sexo'),
            name: "sexo",
            change: ()=>{console.log("cambia sexo");},
            className: 'col-3'
        },
        provinciaId: {
            key:13,
            type: "select",
            label: Liferay.Language.get('Provincia'),
            name: "provinciaId",
            value:"",
            enabled:true,
            options: [],
            conditions: [],
            className: "col-3",
        },
        municipioId: {
            key:14,
            type: "select",//"autocomplete",
            label: Liferay.Language.get('Municipio'),
            name: "municipioId",
            value:"",
            enabled:true,
            options: [],
            conditions: []
        },
        localidad: {
            key:15,
            type: "text",
            label: Liferay.Language.get('Localidad'),
            name: "Localidad",
            value:"localidad",
            placeholder: Liferay.Language.get('Localidad'),
            conditions: ["text"],
            validate: false,
        },
        tipoviaId: {
            key:16,
            type: "select",
            label: Liferay.Language.get('TipoVia'),
            name: "tipoviaId",
            value:"",
            change: () => {console.log("tipoViaId")},
            enabled:true,
            options: [],
            conditions: []
        },
        cpostal: {
            key:6,
            type: "text",
            label: "Código Postal",
            name: "cpostal",
            value:"",
            placeholder:"",
            conditions: ["text"],
            validate: false,
        },
        nombreVia: {
            key:7,
            type: "text",
            label: "Via",
            name: "nombreVia",
            value:"",
            placeholder:"",
            conditions: ["text"],
            className: "col-4",
        },
        email: {
            key: 17,
            type: "email",
            label: Liferay.Language.get('Email'),
            name: "email",
            values: [],
            placeholder: Liferay.Language.get('Email'),
            conditions: ["text"]
        },
        telefono: {
            key: 18,
            type: "phone",
            label: Liferay.Language.get('Telefono'),
            name: "telefono",
            values: [ ],
            placeholder: Liferay.Language.get('Telefono'),
            conditions: ["text"]
        },
    },
    rows: [
        {
            key:41,
            cols: ['tipoDoc', 'documento','nombre','apellido1'],
        },
        {
            key:43,
            cols: ['apellido2','fechaNacimiento', 'sexo','provinciaId'],
        },
        {
            key:44,
            cols: [  'municipioId','tipoviaId','nombreVia','numero','piso']
        },
        {
            key:46,
            cols: ['email','telefono']
        },
],
    table: [
        //{
        //    columnName: "id", 
        //    columnTitle: "Id",
        //    columnType: "checkbox",
        //    key: "c1",
        //},
        {
            columnName: "documento", 
            columnTitle: Liferay.Language.get('Documento'),
            columnType: "string",
            key: "c2",
        },
        {
            columnName: "nombre",
            columnTitle: Liferay.Language.get('Nombre'),
            columnType: "string",
            key: "c3",
        },
        {
            columnName: "apellidos", 
            columnTitle: Liferay.Language.get("Apellidos"),
            columnType: "string",
            key: "c4",
        },
        {
            columnName: "telefono",
            columnTitle: Liferay.Language.get("Telefono"),
            columnType: "string",
            key: "c5",
        },
        //{
        //    columnName: "provincia",
        //    columnTitle: Liferay.Language.get("Provincia"),
        //    columnType: "multilang",
        //    key: "c6",
        //},
        //{
        //    columnName: "localidad", 
        //    columnTitle: Liferay.Language.get("Localidad"),
        //    columnType: "multilang",
        //    key: "c7",
        //}
    ],
    searchFields: ['nombre', 'documento','apellido1','provinciaId', 'municipioId'],
    searchField: 'nombre',
    searchFieldsMain: ['nombre', 'documento','apellido1','provinciaId', 'municipioId'],
    searchFieldMain: 'nombre',
};
