import { Liferay } from '../../common/services/liferay/liferay';
import { GenericForm } from '../../includes/GenericForm';

export const form = {
    ...GenericForm,
    title: Liferay.Language.get('CategoriaCita'),
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
        name: {
            key:3,
            type: "multilang",
            label: Liferay.Language.get('Nombre'), 
            name: "name", 
            value:"nombre", 
            placeholder: Liferay.Language.get('nombre'), 
            conditions: ["text"]
        }
    },
    rows: [
        {
            key:7,
            cols: ['name']
        },
    ],
    table: {
        id: {
            columnTitle: "Id",
            columnType: "checkbox",
            key: "c1",
        },
        name: {
            columnTitle: Liferay.Language.get('Nombre'),
            columnType: "multilang",
            key: "c3",
        },
    },
    searchFields: ['name'],
};
