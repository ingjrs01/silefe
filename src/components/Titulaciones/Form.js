export const form = {
    title: Liferay.Language.get('Titulaciones'),
    languages: ["es-ES","en-US","gl-ES"],
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
        titulacionFamiliaDescripcion: {
            columnTitle: Liferay.Language.get('Familia'),
            columnType: "string",
            key: "c4",
        },
    }    
};
