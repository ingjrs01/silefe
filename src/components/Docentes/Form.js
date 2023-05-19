export const form = {
    title: Liferay.Language.get('Docentes'),
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
            label: "Nombre", 
            name: "nombre", 
            value:"lalala", 
            placeholder:"Nombre", 
            conditions: ["text"]
        },
        apellido1: {
            key:3,
            type: "text",
            label: "Apellido 1", 
            name: "apellido1", 
            value:"lalala", 
            placeholder:"", 
            conditions: ["text"]
        },
        apellido2: {
            key:4,
            type: "text",
            label: "Apellido 2", 
            name: "apellido2", 
            value:"lalala", 
            placeholder:"", 
            conditions: ["text"]
        },
        documento: {
            key:5,
            type: "text",
            label: "Documento", 
            name: "documento", 
            value:"", 
            placeholder:"", 
            conditions: ["text"]
        },
        cpostal: {
            key:6,
            type: "text",
            label: "Código Postal", 
            name: "cpostal", 
            value:"", 
            placeholder:"", 
            conditions: ["text"]
        },
        nombreVia: {
            key:7,
            type: "text",
            label: "Via", 
            name: "nombreVia", 
            value:"", 
            placeholder:"", 
            conditions: ["text"]
        },
        numero: {
            key:8,
            type: "text",
            label: "Número", 
            name: "numero", 
            value:"", 
            placeholder:"", 
            conditions: ["text"]
        },
        piso: {
            key:9,
            type: "text",
            label: "Piso", 
            name: "piso", 
            value:"", 
            placeholder:"", 
            conditions: ["text"]
        },
        tipoDoc: {
            key:10,
            type: "select",
            label: Liferay.Language.get('TipoDocumento'), 
            name: "tipoDoc", 
            enabled:true,
            conditions: [],
            change: () => {console.log("cambiando el tipo de documento")}
        },
        sexo: {
            key:11,
            type: "radio",
            label: Liferay.Language.get('Sexo'), 
            name: "sexo", 
            change: ()=>{console.log("cambia sexo");},
            //conditions: []
        },
        fechaNacimiento: {
            key:12,
            type: "date",
            label: Liferay.Language.get('FechaNacimiento'), 
            name: "fechaNacimiento", 
            value:"", 
            yearmin: 110,
            yearmax: 0,
            placeholder:Liferay.Language.get('YYYY-MM-DD'),
            conditions:[]
        },
        provinciaId: {
            key:13,
            type: "select",
            label: Liferay.Language.get('Provincia'), 
            name: "provinciaId", 
            value:"", 
            enabled:true,
            conditions: []
        },
        municipioId: {
            key:14,
            type: "select",//"autocomplete",
            label: Liferay.Language.get('Municipio'), 
            name: "municipioId", 
            value:"", 
            enabled:true,
            conditions: []
        },
        localidad: {
            key:15,
            type: "text",
            label: Liferay.Language.get('Localidad'), 
            name: "Localidad", 
            value:"localidad", 
            placeholder: Liferay.Language.get('Localidad'), 
            conditions: ["text"]
        },
        tipoviaId: {
            key:16,
            type: "select",
            label: Liferay.Language.get('TipoVia'), 
            name: "tipoviaId", 
            value:"", 
            change: () => {console.log("tipoViaId")},
            enabled:true,
            conditions: []
        },
        email: {
            key: 17,
            type: "multitext",
            label: Liferay.Language.get('Email'), 
            name: "email", 
            values: [{key:1,value:"hola@micorreo.es",default:false}, {key:2,value:"adios@micorreo.es",default:true}], 
            placeholder: Liferay.Language.get('Email'), 
            conditions: ["text"]
        },
        telefono: {
            key: 18,
            type: "multitext",
            label: Liferay.Language.get('Telefono'), 
            name: "telefono", 
            values: [{key:1,value:"666666666",default:false}, {key:2,value:"777777777",default:true}], 
            placeholder: Liferay.Language.get('Telefono'), 
            conditions: ["text"]
        },      
    },
    rows: [
        {
            key:40,
            cols: ['id']
        },
        {
            key:43,
            cols: ['nombre','apellido1','apellido2']
        },        
        {
            key:42,
            cols: ['fechaNacimiento', 'sexo']
        },        
        {
            key:44,
            cols: ['provinciaId', 'municipioId']//,'localidad']
        },
        {
            key:45,
            cols: ['tipoviaId','nombreVia','numero','piso']
        },               
        {
            key:46,
            cols: ['email','telefono']
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
            key: "c3",
        },
    }    
};
