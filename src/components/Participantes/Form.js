import { Liferay } from '../../common/services/liferay/liferay';
import { GenericForm } from '../../includes/GenericForm';

export const form = {
    ...GenericForm,
    title: Liferay.Language.get('Participantes'),
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
            className: 'col-2',
            placeholder: Liferay.Language.get('Documento'),
            conditions: []
        },
        sexo: {
            key:13,
            type: "radio",
            label: Liferay.Language.get('Sexo'),
            name: "sexo",
            change: ()=>{console.log("cambia sexo");},
            className: 'col-2'
            //conditions: []
        },
        nombre: {
            key:3,
            type: "text",
            label: Liferay.Language.get('Nombre'),
            name: "nombre",
            value:"nombre",
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
        admiteEnvios: {
            key:24,
            type: "toggle",
            label: Liferay.Language.get('Envios'),
            name: "admiteEnvios",
            enabled: true,
            change: ()=>{console.log("admiteEnvios");},
            className: 'col-2'
        },
        colectivos: {
            key: 27,
            type: "doublelist",
            label: Liferay.Language.get("Colectivos"),
            name: 'colectivos',
            options: [],
            enabled: true,
            className: 'col-12',
        },
        carnets: {
            key: 28,
            type: "doublelist",
            label: Liferay.Language.get("Carnets"),
            name: 'carnets',
            options: [],
            enabled: true,
            className: 'col-12',
        },
        titulaciones: {
            key: 25,
            type: "other",
            componentName: "Titulaciones",
            name: "Titulaciones",
        },        
        experiencias: {
            key: 26,
            type: "other",
            componentName: "Experiencias",
            name: "Experiencias",
        },        
        vehiculoPropio: {
            key:29,
            type: "toggle",
            label: Liferay.Language.get('Vehículo propio'),
            name: "vehiculoPropio",
            enabled: true,
            change: ()=>{console.log("vehiculo");},
            className: 'col-3'
        },
        cargasFamiliares: {
            key:30,
            type: "toggle",
            label: Liferay.Language.get('Cargas Familiares'),
            name: "cargasFamiliares",
            enabled: true,
            change: ()=>{console.log("cargas");},
            className: 'col-3'
        },
        discapacidad: {
            key:31,
            type: "toggle",
            label: Liferay.Language.get('Discapacidad'),
            name: "discapacidad",
            enabled: true,
            change: ()=>{console.log("discapacidad");},
            className: 'col-3'
        },
		tipoDiscapacidad: {
            key:32,
            type: "select",
            label: Liferay.Language.get('TipoDiscapacidad'),
            name: "tipoDiscapacidad",
            value:"",
            enabled: true,
            options: [],
            conditions: [],
            className: 'col-3',
        },
		porcentajeDiscapacidad: {
            key:33,
            type: "select",
            label: Liferay.Language.get('Porcentaje Discapacidad'),
            name: "porcentajeDiscapacidad",
            value:"",
            enabled: true,
            options: [],
            conditions: [],
            className: 'col-3',
        },
		tratamiento: {
            key: 34,
            type: "text",
            label: Liferay.Language.get('Tratamiento'),
            name: "tratamiento",
            value:"",
            placeholder: Liferay.Language.get('Tratamiento'),
            className: 'col-6',
            conditions: []
        },
		incompatibilidades: {
            key: 35,
            type: "text",
            label: Liferay.Language.get('Incompatibilidades'),
            name: "incompatibilidades",
            value:"",
            placeholder: Liferay.Language.get('Incompatibilidades'),
            className: 'col-12',
            conditions: []
        },
		adaptaciones: {
            key: 36,
            type: "text",
            label: Liferay.Language.get('Adaptaciones'),
            name: "adaptaciones",
            value:"",
            placeholder: Liferay.Language.get('Adaptaciones'),
            className: 'col-12',
            conditions: []
        },
		percibePrestacion: {
            key:37,
            type: "toggle",
            label: Liferay.Language.get('Percibe Prestacion'),
            name: "percibePrestacion",
            enabled: true,
            change: ()=>{console.log("percibePrestacion");},
            className: 'col-3'
        },
		prestaciones: {
            key: 28,
            type: "doublelist",
            label: Liferay.Language.get("Prestaciones"),
            name: 'prestaciones',
            options: [],
            enabled: true,
            className: 'col-12',
        },
        citas: {
            key: 38,
            type: "other",
            componentName: "Citas",
            name: "Citas",
        },        
        participaciones: {
            key: 39,
            type: "other",
            componentName: "Participaciones",
            name: "Participaciones",
        },
        historico: {
            key: 40,
            type: "other",
            componentName: "Historico",
            name: "Historico",
        },
        apellidos: {
            key:41,
            type: "text",
            label: Liferay.Language.get('Apellidos'),
            name: "apellidos",
            value:"apellidos",
            placeholder: Liferay.Language.get('Apellidos'),
        },
        loadCividas: {
            key:42,
            type: "button",
            label: Liferay.Language.get('Cividas'),
            name: "loadCividas",            
            onclick: ()=>{console.log("click en botón")},
        },
        municipio: {
            key:43,
            type: "text",
            label: Liferay.Language.get('Municipio'),
            name: "municipio",
            value:"",
            enabled:true,
            className: 'col-5',
            conditions: []
        },

    },
    tabActive:0,
    tabs : [
        {
            caption: "Datos",
            key: 1,
            ariacontrols: "tabpanel-1",
            rows: [
                {
                    key:1041,
                    cols: ['tipoDoc','documento', 'fechaNacimiento', 'sexo', 'admiteEnvios', 'loadCividas']
                },
                {
                    key:1043,
                    cols: ['nombre','apellido1','apellido2']
                },
                {
                    key:1044,
                    cols: ['provinciaId', 'municipioId', 'localidad']
                },
                {
                    key:1045,
                    cols: ['tipoviaId','nombreVia','numero','piso']
                },
                {
                    key:1046,
                    cols: ['email','telefono']
                },
                {
                    key: 1048,
                    cols: ['carnets']
                },
                {
                    key: 1049,
                    cols: ['vehiculoPropio', 'cargasFamiliares', 'discapacidad', 'percibePrestacion']
                },
                {
                    key: 1051,
                    cols: ['tipoDiscapacidad', 'porcentajeDiscapacidad', 'tratamiento']
                },
                {
                    key: 1052,
                    cols: ['incompatibilidades', 'adaptaciones']
                },
                {
                    key: 1054,
                    cols: ['prestaciones']
                },
                {
                    key: 1050,
                    cols: ['colectivos']
                },

            ]
        },
        {
            caption: "Empleabilidad",
            key:2,
            ariacontrols: "tabpanel-2",
            rows: [
                {
                    key:101,
                    cols: ['situacionLaboral','insercion','busca_empleo']
                },
                {
                    key:102,
                    cols: ['autoempleo','rangoSalarialId','jornadaId']
                },
                {
                    key:103,
                    cols: ['disponibilidad']
                },
            ]
        },
        {
            caption: Liferay.Language.get("Titulaciones"),
            key:3,
            ariacontrols: "tabpanel-3",
            rows: [
                {
                    key:201,
                    cols: ['titulaciones'],
                },
            ]
        },
        {
            caption: Liferay.Language.get("Experiencias"),
            key:4,
            ariacontrols: "tabpanel-4",
            rows: [
                {
                    key:301,
                    cols: ['experiencias']
                },
            ]
        },
        {
            caption: Liferay.Language.get("Citas"),
            key:5,
            ariacontrols: "tabpanel-5",
            rows: [
                {
                    key:401,
                    cols: ['citas']
                },
            ]
        },
        {
            caption: Liferay.Language.get("Participaciones"),
            key:6,
            ariacontrols: "tabpanel-6",
            rows: [
                {
                    key:501,
                    cols: ['participaciones']
                },
            ]
        },
        {
            caption: Liferay.Language.get("Histórico"),
            key:7,
            ariacontrols: "tabpanel-7",
            admin: true,
            rows: [
                {
                    key:601,
                    cols: ['historico']
                },
            ]
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
