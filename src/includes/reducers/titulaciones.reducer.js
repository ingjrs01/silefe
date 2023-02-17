
export const TITULACIONES_ACTIONS = {
    START: 0,
    TIPOS: 1,
    NIVEL: 2,
    FAMILIA: 3,
    TITULACION: 4,
    SET_TITULACION: 5,
    SET_TITULACIONTIPO: 6,
    SET_TITULACIONNIVEL: 7,
    SET_TITULACIONFAMILIA: 8,
    SET_TITULACIONID: 9,
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
                titulacion: {
                    id: 0,
                    ini: "hoy",
                    fin: "mañana",
                    titulacionTipoId: 101,
                    titulacionNivelId: 102,
                    titulacionFamiliaId: 1,
                    titulacionId: 1,
                },
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
        case TITULACIONES_ACTIONS.SET_TITULACION: 
            return {
                ...state,
                titulacion: action.titulacion
            }
        case TITULACIONES_ACTIONS.SET_TITULACIONTIPO:
            newniveles = state.niveles.filter(i => i.titulacionTipoId == action.value).map(i => {return {value:i.titulacionNivelId,label:i.descripcion}})
            newfamilias = state.familias.filter(i => i.titulacionNivelId == newniveles[0].value).map(i => {return {value:i.titulacionFamId,label:i.descripcion}})
            newtitulaciones = state.titulaciones.filter(i => i.titulacionFamiliaId == newfamilias[0].value).map(i => {return {value:i.titulacionId,label:i.descripcion}})
            
            return {
                ...state,
                titulacion: {...state.titulacion,
                    titulacionTipoId: action.value,
                    titulacionNivelId: newniveles[0].value,
                    titulacionFamiliaId: newfamilias[0].value,
                    titulacionId:        (newtitulaciones.length > 0)?newtitulaciones[0].value:0,
                },
                nivelOptions: newniveles,
                familiaOptions: newfamilias,
                titulacionOptions: newtitulaciones,
            }
        case TITULACIONES_ACTIONS.SET_TITULACIONNIVEL:
            newfamilias = state.familias.filter(i => i.titulacionNivelId == action.value).map(i => {return {value:i.titulacionFamId,label:i.descripcion}})
            newtitulaciones = state.titulaciones.filter(i => i.titulacionId == newfamilias[0].value).map(i => {return {value:i.titulacionId,label:i.descripcion}})
            return {
                ...state,
                titulacion: {
                    ...state.titulacion,
                    titulacionNivelId: action.value,
                    titulacionFamiliaId: (newfamilias.length > 0)?newfamilias[0].value:0,
                    titulacionId:        (newtitulaciones.length > 0)?newtitulaciones[0].value:0,
                },                
                familiaOptions: newfamilias,
                titulacionOptions: newtitulaciones,
            }
        case TITULACIONES_ACTIONS.SET_TITULACIONFAMILIA:
            newtitulaciones = state.titulaciones.filter(i => i.titulacionId == action.value).map(i => {return {value:i.titulacionId,label:i.descripcion}})
            return {
                ...state,
                titulacion: {
                    ...state.titulacion,
                    titulacionFamiliaId: action.value,
                    titulacionId:        (newtitulaciones.length > 0)?newtitulaciones[0].value:0,
                },                
                titulacionOptions: newtitulaciones,
            }
            case TITULACIONES_ACTIONS.SET_TITULACIONID:
                return {
                    ...state,
                    titulacion: {...state.titulacion,titulacionId: action.value},                
                }
    
        default: 
            throw new Error ("Ación no válida");
    }
}
