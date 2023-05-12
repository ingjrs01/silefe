export const form = {
    title: Liferay.Language.get('Municipios'),
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
        provinciaId: {
            key:2,
            type: "select",
            label: Liferay.Language.get('Provincia'), 
            name: "provinciaId", 
            value:"ta ta ta", 
            enabled:true,
            placeholder: Liferay.Language.get('Provincia'), 
            conditions: [],
            options: []  

        },
        nombre: {
            key:3,
            type: "multilang",
            label: Liferay.Language.get('Municipios'), 
            name: "nombre", 
            value:"lelele",             
            placeholder: Liferay.Language.get('Municipio'), 
            conditions: ["text"]
        },
        provincia: {
            key:4,
            type: "multilang",
            label: Liferay.Language.get('Provincia'), 
            name: "provincia", 
            value:"lelele",             
            placeholder: Liferay.Language.get('Provincia'), 
            conditions: ["text"]
        }
    },
    rows: [
        {
            key:9,
            cols: ['id']
        },
        {
            key:7,
            cols: ['provinciaId','nombre']
        },
    ],
    table: {
        id: {
            columnTitle: "Id",
            columnType: "checkbox",
            key: "c1",
        },
        nombre: {
            columnTitle: Liferay.Language.get('Municipio'),
            columnType: "multilang",
            key: "c2",
        },
        provinciaId: {
            columnTitle: Liferay.Language.get('Provincia'),
            columnType: "String",
            key: "c3",
        },
        provincia: {
            columnTitle: Liferay.Language.get('Provincia'),
            columnType: "multilang",
            key: "c4",
        },
    }    
};
