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
            change: ()=>{console.log("cambia el select");}
        },
        centroId: {
            key: 4,
            type: "select",
            label: Liferay.Language.get('Centro'), 
            name: "centroId", 
            enabled:true,
            change: ()=>{console.log("cambia el select");}
        },
        puestoId: {
            key: 5,
            type: "select",
            label: Liferay.Language.get('Puesto'), 
            name: "centroId", 
            enabled:true,
            change: ()=>{console.log("cambia el select");}
        },
        cnaeId: {
            key: 7,
            type: "select",
            label: Liferay.Language.get('Cnae'), 
            name: "cnaeId", 
            enabled:true,
            change: ()=>{console.log("cambia el select");}
        },
        vacantes: {
            key:8,
            type: "text",
            label: Liferay.Language.get('Vacantes'), 
            name: "vacantes", 
            placeholder: "0",
            conditions:["number"]
        },
        fechaIncorporation: {
            key:9,
            type: "date",
            label: Liferay.Language.get('Incorporacion'), 
            name: "fechaIncorporacion", 
            value:"yyyy-mm-dd", 
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
            change: ()=>{console.log("cambia el select");}
        },
        idiomasRequerido: {
            key: 17,
            type: "select",
            label: Liferay.Language.get('Idiomas'), 
            name: "idiomasRequerido", 
            enabled:true,
            change: ()=>{console.log("cambia el select");}
        },
        informaticaRequerido: {
            key: 18,
            type: "select",
            label: Liferay.Language.get('Informatica'), 
            name: "informaticaRequerido", 
            enabled:true,
            change: ()=>{console.log("cambia el select");}
        },
        experienciaRequerido: {
            key: 19,
            type: "select",
            label: Liferay.Language.get('Experiencia'), 
            name: "experienciaRequerido", 
            enabled:true,
            change: ()=>{console.log("cambia el select");}
        },
        permisos: {
            key: 20,
            type: "text",
            label: Liferay.Language.get('Permisos'), 
            name: "permisos", 
            placeholder: "",
            conditions:["text"]
        },
        vehiculo: {
            key: 21,
            type: "toggle",
            label: Liferay.Language.get('Vehiculo'), 
            name: "vehiculo", 
            value:"lelele", 
            change: ()=>{console.log("cambia fondos propios");}
        },
        necesitaVehiculo: {
            key: 22,
            type: "toggle",
            label: Liferay.Language.get('NecesitaVehiculo'), 
            name: "necesitaVehiculo", 
            value:"lelele", 
            change: ()=>{console.log("cambia fondos propios");}
        },
        generoId: {
            key: 23,
            type: "select",
            label: Liferay.Language.get('Genero'), 
            name: "generoId", 
            value:"lelele", 
            enabled:true,
            change: ()=>{console.log("cambia el select");}
        },
        habilidades: {
            key: 24,
            type: "text",
            label: Liferay.Language.get('Habilidades'), 
            name: "habilidades", 
            value:"lelele", 
            enabled:true,
            conditions: []
        },
        estado: {
            key: 25,
            type: "select",
            label: Liferay.Language.get('Estado'), 
            name: "estado", 
            value:"lelele", 
            enabled:true,
            change: ()=>{console.log("cambia el select");}
        },
        colectivos: {
            key: 26,
            type: "multilist",
            label: Liferay.Language.get("Colectivos"),
            name: 'colectivos',
            placeholder: 'lalala',
            enabled: true
        },
        objetivos: {
            key:55,
            type: "textarea",
            label: Liferay.Language.get('Objetivos'), 
            name: "objetivos", 
            value:"lelele", 
            placeholder:Liferay.Language.get('Objetivos'),
            conditions:["text"]
        }
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
                    cols: ['id']
                },
                {
                    key:42,
                    cols: ['titulo']
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
            key: "c3",
        },
    }

};
