import { ITEMS_ACTIONS } from './reducers/items.reducer';

export const toHours = (data) => {
    if (data == undefined)
        return "";
    
    const h = new Date(data);
    const horas = (h.getUTCHours() < 10)?"0" + h.getUTCHours():h.getUTCHours();
    const minutos = (h.getUTCMinutes() < 10)?"0" + h.getUTCMinutes():h.getUTCMinutes();
    return horas + ":"  +  minutos;
}

export const handleDelete = (index, items, itemsHandle,onOpenChange) => {
    if (index != -1) {
        itemsHandle({type:ITEMS_ACTIONS.CHECK,index:index});            
    }

    if ( (index != 'undefined') || (items.arr.filter(item => item.checked).length > 0))
        onOpenChange(true);
}
