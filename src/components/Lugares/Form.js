import { Liferay } from '../../common/services/liferay/liferay';
import { GenericForm } from "../../includes/GenericForm";

export const form = {
    ...GenericForm,
    title: Liferay.Language.get('Lugares'),
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
        nombre: {
            key:2,
            type: "text",
            label: Liferay.Language.get('Nombre'),
            name: "nombre",
            value:"nombre",
            placeholder: Liferay.Language.get('Nombre'),
            conditions: ["text"],
            className: 'col-6'
        },
        paisId: {
            key:3,
            type: "select",
            label: Liferay.Language.get('Pais'),
            name: "paisId",
            enabled:true,
            conditions: [],
            options: [],
            change: () => {console.log("cambiando el pais")},
            className: 'col-3',
        },
        cp: {
            key:4,
            type: "text",
            label: Liferay.Language.get('C.P.'),
            name: "cp",
            value:"cp",
            placeholder: Liferay.Language.get('codigo'),
            conditions: []
        },
        provinciaId: {
            key: 5,
            type: "select",
            label: Liferay.Language.get('Provincia'),
            name: "provincia",
            enabled:true,
            conditions: [],
            options: [],
            change: () => {console.log("cambiando la provincia")},
            className: 'col-3',
        },
        municipioId: {
            key: 6,
            type: "select",
            label: Liferay.Language.get('Municipio'),
            name: "municipioId",
            enabled:true,
            options: [],
            conditions: [],
            change: () => {console.log("cambiando el municipio")}
        },
        municipio: {
            key: 12,
            type: "text",
            label: Liferay.Language.get('Municipio'),
            name: "municipio",
            enabled:true,
            conditions: [],
        },
        localidad: {
            key: 7,
            type: "text",
            label: Liferay.Language.get('Localidad'),
            name: "localidad",
            placeholder: Liferay.Language.get('Localidad'),
            conditions: ["text"]
        },
        tipoViaId: {
            key: 8,
            type: "select",
            label: Liferay.Language.get('TipoVia'),
            name: "tipoViaId",
            enabled:true,
            conditions: [],
            options: [],
            change: () => {console.log("cambiando el tipo de via")},
            className: 'col-3'
        },
        nombreVia: {
            key: 9,
            type: "text",
            label: Liferay.Language.get('nombreVia'),
            name: "nombreVia",
            placeholder: Liferay.Language.get('NombreVia'),
            conditions: ["text"],
            className: 'col-5'
        },
        numero: {
            key: 10,
            type: "text",
            label: Liferay.Language.get('Número'),
            name: "numero",
            placeholder: Liferay.Language.get('Número'),
            conditions: [],
            className: 'col-2'
        },
        piso: {
            key: 11,
            type: "text",
            label: Liferay.Language.get('Piso'),
            name: "piso",
            placeholder: Liferay.Language.get('Piso'),
            conditions: [],
            className: 'col-2'
        },
    },
    rows: [
        {
            key:41,
            cols: ['nombre', 'paisId', , 'cp']
        },
        {
            key:42,
            cols: [ 'provinciaId', 'municipioId', 'localidad']
        },
        //{
        //    key:43,
        //    cols: [,]
        //},
        {
            key:44,
            cols: ['tipoViaId', 'nombreVia','numero','piso' ]
        },
    ],
    table: {
        id: {
            columnTitle: "Id",
            columnType: "checkbox",
            key: "c1",
        },
        nombre: {
            columnTitle: Liferay.Language.get('Nombre'),
            columnType: "string",
            key: "c2",
        },
        municipio: {
            columnTitle: Liferay.Language.get('Municipio'),
            columnType: "multilang",
            key: "c3",
        },
        localidad: {
            columnTitle: Liferay.Language.get('Localidad'),
            columnType: "string",
            key: "c4",
        },
        nombreVia: {
            columnTitle: Liferay.Language.get('Via'),
            columnType: "string",
            key: "c5",
        },
    },
    searchFields: ['nombre', 'localidad','municipio'],
};
