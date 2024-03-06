
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
    LOAD_ITEMS: 10,
    SELECT_ITEM: 11,
    CANCEL: 12,
    DELETE_ITEM: 13,
    NEW_ITEM: 14,
    SAVE_ITEM: 15,
    EMPTY_DELETED: 16,
    CHANGE_SELECTED: 17,
    CHANGE_ALLSELECTED: 18,
}

export const initialState = {
    titulacionTipoOptions: [],
    titulacionNivelOptions: [],
    deleted: [],
    status: "list",
    items: [],
    selectAll: false,
}

let newniveles = [];
let newfamilias = [];
let newtitulaciones = [];
let tmp = [];
let tmpTipoId = 0;
let tmpNivelId = 0;
let tmpFamiliaId = 0;

export const reducerTitulacion = (state, action ) => {
    let tmpItems = []; 
    let estado = false;
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
                items: [],
                tipoOptions: [],
                nivelOptions: initialState.titulacionNivelOptions,
                familiaOptions: [],
                titulacionOptions: [],
                tipos: [],
                niveles: [],
                familias: [],
                titulaciones: [],
                status: "list",
                deleted: [],
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
            tmpTipoId = 0;
            if (action.value == "0")
                tmpTipoId = state.tipoOptions[0].value
            else
                tmpTipoId = action.value

            newniveles = state.niveles.filter(i => i.titulacionTipoId == tmpTipoId).map(i => {return {value:i.titulacionNivelId,label:i.descripcion}})
            tmpNivelId = 0;
            tmpFamiliaId = 0;
            newtitulaciones = [];
            newfamilias = [];

            if (newniveles.length > 0) {
                tmpNivelId = newniveles[0].value;
                newfamilias = state.familias.filter(i => i.titulacionNivelId == tmpNivelId).map(i => {return {value:i.titulacionFamId,label:i.descripcion}})
            }

            if (newfamilias.length > 0) {
                tmpFamiliaId = newfamilias[0].value;
                newtitulaciones = state.titulaciones.filter(i => i.titulacionFamiliaId == tmpFamiliaId).map(i => {return {value:i.titulacionId,label:i.descripcion}})
            }
            
            return {
                ...state,
                titulacion: {...state.titulacion,
                    titulacionTipoId: action.value,
                    titulacionNivelId: tmpNivelId,
                    titulacionFamiliaId: tmpFamiliaId,
                    titulacionId:        (newtitulaciones.length > 0)?newtitulaciones[0].value:0,
                },
                nivelOptions: newniveles,
                familiaOptions: newfamilias,
                titulacionOptions: newtitulaciones,
            }
        case TITULACIONES_ACTIONS.SET_TITULACIONNIVEL:
            if (action.value == "0")
                return {
                    ...state
                }
            newfamilias = state.familias.filter(i => i.titulacionNivelId == action.value).map(i => {return {value:i.titulacionFamId,label:i.descripcion}})
            tmpFamiliaId = 0;
            newtitulaciones = [];

            if (newfamilias.length > 0) {
                tmpFamiliaId = newfamilias[0].value
                newtitulaciones = state.titulaciones.filter(i => i.titulacionId == tmpFamiliaId).map(i => {return {value:i.titulacionId,label:i.descripcion}})
            }

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
            if (action.value == "0") 
                return {
                    ...state
                }

            newtitulaciones = state.titulaciones.filter(i => i.titulacionFamiliaId == action.value).map(i => {return {value:i.titulacionId,label:i.descripcion}})
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
            const titulacionName = state.titulaciones.filter(i => i.titulacionId == action.value)[0].descripcion
            return {
                ...state,
                titulacion: {...state.titulacion,titulacionId: action.value, titulacionName: titulacionName},
            }
        case TITULACIONES_ACTIONS.LOAD_ITEMS:
            return {
                ...state,
                items: action.items.map(i => ({...i, selected: false}))
            }
        case TITULACIONES_ACTIONS.SELECT_ITEM:
            return {
                ...state,
                titulacion: state.items[action.index],
                status: "edit",
            }
        case TITULACIONES_ACTIONS.CANCEL:
            return {
                ...state,
                status: "list"
            }

        case TITULACIONES_ACTIONS.DELETE_ITEM:
            let obj = {...state.items[action.index]};
            tmp = [...state.items];
            tmp.splice(action.index,1);
            const tmp_del = obj.formacionParticipanteId > 0?[obj]:[];
            
            return {
                ...state,
                items: tmp,
                deleted: [...state.deleted,...tmp_del],
            }
        case TITULACIONES_ACTIONS.NEW_ITEM:
            return {
                ...state,
                titulacion: {
                    id: 0,
                    ini: "2023-02-17",
                    fin: "2023-02-17",
                    titulacionTipoId: 0,
                    titulacionNivelId: 0,
                    titulacionFamiliaId: 0,
                    titulacionId: 0,
                    comentarios: "",
                },
                status: "edit",
            }
        case TITULACIONES_ACTIONS.SAVE_ITEM:
            if (state.titulacion.id == 0) {
                tmp = [...state.items,state.titulacion];
            }
            else {
                tmp = [...state.items];
                const index = tmp.findIndex(item => item.id == state.titulacion.id );
                tmp.splice(index,1,state.titulacion);
            }
    
            return {
                ...state,
                items: tmp,
                status: "list"
            }
        case TITULACIONES_ACTIONS.EMPTY_DELETED:
            return {
                ...state,
                deleted: []
            }
        case TITULACIONES_ACTIONS.CHANGE_SELECTED: 
            tmpItems = [...state.items]
            tmpItems[action.index].selected = !tmpItems[action.index].selected;
            return {
                ...state,
                items: tmpItems
            }
        case TITULACIONES_ACTIONS.CHANGE_ALLSELECTED: 
            estado = !state.selectAll;             

            return {
                ...state,
                items: state.items.map(i => ({...i, selected: estado})),
                selectAll: estado, 
            }
        default:
            throw new Error ("Ación no válida");
    }
}
