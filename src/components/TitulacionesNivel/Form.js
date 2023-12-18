import { Liferay } from '../../common/services/liferay/liferay';
import { GenericForm } from "../../includes/GenericForm";

export const form = {
    ...GenericForm,
    title: Liferay.Language.get('Titulaciones_nivel'),
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
        descripcion: {
            key: 3,
            type: "multilang",
            label: Liferay.Language.get('Descripcion'),
            name: "descripcion",
            value: "lelele",
            placeholder: Liferay.Language.get('Descripcion'),
            conditions: ["text"]
        },
        titulacionTipoId: {
            key: 2,
            type: "select",
            label: Liferay.Language.get('Tipo'),
            name: "titulacionTipoId",
            value: "ta ta ta",
            placeholder: Liferay.Language.get('Tipo'),
            conditions: [],
            enabled: true,
            options: []
        },
        tipo: {
            key: 3,
            type: "text",
            label: Liferay.Language.get("Tipo"),
            name: "tipo",
            value: "lalala",
            placeholder: "Identifier",
            validate: false,
        },
    },
    rows: [
        {
            key: 8,
            cols: ['titulacionTipoId']
        },

        {
            key: 7,
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
            columnTitle: Liferay.Language.get('Tipo'),
            columnType: "string",
            key: "c4",
        },
    },
    searchFields: ['descripcion', 'tipo'],
};
