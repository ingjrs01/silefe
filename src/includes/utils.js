
export const toHours = (data) => {
    if (data == undefined)
        return "";
    
    const h = new Date(data);
    const horas = (h.getUTCHours() < 10)?"0" + h.getUTCHours():h.getUTCHours();
    const minutos = (h.getUTCMinutes() < 10)?"0" + h.getUTCMinutes():h.getUTCMinutes();
    return horas + ":"  +  minutos;
}