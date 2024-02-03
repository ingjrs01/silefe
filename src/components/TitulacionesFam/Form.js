import { Liferay } from '../../common/services/liferay/liferay';
import { GenericForm } from "../../includes/GenericForm";

export const form = {
    ...GenericForm,
    title: Liferay.Language.get('Titulaciones_Familia'),
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
            key: 2,
            type: "multilang",
            label: Liferay.Language.get('Descripcion'),
            name: "descripcion",
            value: "lelele",
            placeholder: Liferay.Language.get('Descripcion'),
            conditions: ["text"]
        },
        titulacionNivelId: {
            key: 3,
            type: "select",
            label: Liferay.Language.get('Nivel'),
            name: "titulacionNivelId",
            enabled: true,
            conditions: [],
            options: []
        },
        nivel: {
            key: 4,
            type: "text",
            label: Liferay.Language.get("Nivel"),
            name: "nivel",
            value: "lalala",
            validate: false,
        },
        tipo: {
            key: 5,
            type: "text",
            label: Liferay.Language.get("Tipo"),
            name: "tipo",
            value: "lalala",
            validate: false,
        },
    },
    rows: [
        {
            key: 9,
            cols: ['id']
        },
        {
            key: 8,
            cols: ['titulacionNivelId']
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
            columnTitle: Liferay.Language.get('Nivel'),
            columnType: "multilang",
            key: "c4",
        },
        titulacionTipoDescripcion: {
            columnTitle: Liferay.Language.get('Tipo'),
            columnType: "multilang",
            key: "c4",
        },
    },
    searchFields: ['descripcion', 'nivel', 'tipo'],
    searchField: 'descripcion',
};
