export const SUBTABLE_ACTIONS = {
    START: 0,
    LOAD_ITEMS: 1,
    SELECT_ITEM: 2,
    NEW_ITEM: 3,
    SET: 5,
    SETFIELD: 4,
    SETSEARCH: 23,
    SETSEARCHITEMS: 6,
    CHECKSEARCH: 7,
    CHECKALLSEARCH: 8,
    SAVE: 9,
    CANCEL: 10,
    DELETE_ITEM:11,
    SELECT_ITEMS: 12,
    CHECK: 13,
    CHECKALL: 14,
    SETITEMS: 15,
    SETPAGE: 16,
    SETPAGES: 17,
    SETSEARCHFIELD: 18,
    LOAD: 19,
    SETFORM: 20,
    SETPAGESEARCH: 21,
    EDIT_ITEM: 22,
    ADD_FILTER: 24,
    REMOVE_FILTER: 25,
  }
export const iniState = {
    form: {},
    items: [],
    deleted: [],
    search: "",
    search2: "",
    searchField: "",
    searchItems: [],
    status: "list",
    participanteId: 0,
    pagination: {
        page: 0,
        pageSize: 4,
        totalPages: 1,
    },
    paginationSearch: {
        page: 0,
        pageSize: 4,
        totalPages: 1,
    },
    load: 0,
    filters: [], //{name: 'hola', value:"1", operator: "="}
}
let tmpar= []; 

