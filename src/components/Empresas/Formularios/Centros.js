import { Liferay } from '../../../common/services/liferay/liferay';
import { GenericForm } from '../../../includes/GenericForm';

export const form = {
    ...GenericForm,
    title: Liferay.Language.get('Centros'),
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
            value: "nombre",
            placeholder: Liferay.Language.get('Nombre'),
            conditions: ["text"],
            className: 'col-10',
        },
        cp: {
            key: 3,
            type: "text",
            label: Liferay.Language.get('Código Postal'),
            name: "cp",
            value: "",
            placeholder: Liferay.Language.get('00000'),
            conditions: ["text"],
            className: 'col-2',
        },
        provinciaId: {
            key: 4,
            type: "select",
            label: Liferay.Language.get('Provincia'),
            name: "provinciaId",
            enabled: true,
            conditions: [],
            change: () => { console.log("cambiando el tipo de documento") },
            className: "col",
            effects: [{fieldname: 'municipioId', fk: 'provinciaId'}],
        },
        municipioId: {
            key: 5,
            type: "select",
            label: Liferay.Language.get('Municipio'),
            name: "municipioId",
            enabled: true,
            conditions: [],
            options: [],
            all: [],
            change: () => { console.log("cambiando el tipo de documento") },
            className: "col-3",
        },
        localidad: {
            key: 6,
            type: "text",
            label: Liferay.Language.get('Localidad'),
            name: "localidad",
            value: "",
            placeholder: Liferay.Language.get('Localidad'),
            conditions: ["text"]
        },
        tipoViaId: {
            key: 7,
            type: "select",
            label: Liferay.Language.get('TipoVía'),
            name: "tipoViaId",
            enabled: true,
            conditions: [],
            change: () => { console.log("cambiando el tipo de documento") },
            className: "col-3",
        },
        nombreVia: {
            key: 8,
            type: "text",
            label: Liferay.Language.get('NombreVia'),
            name: "nombreVia",
            value: "",
            placeholder: Liferay.Language.get('via'),
            conditions: ["text"],
            className: "col-5",
        },
        numero: {
            key: 9,
            type: "text",
            label: Liferay.Language.get('Número'),
            name: "numero",
            value: "",
            placeholder: Liferay.Language.get('0'),
            conditions: ["text"],
            className: 'col-2'
        },
        piso: {
            key: 3,
            type: "text",
            label: Liferay.Language.get('Piso'),
            name: "piso",
            value: "",
            placeholder: Liferay.Language.get('0'),
            conditions: ["text"],
            className: "col-2"
        },
    },
    rows: [
        {
            key: 101,
            cols: ['nombre', 'cp'],
        },
        {
            key: 102,
            cols: ['provinciaId', 'municipioId', 'localidad'],
        },
        {
            key: 103,
            cols: ['tipoViaId', 'nombreVia', 'numero', 'piso'],
        },
    ],
table: {
        id: {
            columnTitle: "Id",
            columnType: "checkbox",
            key: "c1",
        },
        documento: {
            columnTitle: Liferay.Language.get('CIF'),
            columnType: "dni",
            key: "c2",
        },
        razonSocial: {
            columnTitle: Liferay.Language.get('RazonSocial'),
            columnType: "string",
            key: "c3",
        },
        email: {
            columnTitle: Liferay.Language.get('Email'),
            columnType: "email",
            key: "c4",
        },
        telefono: {
            columnTitle: Liferay.Language.get('Teléfono'),
            columnType: "phone",
            key: "c5",
        },
    },
    searchFields: ['documento', 'razonSocial', 'admiteEnvios'],
    searchField: 'razonSocial'
};
