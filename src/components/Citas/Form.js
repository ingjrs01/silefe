import { Liferay } from '../../common/services/liferay/liferay';
import { GenericForm } from "../../includes/GenericForm";

export const form = {
    ...GenericForm,
    title: Liferay.Language.get('Citas'),
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
		tipoCitaId: {
            key:2,
            type: "select",
            label: Liferay.Language.get('TipoCita'),
            name: "tipoCitaId",
            enabled:true,
            conditions: [],
            options: [],
            className: 'col-3',
            change: () => {console.log("cambiando el tipo de documento")}
        },
		appointmentDate: {
            key:3,
            type: "date",
            label: Liferay.Language.get('FechaCita'),
            name: "appointmentDate",
            value:"",
            placeholder:Liferay.Language.get('YYYY-MM-DD'),
            className: 'col-3',
            conditions:[]
        },
		appointmentHour: {
            key:3,
            type: "hour",
            label: Liferay.Language.get('HoraCita'),
            name: "appointmentHour",
            value:"",
            placeholder:Liferay.Language.get('YYYY-MM-DD'),
            className: 'col-2',
            conditions:[]
        },
		methodId: {
            key:5,
            type: "select",
            label: Liferay.Language.get('Método'),
            name: "methodId",
            enabled:true,
            conditions: [],
            options: [],
            className: 'col-4',
            change: () => {console.log("cambiando el tipo método")}
        },
		originInId: {
            key:6,
            type: "select",
            label: Liferay.Language.get('Origen'),
            name: "originInId",
            enabled:true,
            conditions: [],
            options: [],
            className: 'col-4',
            change: () => {console.log("cambiando el origen")}
        },
		participantInId: {
            key:7,
            type: "selectfilter",
            label: Liferay.Language.get('Participante'),
            name: "participantInId",
            enabled:true,
            conditions: [],
            options: [],
            className: 'col-4',
            change: () => {console.log("cambiando el participante")}
        },
		tecnicoInId: {
            key:8,
            type: "select",
            label: Liferay.Language.get('Técnico'),
            name: "tecnicoInId",
            enabled:true,
            conditions: [],
            options: [],
            className: 'col-4',
            change: () => {console.log("cambiando el tecnico")}            
        },
		originOutId: {
            key:9,
            type: "select",
            label: Liferay.Language.get('Origen'),
            name: "originOutId",
            enabled:true,
            conditions: [],
            options: [],
            className: 'col-4',
            change: () => {console.log("cambiando el origen")}
        },
		participantOutId: {
            key:10,
            type: "selectfilter",
            label: Liferay.Language.get('Participante'),
            name: "participantOutId",
            enabled:true,
            conditions: [],
            options: [],
            className: 'col-4',
            change: () => {console.log("cambiando el participante")}
        },
		tecnicoOutId: {
            key:11,
            type: "select",
            label: Liferay.Language.get('Técnico'),
            name: "tecnicoOutId",
            enabled:true,
            conditions: [],
            options: [],
            className: 'col-4',
            change: () => {console.log("cambiando el tecnico")}
        },
		subject: {
            key:12,
            type: "text",
            label: "Asunto",
            name: "subject",
            value:"",
            placeholder:"Asunto",
            conditions: ["text"],
        },
		comments: {
            key:17,
            type: "textarea",
            label: Liferay.Language.get('Comentarios'),
            name: "comments",
            value:"",
            placeholder:Liferay.Language.get('Comentarios'),
            conditions:["text"]
        },
    },
    rows: [
        {
            key:41,
            cols: ['tipoCitaId','appointmentDate', 'appointmentHour','methodId']
        },
        {
            key:43,
            cols: ['originInId','participantInId', 'tecnicoInId']
        },
        {
            key:44,
            cols: ['originOutId','participantOutId', 'tecnicoOutId']
        },
        {
            key:46,
            cols: ['subject']
        },
        {
            key: 48,
            cols: ['comments']
        },
    ],
    table: {
        id: {
            columnTitle: "Id",
            columnType: "checkbox",
            key: "tc1",
        },
        appointmentDate: {
            columnTitle: Liferay.Language.get('Fecha'),
            columnType: "string",
            key: "tc2",
        },
        method: {
            columnTitle: Liferay.Language.get('Método'),
            columnType: "multilang",
            key: "tc5",
        },
        origen: {
            columnTitle: Liferay.Language.get('Origen'),
            columnType: "string",
            key: "tc3",
        },
        participantInName: {
            columnTitle: Liferay.Language.get('Participante'),
            columnType: "string",
            key: "tc4",
        },
    },
    searchFields: ['appointmentDate'],
};
