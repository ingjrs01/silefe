export const form = {
    title: Liferay.Language.get('Localidad'),
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
        localidad: {
            key:3,
            type: "multilang",
            label: Liferay.Language.get('Localidad'), 
            name: "localidad", 
            value:"lelele",             
            placeholder: Liferay.Language.get('Localidad'), 
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
            cols: ['provinciaId','localidad']
        },
    ],
    table: {
        id: {
            columnTitle: "Id",
            columnType: "checkbox",
            key: "c1",
        },
        localidad: {
            columnTitle: Liferay.Language.get('Localidad'),
            columnType: "multilang",
            key: "c3",
        },
        provinciaId: {
            columnTitle: Liferay.Language.get('Provincia'),
            columnType: "String",
            key: "c3",
        },
    }    
};
