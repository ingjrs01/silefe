import { Liferay } from '../../common/services/liferay/liferay';

export const form = {
    title: Liferay.Language.get('Ejecucion'),
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
        accionId: {
            key:6,
            type: "text",
            label: "accion",
            name: "id",
            value:"lalala",
        },
        accionTipoId : {
            key:2,
            type: "select",
            label: Liferay.Language.get('Tipo'),
            name: "accionTipoId",
            enabled:true,
            conditions: [],
            options: []
        },
        accionTipoFormacionId : {
            key:3,
            type: "select",
            label: Liferay.Language.get('TipoFormación'),
            name: "accionTipoFormacionId",
            enabled:true,
            conditions: [],
            options: []
        },
        empresaId: {
            key:4,
            type: "select",
            label: Liferay.Language.get('Empresa'),
            name: "empresa",
            value: 0,
            options: [],
        },
        lugarId: {
            key:5,
            type: "select",
            label: Liferay.Language.get('Lugar'),
            name: "lugar",
            value: 0,
            options: [],
        },
    },
    rows: [
        {
            key:9,
            cols: ['id']
        },
        {
            key:8,
            cols: ['accionTipoId', 'nombre'],
        },
        {
            key:10,
            cols: ['accionTipoFormacionId', 'teorica', 'practica', 'grupal'],
        },
        {
            key:11,
            cols: ['horas'],
        },
        {
            key:12,
            cols: ['tecnicoId'],
        },
    ],
    table: {
        id: {
            columnTitle: "Id",
            columnType: "checkbox",
            key: "c1",
        },
//        acctionTipo: {
//            columnTitle: Liferay.Language.get('Tipo'),
//            columnType: "string",
//            key: "c2",
//        },
        tipo: {
            columnTitle: Liferay.Language.get('Tipo'),
            columnType: "multilang",
            key: "c4",
        },
        nombre: {
            columnTitle: Liferay.Language.get('Nombre'),
            columnType: "multilang",
            key: "c3",
        },
        formacion: {
            columnTitle: Liferay.Language.get('Formacion'),
            columnType: "multilang",
            key: "c9",
        },
        teorica: {
            columnTitle: Liferay.Language.get('Teórica'),
            columnType: "boolean",
            key: "c5",
        },
        practica: {
            columnTitle: Liferay.Language.get('Práctica'),
            columnType: "boolean",
            key: "c6",
        },
        grupal: {
            columnTitle: Liferay.Language.get('Grupal'),
            columnType: "boolean",
            key: "c7",
        },
        horas: {
            columnTitle: Liferay.Language.get('Horas'),
            columnType: "string",
            key: "c8",
        },
    },
    searchFields: ['accionTipoId','nombre','accionTipoFormacionId'],
};
