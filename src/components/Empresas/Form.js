import { Liferay } from '../../common/services/liferay/liferay';
import { GenericForm } from '../../includes/GenericForm';

export const form = {
    ...GenericForm,
    title: Liferay.Language.get('Empresas'),
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
        tipoDoc: {
            key: 11,
            type: "select",
            label: Liferay.Language.get('TipoDocumento'),
            name: "tipoDoc",
            enabled: true,
            conditions: [],
            change: () => { console.log("cambiando el tipo de documento") },
            className: "col-2",
        },
        documento: {
            key: 12,
            type: "dni",
            label: Liferay.Language.get('Documento'),
            name: "documento",
            value: "documento",
            placeholder: Liferay.Language.get('Documento'),
            className: "col-3",
            conditions: []
        },
        razonSocial: {
            key: 3,
            type: "text",
            label: Liferay.Language.get('RazonSocial'),
            name: "razonSocial",
            value: "nombre",
            placeholder: Liferay.Language.get('RazonSocial'),
            conditions: ["text"]
        },
        cnaeId: {
            key: 33,
            type: 'selectfilter',
            label: Liferay.Language.get("Cnae"),
            name: "cnaeId",
            enabled:true,
            values: "",
            options: [],
        },
        trabajadores: {
            key: 34,
            type: 'number',
            min: 0,
            label: Liferay.Language.get("Trabajadores"),
            name: "trabajadores",
            enabled:true,
            values: "",
            className: "col-2",
            conditions: ['number'],
        },
        grupo: {
            key: 35,
            type: "toggle",
            label: Liferay.Language.get('Grupo_empresarial'),
            name: "grupo",
            enable: true,
            className: "col-2",
        },
        depFormacion: {
            key: 36,
            type: "toggle",
            label: Liferay.Language.get('Dept_formacion'),
            name: "depFormacion",
            enable: true,
            className: "col-2",
        },
        planFormacion: {
            key: 37,
            type: "toggle",
            label: Liferay.Language.get('Pan_formacion'),
            name: "panFormacion",
            enable: true,
            className: "col-2",
        },
        colectivosVulnerables: {
            key: 38,
            type: "toggle",
            label: Liferay.Language.get('Vulnerables'),
            name: "colectivosVulnerables",
            enable: true,
            className: "col-2",
        },
        email: {
            key: 22,
            type: "email",
            label: Liferay.Language.get('Email'),
            name: "email",
            values: [ ],
            placeholder: Liferay.Language.get('Email'),
            conditions: ["text"]
        },
        telefono: {
            key: 23,
            type: "phone",
            label: Liferay.Language.get('Telefono'),
            name: "telefono",
            values: [ ],
            placeholder: Liferay.Language.get('Telefono'),
            conditions: ["text"]
        },
        pnl: {
            key: 26,
            type: "toggle",
            label: Liferay.Language.get('PNL'),
            name: "pnl",
            value: "",
            conditions: []
        },
        ofertas: {
            key: 27,
            type: "toggle",
            label: Liferay.Language.get('Ofertas'),
            name: "ofertas",
            value: "",
            conditions: []
        },
        formacionCompromiso: {
            key: 28,
            type: "toggle",
            label: Liferay.Language.get('FormacionCompromiso'),
            name: "formacionCompromiso",
            value: "",
            conditions: []
        },
        ayuda: {
            key: 29,
            type: "toggle",
            label: Liferay.Language.get('Ayuda'),
            name: "ayuda",
            value: "",
            conditions: []
        },
        formacion: {
            key: 30,
            type: "toggle",
            label: Liferay.Language.get('Formacion'),
            name: "formacion",
            value: "",
            conditions: []
        },
        admiteEnvios :{
            key: 32,
            type: "toggle",
            label: Liferay.Language.get("Envios"),
            name: "admiteEnvios",
            value: false,            
        },
        interes: {
            key: 31,
            type: "textarea",
            label: Liferay.Language.get('Interes'),
            name: "interes",
            value: "Interes",
            placeholder: Liferay.Language.get('Interes'),
            conditions: []
        },
        centros: {
            key: 24,
            type: "other",
            componentName: "Centros",
            name: "centros",
        },
        contactos: {
            key: 25,
            type: "other",
            componentName: "Contactos",
            name: "contactos",
        },
        historico: {
            key: 39,
            type: "other",
            componentName: "Historico",
            name: "historico",
        },

    },
    tabActive: 0,
    tabs: [
        {
            caption: "Datos",
            key: 1,
            ariacontrols: "tabpanel-1",
            rows: [
                {
                    key: 41,
                    cols: ['tipoDoc', 'documento', 'razonSocial','grupo'],
                },
                {
                    key: 42,
                    cols: ['cnaeId','trabajadores','depFormacion', 'planFormacion', 'colectivosVulnerables'],
                },
                {
                    key: 43,
                    cols: ['email', 'telefono'],
                },
                {
                    key: 71,
                    cols: ['pnl', 'ofertas', 'formacionCompromiso'],
                },
                {
                    key: 72,
                    cols: ['ayuda', 'formacion', 'admiteEnvios'],
                },
                //{
                //    key: 73,
                //    cols: ['admiteEnvios'],
                //},
                {
                    key: 74,
                    cols: ['interes']
                },
            ]
        },
        {
            caption: "Centros",
            key: 2,
            ariacontrols: "tabpanel-2",
            rows: [
                {
                    key: 53,
                    cols: ['centros']
                },
            ]
        },
        {
            caption: "Contactos",
            key: 3,
            ariacontrols: "tabpanel-3",
            rows: [{
                key: 61,
                cols: ['contactos'],
            }]
        },
        {
            caption: "Historico",
            key: 4,
            ariacontrols: "tabpanel-4",
            admin: true,
            rows: [{
                key: 62,
                cols: ['historico'],
            }]
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
            columnTitle: Liferay.Language.get('Emailll'),
            columnType: "email",
            key: "c4",
        },
        telefono: {
            columnTitle: Liferay.Language.get('Teléfonooo'),
            columnType: "phone",
            key: "c5",
        },
    },
    searchFields: ['documento', 'razonSocial', 'admiteEnvios'],
    searchField: 'razonSocial'
};
