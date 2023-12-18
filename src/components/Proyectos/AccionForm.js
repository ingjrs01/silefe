import { Liferay } from '../../common/services/liferay/liferay';

export const form = {
    title: Liferay.Language.get('Acciones'),
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
            type: "text",
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
        },
        observaciones: {
            key: 16,
            type: "text",
            label: Liferay.Language.get('Observaciones'), 
            name: "observaciones", 
            placeholder: Liferay.Language.get('Observaciones'), 

        }
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
            key:12,
            cols: ['tecnicoId'],
        },
    ],
    table: [
        {
            columnName: "tipo",
            columnTitle: Liferay.Language.get('Tipo'),
            columnType: "multilang",
            key: "c4",
        },
        {
            columnName: "nombre", 
            columnTitle: Liferay.Language.get('Nombre'),
            columnType: "multilang",
            key: "c3",
        },
        {
            columnName: "formacion", 
            columnTitle: Liferay.Language.get('Formacion'),
            columnType: "multilang",
            key: "c9",
        },
        /*
        {
            columnName: "teorica", 
            columnTitle: Liferay.Language.get('Teórica'),
            columnType: "boolean",
            key: "c5",
        },
        {
            columnName: "practica",
            columnTitle: Liferay.Language.get('Práctica'),
            columnType: "boolean",
            key: "c6",
        },
        {
            columnName: "grupal",
            columnTitle: Liferay.Language.get('Grupal'),
            columnType: "boolean",
            key: "c7",
        },*/
        {
            columnName: "horas", 
            columnTitle: Liferay.Language.get('Horas'),
            columnType: "string",
            key: "c8",
        },
    ],
    searchFields: ['accionTipoId','nombre','accionTipoFormacionId'],
};
