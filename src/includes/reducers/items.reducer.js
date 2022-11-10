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
  }

const initialState = {
    arr: [],
    item: {id:0,checked:false},
    errors: [],
    checkall: false,
    showform: false,
}

export const red_items = (state=initialState, action ) => {
    switch (action.type) {
        case ITEMS_ACTIONS.START: 
            return {
                ...state,
                arr: action.items,
                checkall:false
            }

        case ITEMS_ACTIONS.CHECK:
            const newArr = [...state.arr];
            newArr[action.index].checked = !newArr[action.index].checked;

            return {
                ...state,
                arr: newArr
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
            console.log("estableciendo datos");
            console.log(action.fieldname);
            console.log(action.value);
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
                    showform: true
                }
            }
            return state;        
            
        case ITEMS_ACTIONS.NEW_ITEM:
            let tmp = {id:0};
            return {
                ...state,
                item: tmp,
                errors: [],
                showform: true
            }
        case ITEMS_ACTIONS.HIDE:
            return {
                ...state,
                showform:false
            }
        case ITEMS_ACTIONS.CANCEL:
            return {
                ...state,
                arr: state.arr.map(i => {return {...i,checked:false}}),
                showform:false,
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
        default: 
            throw new Error ("Acción inválida");
    }
}