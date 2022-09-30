export const ITEMS_ACTIONS = {
    START: 0,
    LOAD: 1,
    CHECK: 2,
    CHECKALL: 3,
    UNSELECT: 4,
    INIT_ITEM: 5,
    SET: 6,
  }

const initialState = {
    arr: [],
    checkall: false,
    item: {}
}

export const red_items = (state=initialState, action ) => {
    switch (action.type) {
        case ITEMS_ACTIONS.START: 
            return {
                ...state,
                arr: action.items
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
            console.log("Iniciando el item seleccionado");
            return {
                ...state,
                item: action.item
            }
        case ITEMS_ACTIONS.SET:
            console.log("Cambiando un valor del item");
            console.debug(action);
            console.log(action.fieldname);
            console.log(action.value);

            return {
                ...state,
                item: {...item,[action.fieldname]:action.value}
            }

        default: 
            throw new Error ("Acción inválida");
    }
}