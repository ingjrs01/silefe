export const CENTROS_ACTIONS = {
    START: 0,
    LOAD: 1,
    SELECT_ITEM: 2,
    NEW_ITEM: 3,
    SETFIELD: 4,
    CANCEL: 5,
    SAVE: 6,
    DELETE: 7,
    PROVINCIAS: 8,
    MUNICIPIOS: 9,
    TIPOS_VIA: 10,
}

export const initialState = {
    items: [],
    item: {},
    modified: [],
    deleted: [],
    status: "list",
    provincias: [],
    all_municipios: [],
    municipios: [],
    tipos_via: [],
}

let tmp = [];

export const reducerCentros = (state=initialState, action ) => {
    
    switch (action.type) {
        case CENTROS_ACTIONS.START:
            return {
                ...state,
                modified: [],
            }
        case CENTROS_ACTIONS.LOAD:
            return {
                ...state,
                items: action.items,
                modified: [],
            }

        case CENTROS_ACTIONS.SELECT_ITEM:
            // tengo que cargar los municipios de la provincia activa
            tmp = state.all_municipios.filter(i => i.provinciaId == state.items[action.index].provinciaId).map(it => {return {value:it.id,label:it.nombre}});
            return {
                ...state,
                item: state.items[action.index],
                municipios: tmp,
                status: "edit"
            }
        case CENTROS_ACTIONS.NEW_ITEM:
            return {
                ...state,
                item: {...state.item,
                    id: 0,
                    nombre: "abc",
                    empresaId: 0,
                    cp: "",
                    municipioId: 0,
                    localidad: "Localidad",
                    provinciaId: 0,
                    tipoViaId: 0,
                    nombreVia: "",
                    numero: "",
                    piso: "",
                },
                status: "edit",
            }
        case CENTROS_ACTIONS.SETFIELD:
            if (action.fieldname == 'provinciaId') {
                tmp = state.all_municipios.filter(i => i.provinciaId == action.value).map(it => {return {value:it.id,label:it.nombre}});
                return {
                    ...state,
                    item: {...state.item,[action.fieldname]:action.value},
                    municipios: tmp,
                }
            }
            return {
                ...state,
                item: {...state.item,[action.fieldname]:action.value}
            }
        case CENTROS_ACTIONS.CANCEL:
            return {
                ...state,
                modified: [],
                deleted: [],
                status: "list",
            }
        case CENTROS_ACTIONS.SAVE:
            if (state.item.id == 0)
                tmp = [...state.items, state.item];
            else  {
                tmp = [...state.items];
                const index = tmp.findIndex(item => item.id == state.item.id );
                tmp.splice(index,1,state.item);
            }
            let modified = [...state.modified];
            if (!modified.includes(state.item.id)) {
                modified.push(state.item.id);
            }

            return {
                ...state,
                items: tmp,
                modified: modified,
                status: "list"
            }
        case CENTROS_ACTIONS.DELETE:
            let item = state.items[action.index];

            tmp = [...state.items];
            tmp.splice(action.index,1);
            return {
                ...state,
                items: tmp,
                deleted: [...state.deleted, item],
            }
        case CENTROS_ACTIONS.PROVINCIAS:
            return {
                ...state,
                provincias: action.provincias,
            }
        case CENTROS_ACTIONS.MUNICIPIOS:
            return {
                ...state,
                all_municipios: action.municipios,
            }
        case CENTROS_ACTIONS.TIPOS_VIA:
            return {
                ...state,
                tipos_via: action.tipos,
            }

        default:
            return {...state}
    }
}
