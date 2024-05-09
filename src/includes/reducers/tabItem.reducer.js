import { REDUCER_ACTIONS } from './actions';

export const initialState = {
    fields: {
        searchOperator: 0,
    },
    items: [],
    deleted: [],
    status: "list",
    participanteId: 0,
    selectAll: false,
    filters: [],
    errors: {},
    pagination: {
        page: 0,
        pageSize: 10,
        sizes: [10, 20, 30],
        totalPages: 0,
        total: 0,
    },            
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
        switch (form.fields[j].type) {
            case "multilang":
                let tt = {}
                form.languages.forEach(lang => { tt[lang] = "" });
                tmp_item[j] = tt;
                break;
            case "multitext":
                tmp_item[j] = [];
                break;
            case "phone":
                tmp_item[j] = [];
                break;
            case "email":
                tmp_item[j] = [];
                break;
            case "numero": 
                tmp_item[j] = 0;
                break;
            case "file":
                tmp_item[j] = {
                    title: "ficherirtooooo",
                    fichero: null,
                };
                break;
            default:
                tmp_item[j] = "";
                break;
        }
    });
    return tmp_item;
}

export const reducerItems = (state = initialState, action) => {
    let tmpItems = [];
    let estado = false;
    let tmp_item = {};
    switch (action.type) {
        case REDUCER_ACTIONS.START:
            return {
                ...state,
                fields: {
                    ...action.form,
                    searchOperator: 0,
                    search: "",
                },
                pagination: {
                    page: 0,
                    pageSize: 10,
                    sizes: [10, 20, 30],
                    totalPages: 0,
                    total: 0,
                },            
                item: createItem(action.form),
                items: [],
                status: "list",
                filters: [],
                order: [],
                errors: resetErrors(action.form),
            }
        case REDUCER_ACTIONS.EMPTY: 
            return {
                ...state,
                item: createItem(state.fields),
                items: [],
                status: "list",
                errors: resetErrors(state.fields),
            }
        case REDUCER_ACTIONS.LOAD_ITEMS:
            const totalPages = action.totalPages??1;
            const total = action.total??0;

            return {
                ...state,
                items: action.items.map(i => ({ ...i, selected: false })),
                pagination: {
                    ...state.pagination,
                    totalPages: totalPages,
                    total: total,
                },                                        
                errors: resetErrors(state.fields),
            }

        case REDUCER_ACTIONS.SELECT_ITEM:
            return {
                ...state,
                item: state.items[action.index],
                status: "edit",
            }
        case REDUCER_ACTIONS.NEW_ITEM:
            return {
                ...state,
                item: createItem(state.fields),
                status: "edit",
            }
        case REDUCER_ACTIONS.SET:
            if (state.fields.fields[action.fieldname].hasOwnProperty('effects')) {
                const fn = state.fields.fields[action.fieldname].effects[0].fieldname;
                const fk = state.fields.fields[action.fieldname].effects[0].fk;
                tmpItems = state.fields.fields[fn].all.filter(i => i[fk] === action.value).map(it => {return {value:it.value,label:it.label}});
                return {
                    ...state,
                    item: {...state.item,[action.fieldname]:action.value},
                    fields: {
                        ...state.fields,
                        fields: {
                            ...state.fields.fields,
                            [fn]: {
                                ...state.fields.fields[fn],
                                options: tmpItems
                            }
                        }
                    }
                }
            }            
            return {
                ...state,
                item: { ...state.item, [action.fieldname]: action.value }
            }

        case REDUCER_ACTIONS.SAVE:
            let tmp = [];

            if (state.item.id > 0) {
                tmp = [...state.items];
                const index = tmp.findIndex(item => item.id === state.item.id);
                tmp.splice(index, 1, state.item);
            }
            else {
                tmp = [...state.items, state.item];
            }

            return {
                ...state,
                items: tmp,
                status: "list",
            }
        case REDUCER_ACTIONS.CANCEL:
            return {
                ...state,
                status: "list",
            }
        case REDUCER_ACTIONS.DELETE_ITEM:
            let obj = { ...state.items[action.index] };
            tmpItems = [...state.items];
            tmpItems.splice(action.index, 1);

            return {
                ...state,
                items: tmpItems,
                deleted: [...state.deleted, obj],
            }
        case REDUCER_ACTIONS.CHECK:
            tmpItems = [...state.items]
            tmpItems[action.index].selected = !tmpItems[action.index].selected;
            return {
                ...state,
                items: tmpItems
            }
        case REDUCER_ACTIONS.CHECKALL:
            estado = !state.selectAll;

            return {
                ...state,
                items: state.items.map(i => ({ ...i, selected: estado })),
                selectAll: estado,
            }
        case REDUCER_ACTIONS.CLEARERRORS:
            return {
                ...state,
                errors: { ...state.errors, [action.name]: [] }
            }
        case REDUCER_ACTIONS.ADDERROR:
            return {
                ...state,
                errors: { ...state.errors, [action.name]: [action.value] }
            }
        case REDUCER_ACTIONS.SET_MULTIFIELD:
            let newField = state.item;
            newField[action.fieldname][action.pos].value = action.value;

            return {
                ...state,
                item: newField
            }
        case REDUCER_ACTIONS.SET_MULTIFIELDCHECK:
            tmp_item = state.item[action.fieldname].map(item => ({ ...item, default: false }));
            tmp_item[action.pos].default = true;
            return {
                ...state,
                item: {
                    ...state.item,
                    [action.fieldname]: tmp_item
                }
            }
        case REDUCER_ACTIONS.ADD_MULTIFIELD:
            tmp_item = state.item;
            let key = tmp_item[action.fieldname].length + 1;
            tmp_item[action.fieldname].push({ key: key, value: "", default: (tmp_item[action.fieldname].length === 0) ? true : false });

            return {
                ...state,
                item: tmp_item,
            }
        case REDUCER_ACTIONS.REMOVE_MULTIFIELD:
            tmp_item = state.item;
            tmp_item[action.fieldname].splice(action.pos, 1);

            return {
                ...state,
                item: tmp_item
            }
        case REDUCER_ACTIONS.SET_SEARCHFIELD: 
            return {
                ...state,
                fields: {
                    ...state.fields,
                    searchField: action.value,
                }
            }
        case REDUCER_ACTIONS.SEARCH: 
            return {
                ...state,
                fields: {
                    ...state.fields,
                    search: action.value,
                }
            }
        case REDUCER_ACTIONS.ADD_FILTER: 
            console.log("añadiendo un filtro");
            return {
                ...state,
                fields: {
                    ...state.fields,
                    search: "",
                    //searchField: 0,
                },
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
        case REDUCER_ACTIONS.REMOVE_FILTER: 
            const indice = state.filters.findIndex(x => x.name === action.fieldname);
            let tmp_arr = [];
            if (indice >= 0) {
                tmp_arr = [...state.filters];
                tmp_arr.splice(indice, 1);
            }
            return {
                ...state,
                filters: tmp_arr,
                load: (state.load + 1) % 17,
            }
        case REDUCER_ACTIONS.SET_SEARCHOP:
            return {
                ...state,
                fields: {
                    ...state.fields,
                    searchOperator: action.value,
                },
            }
        default:
            throw new Error("Ación no válida");
    }
}
