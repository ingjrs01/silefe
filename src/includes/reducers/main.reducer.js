import { ITEMS_ACTIONS } from "./actions";

export const initialState = {
    arr: [],
    item: { id: 0, checked: false },
    pagination: {
        page: 0,
        pageSize: 10,
        sizes: [10, 20, 30],
        totalPages: 0,
        total: 0,
    },
    errors: [],
    checkall: false,
    fields: {
        empty: true,
        table: {},
        tabActive: 0,        
        searchOperator: 0,
        searchField: "",
    },
    status: "list", /* values: new, edit, list, load, history */
    search: "",
    searchField: "",
    load: 0,
    order: [],
    filters: [],
    history: [],
}

let tmp_item = {};
const resetErrors = (fields) => {
    let errores = {};
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

const createItem = (form) => {
    let tmp_item = {};
    Object.keys(form.fields).forEach(j => {
        let tt2 = [];
        switch (form.fields[j].type) {
            case "multilang":
                let tt = {}
                form.languages.forEach(lang => { tt[lang] = "" });
                tmp_item[j] = tt;
                break;
            case "money": 
            case "percent":
            case "number": 
                tmp_item[j] = form.fields[j].hasOwnProperty("value")?form.fields[j]["value"]:0;
                break;
            case "multitext":
                tmp_item[j] = tt2;
                break;
            case "phone":
                tmp_item[j] = tt2;
                break;
            case "email":
                tmp_item[j] = tt2;
                break;
            case "toggle": 
                tmp_item[j] = form.fields[j].hasOwnProperty("value")?form.fields[j]["value"]:false;
                break;
            case "file":
                tmp_item[j] = [{
                    title: "ficherirtooooo",
                    fichero: "",
                    descripcion: "sin descripcion",
                    filename: "",
                    groupId: "",
                    id: 0,
                    uuid: "",
                    edit: false,
                    src: "",
                }];
                break;
            case "doublelist":
                tmp_item[j] = [];
                break;
            default:
                tmp_item[j] = "";
                break;
        }
    });
    return {...tmp_item, id: 0};
}

let index = 0;
//let tmp = []

export const red_items = (state, action) => {
    let tmp_arr = [];
    let tmpItem = {};
    
    switch (action.type) {
        case ITEMS_ACTIONS.SET_FIELDS:
            return {
                ...state,
                fields: { ...state.fields, ...action.form },
                errors: resetErrors(action.form),
            }

        case ITEMS_ACTIONS.LOAD_ITEMS:
            return {
                ...state,
                arr: action.items,
                pagination: {
                    ...state.pagination,
                    totalPages: action.totalPages,
                    total: action.total,
                },
                item: createItem(state.fields),
                errors: resetErrors(state.fields),
                checkall: false,
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
            return {
                ...state,
                arr: state.arr.map(i => { return { ...i, checked: !state.checkall } }),
                checkall: !state.checkall
            }

        case ITEMS_ACTIONS.UNSELECT:
            return {
                ...state,
                arr: state.arr.map(i => { return { ...i, checked: false } }),
                checkall: false
            }

        case ITEMS_ACTIONS.SET:
            let tmpItems = [];
            let ffields = {};
            
            if (state.fields.fields[action.fieldname].hasOwnProperty('change')) {
                state.fields.fields[action.fieldname].change(action.value, action.fieldname);
            }
            if (state.fields.fields[action.fieldname].hasOwnProperty('effects')) {
                ffields = state.fields.fields;
                let ttmp_item = state.item;
                let anterior = action.value;
                state.fields.fields[action.fieldname].effects.forEach((element) => {
                    tmpItems = state.fields.fields[element.fieldname].all.filter(i => i[element.fk] === anterior).map(it => {return {value:it.value,label:it.label}});                     
                    ffields[element.fieldname].options = tmpItems;
                    
                    anterior = tmpItems.filter(el => el.value === ttmp_item[element.fieldname] ).length > 0 ? ttmp_item[element.fieldname] : tmpItems[0].value;
                    ttmp_item[element.fieldname] = anterior;
                });
                return {
                    ...state,
                    item: {
                        ...ttmp_item,
                        [action.fieldname]:action.value                        
                    },
                    fields: {
                        ...state.fields,
                        fields: {...ffields                            
                        }
                    }
                }
            }            

            return {
                ...state,
                item: { ...state.item, [action.fieldname]: action.value }
            }

        case ITEMS_ACTIONS.SETCOMPLETEITEM:
            return {
                ...state,
                item: {
                    ...state.item,
                    ...action.item,
                }
            }

        case ITEMS_ACTIONS.SETUNCOLATERAL:
            return {
                ...state,
                item: { ...state.item, [action.fieldname]: action.value }
            }

        case ITEMS_ACTIONS.SELECT_ITEM:
            tmpItem = {};
            if (action.hasOwnProperty('index')) 
                tmpItem = {...state.arr[action.index]};            
            else {
                tmp_arr = state.arr.filter(i => i.checked);
                if (tmp_arr.length > 0)
                    tmpItem = tmp_arr[0];
                else
                    return state;
            }

            if (state.fields.hasOwnProperty('beforeEdit'))
                state.fields.beforeEdit(tmpItem);

            return {
                ...state,
                item: { ...state.item, ...tmpItem },
                errors: resetErrors(state.fields),
                status: 'edit',
            }

        // Esta opcion sirve para cdargar un elemento desde un objeto, y no desde el listado. Se usa 
        // cuando se entra desde una entrada directa a otra. 
        case ITEMS_ACTIONS.EDIT_ITEM:
            tmpItem = {};
            Object.keys(state.fields.fields).forEach(j => {
                switch (state.fields.fields[j].type) {
                    case "multilang":
                        let tt = {}
                        state.fields.languages.forEach(el => { tt[el] = action.item.data[j][el] });
                        tmpItem[j] = tt;
                        break;
                    case "multitext":
                        let tt2 = []
                        action.item.data[j].forEach(ite => { tt2.push({ key: ite.key, value: ite.value, default: false }) })
                        tmpItem[j] = tt2;
                        break;
                    default:
                        tmpItem[j] = action.item.data[j];
                        break;
                }
            });
            //let err2 = 
            return {
                ...state,
                status: 'edit',
                errors: resetErrors(state.fields),
                item: tmpItem,
            }

        case ITEMS_ACTIONS.NEW_ITEM:
            return {
                ...state,
                item: createItem(state.fields),
                errors: resetErrors(state.fields),
                status: 'new',
            }
            
        case ITEMS_ACTIONS.CANCEL:
            if (state.fields.hasOwnProperty("handleCancel"))
                state.fields.handleCancel();

            return {
                ...state,
                arr: state.arr.map(i => { return { ...i, checked: false } }),
                status: 'list',
            }
        case ITEMS_ACTIONS.ADDERROR:
            return {
                ...state,
                errors: { ...state.errors, [action.name]: [action.value] }
            }
        case ITEMS_ACTIONS.CLEARERRORS:
            return {
                ...state,
                errors: { ...state.errors, [action.name]: [] }
            }

        // Esto estaría preparado para cargar archivos desde un csv    
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
                fields: {
                    ...state.fields,
                    search: action.value,
                },
                search: action.value,
                pagination: { ...state.pagination, page: 0 },
                load: (state.load + 1) % 17
            }

        case ITEMS_ACTIONS.SETPAGE:
            if ((state.pagination.page < state.pagination.totalPages) && (action.page >= 0)) {
                return {
                    ...state,
                    pagination: { ...state.pagination, page: action.page },
                    load: (state.load + 1) % 17
                }
            }
            return {
                ...state,
            }

        case ITEMS_ACTIONS.SET_FORMOPTIONS:
            let newFields = state.fields;
            newFields.fields[action.fieldname].options = action.options;

            return {
                ...state,
                fields: newFields
            }

        case ITEMS_ACTIONS.ADD_MULTIFIELD:
            tmpItem = state.item;
            let key = tmpItem[action.fieldname].length + 1;
            tmpItem[action.fieldname].push({ key: key, value: "", default: (tmpItem[action.fieldname].length === 0) ? true : false });

            return {
                ...state,
                item: tmpItem,
            }

        case ITEMS_ACTIONS.REMOVE_MULTIFIELD:
            tmpItem = state.item;
            tmpItem[action.fieldname].splice(action.pos, 1);

            return {
                ...state,
                item: tmpItem
            }

        case ITEMS_ACTIONS.SET_MULTIFIELD:
            tmpItem = state.item;
            tmpItem[action.fieldname][action.pos].value = action.value;

            return {
                ...state,
                item: tmpItem
            }
        case ITEMS_ACTIONS.SET_MULTIFIELDCHECK:
            var temp = state.item[action.fieldname].map(item => ({ ...item, default: false }))
            temp[action.pos].default = true;
            return {
                ...state,
                item: {
                    ...state.item,
                    [action.fieldname]: temp
                }
            }
        case ITEMS_ACTIONS.SET_STATUS:
            return {
                ...state,
                status: action.status
            }
        case ITEMS_ACTIONS.SET_ACTIVETAB:
            return {
                ...state,
                fields: { ...state.fields, tabActive: action.active }
            }
        case ITEMS_ACTIONS.SET_ORDER:
            tmp_arr = [...state.order];
            index = state.order.findIndex(x => x.name === action.fieldname);
            if (index >= 0) {
                tmp_arr[index].direction = (tmp_arr[index].direction === 'asc') ? 'desc' : 'asc';
            }
            else
                tmp_arr.push({ name: action.fieldname, direction: 'asc' })

            return {
                ...state,
                order: tmp_arr,
                load: (state.load + 1) % 17,
            }

        case ITEMS_ACTIONS.DELETE_ORDER:
            index = state.order.findIndex(x => x.name === action.fieldname);
            if (index >= 0) {
                tmp_arr = [...state.order];
                tmp_arr.splice(index, 1);
            }
            return {
                ...state,
                order: tmp_arr
            }

        case ITEMS_ACTIONS.SET_PAGESIZE:
            return {
                ...state,
                pagination: { ...state.pagination, pageSize: action.pageSize },
                load: (state.load + 1) % 17,
            }
        case ITEMS_ACTIONS.SET_SEARCHFIELD:
            return {
                ...state,
                fields: {
                    ...state.fields,
                    searchField: action.value,
                    search: "",
                },
                searchField: action.value,
                search: "",
                load: (state.load + 1) % 17,
            }
        case ITEMS_ACTIONS.SET_SEARCHOP:
            return {
                ...state,
                fields: {
                    ...state.fields,
                    searchOperator: action.value,
                },
                //searchField: action.value,
                //search: "",
                load: (state.load + 1) % 17,
            }    
        case ITEMS_ACTIONS.ADD_FILTER:
            if (state.fields.search === "0")
                return { ...state }

            return {
                ...state,
                filters: [
                    ...state.filters,
                    {
                        name: state.fields.searchField,
                        label: state.fields.fields[state.fields.searchField].label ?? "Sin nombre",
                        value: state.fields.search, 
                        operator: state.fields.searchOperator??"=",
                        valueLabel: (state.fields.fields[state.fields.searchField].type === "select") ? state.fields.fields[state.fields.searchField].options.filter(it => it.value === state.fields.search)[0].label : state.fields.search,
                    }
                ]
            }
        case ITEMS_ACTIONS.REMOVE_FILTER:
            index = state.filters.findIndex(x => x.name === action.fieldname);
            if (index >= 0) {
                tmp_arr = [...state.filters];
                tmp_arr.splice(index, 1);
            }
            return {
                ...state,
                filters: tmp_arr,
                load: (state.load + 1) % 17,
            }

        case ITEMS_ACTIONS.HISTORY:
            return {
                ...state,
                history: action.data,
                status: "history",
            }
        case ITEMS_ACTIONS.ADD_FILEFIELD: 
            tmpItem = state.item[action.fieldname];

            return {
                ...state,
                item:{
                    ...state.item,
                    [action.fieldname] : [...tmpItem,{                
                        "id": 0,
                        "filename": null,
                        "descripcion": "",
                        "title": "",
                        "src": ""
                    }]
                } ,
            }
        case ITEMS_ACTIONS.SET_FILEFIELD: 
            let arrb = state.item[action.fieldname];
            arrb[action.index][action.objkey] = action.value;
            if (state.fields.fields[action.fieldname]["type"] === "file") {
                arrb[action.index]["title"] = action.titulo;
                arrb[action.index]["filename"] = action.filename;
            }
            return {
                ...state,
                item: {
                    ...state.item, 
                    [action.fieldname] : arrb,
                }
            }
        case ITEMS_ACTIONS.DELETE_FILEFIELD: 
            let arrdel = [...state.item[action.fieldname]];
            arrdel.splice(action.index,1);
            return {
                ...state,
                item: {
                    ...state.item, 
                    [action.fieldname] : arrdel,
                }
            }

        case ITEMS_ACTIONS.CHANGE_FIELD_ENABLE: 
            let estado = state.fields.fields[action.fieldname].enabled;
            let v = state.fields.fields[action.fieldname].value;
            tmpItem = state.fields.fields[action.fieldname];
            tmpItem.enabled = !estado;
            tmpItem.value = v + 2;

            return {
                ...state,
                fields:  {
                    ...state.fields,
                    fields: {
                        ...state.fields.fields,
                        [action.fieldname]: {
                            ...tmpItem,
                        },
                    },
                }
            }        
        default:
            throw new Error("Accion invalida");
    }
}

  