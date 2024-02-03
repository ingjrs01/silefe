import { Liferay } from '../../common/services/liferay/liferay';
import { GenericForm } from "../../includes/GenericForm";

export const form = {
    ...GenericForm,
    title: Liferay.Language.get('TiposVia'),
    fields: {
        id: {
            key: 1,
            type: "text",
            label: "ID",
            name: "id",
            value: "lalala",
            placeholder: "Identifier",
            conditions: ["number"]
        },
        nombre: {
            key: 3,
            type: "multilang",
            label: Liferay.Language.get('TipoVia'),
            name: "nombre",
            value: "lelele",
            placeholder: Liferay.Language.get('TipoVia'),
            conditions: ["text"]
        }
    },
    rows: [
        {
            key: 7,
            cols: ['nombre']
        },
    ],
    table: {
        id: {
            columnTitle: "Id",
            columnType: "checkbox",
            key: "c1",
        },
        nombre: {
            columnTitle: Liferay.Language.get('TipoVia'),
            columnType: "multilang",
            key: "c3",
        },
    },
    searchFields: ['nombre'],
    searchFields: 'nombre'
};
