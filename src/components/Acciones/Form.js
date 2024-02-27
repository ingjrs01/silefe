import { Liferay } from '../../common/services/liferay/liferay';
import { GenericForm } from '../../includes/GenericForm';

export const form = {
    ...GenericForm,
    title: Liferay.Language.get('Acciones'),
    languages: ["es-ES","en-US","gl-ES"],
    beforeEdit: () => console.log("beforeEdit desde el Form"),
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
        accionTipoId : {
            key:2,
            type: "select",
            label: Liferay.Language.get('Tipo'),
            name: "accionTipoId",
            enabled:true,
            conditions: [],
            options: []
        },
        accionTipoFormacionId : {
            key:3,
            type: "select",
            label: Liferay.Language.get('TipoFormación'),
            name: "accionTipoFormacionId",
            enabled:true,
            conditions: [],
            options: []
        },
        teorica: {
            key:4,
            type: "toggle",
            label: Liferay.Language.get('Teorica'),
            name: "teorica",
            value:"",
            conditions: []
        },
        practica: {
            key:5,
            type: "toggle",
            label: Liferay.Language.get('Práctica'),
            name: "practica",
            value:"",
            conditions: []
        },
        grupal: {
            key:6,
            type: "toggle",
            label: Liferay.Language.get('Grupal'),
            name: "grupal",
            value:"",
            conditions: []
        },
        tecnicoId: {
            key:7,
            type: "select",
            label: Liferay.Language.get('Técnico'),
            name: "tecnicoId",
            enabled:true,
            conditions: [],
            options: []
        },
        horas: {
            key:8,
            type: "number",
            label: "Horas",
            name: "horas",
            placeholder:"Horas",
            conditions: ["number"],
        },
        nombre: {
            key:9,
            type: "multilang",
            label: Liferay.Language.get('Nombre'),
            name: "nombre",
            value:"lelele",
            placeholder: Liferay.Language.get('Nombre'),
            conditions: ["text"]
        },
		plataformaId: {
            key:10,
            type: "select",
            label: Liferay.Language.get('Plataforma'),
            name: "plataformaId",
            value:"lelele",
            placeholder: Liferay.Language.get('Plataforma'),
            options: [{value: 0, label:"bla bla"}, {value: 1, label: "Categoría"},{value: 2, label: "Sin Categoría"}],
        },
		categoriaId: {
            key: 11,
            type: "select",
            label: Liferay.Language.get('Categoría'),
            name: "categoriaId",
            placeholder: Liferay.Language.get('Categoría'),
        },
		cursoId: {
            key: 12,
            type: "select",
            label: Liferay.Language.get('Curso'),
            name: "cursoId",
            value:"lelele",
            placeholder: Liferay.Language.get('Curso'),
        },
		nparticipantes: {
            key: 13,
            type: "text",
            label: Liferay.Language.get('Participantes'),
            name: "nparticipantes",
            value:"lelele",
            placeholder: Liferay.Language.get('Participantes'),
            conditions: ["number"]
        },
		sincronizados: {
            key:14,
            type: "text",
            label: Liferay.Language.get('Sincronizados'),
            name: "sincronizados",
            value:"lelele",
            placeholder: Liferay.Language.get('Sincronizados'),
            conditions: ["number"]
        },
		estadoId: {
            key: 15,
            type: "select",
            label: Liferay.Language.get('Estado'),
            name: "estadoId",
            placeholder: Liferay.Language.get('Estado'),
            options: [{value: 0, label: Liferay.Language.get("Seleccionar")}, {value: 1, label: "Categoría"},{value: 2, label: "Sin Categoría"}],
            change: () => console.log("ha cambiado el estado"),
        },
		ultimoEstado: {
            key: 16,
            type: "hidden",
            label: Liferay.Language.get('UltimoEstado'),
            name: "ultimoEstado",
        },
        observaciones: {
            key: 17,
            type: "text",
            label: Liferay.Language.get('Observaciones'),
            name: "observaciones",
            placeholder: Liferay.Language.get('Observaciones'),
        },
        adjuntos: {
            key:18,
            type: "file",
            label: Liferay.Language.get('Adjuntos'), 
            name: "adjuntos", 
        },        
    },
    rows: [
        {
            key:9,
            cols: ['id']
        },
        {
            key:8,
            cols: ['accionTipoId', 'nombre'],
        },
        {
            key:10,
            cols: ['accionTipoFormacionId', 'teorica', 'practica', 'grupal'],
        },
        {
            key:11,
            cols: ['horas'],
        },
        {
            key: 13,
            cols: ['adjuntos'],
        },
        {
            key:12,
            cols: ['tecnicoId'],
        },
    ],
    table: {
        id: {
            columnTitle: "Id",
            columnType: "checkbox",
            key: "col1",
        },
//        acctionTipo: {
//            columnTitle: Liferay.Language.get('Tipo'),
//            columnType: "string",
//            key: "c2",
//        },
        nombre: {
            columnTitle: Liferay.Language.get('Nombre'),
            columnType: "multilang",
            key: "col3",
        },
        tipo: {
            columnTitle: Liferay.Language.get('Tipo'),
            columnType: "multilang",
            key: "c4",
        },
        formacion: {
            columnTitle: Liferay.Language.get('Formacion'),
            columnType: "multilang",
            key: "col9",
        },
        teorica: {
            columnTitle: Liferay.Language.get('Teórica'),
            columnType: "boolean",
            key: "col5",
        },
        practica: {
            columnTitle: Liferay.Language.get('Práctica'),
            columnType: "boolean",
            key: "c6",
        },
        grupal: {
            columnTitle: Liferay.Language.get('Grupal'),
            columnType: "boolean",
            key: "col7",
        },
        horas: {
            columnTitle: Liferay.Language.get('Horas'),
            columnType: "string",
            key: "col8",
        },
        estado: {
            columnTitle: Liferay.Language.get('Estado'),
            columnType: "multilang",
            key: "col10",
        }
    },
    searchFields: ['nombre','accionTipoId','accionTipoFormacionId', 'estadoId'],
    searchField: 'nombre',
};
