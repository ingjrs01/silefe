export const ITEMS_ACTIONS = {
    START: 0,
    LOAD: 1,
    CHECK: 2,
    CHECKALL: 3,
    UNSELECT: 4,
    INIT_ITEM: 5,
    SET: 6,
    SELECT_ITEM:7,
    NEW_ITEM: 8,
    HIDE: 9,
    CANCEL: 10,
    ADDERROR: 11,
    CLEARERRORS:12,
    LOAD: 13,
    CANCEL_LOAD:14,
    SEARCH: 15,
    FETCH: 16,
    NEXTPAG: 17,
    PREVPAG:18,
    SET_FORMOPTIONS: 19,
  }

const initialState = {
    arr: [],
    item: {id:0,checked:false},
    page: 0,
    totalPages:0,
    errors: [],
    checkall: false,
    fields: {},
    status: "list", /* values: new, edit, list, load  */
    search: "",
    load: 0,
}

const resetErrors = (fields) => {
    let errores = {};
    let tmp_item = {};
    //console.debug(action);
    fields.rows.forEach(r => {
        Object.keys(r.cols).forEach( j => {
            errores[j]=[];    
            if (r.cols[j].type === "multilang") {
                let tt = {}
                fields.languages.forEach(el => {tt[el]=""});
                tmp_item[j] = tt;
            }
            else 
                tmp_item[j] = [];
        })
    });

    return errores;
}

export const red_items = (state=initialState, action ) => {
    switch (action.type) {
        case ITEMS_ACTIONS.START: 
            let tmp_item = {};
            action.fields.rows.forEach(r => {
                Object.keys(r.cols).forEach( j => {
                    if (r.cols[j].type === "multilang") {
                        let tt = {}
                        action.fields.languages.forEach(el => {tt[el]=""});
                        tmp_item[j] = tt;
                    }
                    else 
                        tmp_item[j] = [];
                })
            });

            return {
                ...state,
                arr: action.items,
                page:action.page,
                totalPages:action.totalPages,
                fields: action.fields,
                item: tmp_item,
                errors: resetErrors(action.fields),
                checkall:false,
                status: "list",
            }

        case ITEMS_ACTIONS.CHECK:
            const newArr = [...state.arr];
            newArr[action.index].checked = !newArr[action.index].checked;

            return {
                ...state,
                arr: newArr,
                checkall: false
            }
        case ITEMS_ACTIONS.CHECKALL:
            return  {
                ...state,
                arr: state.arr.map(i => {return {...i,checked:!state.checkall}}),
                checkall: !state.checkall
            }
        case ITEMS_ACTIONS.UNSELECT: 
            return  {
                ...state,
                arr: state.arr.map(i => {return {...i,checked:false}}),
                checkall: false
            }
        case ITEMS_ACTIONS.INIT_ITEM: 
            return {
                ...state,
                item: action.item
            }
        case ITEMS_ACTIONS.SET:
            return {
                ...state,
                item: {...state.item,[action.fieldname]:action.value}
            }
        
        case ITEMS_ACTIONS.SELECT_ITEM:
            let sel = state.arr.filter(i => i.checked);
            if (sel.length > 0) {
                let e2 = resetErrors(state.fields);
                return {
                    ...state,
                    item: sel[0],
                    errors: e2,
                    status: 'edit',
                }
            }
            return state;                    
        case ITEMS_ACTIONS.NEW_ITEM:
            tmp_item = {};
            
            state.fields.rows.forEach(fila => {
                Object.keys(fila.cols).forEach(j => {
                    //errores[j]=[];
                    if (fila.cols[j].type === "multilang") {
                        let tt = {}
                        state.fields.languages.forEach(el => {tt[el]=""});
                        tmp_item[j] = tt;
                    }
                    else 
                        tmp_item[j] = null;
                });
            });

            tmp_item['id'] = 0;
            return {
                ...state,
                item: tmp_item,
                errors: resetErrors(state.fields),
                status: 'new',
            }
        case ITEMS_ACTIONS.CANCEL:
            return {
                ...state,
                arr: state.arr.map(i => {return {...i,checked:false}}),
                status: 'list',
            }
        case ITEMS_ACTIONS.ADDERROR:
            return {
                ...state,
                errors: {...state.errors,[action.name]:[action.value]}
            }
        case ITEMS_ACTIONS.CLEARERRORS:
            return {
                ...state,
                errors: {...state.errors,[action.name]:[]}
            }
        case ITEMS_ACTIONS.LOAD:
            return {
                ...state,
                status: 'load',
            }
        case ITEMS_ACTIONS.CANCEL_LOAD:
            return {
                ...state,
                status: 'list'
            }
        case ITEMS_ACTIONS.SEARCH:
            return {
                ...state,
                search: action.value,
                page: 0,
                load: (state.load + 1) % 17
            }
        case ITEMS_ACTIONS.NEXTPAG:
            if (state.page < state.totalPages - 1) {
                return {
                    ...state,
                    page: state.page + 1,
                    load: (state.load + 1) % 17
                }                
            }
            return {
                ...state,
                } 
        case ITEMS_ACTIONS.SET_FORMOPTIONS:
            let narray = [...state.fields.rows];
            narray[action.row].cols[action.fieldname].options = action.options;
            const fieldvalue = (action.options.length > 0)?action.options[0].value:""
            return {
                ...state,
                item: {...state.item,[action.fieldname]:fieldvalue},
                fields: {...state.fields,rows: narray}
            }
        case ITEMS_ACTIONS.PREVPAG:
            if (state.page > 0) {
                return {
                    ...state,
                    page: state.page - 1,
                    load: (state.load + 1) % 17
                }
            }
            return {
                ...state
            }

        default: 
            throw new Error ("Accion invalida");
    }
}