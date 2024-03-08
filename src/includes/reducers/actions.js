export const REDUCER_ACTIONS = {
  START: 0,
  LOAD_ITEMS: 1,  // REVISAR
  CHECK: 2,       // hecho
  CHECKALL: 3,    // hecho
  SELECT_ITEM: 6, // hecho
  NEW_ITEM: 7,    // hecho
  SET: 5,         // hecho
  ADDERROR: 9,
  CLEARERRORS: 10,// hecho
  SAVE: 80,
  CANCEL: 8,
  DELETE_ITEM:90,    
}

export const EXPERIENCIA_ACTIONS = {
    START: 0,
    LOAD_ITEMS: 1,  // REVISAR
    CHECK: 2,       // hecho
    CHECKALL: 3,    // hecho
    SELECT_ITEM: 6, // hecho
    NEW_ITEM: 7,    // hecho
    SET: 5,         // hecho
    ADDERROR: 9,
    CLEARERRORS: 10,// hecho
    //CONTRATOS: 50,
    //MOTIVOS: 60,
    //OCUPACIONES0: 70,
    SAVE: 80,
    CANCEL: 8,
    DELETE_ITEM:90,    
  }

  export const TITULACIONES_ACTIONS = {
    START: 0,
    LOAD_ITEMS: 1,
    CHECK: 2,       
    CHECKALL: 3,    
    SELECT_ITEM: 6, 
    NEW_ITEM: 7,    
    SET: 5,         
    ADDERROR: 9,
    CLEARERRORS: 10,
    SAVE: 80,
    CANCEL: 8,
    DELETE_ITEM:90,    
    //TIPOS: 50,
    NIVEL: 51,
    FAMILIA: 52,
    TITULACION: 53,
    SET_TITULACION: 54,
    //SET_TITULACIONTIPO: 55,
    //SET_TITULACIONNIVEL: 56,
    //SET_TITULACIONFAMILIA: 57,
    SET_TITULACIONID: 58,
    EMPTY_DELETED: 16,
}

  export const ITEMS_ACTIONS = {
    START: 0,
    LOAD: 1,
    LOAD_ITEMS: 32,
    CHECK: 2,
    CHECKALL: 3,
    UNSELECT: 4,
    SET: 5,
    SELECT_ITEM: 6,
    NEW_ITEM: 7,
    EDIT_ITEM: 26,
    CANCEL: 8,
    ADDERROR: 9,
    CLEARERRORS: 10,
    CANCEL_LOAD: 11,
    SEARCH: 12,
    FETCH: 13,
    SETPAGE: 14,
    SET_FORMOPTIONS: 15,
    ADD_MULTIFIELD: 16,
    REMOVE_MULTIFIELD: 17,
    SET_MULTIFIELD: 18,
    SET_MULTIFIELDCHECK: 19,
    SET_STATUS: 20,
    SET_ACTIVETAB: 21,
    SET_ORDER: 22,
    DELETE_ORDER: 23,
    SET_PAGESIZE: 24,
    SET_SEARCHFIELD: 25,
    SET_FIELDS: 27,
    HISTORY: 28,
    SET_ACTIVETAB: 29,
    SETUNCOLATERAL: 30,
    SETCOMPLETEITEM: 31,
    ADD_FILTER: 34,
    REMOVE_FILTER: 35,
    ADD_FILEFIELD: 36,
    SET_FILEFIELD: 37,
    DELETE_FILEFIELD: 38,
    EDIT_FILEFIELD: 39,
}