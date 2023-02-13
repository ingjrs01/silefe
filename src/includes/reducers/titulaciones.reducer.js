export const TITULACIONES_ACTIONS = {
    START: 0,
  }
const initialState = {
    titulacionTipoOptions: [
        {value:101,label:"Educacion básida"},
        {value:102,label: "Estudios postuniversitarios"},
        {value:103,label: "Estudios universitarios"}
    ],
    titulacionNivelOptions: [
        {value:103,label: "Doctorado"},
        {value:104,label: "Especialista"},
        {value:105,label: "Experto"},
    ],
}

export const reducerTitulacion = (state=initialState, action ) => {
    switch (action.type) {
        case TITULACIONES_ACTIONS.START:
            state: initialState;
            return state;
        default: 
            throw new Error ("Ación no válida");
    }
}
