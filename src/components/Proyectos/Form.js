import { Liferay } from '../../common/services/liferay/liferay';
import { GenericForm } from '../../includes/GenericForm';

export const form = {
    ...GenericForm,
    title: Liferay.Language.get('Proyectos'),
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
            label: Liferay.Language.get('Descripción'),
            name: "descripcion",
            value: "lelele",
            placeholder: Liferay.Language.get('Descripción'),
            className: 'col-6',
            conditions: ["text"]
        },
        codigo: {
            key: 3,
            type: "text",
            label: Liferay.Language.get('Codigo'),
            name: "codigo",
            value: "lalala",
            placeholder: "Identifier",
            conditions: ["text"],
            className: "col-2",
        },
        inicio: {
            key: 4,
            type: "date",
            label: Liferay.Language.get('Inicio'),
            name: "inicio",
            value: "lelele",
            yearmin: 5,
            yearmax: 8,
            placeholder: Liferay.Language.get('YYYY-MM-DD'),
            conditions: ['required'],
            className: 'col-3',
        },
        fin: {
            key: 5,
            type: "date",
            label: Liferay.Language.get('Fin'),
            name: "fin",
            yearmin: 5,
            yearmax: 8,
            value: "lelele",
            placeholder: Liferay.Language.get('Fin'),
            placeholder: Liferay.Language.get('YYYY-MM-DD'),
            conditions: [],
            className: 'col-3',
        },
        participantes: {
            key: 6,
            type: "number",
            label: Liferay.Language.get('Participantes'),
            name: "participantes",
            placeholder: "0",
            conditions: ["number"],
            className: 'col-2'
        },
        fondos_propios: {
            key: 7,
            type: "toggle",
            label: Liferay.Language.get('FondosPropios'),
            name: "fondos_propios",
            value: "lelele",
            change: () => { console.log("cambia fondos propios"); }
        },
        cofinanciacion: {
            key: 8,
            type: "toggle",
            label: Liferay.Language.get('Cofinanciacion'),
            name: "cofinanciacion",
            value: "lelele",
            placeholder: Liferay.Language.get('Cofinanciacion'),
            change: () => { console.log("cambia cofinanciacion"); }
        },
        convocatoriaId: {
            key: 9,
            type: "select",
            label: Liferay.Language.get('Convocatoria'),
            name: "convocatoriaId",
            enabled: true,
            className: 'col-2',
            change: () => { console.log("cambia el select"); }
        },
        entidadId: {
            key: 10,
            type: "select",
            label: Liferay.Language.get('Entidad'),
            name: "entidadId",
            value: "lelele",
            enabled: true,
            change: () => { console.log("cambia el select"); }
        },
        ambito_geo: {
            key: 11,
            type: "text",
            label: Liferay.Language.get('Ambito'),
            name: "ambito_geo",
            value: "",
            enabled: true,
            conditions: []
        },
        presupuesto: {
            key: 12,
            type: "money",
            label: Liferay.Language.get("Presupuesto"),
            name: "presupuesto",
            enabled: true,
            conditions: ["number"],
            className: 'col-2',
        },
        porcentaje_total: {
            key: 13,
            type: "percent",
            label: Liferay.Language.get("Porcentaje"),
            name: "porcentaje_total",
            placeholder: "",
            enabled: true,
            conditions: ["number"],
            className: 'col-2',
        },
        porcentaje_cofinanciacion: {
            key: 14,
            type: "percent",
            label: Liferay.Language.get("Cofinanciacion"),
            name: "porcentaje_cofinanciacion",
            placeholder: "",
            enabled: true,
            conditions: ["number"],
            className: 'col-2',
        },
        //colectivos: {
        //    key: 15,
        //    typexperienciaRequeridoe: "multilist",
        //    label: Liferay.Language.get("Colectivos"),
        //    name: 'colectivos',
        //    placeholder: 'lalala',
        //    enabled: true
        //},
        objetivos: {
            key: 17,
            type: "textarea",
            label: Liferay.Language.get('Objetivos'),
            name: "objetivos",
            value: null,            
            placeholder: "",
            conditions: []
        },
        convocatoria: {
            key: 18,
            type: "text",
            label: Liferay.Language.get('Convocatoria'),
            name: "convocatoria",
            placeholder: Liferay.Language.get('Convocatoria'),
            validate: false,
        },
        acciones: {
            key: 19,
            type: "other",
            componentName: "Acciones",
            name: "acciones",
        },
        ofertas: {
            key: 20,
            type: "other",
            componentName: "Ofertas",
            name: "Ofertas",
        },
        oparticipantes: {
            key: 21,
            type: "other",
            componentName: "OParticipantes",
            name: "OParticipantes",
        },
        empresas: {
            key: 22,
            type: "other",
            componentName: "Empresas",
            name: "Empresas",
        },
        tecnicos: {
            key: 23,
            type: "other",
            componentName: "Tecnicos",
            name: "Tecnicos",
        },
        colectivos: {
            key: 24,
            type: "doublelist",
            label: Liferay.Language.get("Colectivos"),
            name: 'colectivos',
            options: [],
            enabled: true,
            className: 'col-12',
        },
        historico: {
            key: 25,
            type: "other",
            componentName: "Historico",
            name: "historico",
        },
        adjuntos: {
            key:26,
            type: "file",
            label: Liferay.Language.get('Adjuntos'), 
            name: "adjuntos", 
        },


    },
    tabActive: 0,
    tabs: [
        {
            caption: "Datos",
            key: 1000,
            ariacontrols: "tabpanel-1",
            rows: [
                {
                    key: 1005,
                    cols: ['descripcion', 'codigo', 'convocatoriaId', 'participantes']
                },
                {
                    key: 1006,
                    cols: ['ambito_geo']
                },
                {
                    key: 1007,
                    cols: ['inicio', 'fin', 'presupuesto', 'porcentaje_total', 'porcentaje_cofinanciacion']
                },
                {
                    key: 1008,
                    cols: ['fondos_propios', 'cofinanciacion', 'entidadId']
                },
                {
                    key: 1011,
                    cols: ['colectivos']
                },
                {
                    key: 1013,
                    cols: ['objetivos']
                },
                {
                    key: 1014,
                    cols: ['adjuntos']
                },
            ]
        },
        {
            caption: Liferay.Language.get("Acciones"),
            key: 2000,
            ariacontrols: "tabpanel-2",
            rows: [
                {
                    key: 2014,
                    cols: ['acciones']
                },
            ]
        },
        {
            caption: Liferay.Language.get("Ofertas"),
            key: 3000,
            ariacontrols: "tabpanel-3",
            rows: [
                {
                    key: 3015,
                    cols: ['ofertas']
                },
            ]
        },
        {
            caption: Liferay.Language.get("Participantes"),
            key: 4000,
            ariacontrols: "tabpanel-4",
            rows: [
                {
                    key: 4015,
                    cols: ['oparticipantes']
                },
            ]
        },
        {
            caption: Liferay.Language.get("Empresas"),
            key: 5000,
            ariacontrols: "tabpanel-5",
            rows: [
                {
                    key: 5016,
                    cols: ['empresas']
                },
            ]
        },
        {
            caption: Liferay.Language.get("Técnicos"),
            key: 6000,
            ariacontrols: "tabpanel-6",
            rows: [
                {
                    key: 6016,
                    cols: ['tecnicos']
                },
            ]
        },
        {
            caption: Liferay.Language.get("Histórico"),
            key: 7000,
            ariacontrols: "tabpanel-7",
            admin: true,
            rows: [
                {
                    key: 6021,
                    cols: ['historico']
                },
            ]
        },

    ],
    table: {
        id: {
            columnTitle: "Id",
            columnType: "checkbox",
            key: "c1",
        },
        codigo: {
            columnTitle: Liferay.Language.get('Código'),
            columnType: "string",
            key: "c9",
        },
        convocatoria: {
            columnTitle: Liferay.Language.get('Convocatoria'),
            columnType: "multilang",
            key: "c10",
        },
        descripcion: {
            columnTitle: Liferay.Language.get('Descripcion'),
            columnType: "multilang",
            key: "c3",
        },
        presupuesto: {
            columnTitle: Liferay.Language.get('Presupuesto'),
            columnType: "string",
            key: "c4",
        },
        inicio: {
            columnTitle: Liferay.Language.get('F. Inicio'),
            columnType: "string",
            key: "c5",
        },
        fin: {
            columnTitle: Liferay.Language.get('F. Fin'),
            columnType: "string",
            key: "c6",
        },
        participantes: {
            columnTitle: Liferay.Language.get('Participantes'),
            columnType: "string",
            key: "c8",
        },
    },
    searchFields: ['codigo', 'descripcion', 'convocatoria'],
    searchField: 'descripcion',
};
