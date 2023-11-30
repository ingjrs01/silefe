export const form = {
    title: Liferay.Language.get('Titulaciones'),
    languages: ["es-ES","en-US","gl-ES"],
    beforeEdit: ()=>console.log("beforeEdit"),
    fields: {
        id: {
            key:1,
            type: "text",
            label: "ID", 
            name: "id", 
            value:"lalala", 
            placeholder:"Identifier", 
            conditions: ["number"],
        },
        titulacionTipoId : {
            key:2,
            type: "select",
            label: Liferay.Language.get('TitTipo'), 
            name: "titulacionTipoId", 
            enabled:true,
            conditions: [],            
            options: []  
        },
        titulacionNivelId : {
            key:3,
            type: "select",
            label: Liferay.Language.get('TitNivel'), 
            name: "titulacionNivelId", 
            enabled:true,
            conditions: [],
            options: []  
        },
        titulacionFamiliaId : {
            key:4,
            type: "select",
            label: Liferay.Language.get('TitFamilia'), 
            name: "titulacionFamiliaId", 
            enabled:true,
            placeholder: Liferay.Language.get('TitFamilia'), 
            conditions: [],
            options: []  
        },
        descripcion: { 
            key: 5, 
            type: "multilang",
            label: Liferay.Language.get('Descripcion'), 
            name: "descripcion", 
            value: "", 
            placeholder: Liferay.Language.get('Descripcion'), 
            conditions: ["text"] 
        },
        familia: { 
            key: 6, 
            type: "multilang",
            label: Liferay.Language.get('Familia'), 
            name: "familia", 
            value: "", 
            placeholder: Liferay.Language.get('Familia'), 
            conditions: ["text"] 
        },
        nivel: {
            key:7,
            type: "text",
            label: Liferay.Language.get("Nivel"), 
            name: "nivel", 
            value:"lalala", 
            placeholder:"Nivel", 
        },
        tipo: {
            key:8,
            type: "text",
            label: Liferay.Language.get("Tipo"), 
            name: "tipo", 
            value:"lalala", 
            placeholder:"Tipo", 
        },
    },
    rows: [
        {
            key:41,
            cols: ['id']
        },
        {
            key:42,
            cols: ['titulacionTipoId','titulacionNivelId','titulacionFamiliaId']
        },        
        {
            key: 43,
            cols: ['descripcion']
        }
    ],
    table: {
        titulacionId: {
            columnTitle: "Id",
            columnType: "checkbox",
            key: "c1",
        },
        descripcion: {
            columnTitle: Liferay.Language.get('Titulacion'),
            columnType: "multilang",
            key: "c3",
        },
        familia: {
            columnTitle: Liferay.Language.get('Familia'),
            columnType: "multilang",
            key: "c4",
        },
        nivel: {
            columnTitle: Liferay.Language.get("Nivel"),
            columnType: "multilang",
            key: "c5",
        },
        tipo: {
            columnTitle: Liferay.Language.get("Tipo"),
            columnType:"multilang",
            key: "c6",
        }
    },
    searchFields: ['descripcion','familia','nivel','tipo'],
};
