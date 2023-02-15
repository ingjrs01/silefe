
export const TITULACIONES_ACTIONS = {
    START: 0,
    TIPOS: 1,
    NIVEL: 2,
    FAMILIA: 3,
    TITULACION: 4,
    LOAD_NIVELES:5,
    LOAD_FAMILIAS:6,
    CHG_TITULACION: 7,
  }
const initialState = {
    titulacionTipoOptions: [],
    titulacionNivelOptions: [],
}

let newniveles = [];
let newfamilias = [];
let newtitulaciones = [];

export const reducerTitulacion = (state=initialState, action ) => {
    switch (action.type) {
        case TITULACIONES_ACTIONS.START:
            return {
                ...state,
                titulacionTipoId: 101,
                titulacionNivelId: 102,
                titulacionFamiliaId: 1,
                tipoOptions: [],
                nivelOptions: initialState.titulacionNivelOptions,
                familiaOptions: [],
                titulacionOptions: [],
                tipos: [],
                niveles: [],
                familias: [],
                titulaciones: [],
            }
        case TITULACIONES_ACTIONS.TIPOS:
            return {
                ...state,
                tipoOptions: action.tipos.map(item => { return {value:item.titulacionTipoId,label:item.descripcion}}),
                tipos: action.tipos
            }
        case TITULACIONES_ACTIONS.NIVEL:
            return {
                ...state,
                niveles: action.nivel
            }
        case TITULACIONES_ACTIONS.FAMILIA:
            return {
                ...state,
                familias: action.familias
            }
           
        case TITULACIONES_ACTIONS.TITULACION:
            return {
                ...state,
                titulaciones:action.titulaciones,
            }
        case TITULACIONES_ACTIONS.LOAD_NIVELES:
            newniveles = state.niveles.filter(i => i.titulacionTipoId == action.value).map(i => {return {value:i.titulacionNivelId,label:i.descripcion}})
            newfamilias = state.familias.filter(i => i.titulacionNivelId == newniveles[0].value).map(i => {return {value:i.titulacionFamId,label:i.descripcion}})
            newtitulaciones = state.titulaciones.filter(i => i.titulacionFamiliaId == newfamilias[0].value).map(i => {return {value:i.titulacionId,label:i.descripcion}})
            return {
                ...state,
                titulacionTipoId: action.value,
                nivelOptions: newniveles,
                familiaOptions: newfamilias,
                titulacionOptions: newtitulaciones,
            }
        case TITULACIONES_ACTIONS.LOAD_FAMILIAS: 
            newfamilias = state.familias.filter(i => i.titulacionNivelId == action.value).map(i => {return {value:i.titulacionFamId,label:i.descripcion}})
            newtitulaciones = state.titulaciones.filter(i => i.titulacionId == newfamilias[0].value).map(i => {return {value:i.titulacionId,label:i.descripcion}})
            return {
                ...state,
                titulacionNivelId: action.value,
                familiaOptions: newfamilias,
                titulacionOptions: newtitulaciones,
            }
        case TITULACIONES_ACTIONS.CHG_TITULACION:
            return {
                ...state,
                titulacionId: action.value
            }
        default: 
            throw new Error ("Ación no válida");
    }
}
