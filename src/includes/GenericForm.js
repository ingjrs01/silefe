
export const GenericForm = {
    title: Liferay.Language.get('Elemento'),
    languages: ["es-ES","en-US","gl-ES"],
    beforeEdit: () => console.log("beforeEdit desde el Form"),
    downloadFunc: () => console.log("download a file in excel format"),
    handleSave: () => console.log("gestionando guardado en GenericForm"),
    loadCsv: () => console.log("gestionando carga de datos desde GenericForm"),
    fields: {
        id: {
            key:1,
            type: "text",
            label: "ID",
            name: "id",
            value:"identifier",
            placeholder:"Identifier",
            conditions: ["number"]
        },
    },
    rows: [
        {
            key:9,
            cols: ['id']
        },
    ],
    table: {
        id: {
            columnTitle: "Id",
            columnType: "checkbox",
            key: "c1",
        },
    },
    searchFields: [],
};
