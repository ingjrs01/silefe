
export const CITAS_ACTIONS = {
    START: 0,
    LOAD: 1,
    NEW_ITEM: 2,
    SAVE: 3,
    CANCEL: 4,
    SET: 5,
    DELETE: 15,
    SELECT_ITEM: 6,
    SETFORM: 7,
    VIEW: 8,
    ADDERROR: 9,
    CLOSEVIEW: 11,
    SETPAGE: 10,
    SAVE: 80,
    EMPTY: 91,
}

export const CITAS_STATES = {
    LIST: 1,
    VIEW: 2,
}

export const initialState = {
    items: [],
    item: {id: 0},
    form: {
        title: "Citas",
    },
    errors: [],
    pagination: {
        page: 0,
        pageSize: 4,
        totalPages: 1,
    },
    status: CITAS_STATES.LIST,
}
let tmp = [];
export const reducerCitas = (state=initialState, action ) => {   
    switch (action.type) {
    case CITAS_ACTIONS.START:
        return {
            ...initialState
        }
    case CITAS_ACTIONS.NEW_ITEM: 
        return {
            ...state,
            status: CITAS_STATES.VIEW, 
            item: {
                id: 0,                
                //participantOutId:"1601",
                tipoCitaId:"0",
                citaId:"0",
                comments:"",
                method:{en_US: "Email", es_ES: "Email", gl_ES: "Email"},
                subject:"",
                //participantInTelefono:"[{\"key\":1,\"value\":\"659847474\",\"default\":true}]",
                methodId:"1",
                originInId:"1",
                origen:"Participante",
                //participantInId:"1601",
                appointmentHour:"16:30",
                //participantInName:"Jose Pedro Castro Castro",
                tecnicoInId:"0",
                //tecnicoOutId:"0",
                //participantInEmail:"[{\"key\":1,\"value\":\"jose.pedro@gmail.com\",\"default\":true}]",
                id:"0",
                appointmentDate:"",
                originOutId:"1",
                appointmentDateTime:"",
            }
        }
    case CITAS_ACTIONS.EMPTY: 
        return {
            items: [],
            item: {id: 0},
            errors: [],
            pagination: {
                page: 0,
                pageSize: 4,
                totalPages: 1,
            },
            status: CITAS_STATES.LIST,        
        }
    case CITAS_ACTIONS.LOAD: 
        return {
            ...state, 
            items: action.items,
            pagination: {
                ...state.pagination,
                totalPages: action.totalPages, 
                total: action.total,                
            }
        }
    case CITAS_ACTIONS.SETFORM: 
        return {
            ...state,
            status: CITAS_STATES.LIST, 
            form: {
                ...state.form,
                ...action.form,
            }
        }
    case CITAS_ACTIONS.VIEW:
        return {
            ...state,
            status: CITAS_STATES.VIEW, 
            item: {
                ...state.items[action.index]
            }
        }
    case CITAS_ACTIONS.CLOSEVIEW: 
        return {
            ...state,
            status: CITAS_STATES.LIST,
            item: {id: 0}
        }
    case CITAS_ACTIONS.SET: 
        let oldItem = state.item;
        let values = Object.values(state.form.fields);
        const calculated = values.filter(item => item.type === 'calculated');
        if (calculated.length > 0) {
            calculated.forEach(calculatedItem => {
                let titem = "";
                calculatedItem.fields.forEach(i => {
                    if (titem.length > 0) titem += " ";
                    if (i === action.fieldname)
                        titem += action.value
                    else
                        titem += state.item[i];
                });
                oldItem[calculatedItem.name] = titem;
            });
        }
        return {
            ...state,
            item: {
                ...oldItem,
                [action.fieldname]: action.value
            }
        }
    case CITAS_ACTIONS.SETPAGE: 
        return {
            ...state,
            pagination: {
                ...state.pagination,
                page: action.page,
            }
        }
    case CITAS_ACTIONS.SAVE: 
        if (state.item.id > 0) {
            tmp = [...state.items];
            const index = tmp.findIndex(item => item.id == state.item.id );
            tmp.splice(index,1,{...state.item, modified: true});
        }
        else 
            tmp = [...state.items,{...state.item, modified: true}];

        return {
            ...state,
            items: tmp,
           status: CITAS_STATES.LIST,
        }
    case  CITAS_ACTIONS.ADDERROR:
        return {
            ...state,
            errors: { ...state.errors, [action.name]: [action.value] }                
        }
    }
}
