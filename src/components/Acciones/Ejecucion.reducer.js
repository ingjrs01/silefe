export const EJECUCION_ACTIONS = {
    START: 0,
    LOAD_ITEMS: 1,
    SELECT_ITEM: 2,
    NEW_ITEM: 3,
    SETFIELD: 4,
    SETSEARCH: 5,
    SETSEARCHITEMS: 6,
    CHECKSEARCH: 7,
    CHECKALLSEARCH: 8,
    SAVE: 9,
    CANCEL: 10,
    DELETE_ITEM:11,
    SELECT_ITEMS: 12,
    //CHECK: 13,
    //CHECKALL: 14,
    SETITEMS: 15,
    SETSEARCHFIELD: 18,
    LOAD: 19,
    //SETFORM: 20,
  }
export const iniState = {
    item: {
        formacionAccionId: 0,
        codigo: 0,
        accionId: 0,
        tipoFormacion: 0,
        inicio: "2023-07-11",
        fin: "",
        hIni1: 0,
        hFin1: 0,
        hIni2: 0,
        hFin2: 0,
        dias: {
            L: {label: "L", value:false},
            M: {label: "M", value:false},
            X: {label: "X", value:false},
            J: {label: "J", value:false},
            V: {label: "V", value:false},
            S: {label: "S", value:false},
            D: {label: "D", value:false},
        },
        entidadId: 2,
        lugarId: 0,
    },
    //form: {},
    items: [],
    deleted: [],
    search: "",
    searchField: "",
    searchItems: [],
    status: "list",
    participanteId: 0,
    load: 0,
}
let tmpar= []; 

export const reducerEjecucion = (state, action ) => {
    switch (action.type) {
        //case EJECUCION_ACTIONS.SETFORM: 
        //    return {
        //        ...state,
        //        //form: action.form,
        //    }
        case EJECUCION_ACTIONS.START:
            return {
                ...state,
                item: {
                    id: 0,
                    inicio: "",
                    fin: "18/08/2023",
                    entidadId: 2,
                    hIni1: "08:00",
                    hFin1: 0,
                    hIni2: 0,
                    hFin2: 0,
                    dias: {
                        L: {label: "L", value:false},
                        M: {label: "M", value:false},
                        X: {label: "X", value:false},
                        J: {label: "J", value:false},
                        V: {label: "V", value:false},
                        S: {label: "S", value:false},
                        D: {label: "D", value:false},
                    },
                },
                items: [],
                deleted: [],
                searchItems: [],
                checkAllSearch: false,
                checkAll: false,
                status: "list",
            }
        case EJECUCION_ACTIONS.LOAD_ITEMS:
            return {
                ...state,
                items: action.items,
            }

        case EJECUCION_ACTIONS.SELECT_ITEM:
            return {
                ...state,
                item: state.items[action.index],
                status: "edit",
            }
        case EJECUCION_ACTIONS.NEW_ITEM:
            return {
                ...state,
                item: {
                    id: 0,
                },
                status: "edit",
            }
        case EJECUCION_ACTIONS.SETFIELD:
            //console.debug(action);
            //debugger;
            if (action.fieldname == "dias") {
                //debugger;
                //console.debug(action);
                let ldias = {...state.item.dias};
                ldias[action.value] = {label: action.value, value:!ldias[action.value].value};
                return {
                    ...state,
                    item: {
                        ...state.item,
                        dias: {
                            ...ldias
                        }
                    }
                };
            }
            debugger;
            return {
                ...state,
                item: {...state.item, [action.fieldname]:action.value}
            }
        case EJECUCION_ACTIONS.SETSEARCH: 
            return {
                ...state,
                search: action.value
            }
        case EJECUCION_ACTIONS.SETSEARCHITEMS: 
            return {
                ...state,
                searchItems: action.items.map(item => ({...item, checked:false})),
                pagination: {...state.pagination, totalPages: action.totalPages},
            }
        case EJECUCION_ACTIONS.CHECKSEARCH: 
            tmpar = state.searchItems;
            tmpar[action.index].checked = !tmpar[action.index].checked;

            return {
                ...state,
                searchItems: tmpar
            }
        case EJECUCION_ACTIONS.CHECKALLSEARCH: 
            const check = !state.checkAllSearch;
            return {
                ...state, 
                checkAllSearch: check,
                searchItems: state.searchItems.map(i => ({...i,checked:check}))
            }

        case EJECUCION_ACTIONS.SAVE:
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
        case EJECUCION_ACTIONS.CANCEL:
            return {
                ...state,
                status: "list",
            }

        case EJECUCION_ACTIONS.DELETE_ITEM:
            let obj = {...state.items[action.index]};
            tmp = [...state.items];
            tmp.splice(action.index,1);
            
            return {
                ...state,
                items: tmp,
                deleted: (obj.nuevo)?[...state.deleted]:[...state.deleted,obj],
            }
        case EJECUCION_ACTIONS.SELECT_ITEMS: 
            tmpar = state.searchItems.filter(item => item.checked);
            let tmpPar2 = state.searchItems.filter(item => item.checked == false);

            return {
                ...state,
                items: [...state.items,...tmpar.map(i => ({...i,checked:false}))],
                searchItems: tmpPar2,
            }
        case EJECUCION_ACTIONS.SETITEMS: 
            return {
                ...state,
                items: [...action.items.map(item=>({...item, checked:false}))]
            }
        //case EJECUCION_ACTIONS.CHECK: 
        //    tmpar = state.items;
        //    tmpar[action.index].checked = !tmpar[action.index].checked;
//
        //    return {
        //        ...state,
        //        items: tmpar
        //    }
        //case EJECUCION_ACTIONS.CHECKALL: 
        //    const val = !state.checkAll;
        //    return {
        //        ...state,
        //        checkAll: val,
        //        items: [...state.items.map(item => ({...item,checked: val}))]
        //    }
//
        case EJECUCION_ACTIONS.SETSEARCHFIELD: 
            return {
                ...state,
                searchField: action.value,
            }
        case EJECUCION_ACTIONS.LOAD: 
            return {
                ...state,
                load: state.load + 1,
            }
       
        default: 
            throw new Error ("Ación no válida");
    }
}
