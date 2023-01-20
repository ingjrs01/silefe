
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
            key:1,
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
            key:51,
            type: "date",
            label: Liferay.Language.get('Inicio'), 
            name: "inicio", 
            value:"lelele", 
            placeholder:Liferay.Language.get('YYYY-MM-DD'),
            conditions:[]
        },
        fin: {
            key:22,
            type: "date",
            label: Liferay.Language.get('Fin'), 
            name: "fin", 
            value:"lelele", 
            placeholder:Liferay.Language.get('Fin'),
            placeholder:Liferay.Language.get('YYYY-MM-DD'),
            conditions:[]
        },
        participantes: {
            key:22,
            type: "text",
            label: Liferay.Language.get('Participantes'), 
            name: "participantes", 
            placeholder: "0",
            conditions:["number"]
        },
        fondos_propios: {
            key:71,
            type: "toggle",
            label: Liferay.Language.get('FondosPropios'), 
            name: "fondos_propios", 
            value:"lelele", 
            change: ()=>{console.log("cambia fondos propios");}
        },
        cofinanciacion: {
            key:72,
            type: "toggle",
            label: Liferay.Language.get('Cofinanciacion'), 
            name: "cofinanciacion", 
            value:"lelele", 
            placeholder:Liferay.Language.get('Cofinanciacion'),
            change: ()=>{console.log("cambia cofinanciacion");}
        },        
        convocatoriaId: {
            key:77,
            type: "select",
            label: Liferay.Language.get('Convocatoria'), 
            name: "convocatoriaId", 
            enabled:true,
            change: ()=>{console.log("cambia el select");}
        },
        entidadId: {
            key:73,
            type: "select",
            label: Liferay.Language.get('Entidad'), 
            name: "entidadId", 
            value:"lelele", 
            enabled:true,
            change: ()=>{console.log("cambia el select");}
        },
        ambito_geo: {
            key:73,
            type: "text",
            label: Liferay.Language.get('Ambito'), 
            name: "ambito_geo", 
            value:"lelele", 
            enabled:true,
            conditions: []
        },
        presupuesto: {
            key: 80,
            type: "text",
            label: Liferay.Language.get("Presupuesto"),
            name: "presupuesto",
            placeholder: "presupuesto",
            enabled: true,
            conditions:["number"]
        },
        porcentaje_total: {
            key: 81,
            type: "text",
            label: Liferay.Language.get("Porcentaje"),
            name: "porcentaje_total",
            placeholder: "",
            enabled: true,
            conditions:["number"]
        },
        porcentaje_cofinanciacion: {
            key: 82,
            type: "text",
            label: Liferay.Language.get("Porcentaje_cofinanciacion"),
            name: "porcentaje_cofinanciacion",
            placeholder: "",
            enabled: true,
            conditions:["number"]
        },
        colectivos: {
            key: 83,
            type: "multilist",
            label: Liferay.Language.get("Colectivos"),
            name: 'colectivos',
            placeholder: 'lalala',
            enabled: true
        },
        objetivos: {
            key:55,
            type: "textarea",
            label: Liferay.Language.get('Objetivos'), 
            name: "objetivos", 
            value:"lelele", 
            placeholder:Liferay.Language.get('Objetivos'),
            conditions:["text"]
        }
    },
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
            key: 5,
            cols: [ 'inicio','fin', 'participantes' ]
        },
        {
            key: 7,
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
        {
            key: 12,
            cols: ['objetivos']
        },
    ],
    table: {
        id: {
            columnTitle: "Id",
            columnType: "checkbox",
            key: "c1",
        },
        descripcion: {
            columnTitle: Liferay.Language.get('Descripcion'),
            columnType: "multilang",
            key: "c3",
        },
    }

};
