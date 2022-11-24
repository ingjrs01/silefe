export const PAGINATION_ACTIONS = {
    START: 0,
    NEXT_PAGE: 1,
    PREV_PAGE: 2,
    TOTAL_PAGES: 3,
  }
const initialState = {
    page: 0,
    totalPages: 0,
}

export const reducer = (state=initialState, action ) => {
    switch (action.type) {
        case PAGINATION_ACTIONS.NEXT_PAGE:
            if (state.page < state.totalPages - 1) {
                console.log("Puedo ir hacia delante");
                return {
                  ...state,
                  page: state.page + 1
                }
                
            }
            console.log("Estoy en la última página");
            return state;
        case PAGINATION_ACTIONS.PREV_PAGE:
            if (state.page > 0) {
                return {
                    ...state,
                    page: state.page - 1
                }
            }
            return state;
        case PAGINATION_ACTIONS.TOTAL_PAGES:
            return {
                ...state,
                totalPages: action.pages
            }
        default: 
            throw new Error ("Acción inválida");
    }
}
