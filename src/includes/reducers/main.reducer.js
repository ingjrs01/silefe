import { ITEMS_ACTIONS } from "./actions";
//export const ITEMS_ACTIONS = {
//    START: 0,
//    LOAD: 1,
//    LOAD_ITEMS: 32,
//    CHECK: 2,
//    CHECKALL: 3,
//    UNSELECT: 4,
//    SET: 5,
//    SELECT_ITEM: 6,
//    NEW_ITEM: 7,
//    EDIT_ITEM: 26,
//    CANCEL: 8,
//    ADDERROR: 9,
//    CLEARERRORS: 10,
//    CANCEL_LOAD: 11,
//    SEARCH: 12,
//    FETCH: 13,
//    SETPAGE: 14,
//    SET_FORMOPTIONS: 15,
//    ADD_MULTIFIELD: 16,
//    REMOVE_MULTIFIELD: 17,
//    SET_MULTIFIELD: 18,
//    SET_MULTIFIELDCHECK: 19,
//    SET_STATUS: 20,
//    SET_ACTIVETAB: 21,
//    SET_ORDER: 22,
//    DELETE_ORDER: 23,
//    SET_PAGESIZE: 24,
//    SET_SEARCHFIELD: 25,
//    SET_FIELDS: 27,
//    HISTORY: 28,
//    //SET_ACTIVETAB: 29,
//    SETUNCOLATERAL: 30,
//    SETCOMPLETEITEM: 31,
//    ADD_FILTER: 34,
//    REMOVE_FILTER: 35,
//    ADD_FILEFIELD: 36,
//    SET_FILEFIELD: 37,
//    DELETE_FILEFIELD: 38,
//    EDIT_FILEFIELD: 39,
//    CHANGE_FIELD_ENABLE: 40,
//}

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
    },
    status: "list", /* values: new, edit, list, load, history */
    search: "",
    searchField: "",
    load: 0,
    order: [],
    filters: [],
    history: [],
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
let tmp = []