export const reducerSubtable = (state, action ) => {
    let tmp = [];
    let index = 0;
    
    switch (action.type) {
        case SUBTABLE_ACTIONS.SETFORM: 
            return {
                ...state,
                form: action.form,
            }
        case SUBTABLE_ACTIONS.START:
            return {
                ...state,
                item: {
                    id: 0,                    
                },
                items: [],
                deleted: [],
                searchItems: [],
                checkAllSearch: false,
                checkAll: false,
                status: "list",
            }
        case SUBTABLE_ACTIONS.LOAD_ITEMS:
            return {
                ...state,
                items: action.items,
                pagination: {...state.pagination, totalPages: action.pages},
                paginationSearch: {...state.paginationSearch, page: -1}, 
            }

        case SUBTABLE_ACTIONS.SELECT_ITEM:
            tmpar = [state.searchItems[action.index]];
            let tmpPar3 = [...state.searchItems];
            tmpPar3.splice(action.index,1);

            return {
                ...state,
                items: [...state.items,...tmpar.map(i => ({...i,checked:false}))],
                searchItems: tmpPar3,
            }
        case SUBTABLE_ACTIONS.NEW_ITEM:
            return {
                ...state,
                item: {
                    id: 0,
                },
                status: "edit",
            }
        case SUBTABLE_ACTIONS.SETFIELD:
            return {
                ...state,
                item: {...state.item, [action.fieldname]:action.value}
            }
        case SUBTABLE_ACTIONS.SETSEARCH: 
            if (action.hasOwnProperty('table') && action.table === 1) {
                return {
                    ...state,
                    search2: action.value
                }
            }
            return {
                ...state,
                search: action.value
            }            
        case SUBTABLE_ACTIONS.SETSEARCHITEMS: 
            const pag = (state.paginationSearch.page > 0)?state.paginationSearch.page:0;
            if (action.items === undefined)
                return {
                    ...state
                }

            return {
                ...state,
                searchItems: action.items.map(item => ({...item, nuevo: true, checked:false})),
                paginationSearch: {...state.paginationSearch, page: pag, totalPages: action.totalPages},
            }
        case SUBTABLE_ACTIONS.CHECKSEARCH: 
            tmpar = state.searchItems;
            tmpar[action.index].checked = !tmpar[action.index].checked;

            return {
                ...state,
                searchItems: tmpar
            }
        case SUBTABLE_ACTIONS.CHECKALLSEARCH: 
            const check = !state.checkAllSearch;
            return {
                ...state, 
                checkAllSearch: check,
                searchItems: state.searchItems.map(i => ({...i,checked:check}))
            }

        case SUBTABLE_ACTIONS.SAVE:            
            if (state.item.id > 0) {
                tmp = [...state.items];
                const index = tmp.findIndex(item => item.id == state.item.id );
                tmp.splice(index,1,{...state.item, modified: true});
            }
            else 
                tmp = [...state.items,{...state.item, modified: true}];

            return {
                ...state,
                items: tmp,
                status: "list",
            }
        case SUBTABLE_ACTIONS.CANCEL:
            return {
                ...state,
                status: "list",
            }

        case SUBTABLE_ACTIONS.DELETE_ITEM:
            let obj = {...state.items[action.index]};
            let tmp2 = [...state.items];
            tmp2.splice(action.index,1);
           
            return {
                ...state,
                items: tmp2,
                searchItems: [...state.searchItems, obj],
                deleted: (obj.nuevo)?[...state.deleted]:[...state.deleted,obj],
            }
        case SUBTABLE_ACTIONS.SELECT_ITEMS: 
            tmpar = state.searchItems.filter(item => item.checked);
            let tmpPar2 = state.searchItems.filter(item => item.checked == false);

            return {
                ...state,
                items: [...state.items,...tmpar.map(i => ({...i,checked:false}))],
                searchItems: tmpPar2,
            }
        case SUBTABLE_ACTIONS.SETITEMS: 
            return {
                ...state,
                items: [...action.items.map(item=>({...item, checked:false}))]
            }
        case SUBTABLE_ACTIONS.CHECK: 
            tmpar = state.items;
            tmpar[action.index].checked = !tmpar[action.index].checked;

            return {
                ...state,
                items: tmpar
            }
        case SUBTABLE_ACTIONS.CHECKALL: 
            const val = !state.checkAll;
            return {
                ...state,
                checkAll: val,
                items: [...state.items.map(item => ({...item,checked: val}))]
            }
        case SUBTABLE_ACTIONS.SETPAGE: 
            return {
                ...state,
                pagination: {...state.pagination, page: action.page},
                load: state.load + 1,
            }
        case SUBTABLE_ACTIONS.SETPAGESEARCH: 
            return {
                ...state,
                paginationSearch: {...state.paginationSearch, page: action.page},
                //load: state.load + 1,
            }
        case SUBTABLE_ACTIONS.SETPAGES:
            return {
                ...state,
                pagination: {...state.pagination, totalPages: action.pages}
            }
        case SUBTABLE_ACTIONS.SETSEARCHFIELD: 
            let sf = 'searchField';
            let sf2 = 'search';
            if (action.hasOwnProperty('table') && action.table == 1) { 
                sf = 'searchFieldMain';
                sf2 = 'search2';
            }
            console.log("cambiando el campo por el que buscar: " + sf);
            return {
                ...state,
                form: {
                    ...state.form,
                    [sf]: action.value,
                },
                [sf2]: '',
            }
        case SUBTABLE_ACTIONS.LOAD: 
            return {
                ...state,
                load: state.load + 1,
            }
        case SUBTABLE_ACTIONS.EDIT_ITEM:
            return {
                ...state,
                item: {
                    ...state.items[action.index]
                }
            }
        case SUBTABLE_ACTIONS.SET:
            return {
                ...state,
                item: {
                    ...state.item,
                    [action.fieldname] : action.value
                }                
            }
        case SUBTABLE_ACTIONS.ADD_FILTER: 
            return {
                ...state,
                filters: [
                    ...state.filters,
                    { name: state.form.searchFieldMain, value: state.search2 , operator: "=" }
                ]
            }
        case SUBTABLE_ACTIONS.REMOVE_FILTER: 
            index = state.filters.findIndex(x => x.name == action.fieldname);
            if (index >= 0) {
                tmp = [...state.filters];
                tmp.splice(index,1);
            }
            return {
                ...state,
                filters: tmp,
            }
       
        default: 
            throw new Error ("Ación no válida");
    }
}
