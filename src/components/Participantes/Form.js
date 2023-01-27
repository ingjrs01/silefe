export const form = {
    title: Liferay.Language.get('Participantes'),
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
        tipoDoc: {
            key:11,
            type: "select",
            label: Liferay.Language.get('TipoDocumento'), 
            name: "tipoDoc", 
            enabled:true,
            conditions: [],
            change: () => {console.log("cambiando el tipo de documento")}
        },
        documento: {
            key:12,
            type: "text",
            label: Liferay.Language.get('Documento'), 
            name: "documento", 
            value:"documento", 
            placeholder: Liferay.Language.get('Documento'), 
            conditions: []
        },
        sexo: {
            key:13,
            type: "radio",
            label: Liferay.Language.get('Sexo'), 
            name: "sexo", 
            change: ()=>{console.log("cambia sexo");},
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
            conditions:[]
        },
        provinciaId: {
            key:15,
            type: "select",
            label: Liferay.Language.get('Provincia'), 
            name: "provinciaId", 
            value:"", 
            enabled:true,
            conditions: []
        },
        situacionLaboral: {
            key:6,
            type: "select",
            label: Liferay.Language.get('SituacionLaboral'), 
            name: "situacionLaboral", 
            value:"", 
            enabled:true,
            conditions: []
        },
        insercion: {
            key:7,
            type: "toggle",
            label: Liferay.Language.get('Insercion'), 
            name: "insercion", 
            value:"", 
            change: ()=>{console.log("cambia insercion");},
            conditions: []
        },
        busca_empleo: {
            key:8,
            type: "toggle",
            label: Liferay.Language.get('BuscaEmpleo'), 
            name: "busca_empleo", 
            value:"", 
            change: ()=>{console.log("cambia buscaEmpleo");},
            conditions: []
        },
        autoempleo: {
            key:9,
            type: "toggle",
            label: Liferay.Language.get('Autoempleo'), 
            name: "autoempleo", 
            value:"", 
            change: ()=>{console.log("cambia buscaEmpleo");},
            conditions: []
        },
        rangoSalarialId: {
            key:10,
            type: "select",
            label: Liferay.Language.get('RangoSalarial'), 
            name: "rangoSalarialId", 
            value:"", 
            enabled:true,
            conditions: []
        },
        jornadaId: {
            key:11,
            type: "select",
            label: Liferay.Language.get('Jornada'), 
            name: "jornadaId", 
            value:"", 
            enabled: true,
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


    },
    tabs : [
        {
            caption: "Datos",
            ariacontrols: "tabpanel-1",
            rows: [
                {
                    key:41,
                    cols: ['id','tipoDoc','documento']
                },
                {
                    key:43,
                    cols: ['nombre','apellido1','apellido2']
                },        
                {
                    key:42,
                    cols: ['fechaNacimiento', 'sexo']
                },        
                {
                    key:44,
                    cols: ['provinciaId']
                },        
            ]
        },
        {
            caption: "Formacion",
            ariacontrols: "tabpanel-2",
            rows: [
                {
                    key:50,
                    cols: ['nombre']
                },        
            ]
        },
        {
            caption: "Experiencia",
            ariacontrols: "tabpanel-3",
            rows: [
                {
                    key:61,
                    cols: ['id']
                },
                {
                    key:62,
                    cols: ['apellido2']
                },        
            ]
        },
        {
            caption: "Empleabilidad",
            ariacontrols: "tabpanel-4",
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
    ],
    table: {
        id: {
            columnTitle: "Id",
            columnType: "checkbox",
            key: "c1",
        },
        nombre: {
            columnTitle: Liferay.Language.get('Nombre'),
            columnType: "string",
            key: "c3",
        },
        apellido1: {
            columnTitle: Liferay.Language.get('Apellido1'),
            columnType: "string",
            key: "c4",
        },
}    
};
