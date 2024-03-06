import { EXPERIENCIA_ACTIONS } from './actions';
//export const EXPERIENCIA_ACTIONS = {
//    START: 0,
//    LOAD_ITEMS: 1,
//    SELECT_ITEM: 2,
//    NEW_ITEM: 3,
//    SETFIELD: 4,
//    CONTRATOS: 5,
//    MOTIVOS: 6,
//    OCUPACIONES: 7,
//    SAVE: 8,
//    CANCEL: 9,
//    DELETE_ITEM:10,    
//    CHANGE_SELECTED: 11,
//    CHANGE_ALLSELECTED: 12,
//  }


const initialState = {
    fields: {},
    items: [],
    deleted: [],
    status: "list",
    participanteId: 0,
    tipoContratoOptions: [],
    motivosOptions: [],
    ocupacionesOptions: [],
    selectAll: false,
    errors: {},
}

const resetErrors = (fields) => {
    let errores = {};
    let tmp_item = {};
    Object.keys(fields.fields).forEach(j => {
        errores[j] = [];
        if (fields.fields[j].type === "multilang") {
            let tt = {}
            fields.languages.forEach(el => { tt[el] = "" });
            tmp_item[j] = tt;
        }
        else
            tmp_item[j] = [];
    });

    return errores;
}

export const reducerExperiencia = (state=initialState, action ) => {
    let tmpItems = [];
    let estado = false;
    console.log("Accion pulsada->" + action.type);
    switch (action.type) {
        case EXPERIENCIA_ACTIONS.START:
            return {
                ...state,
                fields: {
                    //...state.fields,
                    ...action.form,
                },
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
                errors: resetErrors(action.form),
            }
        case EXPERIENCIA_ACTIONS.LOAD_ITEMS:
            return {
                ...state,
                items: action.experiencias.map(i => ({...i, selected: false})),
                participanteId: action.participanteId,
                errors: resetErrors(state.fields),
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
        case EXPERIENCIA_ACTIONS.SET:
            console.log("me están haciendo SET");
            return {
                ...state,
                item: {...state.item, [action.fieldname]:action.value}
            }
        case EXPERIENCIA_ACTIONS.CONTRATOS: 
            //let options = action.contratoOptions.map(item => { return {value:item.tipoContratoId, label: item.descripcion}});            
            return {
                ...state,
                tipoContratoOptions: action.contratoOptions
            }
        case EXPERIENCIA_ACTIONS.MOTIVOS: 
            return {
                ...state,
                motivosOptions: action.motivos,//action.motivos.map(item => {return {value: item.id, label: item.descripcion}}),
            }

        case EXPERIENCIA_ACTIONS.OCUPACIONES:
            return {
                ...state,
                ocupacionesOptions: action.ocupaciones,
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
        case EXPERIENCIA_ACTIONS.CHECK: 
            tmpItems = [...state.items]
            tmpItems[action.index].selected = !tmpItems[action.index].selected;
            return {
                ...state,
                items: tmpItems
            }
        case EXPERIENCIA_ACTIONS.CHECKALL: 
            estado = !state.selectAll;             

            return {
                ...state,
                items: state.items.map(i => ({...i, selected: estado})),
                selectAll: estado, 
            } 
        case EXPERIENCIA_ACTIONS.CLEARERRORS:
            return {
                ...state,
                errors: { ...state.errors, [action.name]: [] }
            }
        case EXPERIENCIA_ACTIONS.ADDERROR:
            return {
                ...state,
                errors: { ...state.errors, [action.name]: [action.value] }
            }
        default: 
            throw new Error ("Ación no válida");
    }
}
