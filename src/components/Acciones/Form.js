export const form = {
    title: Liferay.Language.get('Acciones'),
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
        teorica: {
            key:4,
            type: "toggle",
            label: Liferay.Language.get('Teorica'), 
            name: "teorica", 
            value:"", 
            conditions: []
        },
        practica: {
            key:5,
            type: "toggle",
            label: Liferay.Language.get('Práctica'), 
            name: "practica", 
            value:"", 
            conditions: []
        },
        grupal: {
            key:6,
            type: "toggle",
            label: Liferay.Language.get('Grupal'), 
            name: "grupal", 
            value:"", 
            conditions: []
        },
        tecnicoId: {
            key:7,
            type: "select",
            label: Liferay.Language.get('Técnico'), 
            name: "tecnicoId", 
            enabled:true,
            conditions: [],
            options: []  
        },
        horas: {
            key:8,
            type: "text",
            label: "Horas", 
            name: "horas", 
            placeholder:"Horas", 
            conditions: ["number"],
        },
        nombre: {
            key:9,
            type: "multilang",
            label: Liferay.Language.get('Nombre'), 
            name: "nombre", 
            value:"lelele", 
            placeholder: Liferay.Language.get('Nombre'), 
            conditions: ["text"]
        }
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
        acctionTipo: {
            columnTitle: Liferay.Language.get('Tipo'),
            columnType: "String",
            key: "c2",
        },
        nombre: {
            columnTitle: Liferay.Language.get('Nombre'),
            columnType: "multilang",
            key: "c3",
        },

    }    
};
