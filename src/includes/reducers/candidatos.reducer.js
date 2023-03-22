export const PARTICIPANTES_OPTIONS = {
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
  SET_CANDIDATOS: 11,
  TOGGLE_CHECK: 12,
  TOGGLE_CHECKALL: 13,
}

const initialState = {
  items: [],
  item: {},
  modified: [],
  deleted: [],
  candidatos: [],
  status: "list",
  checkall: false,
}

let tmp = [];
let newItem = {};

export const reducerCandidatos= (state = initialState, action) => {
  switch (action.type) {
    case PARTICIPANTES_OPTIONS.START:
      return {
        ...state,
        status: "list",
        search: action.search,
        showError: action.showError,
        candidatos: [
          {check:false, nombre:'Persona 1',apellido1:'apellido1',participanteId:1},
          {check:false, nombre:'Persona 2',apellido1:'apellido2',participanteId:2},
        ]
      }
    case PARTICIPANTES_OPTIONS.LOAD: 
      return {
        ...state,
        items: action.items,
      }
    case PARTICIPANTES_OPTIONS.NEW_ITEM: 
      return {
        ...state,
        item: {
          id: 0,
          nombre: "",
          apellido1: "",
          apellido2: "",
          telefono : "",
        },
        status: "edit",
      }
    case PARTICIPANTES_OPTIONS.CANCEL:
      return {
        ...state,
        status: 'list',
      }
    case PARTICIPANTES_OPTIONS.SAVE:
      console.log("añadiendo los participantes seleccionados");
      const seleccionados = state.candidatos.filter( i => i.check == true);
      console.debug(seleccionados);

      if (seleccionados.lenght == 0) {
        state.showError({title:'Selección',type:'error', text: 'Debe seleccionar un elemento para almacenar'});
        return {
          ...state
        }
      }
      return {
        ...state,
        items: [...state.items,...seleccionados],
        candidatos: [],
        status: 'list',
      }

    case PARTICIPANTES_OPTIONS.SEARCH:
      state.search();
      return {
        ...state,
      }

    case PARTICIPANTES_OPTIONS.SET_CANDIDATOS:
      return {
        ...state,
        candidatos: action.candidatos.map(item => {return {...item,check:false}}),
      }

    case PARTICIPANTES_OPTIONS.TOGGLE_CHECK: 
      console.debug(action);
      const newArr = [...state.candidatos];
      newArr[action.index].check = !(newArr[action.index].check);

      return {
        ...state,
        candidatos: newArr,
        checkall: false,
      }

    case PARTICIPANTES_OPTIONS.TOGGLE_CHECKALL: 
      const checkall = !state.checkall;

      return {
        ...state,
        candidatos: state.candidatos.map(item => {return{...item,check:checkall}}),
        checkall: checkall,
      }

    default: 
      return {
        ...state
      }
  }
}
