import { Liferay } from '../../../common/services/liferay/liferay';
import { GenericForm } from '../../../includes/GenericForm';

export const form = {
    ...GenericForm,
    title: Liferay.Language.get('Contactos'),
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
            key: 2,
            type: "text",
            label: Liferay.Language.get('Nombre'),
            name: "nombre",
            value: "",
            placeholder: Liferay.Language.get('Nombre'),
            conditions: ["text"],
            className: 'col',
        },
        apellido1: {
            key: 3,
            type: "text",
            label: Liferay.Language.get('Apellido1'),
            name: "apellido1",
            value: "",
            placeholder: Liferay.Language.get('Apellido1'),
            conditions: ["text"],
            className: 'col',
        },
        apellido2: {
            key: 4,
            type: "text",
            label: Liferay.Language.get('Apellido2'),
            name: "apellido2",
            value: "",
            placeholder: Liferay.Language.get('Apellido2'),
            conditions: ["text"],
            className: 'col',
        },
        telefono: {
            key: 5,
            type: "phone",
            label: Liferay.Language.get('Telefono'),
            name: "telefono",
            values: [], 
            placeholder: Liferay.Language.get('Telefono'),
            conditions: ["text"]
        },
        email: {
            key: 6,
            type: "email",
            label: Liferay.Language.get('Email'),
            name: "email",
            values: [],
            placeholder: Liferay.Language.get('Email'),
            conditions: ["text"]
        },
        cargo: {
            key: 7,
            type: "text",
            label: Liferay.Language.get('Cargo'),
            name: "cargo",
            value: "",
            placeholder: Liferay.Language.get('Cargo'),
            conditions: ["text"],
            className: 'col',
        },
    },
    rows: [
        {
            key: 101,
            cols: ['nombre', 'apellido1', 'apellido2'],
        },
        {
            key: 102,
            cols: ['telefono', 'email', 'cargo'],
        },
    ],
table: [
    //{
    //    columnName: 'id',
    //    columnTitle: "Id",
    //    columnType: "checkbox",
    //    key: "c1",
    //},
    {
        columnName: 'nombre',
        columnTitle: Liferay.Language.get('Nombre'),
        columnType: "string",
        key: "c2",
    },
    {
        columnName: 'apellido1',
        columnTitle: Liferay.Language.get('Apellido1'),
        columnType: "string",
        key: "c3",
    },
    {
        columnName: 'apellido2', 
        columnTitle: Liferay.Language.get('Apellido2'),
        columnType: "string",
        key: "c4",
    },
    {
        columnName: 'cargo', 
        columnTitle: Liferay.Language.get('Cargo'),
        columnType: "string",
        key: "c5",
    },
    //{
    //    columnName: 'telefono',
    //    columnTitle: Liferay.Language.get('Teléfono'),
    //    columnType: "phone",
    //    key: "c5",
    //},
    ],   
    searchFields: ['nombre'],
    searchField: 'nombre'
};
