export const PARTICIPANTE_ACTIONS = {
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
    CHECK: 13,
    CHECKALL: 14,
    SETITEMS: 15,
    SETPAGE: 16,
    SETSEARCHFIELD: 17,
    LOAD: 18,
}
export const initialParticipantes = {
    items: [],
    deleted: [],
    search: "",
    searchField: "",
    searchItems: [],
    status: "list",
    participanteId: 0,
    pagination: {
        page: 0,
        pageSize: 4,
        totalPages: 1,
    },
    load: 0,
}
let tmpar= [];

export const reducerParticipantes = (state, action ) => {
    //debugger;
    switch (action.type) {
        case PARTICIPANTE_ACTIONS.START:
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
        case PARTICIPANTE_ACTIONS.LOAD_ITEMS:
            return {
                ...state,
                items: action.docentes,
            }

        case PARTICIPANTE_ACTIONS.SELECT_ITEM:
            return {
                ...state,
                item: state.items[action.index],
                status: "edit",
            }
        case PARTICIPANTE_ACTIONS.NEW_ITEM:
            return {
                ...state,
                item: {
                    id: 0,
                },
                status: "edit",
            }
        case PARTICIPANTE_ACTIONS.SETFIELD:
            return {
                ...state,
                item: {...state.item, [action.fieldname]:action.value}
            }
        case PARTICIPANTE_ACTIONS.SETSEARCH:
            return {
                ...state,
                search: action.value
            }
        case PARTICIPANTE_ACTIONS.SETSEARCHITEMS:
            return {
                ...state,
                searchItems: action.items.map(item => ({...item, checked:false})),
                pagination: {...state.pagination, totalPages: action.totalPages},
            }
        case PARTICIPANTE_ACTIONS.CHECKSEARCH:
            tmpar = state.searchItems;
            tmpar[action.index].checked = !tmpar[action.index].checked;

            return {
                ...state,
                searchItems: tmpar
            }
        case PARTICIPANTE_ACTIONS.CHECKALLSEARCH:
            const check = !state.checkAllSearch;
            return {
                ...state,
                checkAllSearch: check,
                searchItems: state.searchItems.map(i => ({...i,checked:check}))
            }

        case PARTICIPANTE_ACTIONS.SAVE:
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
        case PARTICIPANTE_ACTIONS.CANCEL:
            return {
                ...state,
                status: "list",
            }

        case PARTICIPANTE_ACTIONS.DELETE_ITEM:
            let obj = {...state.items[action.index]};
            tmp = [...state.items];
            tmp.splice(action.index,1);
            
            return {
                ...state,
                items: tmp,
                deleted: (obj.nuevo)?[...state.deleted]:[...state.deleted,obj],
            }
        case PARTICIPANTE_ACTIONS.SELECT_ITEMS:
            tmpar = state.searchItems.filter(item => item.checked);
            let tmpPar2 = state.searchItems.filter(item => item.checked == false);

            return {
                ...state,
                items: [...state.items,...tmpar.map(i => ({...i,checked:false}))],
                searchItems: tmpPar2,
            }
        case PARTICIPANTE_ACTIONS.SETITEMS:
            return {
                ...state,
                items: [...action.items.map(item=>({...item, checked:false}))]
            }
        case PARTICIPANTE_ACTIONS.CHECK:
            tmpar = state.items;
            tmpar[action.index].checked = !tmpar[action.index].checked;

            return {
                ...state,
                items: tmpar
            }
        case PARTICIPANTE_ACTIONS.CHECKALL:
            const val = !state.checkAll;
            return {
                ...state,
                checkAll: val,
                items: [...state.items.map(item => ({...item,checked: val}))]
            }
        case PARTICIPANTE_ACTIONS.SETPAGE:
            return {
                ...state,
                pagination: {...state.pagination, page: action.page},
                load: state.load + 1,
            }
//        case PARTICIPANTE_ACTIONS.SETTOTALPAGES:
//            return {
//                ...state,
//                pagination: {...state.pagination, totalPages: action.totalPages},
//            }
        case PARTICIPANTE_ACTIONS.SETSEARCHFIELD:
            return {
                ...state,
                searchField: action.value,
            }
        case PARTICIPANTE_ACTIONS.LOAD:
            return {
                ...state,
                load: state.load + 1,
            }
        default:
            throw new Error ("Ación no válida");
    }
}
