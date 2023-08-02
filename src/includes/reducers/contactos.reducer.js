import { ContactosForm } from "../../components/Empresas/ContactosForm";

export const CONTACTOS_ACTIONS = {
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

export const initialState = {
  items: [],
  item: {},
  modified: [],
  deleted: [],
  status: "list",
}

let tmp = [];
let newItem = {};

export const reducerContactos = (state = initialState, action) => {
  switch (action.type) {
    case CONTACTOS_ACTIONS.START:
      return {
        ...state,
        status: "list"
      }
    case CONTACTOS_ACTIONS.LOAD: 
      return {
        ...state,
        items: action.items,
      }
    case CONTACTOS_ACTIONS.SELECT_ITEM:
      console.log("seleccionando");
      return {
        ...state,
        item: state.items[action.index],
        status: "edit",
      }
    case CONTACTOS_ACTIONS.NEW_ITEM: 
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
    case CONTACTOS_ACTIONS.SETFIELD:
      console.log("SETFIELD");
      return {
        ...state,
        item: {
          ...state.item,
          [action.fieldname]: action.value,
        },
      }
    case CONTACTOS_ACTIONS.SET_MULTIFIELD:
      let newItem = state.item;
      newItem[action.fieldname][action.pos].value = action.value;

      return {
        ...state,
        item: newItem,
      }
    case CONTACTOS_ACTIONS.SET_MULTIFIELDCHECK:
      newItem = state.item;
      newItem[action.fieldname][action.pos].default = !(newItem[action.fieldname][action.pos].default);

      return {
        ...state,
        item: newItem,
      }
    case CONTACTOS_ACTIONS.ADD_MULTIFIELD:
      newItem = state.item;
      let key = newItem[action.fieldname].length + 1;
      newItem[action.fieldname].push({ key: key, value: "", default: false });
      return {
        ...state
      }
    case CONTACTOS_ACTIONS.REMOVE_MULTIFIELD:
      newItem = state.item;
      newItem[action.fieldname].splice(action.pos, 1);
      return {
        ...state,
        item: newItem
      }

    case CONTACTOS_ACTIONS.SAVE:
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
    case CONTACTOS_ACTIONS.CANCEL:
      return {
        ...state,
        status: "list",
      }
    case CONTACTOS_ACTIONS.DELETE: 
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
