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
  SET_FILTER: 14,
  SET_RANGOS: 15,
  SET_JORNADAS: 16,
  SET_PROVINCIAS: 17,
  SET_PROVINCIA: 18,
  SET_MUNICIPIOS: 19,
  SET_OCUPACIONES: 20,
  SET_COLECTIVOS: 21,
}

export const initialState = {
  items: [],
  item: {},
  modified: [],
  deleted: [],
  candidatos: [],
  status: "list",
  filters: {
    nombre: '',
    apellido1: '',
    apellido2: '',
    titulacion: '',
    rangoId: 0,
    jornadaId: 0,
    provinciaId: 0,
    municipioId: 0,
    colectivoId: 0,
  },
  checkall: false,
  rangosOptions: [],
  jornadaOptions: [],
  provinciasOptions: [],
  municipios: [],
  municipiosOptions: [],
  ocupacionesOptions: [],
  colectivosOptions: [],
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
        candidatos: []
      }

    case PARTICIPANTES_OPTIONS.LOAD: 
      return {
        ...state,
        items: action.items,
        deleted: [],
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
        filters: {
          nombre: '',
          apellido1: '',
          apellido2: '',
          titulacion: '',
          rangoId: 0,
          jornadaId: 0,
          provinciaId: 0,
          municipioId: 0,
        },
        status: "edit",
        checkall: false,
        filters: [],
      }
    case PARTICIPANTES_OPTIONS.CANCEL:
      return {
        ...state,
        status: 'list',
        checkall: false,
      }
    case PARTICIPANTES_OPTIONS.SAVE:
      const seleccionados = state.candidatos.filter( i => i.check == true);

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

    case PARTICIPANTES_OPTIONS.DELETE: 
      console.log("borrando los elementos");
      let item = state.items[action.index];

      tmp = [...state.items];
      tmp.splice(action.index,1);
      return {
         ...state,
         items: tmp,
         deleted: [...state.deleted, item],
      }

    case PARTICIPANTES_OPTIONS.SEARCH:
      state.search(state.filters);
      return {
        ...state,
        checkall: false,
      }

    case PARTICIPANTES_OPTIONS.SET_CANDIDATOS:
      return {
        ...state,
        candidatos: action.candidatos.map(item => {return {...item,check:false}}),
      }

    case PARTICIPANTES_OPTIONS.TOGGLE_CHECK: 
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
    case PARTICIPANTES_OPTIONS.SET_FILTER: 
      return {
        ...state,
        filters: {
          ...state.filters,
          [ action.fieldname ]: action.value
        }
      }
    case PARTICIPANTES_OPTIONS.SET_RANGOS: 
      return {
        ...state,
        rangosOptions: action.rangos,
      }

    case PARTICIPANTES_OPTIONS.SET_JORNADAS: 
      return {
        ...state,
        jornadaOptions: action.jornadas,
      }
    case PARTICIPANTES_OPTIONS.SET_PROVINCIAS:
      return {
        ...state,
        provinciasOptions: action.provincias,
      }

    case PARTICIPANTES_OPTIONS.SET_MUNICIPIOS:
      return {
        ...state,
        municipios: action.municipios,
      }

    case PARTICIPANTES_OPTIONS.SET_PROVINCIA:
      tmp = state.municipios.filter(item => item.provinciaId == action.provinciaId ).map(item => {return {value: item.municipioId, label: item.nombre}});
      return {
        ...state,
        filters: {
          ...state.filters,
          provinciaId: action.provinciaId,
        },
        municipiosOptions: tmp,
      }

    case PARTICIPANTES_OPTIONS.SET_OCUPACIONES: 
      return {
        ...state,
        ocupacionesOptions: action.ocupaciones,
      }

    case PARTICIPANTES_OPTIONS.SET_COLECTIVOS:
      return {
        ...state,
        colectivosOptions: action.colectivos,
      }

    default: 
      return {
        ...state
      }
  }
}
