export const EXPERIENCIA_ACTIONS = {
    START: 0,
    LOAD_ITEMS: 1,
    SELECT_ITEM: 2,
    NEW_ITEM: 3,
    SETFIELD: 4,
    CONTRATOS: 5,
    MOTIVOS: 6,
    OCUPACIONES: 7,
    SAVE: 8,
    CANCEL: 9,
    DELETE_ITEM:10,
  }
const initialState = {
    items: [],
    deleted: [],
    status: "list",
    participanteId: 0,
    tipoContratoOptions: [],
    motivosOptions: [],
    ocupacionesOptions: [],
}

export const reducerExperiencia = (state=initialState, action ) => {
    switch (action.type) {
        case EXPERIENCIA_ACTIONS.START:
            return {
                ...state,
                item: {
                    id: 0,
                    ini: "",
                    fin: "",
                    tipoContratoId: 0,
                    cif: "",
                    razonSocial: "",
                    puesto: "",
                    ocupacion: "",
                    duracion: "",
                    motivoBaja: "",
                    observaciones: ""
                },
                items: [],
                status: "list",
            }
        case EXPERIENCIA_ACTIONS.LOAD_ITEMS:
            return {
                ...state,
                items: action.experiencias,
                participanteId: action.participanteId
            }

        case EXPERIENCIA_ACTIONS.SELECT_ITEM:
            return {
                ...state,
                item: state.items[action.index],
                status: "edit",
            }
        case EXPERIENCIA_ACTIONS.NEW_ITEM:
            return {
                ...state,
                item: {
                    id: 0,
                    ini: "",
                    fin: "",
                    tipoContratoId: 0,
                    cif: "",
                    razonSocial: "",
                    puesto: "",
                    ocupacion: "",
                    duracion: "",
                    motivoBaja: "",
                    observaciones: "",
                    participanteId: state.participanteId,
                },
                status: "edit",
            }
        case EXPERIENCIA_ACTIONS.SETFIELD:
            return {
                ...state,
                item: {...state.item, [action.fieldname]:action.value}
            }
        case EXPERIENCIA_ACTIONS.CONTRATOS: 
            let options = action.contratoOptions.map(item => { return {value:item.tipoContratoId, label: item.descripcion}});            
            return {
                ...state,
                tipoContratoOptions: options//action.contratoOptions.map(item => { return {value:item.tipoContratoId, label: item.descripcion}})
            }
        case EXPERIENCIA_ACTIONS.MOTIVOS: 
        return {
            ...state,
            motivosOptions: action.motivos.map(item => {return {value: item.id, label: item.descripcion}}),
        }
        case EXPERIENCIA_ACTIONS.OCUPACIONES:
            return {
                ...state,
                ocupacionesOptions: action.ocupaciones.map(item => { return {value: item.id, label: item.descripcion}}),
            }
        case EXPERIENCIA_ACTIONS.SAVE:
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
        case EXPERIENCIA_ACTIONS.CANCEL:
            return {
                ...state,
                status: "list",
            }
        case EXPERIENCIA_ACTIONS.DELETE_ITEM:                             
            let obj = {...state.items[action.index]};
            tmp = [...state.items];
            tmp.splice(action.index,1);

            return {
                ...state,
                items: tmp,
                deleted: [...state.deleted,obj],
            }
       
        default: 
            throw new Error ("Ación no válida");
    }
}
