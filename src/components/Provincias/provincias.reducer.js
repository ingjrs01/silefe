export const PROVINCIA_ACTIONS = {
    START: 1,
}

export const rProvincias = (state=initialState, action) => {
    console.log("por aqui si que se pasa");
    console.log(action);
    switch (action.type) {
        case PROVINCIA_ACTIONS.START:
            console.log("estoy en el start del reducer provincias");
            return {
                ...state,
                arr: action.items,
                loaded: 1,
            }
        default: 
            throw new Error ("Accion invalida");
//            return {
//                ...state
//            }
    }
}