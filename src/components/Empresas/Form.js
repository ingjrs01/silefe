export const form = {
    title: Liferay.Language.get('Empresas'),
    languages: ["es-ES", "en-US", "gl-ES"],
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
            type: 'select',
            label: Liferay.Language.get("Cnae"),
            name: "cnaeId",
            enabled:true,
            values: "",
            options: [],
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
                    cols: ['tipoDoc', 'documento', 'razonSocial'],
                },
                {
                    key: 42,
                    cols: ['cnaeId'],
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
                    cols: ['ayuda', 'formacion'],
                },
                {
                    key: 73,
                    cols: ['admiteEnvios'],
                },
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
};
