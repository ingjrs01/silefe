import { Liferay } from '../../common/services/liferay/liferay';
import { GenericForm } from "../../includes/GenericForm";

export const form = {
    ...GenericForm,
    title: Liferay.Language.get('Ofertas'),
    fields: {
        id: {
            key:1,
            type: "text",
            label: "ID",
            name: "id",
            value:"",
            placeholder:"Identifier",
            conditions: ["number"]
        },
        titulo: {
            key:2,
            type: "multilang",
            label: Liferay.Language.get('Titulo'),
            name: "titulo",
            value:"titulo",
            placeholder:Liferay.Language.get('Titulo'),
            conditions:["text"],
            className: 'col-6',
        },
        empresaId: {
            key: 3,
            type: "select",
            label: Liferay.Language.get('Empresa'),
            name: "empresaId",
            enabled:true,
            options: [],
            change: ()=>{console.log("cambia el select");}
        },
        centroId: {
            key: 4,
            type: "select",
            label: Liferay.Language.get('Centro'),
            name: "centroId",
            enabled:true,
            options: [],
            change: ()=>{console.log("cambia el select");}
        },
        puestoId: {
            key: 5,
            type: "selectfilter",
            label: Liferay.Language.get('Puesto'),
            name: "puestoId",
            enabled:true,
            options: [],
            change: ()=>{console.log("cambia el select");},
            className: 'col-3',
        },
        puesto: {
            key: 33,
            type: "text",
            label: Liferay.Language.get('Puesto'),
            name: "puesto",
            enabled:true,
            conditions: [],
        },
        proyectoId: {
            key: 30,
            type: "select",
            label: Liferay.Language.get('Proyecto'),
            name: "proyectoId",
            enabled:true,
            options: [],
            change: ()=>{console.log("cambia el select");},
            className: 'col-4',
            conditions: ["required"]
        },
        cnaeId: {
            key: 7,
            type: "selectfilter",
            label: Liferay.Language.get('Cnae'),
            name: "cnaeId",
            enabled:true,
            options: [],
            change: ()=>{console.log("cambia el select");},
            className: 'col-3',
        },
        vacantes: {
            key:8,
            type: "number",
            label: Liferay.Language.get('Vacantes'),
            value: "0",
            min: 1,
            name: "vacantes",
            placeholder: "0",
            conditions:["number"],
            className: 'col-2',
        },
        fechaIncorporacion: {
            key:9,
            type: "date",
            label: Liferay.Language.get('Incorporacion'),
            name: "fechaIncorporacion",
            value:"yyyy-mm-dd",
            yearmin: 10,
            yearmax: 8,
            placeholder:Liferay.Language.get('YYYY-MM-DD'),
            conditions:[],
            className: 'col-3',
        },
        tipoContratoId: {
            key: 10,
            type: "select",
            label: Liferay.Language.get('TipoContrato'),
            name: "tipoContratoId",
            enabled:true,
            options: [],
            change: ()=>{console.log("cambia el select");},
            className: 'col-3'
        },
        duracionMeses: {
            key:11,
            type: "number",
            label: Liferay.Language.get('Duracion'),
            name: "duracionMeses",
            placeholder: "0",
            min: 0,
            conditions:["number"],
            className: 'col-2',
        },
        jornadaId: {
            key: 12,
            type: "select",
            label: Liferay.Language.get('Jornada'),
            name: "jornadaId",
            enabled:true,
            options: [],
            change: ()=>{console.log("cambia el select");},
            className: 'col-3',
            conditions: ['required'],
        },
        infoJornada: {
            key: 13,
            type: "textarea",
            label: Liferay.Language.get('InfoJornada'),
            name: "infoJornada",
            className: 'col-9',
            conditions:[]
        },
        infoColectivos: {
            key: 14,
            type: "text",
            label: Liferay.Language.get('InfoColectivos'),
            name: "infoColectivos",
            placeholder: "",
            conditions:["text"],
            validate: false,
        },
        tareas: {
            key: 15,
            type: "textarea",
            label: Liferay.Language.get('Tareas'),
            name: "tareas",
            placeholder: "",
            conditions:[]
        },
        titulacionRequerido: {
            key: 16,
            type: "select",
            label: Liferay.Language.get('Titulacion'),
            name: "titulacionRequerido",
            enabled:true,
            options: [],
            change: ()=>{console.log("cambia el select");}
        },
        idiomasRequerido: {
            key: 17,
            type: "select",
            label: Liferay.Language.get('Idiomas'),
            name: "idiomasRequerido",
            enabled:true,
            options: [],
            change: ()=>{console.log("cambia el select");}
        },
        informaticaRequerido: {
            key: 18,
            type: "select",
            label: Liferay.Language.get('Informatica'),
            name: "informaticaRequerido",
            enabled:true,
            options: [],
            change: ()=>{console.log("cambia el select");}
        },
        experienciaRequerido: {
            key: 19,
            type: "select",
            label: Liferay.Language.get('Experiencia'),
            name: "experienciaRequerido",
            enabled:true,
            options: [],
            change: ()=>{console.log("cambia el select");}
        },
        permisos: {
            key: 20,
            type: "multilist",
            label: Liferay.Language.get('Permisos'),
            name: "permisos",
            placeholder: "",
            enabled: true,
            options: [],
            conditions:["text"]
        },
        vehiculo: {
            key: 21,
            type: "toggle",
            label: Liferay.Language.get('Vehiculo'),
            name: "vehiculo",
            value:"",
            options: [],
            change: ()=>{console.log("cambia fondos propios");}
        },
        necesitaVehiculo: {
            key: 22,
            type: "toggle",
            label: Liferay.Language.get('NecesitaVehiculo'),
            name: "necesitaVehiculo",
            value:"",
            options: [],
            change: ()=>{console.log("cambia fondos propios");}
        },
        generoId: {
            key: 23,
            type: "select",
            label: Liferay.Language.get('Genero'),
            name: "generoId",
            value:"",
            enabled:true,
            options: [],
            change: ()=>{console.log("cambia el select");}
        },
        edadId: {
            key: 24,
            type: "select",
            label: Liferay.Language.get('Edad'),
            name: "edadId",
            value:"",
            enabled:true,
            options: [],
            change: ()=>{console.log("cambia el select");}
        },
        habilidades: {
            key: 25,
            type: "text",
            label: Liferay.Language.get('Habilidades'),
            name: "habilidades",
            value:"",
            enabled:true,
            conditions: []
        },
        estadoId: {
            key: 26,
            type: "select",
            label: Liferay.Language.get('Estado'),
            name: "estadoId",
            value:"",
            enabled:true,
            options: [],
            change: ()=>{console.log("cambia el select");}
        },
        salarioId: {
            key: 36,
            type: "select",
            label: Liferay.Language.get('Salario'),
            name: "salarioId",
            value:"",
            enabled:true,
            options: [],
            className: 'col-3',
            change: ()=>{console.log("cambia el select");},
        },
        infoSalario: {
            key: 37,
            type: "textarea",
            label: Liferay.Language.get('Info Salario'),
            name: "infoSalario",
            value:"",
            //enabled:true,
            className: 'col-9',
            placeholder:Liferay.Language.get('Comentarios'),
            conditions:[]
        },
        estado: {
            key: 32,
            type: "text",
            label: Liferay.Language.get('Estado'),
            name: "estado",
            value:"",
            enabled:true,
            conditions: []
        },
        observaciones: {
            key: 27,
            type: "textarea",
            label: Liferay.Language.get('Observaciones'),
            name: "observaciones",
            value:"",
            enabled:true,
            conditions: []
        },
        //colectivos: {
        //    key: 28,
        //    type: "multilist",
        //    label: Liferay.Language.get("Colectivos"),
        //    name: 'colectivos',
        //    placeholder: 'lalala',
        //    options: [],
        //    enabled: true
        //},
        objetivos: {
            key: 29,
            type: "textarea",
            label: Liferay.Language.get('Objetivos'),
            name: "objetivos",
            value:"lelele",
            placeholder:Liferay.Language.get('Objetivos'),
            conditions:[]
        },
        participantes: {
            key: 31,
            type: "other",
            componentName: "DoubleTable",
            name: "participantes",
        },
        empresa: {
            key: 34,
            type: "text",
            label: Liferay.Language.get('Empresa'),
            name: "empresa",
            value:"lelele",
            enabled:true,
            conditions: [],
        },
        centro: {
            key: 35,
            type: "text",
            label: Liferay.Language.get('Centro'),
            name: "centro",
            value:"lelele",
            enabled:true,
            conditions: [],
        },
        colectivos: {
            key: 38,
            type: "doublelist",
            label: Liferay.Language.get('Colectivos'),
            name: "colectivos",
            value:"",
            enabled:true,
            className: 'col-12',
            placeholder:Liferay.Language.get('Comentarios'),
            options: []
        },
        historico: {
            key: 39,
            type: "other",
            componentName: "Historico",
            name: "historico",
        },


    },
    tabActive:0,
    tabs: [
        {
            caption: "Datos",
            key: 1,
            ariacontrols: "tabpanel-1",
            rows: [
                {
                    key:40,
                    cols: ['titulo', 'proyectoId']
                },
                {
                    key:41,
                    cols: ['jornadaId','infoJornada']
                },
                {
                    key:44,
                    cols: ['salarioId','infoSalario']
                },
                {
                    key:42,
                    cols: [  'empresaId','centroId','duracionMeses', 'vacantes']
                },
                {
                    key:43,
                    cols: ['puestoId','cnaeId', 'tipoContratoId','fechaIncorporacion']
                },
                {
                    key:46,
                    cols: ['colectivos']
                },
                {
                    key:45,
                    cols: ['tareas']
                    
                },
            ]
        },
        {
            caption: "Requisitos",
            key: 2,
            ariacontrols: "tabpanel-2",
            rows: [
                {
                    key: 51,
                    cols: ['titulacionRequerido','idiomasRequerido','informaticaRequerido','experienciaRequerido']
                },
                {
                    key: 52,
                    cols: ['permisos','vehiculo','necesitaVehiculo']
                },
                {
                    key: 53,
                    cols: ['generoId','edadId']
                },
                {
                    key: 54,
                    cols: ['habilidades']
                },
            ]
        },
        {
            caption: Liferay.Language.get("Candidatos"),
            key: 3,
            ariacontrols: "tabpanel-3",
            rows: [
                {
                    key: 61,
                    cols: ['participantes']
                },
            ]
        },
        {
            caption: Liferay.Language.get("Estado"),
            key: 4,
            ariacontrols: "tabpanel-4",
            rows: [
                {
                    key: 71,
                    cols: ['estadoId']
                },
                {
                    key: 72,
                    cols: ['observaciones']
                },
            ]
        },
        {
            caption: Liferay.Language.get("Histórico"),
            key: 5,
            ariacontrols: "tabpanel-5",
            admin: true,
            rows: [
                {
                    key: 81,
                    cols: ['historico']
                },
            ]
        },
    ],
    table: {
        id: {
            columnTitle: "Id",
            columnType: "checkbox",
            key: "c1",
        },
        titulo: {
            columnTitle: Liferay.Language.get('titulo'),
            columnType: "multilang",
            key: "c2",
        },
        puesto: {
            columnTitle: Liferay.Language.get('Puesto'),
            columnType: "multilang",
            key: "c3",
        },
        empresa: {
            columnTitle: Liferay.Language.get('Empresa'),
            columnType: "string",
            key: "c4",
        },
        centro: {
            columnTitle: Liferay.Language.get('Centro'),
            columnType: "string",
            key: "c5",
        },
        fechaIncorporacion: {
            columnTitle: Liferay.Language.get('Incorporación'),
            columnType: "string",
            key: "c6",
        },
        estado: {
            columnTitle: Liferay.Language.get('Estado'),
            columnType: "multilang",
            key: "c7",
        },
        //createDate: {
        //    columnTitle: Liferay.Language.get('Fecha'),
        //    columnType: "string",
        //    key: "c8",
        //},
        
    },
    searchFields: ['titulo','estadoId','puesto','empresa','proyectoId','jornadaId','salarioId'],
    searchField: 'titulo',
};
