
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
    CLOSEVIEW: 9,    
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
    status: CITAS_STATES.LIST,
}

export const reducerCitas = (state=initialState, action ) => {
    switch (action.type) {
    case CITAS_ACTIONS.START:
        return {
            ...initialState
        }
    case CITAS_ACTIONS.LOAD: 
        console.log("cargando elementos");
        console.debug(action.items);
        return {
            ...state, 
            items: action.items
        }
    case CITAS_ACTIONS.SETFORM: 
        return {
            ...state,
            form: {
                ...state.form,
                ...action.form,
            }
        }
    case CITAS_ACTIONS.VIEW:
        console.log("viendo un elemento: " + action.index); 
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
        return {
            ...state,
            item: {
                ...state.item,
                [action.fieldname]: action.value
            }
        }
    }    
}
