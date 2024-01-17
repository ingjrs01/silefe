
export const HISTORICO_ACTIONS = {
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
    SETPAGESEARCH: 10,
}

export const STATES = {
    LIST: 1,
    VIEW: 2,
}

export const initialState = {
    items: [],
    item: {id: 0},
    status: STATES.LIST,
    pagination: {
        page: 0,
        pageSize: 4,
        totalPages: 1,
    },
}

export const reducerHistorico = (state=initialState, action ) => {
    switch (action.type) {
    case HISTORICO_ACTIONS:
        return {
            ...initialState
        }

    case HISTORICO_ACTIONS.LOAD: 
        console.debug(action.items);
        return {
            ...state, 
            items: action.items,
            pagination: {
                ...state.pagination,
                totalPages: action.totalPages, 
                total: action.total,
            },
        }
    case HISTORICO_ACTIONS.SETPAGESEARCH: 
    return {
        ...state,
        pagination: {
            ...state.pagination,
            page: action.page,
            //totalPages: action.totalPages, 
            //total: action.total,
        },
    }
    }    
}
