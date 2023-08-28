export const form = {
    title: Liferay.Language.get('Lugares'),
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
        nombre: {
            key:2,
            type: "text",
            label: Liferay.Language.get('Nombre'),
            name: "nombre",
            value:"nombre",
            placeholder: Liferay.Language.get('Nombre'),
            conditions: ["text"]
        },
        paisId: {
            key:3,
            type: "select",
            label: Liferay.Language.get('Pais'),
            name: "paisId",
            enabled:true,
            conditions: [],
            change: () => {console.log("cambiando el pais")}
        },
        cp: {
            key:4,
            type: "text",
            label: Liferay.Language.get('cp'),
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
            change: () => {console.log("cambiando la provincia")}
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
            change: () => {console.log("cambiando el tipo de via")}
        },
        nombreVia: {
            key: 9,
            type: "text",
            label: Liferay.Language.get('nombreVia'),
            name: "nombreVia",
            placeholder: Liferay.Language.get('NombreVia'),
            conditions: ["text"]
        },
        numero: {
            key: 10,
            type: "text",
            label: Liferay.Language.get('Número'),
            name: "numero",
            placeholder: Liferay.Language.get('Número'),
            conditions: []
        },
        piso: {
            key: 11,
            type: "text",
            label: Liferay.Language.get('Piso'),
            name: "piso",
            placeholder: Liferay.Language.get('Piso'),
            conditions: []
        },
    },
    rows: [
        {
            key:41,
            cols: ['id','nombre', 'paisId']
        },
        {
            key:42,
            cols: ['provinciaId', 'municipioId', 'cp']
        },
        {
            key:43,
            cols: ['localidad','tipoViaId']
        },
        {
            key:44,
            cols: ['nombreVia','numero','piso' ]
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
