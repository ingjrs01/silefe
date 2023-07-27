export const form = {
    title: Liferay.Language.get('Ofertas'),
    languages: ["es-ES","en-US","gl-ES"],
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
        titulo: {
            key:2,
            type: "multilang",
            label: Liferay.Language.get('Titulo'), 
            name: "titulo", 
            value:"titulo", 
            placeholder:Liferay.Language.get('Titulo'),
            conditions:["text"]
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
            type: "select",
            label: Liferay.Language.get('Puesto'), 
            name: "puestoId", 
            enabled:true,
            options: [],
            change: ()=>{console.log("cambia el select");}
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
            change: ()=>{console.log("cambia el select");}
        },
        cnaeId: {
            key: 7,
            type: "select",
            label: Liferay.Language.get('Cnae'), 
            name: "cnaeId", 
            enabled:true,
            options: [],
            change: ()=>{console.log("cambia el select");}
        },
        vacantes: {
            key:8,
            type: "text",
            label: Liferay.Language.get('Vacantes'), 
            value: "0",
            name: "vacantes", 
            placeholder: "0",
            conditions:["number"]
        },
        fechaIncorporacion: {
            key:9,
            type: "date",
            label: Liferay.Language.get('Incorporacion'), 
            name: "fechaIncorporacion", 
            value:"yyyy-mm-dd", 
            //value: null,
            yearmin: 5,
            yearmax: 5,
            placeholder:Liferay.Language.get('YYYY-MM-DD'),
            conditions:[]
        },
        tipoContratoId: {
            key: 10,
            type: "select",
            label: Liferay.Language.get('TipoContrato'), 
            name: "tipoContratoId", 
            enabled:true,
            options: [],
            change: ()=>{console.log("cambia el select");}
        },
        duracionMeses: {
            key:11,
            type: "text",
            label: Liferay.Language.get('Duracion'), 
            name: "duracionMeses", 
            placeholder: "0",
            conditions:["number"]
        },
        jornadaId: {
            key: 12,
            type: "select",
            label: Liferay.Language.get('Jornada'), 
            name: "jornadaId", 
            enabled:true,
            options: [],
            change: ()=>{console.log("cambia el select");}
        },
        infoJornada: {
            key: 13,
            type: "text",
            label: Liferay.Language.get('InfoJornada'), 
            name: "infoJornada", 
            placeholder: "",
            conditions:["text"]
        },
        infoColectivos: {
            key: 14,
            type: "text",
            label: Liferay.Language.get('InfoColectivos'), 
            name: "infoJornada", 
            placeholder: "",
            conditions:["text"]
        },
        tareas: {
            key: 15,
            type: "text",
            label: Liferay.Language.get('Tareas'), 
            name: "tareas", 
            placeholder: "",
            conditions:["text"]
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
            value:"lelele", 
            options: [],
            change: ()=>{console.log("cambia fondos propios");}
        },
        necesitaVehiculo: {
            key: 22,
            type: "toggle",
            label: Liferay.Language.get('NecesitaVehiculo'), 
            name: "necesitaVehiculo", 
            value:"lelele", 
            options: [],
            change: ()=>{console.log("cambia fondos propios");}
        },
        generoId: {
            key: 23,
            type: "select",
            label: Liferay.Language.get('Genero'), 
            name: "generoId", 
            value:"lelele", 
            enabled:true,
            options: [],
            change: ()=>{console.log("cambia el select");}
        },
        edadId: {
            key: 24,
            type: "select",
            label: Liferay.Language.get('Edad'), 
            name: "edadId", 
            value:"lelele", 
            enabled:true,
            options: [],
            change: ()=>{console.log("cambia el select");}
        },
        habilidades: {
            key: 25,
            type: "text",
            label: Liferay.Language.get('Habilidades'), 
            name: "habilidades", 
            value:"lelele", 
            enabled:true,
            conditions: []
        },
        estadoId: {
            key: 26,
            type: "select",
            label: Liferay.Language.get('Estado'), 
            name: "estadoId", 
            value:"lelele", 
            enabled:true,
            options: [],
            change: ()=>{console.log("cambia el select");}
        },
        estado: {
            key: 32,
            type: "text",
            label: Liferay.Language.get('Estado'), 
            name: "estado", 
            value:"lelele", 
            enabled:true,
            conditions: []
        },
        observaciones: {
            key: 27,
            type: "text",
            label: Liferay.Language.get('Observaciones'), 
            name: "observaciones", 
            value:"lelele", 
            enabled:true,
            conditions: []
        },
        colectivos: {
            key: 28,
            type: "multilist",
            label: Liferay.Language.get("Colectivos"),
            name: 'colectivos',
            placeholder: 'lalala',
            options: [],
            enabled: true
        },
        objetivos: {
            key: 29,
            type: "textarea",
            label: Liferay.Language.get('Objetivos'), 
            name: "objetivos", 
            value:"lelele", 
            placeholder:Liferay.Language.get('Objetivos'),
            conditions:["text"]
        },
        participantes: {
            key: 31,
            type: "other",
            componentName: "Participantes",
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
    },
    tabActive:0,
    tabs: [
        {
            caption: "Datos",
            key: 1,
            ariacontrols: "tabpanel-1",
            rows: [
                {
                    key:41,
                    cols: ['id','titulo']
                },
                {
                    key:42,
                    cols: ['duracionMeses', 'vacantes', 'empresaId','centroId']
                },        
                {
                    key:43,
                    cols: ['proyectoId','puestoId','cnaeId']
                },        
                {
                    key:44,
                    cols: ['tipoContratoId','fechaIncorporacion','duracionMeses', 'jornadaId']
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
            caption: "Cantidatos",
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
            caption: "Estado",
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
    searchFields: ['titulo','estado','puesto','empresa','centro'],
};
