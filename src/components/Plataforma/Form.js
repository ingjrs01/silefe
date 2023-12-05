import { GenericForm } from "../../includes/GenericForm";

export const form = {
    ...GenericForm,
    title: Liferay.Language.get('Plataformas'),
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
        codigo: {
            key:2,
            type: "text",
            label: "Código", 
            name: "codigo", 
            value:"codigo", 
            placeholder:"Código", 
            conditions: ["text"]
        },
        nombre: {
            key:3,
            type: "text",
            label: Liferay.Language.get('Descripcion'), 
            name: "nombre", 
            value:"lelele", 
            placeholder: Liferay.Language.get('Nombre'), 
            conditions: ["text"]
        }
    },
    rows: [
        {
            key:8,
            cols: ['codigo']
        },
        {
            key:7,
            cols: ['nombre']
        },
    ],
    table: {
        id: {
            columnTitle: "Id",
            columnType: "checkbox",
            key: "c1",
        },
        codigo: {
            columnTitle: Liferay.Language.get('Código'),
            columnType: "String",
            key: "c2",
        },
        nombre: {
            columnTitle: Liferay.Language.get('nombre'),
            columnType: "string",
            key: "c3",
        },
    }, 
    searchFields: ['nombre'],
};
