import { Liferay } from '../../common/services/liferay/liferay';
import { GenericForm } from "../../includes/GenericForm";

export const form = {
    ...GenericForm,
    title: Liferay.Language.get('Técnicos'),
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
        tecnicoUserId: {
            key: 2,
            type: "select",
            label: Liferay.Language.get('Usuario'),
            name: "tecnicoUserId",
            value:"",
            enabled:true,
            options: [],
            className: 'col-3',
            change: ()=>{console.log("cambia el select");},
        },
        firstName: {
            key: 3,
            type: "text",
            label: Liferay.Language.get('Nombre'),
            name: "firstName",
            value: "lelele",
            placeholder: Liferay.Language.get('Nombre'),
            conditions: ["text"]
        },
        username: {
            key: 6,
            type: "text",
            label: Liferay.Language.get('Usuario'),
            name: "username",
            value: "",
            placeholder: Liferay.Language.get('username'),
            conditions: ["text"],
            className: 'col-3',
        },
        lastName: {
            key: 4,
            type: "text",
            label: Liferay.Language.get('Apellido'),
            name: "lastName",
            value: "lelele",
            placeholder: Liferay.Language.get('Apellido'),
            conditions: ["text"]
        },
        emailAddress: {
            key: 5,
            type: "text",
            label: Liferay.Language.get('Email'),
            name: "emailAddress",
            value: "lelele",
            placeholder: Liferay.Language.get('Email'),
            conditions: ["text"]
        }
    },
    rows: [
        {
            key: 8,
            cols: ['tecnicoUserId' ,'username']
        },
        {
            key: 7,
            cols: ['firstName', 'lastName']
        },
        {
            key: 45,
            cols: ['emailAddress']
        },
    ],
    table: [
        {
            columnName: "id",
            columnTitle: "Id",
            columnType: "checkbox",
            key: "c1",
        },
        {
            columnName: "firstName",
            columnTitle: Liferay.Language.get('Nombre'),
            columnType: "string",
            key: "c3",
        },
        {
            columnName: "lastName",
            columnTitle: Liferay.Language.get('Apellido'),
            columnType: "string",
            key: "c4",
        },
        {
            columnName: "emailAddress",
            columnTitle: Liferay.Language.get('email'),
            columnType: "string",
            key: "c5",
        },
    ],
    searchFields: ['firstName'],
    searchField: 'firstName',
    searchFieldsMain: ['firstName'],
    searchFieldMain: 'firstName',

};
