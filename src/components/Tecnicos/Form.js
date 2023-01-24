export const form = {
    title: Liferay.Language.get('Tecnicos'),
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
        firstName: {
            key:3,
            type: "text",
            label: Liferay.Language.get('Nombre'), 
            name: "firstName", 
            value:"lelele", 
            placeholder: Liferay.Language.get('Nombre'), 
            conditions: ["text"]
        },
        lastName: {
            key:4,
            type: "text",
            label: Liferay.Language.get('Apellido'), 
            name: "lastName", 
            value:"lelele", 
            placeholder: Liferay.Language.get('Apellido'), 
            conditions: ["text"]
        },
        emailAddress: {
            key:5,
            type: "text",
            label: Liferay.Language.get('Email'), 
            name: "emailAddress", 
            value:"lelele", 
            placeholder: Liferay.Language.get('Email'), 
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
            cols: ['firstName','lastName']
        },
        {
            key:45,
            cols: ['emailAddress']
        },
    ],
    table: {
        id: {
            columnTitle: "Id",
            columnType: "checkbox",
            key: "c1",
        },
        firstName: {
            columnTitle: Liferay.Language.get('Nombre'),
            columnType: "string",
            key: "c3",
        },
    }    
};
