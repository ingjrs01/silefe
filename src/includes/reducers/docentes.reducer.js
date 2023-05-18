export const DOCENTE_ACTIONS = {
    START: 0,
    LOAD_ITEMS: 1,
    SELECT_ITEM: 2,
    NEW_ITEM: 3,
    SETFIELD: 4,
    SAVE: 8,
    CANCEL: 9,
    DELETE_ITEM:10,    
  }
const initialState = {
    items: [],
    deleted: [],
    status: "list",
    participanteId: 0,
    tipoContratoOptions: [],
    motivosOptions: [],
    ocupacionesOptions: [],
}

export const reducerDocentes = (state=initialState, action ) => {
    switch (action.type) {
        case DOCENTE_ACTIONS.START:
            return {
                ...state,
                item: {
                    id: 0,                    
                },
                items: [],
                status: "list",
            }
        case DOCENTE_ACTIONS.LOAD_ITEMS:
            return {
                ...state,
                items: action.docentes,
            }

        case DOCENTE_ACTIONS.SELECT_ITEM:
            return {
                ...state,
                item: state.items[action.index],
                status: "edit",
            }
        case DOCENTE_ACTIONS.NEW_ITEM:
            return {
                ...state,
                item: {
                    id: 0,
                },
                status: "edit",
            }
        case DOCENTE_ACTIONS.SETFIELD:
            return {
                ...state,
                item: {...state.item, [action.fieldname]:action.value}
            }

        case DOCENTE_ACTIONS.SAVE:
            let tmp = [];

            if (state.item.id > 0) {
                tmp = [...state.items];
                const index = tmp.findIndex(item => item.id == state.item.id );
                tmp.splice(index,1,state.item);
            }
            else {
                tmp = [...state.items,state.item];
            }

            return {
                ...state,
                items: tmp,
                status: "list",
            }
        case DOCENTE_ACTIONS.CANCEL:
            return {
                ...state,
                status: "list",
            }
        case DOCENTE_ACTIONS.DELETE_ITEM:                             
            let obj = {...state.items[action.index]};
            tmp = [...state.items];
            tmp.splice(action.index,1);

            return {
                ...state,
                items: tmp,
                deleted: [...state.deleted,obj],
            }
       
        default: 
            throw new Error ("Ación no válida");
    }
}
