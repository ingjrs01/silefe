export const ITEMS_ACTIONS = {
    START: 0,
    LOAD: 1,
    CHECK: 2,
    CHECKALL: 3,
    UNSELECT: 4,
    SET: 5,
    SELECT_ITEM: 6,
    NEW_ITEM: 7,
    CANCEL: 8,
    ADDERROR: 9,
    CLEARERRORS: 10,
    CANCEL_LOAD: 11,
    SEARCH: 12,
    FETCH: 13,
    SETPAGE: 14,
    SET_FORMOPTIONS: 15,
    ADD_MULTIFIELD: 16,
    REMOVE_MULTIFIELD: 17,
    SET_MULTIFIELD: 18,
    SET_MULTIFIELDCHECK: 19,
    SET_STATUS: 20,
    SET_ACTIVETAB: 21,
    SET_ORDER: 22,
    DELETE_ORDER: 23,
    SET_PAGESIZE: 24,
    SET_SEARCHFIELD: 25,
  }

export const initialState = {
    arr: [],
    item: {id:0,checked:false},
    pagination: {
        page: 0,
        pageSize: 10,
        sizes: [10,20,30],
        totalPages:0,
        total: 0,
    },
    errors: [],
    checkall: false,
    fields: { 
        empty: true,
        table: {},
    },
    status: "list", /* values: new, edit, list, load  */
    search: "",
    searchField: "",
    load: 0,
    order: [],
}

const resetErrors = (fields) => {
    let errores = {};
    let tmp_item = {};
    Object.keys(fields.fields).forEach( j => {
        errores[j]=[];    
        if (fields.fields[j].type === "multilang") {
            let tt = {}
            fields.languages.forEach(el => {tt[el]=""});
            tmp_item[j] = tt;
        }
        else 
            tmp_item[j] = [];
    });

    return errores;
}

let index = 0;
let tmp = []

export const red_items = (state, action ) => {
    switch (action.type) {
        case ITEMS_ACTIONS.START: 
            let tmp_item = {};
            if (state.load == 0) {
                Object.keys(action.fields.fields).forEach(j => {
                    switch (action.fields.fields[j].type) {
                        case "multilang":
                            let tt = {}
                            action.fields.languages.forEach(el => {tt[el]=""});
                            tmp_item[j] = tt;
                            break;
                        case "multitext": 
                            let tt2 = []
                            //action.fields.languages.forEach(el => {tt2[el]=""});
                            tt2.push({key:8,value:"correo",default:false});
                            tt2.push({key:9,value:"correo@correo.es",default:false});
                            tmp_item[j] = tt2;
                            break;
                        default:
                            tmp_item[j] = [];
                            break;
                    }
                });
            }
            else 
                tmp_item = state.fields;

            return {
                ...state,
                arr: action.items,
                pagination: {...state.pagination,totalPages: action.totalPages, total: action.total,},                
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
            Object.keys(state.fields.fields).forEach(fila => {
                switch (state.fields.fields[fila].type) {
                    case 'multilang':
                        let tt = {};
                        state.fields.languages.forEach(el => {tt[el]=""});
                        tmp_item[fila] = tt;
                        break;
                    case 'multitext': 
                        tt = [];
                        tt.push({key: 1,value:"",default:false})
                        tmp_item[fila] = tt;
                        break;
                    case 'toggle':
                        tmp_item[fila] = false;
                        break;
                    case 'select':
                        tmp_item[fila] = "0"; // por defecto
                        break;
                    default:
                        tmp_item[fila] = null;
                        break;
                }
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
                pagination: {...state.pagination, page: 0},
                load: (state.load + 1) % 17
            }

        case ITEMS_ACTIONS.SETPAGE:
            if ((state.pagination.page < state.pagination.totalPages) && (action.page >= 0)) {
                return {
                    ...state,
                    pagination: {...state.pagination,page: action.page},
                    load: (state.load + 1) % 17
                }                
            }
            return {
                ...state,
                }
            
        case ITEMS_ACTIONS.SET_FORMOPTIONS:
            let newFields = state.fields;
            newFields.fields[action.fieldname].options=action.options;

            return {
                ...state,
                fields: newFields
            }
        case ITEMS_ACTIONS.SET_FIELDENABLE:
            return {
                ...state,
                fields: {...state.fields,rows: narray}
            }
    
        case ITEMS_ACTIONS.ADD_MULTIFIELD:
            let newItem = state.item;
            let key = newItem[action.fieldname].length + 1;
            newItem[action.fieldname].push({key: key,value:"",default:false});

            return {
                ...state,
                item: newItem,
            }
        case ITEMS_ACTIONS.REMOVE_MULTIFIELD:
            let delField = state.item;
            delField[action.fieldname].splice(action.pos,1);

            return {
                ...state,
                item: delField
            }
        case ITEMS_ACTIONS.SET_MULTIFIELD:
            let newField = state.item;
            newField[action.fieldname][action.pos].value = action.value;

            return {
                ...state,
                item:newField
            }
        case ITEMS_ACTIONS.SET_MULTIFIELDCHECK:
            newField = state.item;
            newField[action.fieldname][action.pos].default = !newField[action.fieldname][action.pos].default;
            
            return {
                ...state,
                item:newField
            }
        case ITEMS_ACTIONS.SET_STATUS:
            return {
                ...state,
                status: action.status
            }
        case ITEMS_ACTIONS.SET_ACTIVETAB:
            return {
                ...state,
                fields: {...state.fields,tabActive:action.active} 
            }
        case ITEMS_ACTIONS.SET_ORDER: 
            tmp = [...state.order];
            index = state.order.findIndex(x => x.name == action.fieldname);
            if (index >= 0) {
                tmp[index].direction = (tmp[index].direction == 'asc')?'desc':'asc';
            }
            else 
                tmp.push({name: action.fieldname,direction:'asc'})

            return {
                ...state,
                order: tmp,
                load: (state.load + 1) % 17,
            }
        case ITEMS_ACTIONS.DELETE_ORDER:
            index = state.order.findIndex(x => x.name == action.fieldname);
            if (index >= 0) {
                tmp = [...state.order];
                tmp.splice(index,1);
            }
            return {
                ...state,
                order: tmp
            }
        case ITEMS_ACTIONS.SET_PAGESIZE: 
            return {
                ...state,
                pagination: {...state.pagination, pageSize: action.pageSize },
                load: (state.load + 1) % 17,
            }
        case ITEMS_ACTIONS.SET_SEARCHFIELD:
            return {
                ...state,
                searchField: action.value,
            }
        
        default: 
            throw new Error ("Accion invalida");
    }
}
