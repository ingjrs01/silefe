export const form = {
    title: Liferay.Language.get('Titulaciones_nivel'),
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
        descripcion: {
            key:3,
            type: "multilang",
            label: Liferay.Language.get('Descripcion'), 
            name: "descripcion", 
            value:"lelele", 
            placeholder: Liferay.Language.get('Descripcion'), 
            conditions: ["text"]
        },
        titulacionNivelId : {
            key:2,
            type: "select",
            label: Liferay.Language.get('Nivel'), 
            name: "titulacionNivelId", 
            enabled:true,
            conditions: [],
            options: []  
        },
    },
    rows: [
        {
            key:9,
            cols: ['id']
        },
        {
            key:8,
            cols: ['titulacionNivelId']
        },

        {
            key:7,
            cols: ['descripcion']
        },
    ],
    table: {
        id: {
            columnTitle: "Id",
            columnType: "checkbox",
            key: "c1",
        },
        descripcion: {
            columnTitle: Liferay.Language.get('Descripcion'),
            columnType: "multilang",
            key: "c3",
        },
        titulacionNivelDescripcion: {
            columnTitle: Liferay.Language.get('Nivel'),
            columnType: "string",
            key: "c4",
        },
    }    
};
