export const form = {
    title: Liferay.Language.get('Empresas'),
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
        tipoDoc: {
            key:11,
            type: "select",
            label: Liferay.Language.get('TipoDocumento'), 
            name: "tipoDoc", 
            enabled:true,
            conditions: [],
            change: () => {console.log("cambiando el tipo de documento")}
        },
        documento: {
            key:12,
            type: "text",
            label: Liferay.Language.get('Documento'), 
            name: "documento", 
            value:"documento", 
            placeholder: Liferay.Language.get('Documento'), 
            conditions: []
        },
        razonSocial: {
            key:3,
            type: "text",
            label: Liferay.Language.get('RazonSocial'), 
            name: "razonSocial", 
            value:"nombre", 
            placeholder: Liferay.Language.get('RazonSocial'), 
            conditions: ["text"]
        },
        email: {
            key: 22,
            type: "multitext",
            label: Liferay.Language.get('Email'), 
            name: "email", 
            values: [{key:1,value:"hola@micorreo.es",default:false}, {key:2,value:"adios@micorreo.es",default:true}], 
            placeholder: Liferay.Language.get('Email'), 
            conditions: ["text"]
        },
        telefono: {
            key: 23,
            type: "multitext",
            label: Liferay.Language.get('Telefono'), 
            name: "telefono", 
            values: [{key:1,value:"666666666",default:false}, {key:2,value:"777777777",default:true}], 
            placeholder: Liferay.Language.get('Telefono'), 
            conditions: ["text"]
        },
        centros: {
            key: 24,
            type: "other",
            componentName: "Centros",
            name: "centros",
        }
    },
    tabActive:0,
    tabs : [
        {
            caption: "Datos",
            key: 1,
            ariacontrols: "tabpanel-1",
            rows: [
                {
                    key:41,
                    cols: ['id','tipoDoc','documento']
                },
                {
                    key:42,
                    cols: ['razonSocial']
                },        
                {
                    key:43,
                    cols: ['email','telefono']
                },               
            ]
        },
        {
            caption: "Centros",
            key:2,
            ariacontrols: "tabpanel-2",
            rows: [
                {
                    key:53,
                    cols: ['centros']
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
        documento: {
            columnTitle: Liferay.Language.get('CIF'),
            columnType: "string",
            key: "c2",
        },
        razonSocial: {
            columnTitle: Liferay.Language.get('RazonSocial'),
            columnType: "string",
            key: "c3",
        },
    }    
};