export const red_items = (state, action) => {
    let tmp_item = {};
    console.log("red_items: " + action.type);
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
            if (state.fields.fields[action.fieldname].hasOwnProperty('change')) {
                state.fields.fields[action.fieldname].change(action.value, action.fieldname);
            }

            // TODO: Cuando veamos que sigue funcionando, quitar este código: 
            //if (state.fields.fields[action.fieldname]["type"] === "file") {
            //    return {
            //        ...state,
            //        item: {
            //            ...state.item,
            //            [action.fieldname]: {
            //                ...state.item[action.fieldname],
            //                fichero: action.value,
            //                title: action.titulo,
            //                filename: action.filename
            //            },
            //        },
            //    }
            //}
            return {
                ...state,
                item: { ...state.item, [action.fieldname]: action.value }
            }

        case ITEMS_ACTIONS.SETCOMPLETEITEM:
            //console.debug()
            //if (state.fields.fields[action.fieldname].hasOwnProperty('change')) {
            //    state.fields.fields[action.fieldname].change(action.value,action.fieldname);
            //}
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
            let sel = [];
            let seleccionado = {};
            if (action.hasOwnProperty('index')) {
                seleccionado = state.arr[action.index];
            }
            else {
                sel = state.arr.filter(i => i.checked);
                if (sel.length > 0)
                    seleccionado = sel[0];
                else
                    return state;
            }

            if (state.fields.hasOwnProperty('beforeEdit'))
                state.fields.beforeEdit(seleccionado);

            let e2 = resetErrors(state.fields);
            return {
                ...state,
                item: { ...state.item, ...seleccionado }, // TODO: esto antes se hacía solo con seleccionado
                errors: e2,
                status: 'edit',
            }

        // Esta opcion sirve para cdargar un elemento desde un objeto, y no desde el listado. Se usa 
        // cuando se entra desde una entrada directa a otra. 
        case ITEMS_ACTIONS.EDIT_ITEM:
            tmp_item = {};
            Object.keys(state.fields.fields).forEach(j => {
                switch (state.fields.fields[j].type) {
                    case "multilang":
                        let tt = {}
                        state.fields.languages.forEach(el => { tt[el] = action.item.data[j][el] });
                        tmp_item[j] = tt;
                        break;
                    case "multitext":
                        let tt2 = []
                        action.item.data[j].forEach(ite => { tt2.push({ key: ite.key, value: ite.value, default: false }) })
                        tmp_item[j] = tt2;
                        break;
                    //case "select":

                    default:
                        tmp_item[j] = action.item.data[j];
                        break;
                }
            });
            //let err2 = resetErrors(state.fields);
            return {
                ...state,
                status: 'edit',
                //errors: err2,
                item: tmp_item,//action.item,
                //load: (state.load + 1) % 17,
            }
        case ITEMS_ACTIONS.NEW_ITEM:
            return {
                ...state,
                item: createItem(state.fields),
                errors: resetErrors(state.fields),
                status: 'new',
            }
        case ITEMS_ACTIONS.CANCEL:
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
            let newItem = state.item;
            let key = newItem[action.fieldname].length + 1;
            newItem[action.fieldname].push({ key: key, value: "", default: (newItem[action.fieldname].length === 0) ? true : false });

            return {
                ...state,
                item: newItem,
            }
        case ITEMS_ACTIONS.REMOVE_MULTIFIELD:
            let delField = state.item;
            delField[action.fieldname].splice(action.pos, 1);

            return {
                ...state,
                item: delField
            }
        case ITEMS_ACTIONS.SET_MULTIFIELD:
            let newField = state.item;
            newField[action.fieldname][action.pos].value = action.value;

            return {
                ...state,
                item: newField
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
            tmp = [...state.order];
            index = state.order.findIndex(x => x.name === action.fieldname);
            if (index >= 0) {
                tmp[index].direction = (tmp[index].direction === 'asc') ? 'desc' : 'asc';
            }
            else
                tmp.push({ name: action.fieldname, direction: 'asc' })

            return {
                ...state,
                order: tmp,
                load: (state.load + 1) % 17,
            }
        case ITEMS_ACTIONS.DELETE_ORDER:
            index = state.order.findIndex(x => x.name === action.fieldname);
            if (index >= 0) {
                tmp = [...state.order];
                tmp.splice(index, 1);
            }
            return {
                ...state,
                order: tmp
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
                        value: state.fields.search, operator: "=",
                        valueLabel: (state.fields.fields[state.fields.searchField].type === "select") ? state.fields.fields[state.fields.searchField].options.filter(it => it.value === state.fields.search)[0].label : state.fields.search,
                    }
                ]
            }
        case ITEMS_ACTIONS.REMOVE_FILTER:
            index = state.filters.findIndex(x => x.name === action.fieldname);
            if (index >= 0) {
                tmp = [...state.filters];
                tmp.splice(index, 1);
            }
            return {
                ...state,
                filters: tmp,
                load: (state.load + 1) % 17,
            }

        case ITEMS_ACTIONS.HISTORY:
            return {
                ...state,
                history: action.data,
                status: "history",
            }
        case ITEMS_ACTIONS.ADD_FILEFIELD: 
            let bbb = state.item[action.fieldname];

            return {
                ...state,
                item:{
                    ...state.item,
                    [action.fieldname] : [...bbb,{                
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
        //case ITEMS_ACTIONS.EDIT_FILEFIELD:
        //    let arrc = state.item[action.fieldname];
        //    arrb[action.index][action.objkey] = action.value;
        //    if (state.fields.fields[action.fieldname]["type"] === "file") {
        //        arrb[action.index]["title"] = action.titulo;
        //        arrb[action.index]["filename"] = action.filename;
        //    }
        //    return {
        //        ...state,
        //        item: {
        //            ...state.item, 
        //            [action.fieldname] : arrc,
        //        }
        //    }
        case ITEMS_ACTIONS.CHANGE_FIELD_ENABLE: 
            //console.log("cambiando estado: " + action.fieldname);
            let estado = state.fields.fields[action.fieldname].enabled;
            let v = state.fields.fields[action.fieldname].value;
            console.log("Estado: " + estado + " -- " + v);

            tmp_item = state.fields.fields[action.fieldname];
            tmp_item.enabled = !estado;
            tmp_item.value = v + 2;

            return {
                ...state,
                fields:  {
                    ...state.fields,
                    fields: {
                        ...state.fields.fields,
                        [action.fieldname]: {
                            ...tmp_item,
                            otra: "otra cosa",
                        },
                    },
                }
            }        
        default:
            throw new Error("Accion invalida");
    }
}

  