export const ITEMS_ACTIONS = {
    START: 0,
    LOAD: 1,
    CHECK: 2,
    CHECKALL: 3,
    UNSELECT: 4,
    SET: 6,
    SELECT_ITEM:7,
    NEW_ITEM: 8,
    CANCEL: 10,
    ADDERROR: 11,
    CLEARERRORS:12,
    CANCEL_LOAD:14,
    SEARCH: 15,
    FETCH: 16,
    NEXTPAG: 17,
    PREVPAG:18,
    SET_FORMOPTIONS: 19,
    ADD_MULTIFIELD: 20,
    REMOVE_MULTIFIELD: 21,
    SET_MULTIFIELD: 22,
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
    //debugger;
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

export const red_items = (state=initialState, action ) => {
    switch (action.type) {
        case ITEMS_ACTIONS.START: 
            let tmp_item = {};
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
                //if (action.fields.fields[j].type === "multilang") {
                //    let tt = {}
                //    action.fields.languages.forEach(el => {tt[el]=""});
                //    tmp_item[j] = tt;
                //}
                //else 
                //    tmp_item[j] = [];
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
        case ITEMS_ACTIONS.SET:
            //console.log("Estableciendo el dato: " + action.fieldname);
            //console.log(typeof(action.value));
            //console.log("Valor: " + action.value);
            return {
                ...state,
                item: {...state.item,[action.fieldname]:action.value}
            }
        
        case ITEMS_ACTIONS.SELECT_ITEM:
            //debugger;
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
        default: 
        throw new Error ("Accion invalida");
    }
}