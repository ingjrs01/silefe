import { fetchAPIData } from "../apifunctions";

export const TITULACIONES_ACTIONS = {
    START: 0,
  }
const initialState = {
    titulacionTipoOptions: [
        {value:101,label:"Educacion básida"},
        {value:102,label: "Estudios postuniversitarios"},
        {value:103,label: "Estudios universitarios"}
    ],
    titulacionNivelOptions: [
        {value:103,label: "Doctorado"},
        {value:104,label: "Especialista"},
        {value:105,label: "Experto"},
    ],
}

const getTipos = async () => fetchAPIData('/silefe.titulaciontipo/all',  {descripcion: "", lang: getLanguageId()},"http://localhost:8080/titulaciones").then(response => {
    return response.data.map(obj => {return {value:obj.id,label:obj.descripcion}})
});





export const reducerTitulacion = (state=initialState, action ) => {
    switch (action.type) {
        case TITULACIONES_ACTIONS.START:
            const tipos = [];
            if (state.tipos.length == 0)  {
                console.log("Capturando informacion");
                tipos = getTipos();
            }
                

            return {
                ...state,
                tipoOptions: initialState.titulacionTipoOptions,
                nivelOptions: initialState.titulacionNivelOptions,
                tipos: tipos,
            }
            
        default: 
            throw new Error ("Ación no válida");
    }
}
