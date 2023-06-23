
export const form = {
    title: Liferay.Language.get('Proyectos'),
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
        codigo: {
            key:2,
            type: "text",
            label: Liferay.Language.get('Codigo'), 
            name: "codigo", 
            value:"lalala", 
            placeholder:"Identifier", 
            conditions: ["text"]
        },
        descripcion: {
            key:3,
            type: "multilang",
            label: Liferay.Language.get('Nombre'), 
            name: "descripcion", 
            value:"lelele", 
            placeholder:Liferay.Language.get('Nombre'),
            conditions:["text"]
        },
        inicio: {
            key:4,
            type: "date",
            label: Liferay.Language.get('Inicio'), 
            name: "inicio", 
            value:"lelele", 
            yearmin: 5,
            yearmax: 5,
            placeholder:Liferay.Language.get('YYYY-MM-DD'),
            conditions:[]
        },
        fin: {
            key:5,
            type: "date",
            label: Liferay.Language.get('Fin'), 
            name: "fin", 
            yearmin: 5,
            yearmax: 5,
            value:"lelele", 
            placeholder:Liferay.Language.get('Fin'),
            placeholder:Liferay.Language.get('YYYY-MM-DD'),
            conditions:[]
        },
        participantes: {
            key:6,
            type: "text",
            label: Liferay.Language.get('Participantes'), 
            name: "participantes", 
            placeholder: "0",
            conditions:["number"]
        },
        fondos_propios: {
            key:7,
            type: "toggle",
            label: Liferay.Language.get('FondosPropios'), 
            name: "fondos_propios", 
            value:"lelele", 
            change: ()=>{console.log("cambia fondos propios");}
        },
        cofinanciacion: {
            key:8,
            type: "toggle",
            label: Liferay.Language.get('Cofinanciacion'), 
            name: "cofinanciacion", 
            value:"lelele", 
            placeholder:Liferay.Language.get('Cofinanciacion'),
            change: ()=>{console.log("cambia cofinanciacion");}
        },        
        convocatoriaId: {
            key:9,
            type: "select",
            label: Liferay.Language.get('Convocatoria'), 
            name: "convocatoriaId", 
            enabled:true,
            change: ()=>{console.log("cambia el select");}
        },
        entidadId: {
            key:10,
            type: "select",
            label: Liferay.Language.get('Entidad'), 
            name: "entidadId", 
            value:"lelele", 
            enabled:true,
            change: ()=>{console.log("cambia el select");}
        },
        ambito_geo: {
            key:11,
            type: "text",
            label: Liferay.Language.get('Ambito'), 
            name: "ambito_geo", 
            value:"lelele", 
            enabled:true,
            conditions: []
        },
        presupuesto: {
            key: 12,
            type: "text",
            label: Liferay.Language.get("Presupuesto"),
            name: "presupuesto",
            placeholder: "presupuesto",
            enabled: true,
            conditions:["number"]
        },
        porcentaje_total: {
            key: 13,
            type: "text",
            label: Liferay.Language.get("Porcentaje"),
            name: "porcentaje_total",
            placeholder: "",
            enabled: true,
            conditions:["number"]
        },
        porcentaje_cofinanciacion: {
            key: 14,
            type: "text",
            label: Liferay.Language.get("Porcentaje_cofinanciacion"),
            name: "porcentaje_cofinanciacion",
            placeholder: "",
            enabled: true,
            conditions:["number"]
        },
        colectivos: {
            key: 15,
            typexperienciaRequeridoe: "multilist",
            label: Liferay.Language.get("Colectivos"),
            name: 'colectivos',
            placeholder: 'lalala',
            enabled: true
        },
        //tecnicos: {
        //    key: 16,
        //    type: "multilist",
        //    label: Liferay.Language.get("Tecnicos"),
        //    name: 'tecnicos',
        //    //placeholder: 'lalala',
        //    enabled: true
        //},
        objetivos: {
            key:17,
            type: "text",// "textarea",
            label: Liferay.Language.get('Objetivos'), 
            name: "objetivos", 
            value:"lelele", 
            placeholder:Liferay.Language.get('Objetivos'),
            conditions:["text"]
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

    },
    tabActive: 0,
    tabs: [
        {
            caption: "Datos",
            key: 1,
            ariacontrols: "tabpanel-1",
            rows: [
                {
                    key: 5,
                    cols: ['id','codigo', 'convocatoriaId']
                },
                {
                    key: 6,
                    cols: ['descripcion', 'ambito_geo' ]
                },
                {
                    key: 7,
                    cols: [ 'inicio','fin', 'participantes' ]
                },
                {
                    key: 8,
                    cols: ['fondos_propios', 'cofinanciacion', 'entidadId']
                },
                {
                    key: 10,
                    cols: ['presupuesto','porcentaje_total','porcentaje_cofinanciacion']
                },
                {
                    key: 11,
                    cols: ['colectivos']
                },
                //{
                //    key: 12,
                //    cols: ['tecnicos']
                //},
                {
                    key: 13,
                    cols: ['objetivos']
                },
            ]
        },
        {
            caption: Liferay.Language.get("Acciones"),
            key: 2,
            ariacontrols: "tabpanel-2",
            rows: [
                {
                    key: 14,
                    cols: ['acciones']
                },
            ]
        },
        {
            caption: Liferay.Language.get("Ofertas"),
            key: 3,
            ariacontrols: "tabpanel-3",
            rows: [
                {
                    key: 15,
                    cols: ['ofertas']
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
        ambito_geo: {
            columnTitle: Liferay.Language.get('Amb. Geográfico'),
            columnType: "string",
            key: "c7",
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
    searchFields: ['codigo', 'descripcion','convocatoria'],
};
