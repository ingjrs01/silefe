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
  }

const initialState = {
    arr: [],
    item: {id:0,checked:false},
    errors: [],
    checkall: false,
    fields: {},
    status: "list", /* values: new, edit, list, load  */
    search: "",    
}

export const red_items = (state=initialState, action ) => {
    switch (action.type) {
        case ITEMS_ACTIONS.START: 
            let errores = {};
            let tmp_item = {};
            Object.keys(action.fields.rows).forEach(j => {
                errores[j]=[];

                if (action.fields.rows[j].type === "multilang") {
                    let tt = {}
                    action.fields.languages.forEach(el => {tt[el]=""});
                    tmp_item[j] = tt;
                }
                else 
                    tmp_item[j] = [];
            });

            return {
                ...state,
                arr: action.items,
                fields: action.fields,
                item: tmp_item,
                errors: errores,
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
                let errores = {};
                Object.keys(sel[0]).forEach(j => errores[j]=[]);
                return {
                    ...state,
                    item: sel[0],
                    errors: errores,
                    status: 'edit',
                }
            }
            return state;        
            
        case ITEMS_ACTIONS.NEW_ITEM:
            errores = {};
            tmp_item = {};
            Object.keys(state.fields.rows).forEach(j => {
                errores[j]=[];

                if (state.fields.rows[j].type === "multilang") {
                    let tt = {}
                    state.fields.languages.forEach(el => {tt[el]=""});
                    tmp_item[j] = tt;
                }
                else 
                    tmp_item[j] = null;
            });
            tmp_item['id'] = 0;
            return {
                ...state,
                item: tmp_item,
                errors: errores,
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
                search: action.value
            }
        default: 
            throw new Error ("Accion invalida");
    }
}