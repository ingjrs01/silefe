export const CANTIDATOS_OPTIONS= {
  START: 0,
  LOAD: 1,
  SELECT_ITEM: 2,
  NEW_ITEM: 3,
  SETFIELD: 4,
  ADD_MULTIFIELD: 5,
  SET_MULTIFIELD: 6,
  REMOVE_MULTIFIELD: 7,
  CANCEL: 8,
  SAVE: 9,
  DELETE: 10,
}

const initialState = {
  items: [],
  item: {},
  modified: [],
  deleted: [],
  status: "list",
}

let tmp = [];
let newItem = {};

export const reducerCandidatos= (state = initialState, action) => {
  switch (action.type) {
    case CANDIDATOS_OPTIONS.START:
      return {
        ...state,
        status: "list"
      }
    case CANDIDATOS_OPTIONS.LOAD: 
      return {
        ...state,
        items: action.items,
      }
    case CANDIDATOS_OPTION.SELECT_ITEM:
      console.log("seleccionando");
      return {
        ...state,
        item: state.items[action.index],
        status: "edit",
      }
    case CANDIDATOS_OPTION.NEW_ITEM: 
        console.log("Agregando un dato");
        return {
          ...state,
          item: {
            id: 0,
            nombre: "",
            apellido1: "",
            apellido2: "",
            cargo: "",
            email: [],
            telefono: [], 
            origen: 0,
            origenId: 1,
          },
          status: "edit",
        }
    case CANDIDATOS_OPTION.SETFIELD:
      console.log("SETFIELD");
      return {
        ...state,
        item: {
          ...state.item,
          [action.fieldname]: action.value,
        },
      }

    case CANDIDATOS_OPTION.SAVE:
      if (state.item.id == 0)
        tmp = [...state.items, state.item];
      else {
        tmp = [...state.items];
        const index = tmp.findIndex(item => item.id == state.item.id);
        tmp.splice(index, 1, state.item);
      }
      let modified = [...state.modified];
      if (!modified.includes(state.item.id)){
        modified.push(state.item.id);
      }

      return {
        ...state,
        items: tmp,
        modified: modified,
        status: "list",
      }
    case CANDIDATOS_OPTION.CANCEL:
      return {
        ...state,
        status: "list",
      }
    case CANDIDATOS_OPTION.DELETE: 
      console.log(action.index);
      newItem = state.items[action.index];
      tmp = [...state.items];
      tmp.splice(action.index,1);

      return {
        ...state,
        items: tmp,
        deleted: [...state.deleted,newItem.id],
        status: "list"
      }
    default:
      return {
        ...state
      }
  }
}
