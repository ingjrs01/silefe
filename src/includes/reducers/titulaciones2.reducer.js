import { TITULACIONES_ACTIONS } from './actions';

export const initialState = {
    fields: { },
    titulacionTipoOptions: [],
    titulacionNivelOptions: [],
    deleted: [],
    status: "list",
    items: [],
    selectAll: false,
    errors: {},
}

const resetErrors = (fields) => {
    let errores = {};
    let tmp_item = {};
    Object.keys(fields.fields).forEach(j => {
        errores[j] = [];
        if (fields.fields[j].type === "multilang") {
            let tt = {}
            fields.languages.forEach(el => { tt[el] = "" });
            tmp_item[j] = tt;
        }
        else
            tmp_item[j] = [];
    });
    return errores;
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
    console.log("Estoy en el reducer titulaciones: " + action.type);
    switch (action.type) {        
        case TITULACIONES_ACTIONS.START:
            return {
                ...state,
                fields: {
                    ...action.form,
                },
                item: {
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
                errors: resetErrors(action.form),
            }
        //case TITULACIONES_ACTIONS.TIPOS:
        //    return {
        //        ...state,
        //        //tipoOptions: action.tipos.map(item => ({value:item.titulacionTipoId,label:item.descripcion})),
        //        tipoOptions: action.tipos,
        //        tipos: action.tipos
        //    }

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
        //case TITULACIONES_ACTIONS.SET_TITULACION:
        //    return {
        //        ...state,
        //        titulacion: action.titulacion
        //    }
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
                items: action.items.map(i => ({...i, selected: false})),
                errors: resetErrors(state.fields),
            }
        case TITULACIONES_ACTIONS.SELECT_ITEM:
            return {
                ...state,
                item: state.items[action.index],
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
                item: {
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
        case TITULACIONES_ACTIONS.SAVE:
            if (state.item.id == 0) {
                tmp = [...state.items,state.item];
            }
            else {
                tmp = [...state.items];
                const index = tmp.findIndex(item => item.id == state.item.id );
                tmp.splice(index,1,state.item);
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
        case TITULACIONES_ACTIONS.SET:
            console.log("TITULACIONES_ACTIONS.SET");
            if (action.fieldname === 'titulacionTipoId') { 
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
                    item: {...state.item,
                        titulacionTipoId: action.value,
                        titulacionNivelId: tmpNivelId,
                        titulacionFamiliaId: tmpFamiliaId,
                        titulacionId:        (newtitulaciones.length > 0)?newtitulaciones[0].value:0,
                    },
                    fields: {
                        ...state.fields,
                        fields: {
                            ...state.fields.fields,
                            titulacionNivelId: {
                                ...state.fields.fields.titulacionNivelId,
                                options: newniveles,
                            },
                            titulacionFamiliaId: {
                                ...state.fields.fields.titulacionFamiliaId,
                                options: newfamilias
                            },
                            titulacionId: {
                                ...state.fields.fields.titulacionId,
                                options: newtitulaciones,
                            }
                        }
                    },
                    //nivelOptions: newniveles,
                    //familiaOptions: newfamilias,
                    //titulacionOptions: newtitulaciones,
                }
            }
            //------------------------------------------------------------------
            if (action.fieldname == 'titulacionNivelId') {
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
                    item: {
                        ...state.item,
                        titulacionNivelId: action.value,
                        titulacionFamiliaId: (newfamilias.length > 0)?newfamilias[0].value:0,
                        titulacionId:        (newtitulaciones.length > 0)?newtitulaciones[0].value:0,
                    },
                    fields: {
                        ...state.fields,
                        fields: {
                            ...state.fields.fields,
                            titulacionFamiliaId: {
                                ...state.fields.fields.titulacionFamiliaId,
                                options: newfamilias
                            },
                            titulacionId: {
                                ...state.fields.fields.titulacionId,
                                options: newtitulaciones,
                            }
                        }
                    },
                    //familiaOptions: newfamilias,
                    //titulacionOptions: newtitulaciones,
                }
            }

            if (action.fieldname === 'titulacionFamiliaId') {
                if (action.value == "0") 
                return {
                    ...state
                }
                newtitulaciones = state.titulaciones.filter(i => i.titulacionFamiliaId == action.value).map(i => {return {value:i.titulacionId,label:i.descripcion}})
                return {
                    ...state,
                    item: {
                        ...state.item,
                        titulacionFamiliaId: action.value,
                        titulacionId:        (newtitulaciones.length > 0)?newtitulaciones[0].value:0,
                    },
                    fields: {
                        ...state.fields,
                        fields: {
                            ...state.fields.fields,
                            titulacionId: {
                                ...state.fields.fields.titulacionId,
                                options: newtitulaciones,
                            }
                        }
                    },
                    titulacionOptions: newtitulaciones,
                }               
            }
            //--------------------------------------------------------------------
            return {
                ...state,
                item: {
                    ...state.item,
                    [action.fieldname]: action.value,
                }

            }
            
        case TITULACIONES_ACTIONS.ADDERROR:
                return {
                    ...state,
                    errors: { ...state.errors, [action.name]: [action.value] }
                }
        case TITULACIONES_ACTIONS.CLEARERRORS:
            return {
                ...state,
                errors: { ...state.errors, [action.name]: [] }
            }
        default:
            throw new Error ("Ación no válida");
    }
}