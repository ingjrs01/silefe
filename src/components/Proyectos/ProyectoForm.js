export const form = {
    title: Liferay.Language.get('Proyectas'),
    languages: ["es-ES","en-US","gl-ES"],
    rows: [
        {
            key: 5,
            type:"row",
            classname:"",
            cols: {
                id: {
                    key:1,
                    type: "text",
                    label: "ID", 
                    name: "id", 
                    value:"lalala", 
                    placeholder:"Identifier", 
                    conditions: ["number"]
                },
            }
        },
        {
            key: 6,
            type:"row",
            classname:"",
            cols: {
                descripcion: {
                    key:3,
                    type: "multilang",
                    label: Liferay.Language.get('Nombre'), 
                    name: "descripcion", 
                    value:"lelele", 
                    placeholder:Liferay.Language.get('Nombre'),
                    conditions:["text"]
                },
            }
        },
        {
            key: 5,
            type:"row",
            classname:"",
            cols: {
                inicio: {
                    key:51,
                    type: "date",
                    label: Liferay.Language.get('Inicio'), 
                    name: "inicio", 
                    value:"lelele", 
                    placeholder:Liferay.Language.get('YYYY-MM-DD'),
                },
                fin: {
                    key:22,
                    type: "date",
                    label: Liferay.Language.get('Fin'), 
                    name: "fin", 
                    value:"lelele", 
                    placeholder:Liferay.Language.get('Fin'),
                    placeholder:Liferay.Language.get('YYYY-MM-DD'),
                },
            }
        },
        {
            key: 7,
            type:"row",
            classname:"",
            cols: {
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
                entidadId: {
                    key:73,
                    type: "select",
                    label: Liferay.Language.get('Entidad'), 
                    name: "entidadId", 
                    value:"lelele", 
                    enabled:true,
                    change: ()=>{console.log("cambia el select");}
                },
            }
        },
        {
            key: 8,
            type:"row",
            classname:"",
            cols: {
            }
        }

    ]           
};
