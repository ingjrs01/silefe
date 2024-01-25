import { ITEMS_ACTIONS } from './reducers/items.reducer';

export const toHours = (data) => {
  if (data == undefined)
    return "";

  const h = new Date(data);
  const horas = (h.getUTCHours() < 10) ? "0" + h.getUTCHours() : h.getUTCHours();
  const minutos = (h.getUTCMinutes() < 10) ? "0" + h.getUTCMinutes() : h.getUTCMinutes();
  return horas + ":" + minutos;
}

export const toDate = (data) => {
  if (data == undefined)
    return "";
  return new Date(data).toISOString().substring(0, 10)
}

export const handleDelete = (index, items, itemsHandle, onOpenChange) => {
  if (index != -1) {
    itemsHandle({ type: ITEMS_ACTIONS.CHECK, index: index });
  }

  if ((index != 'undefined') || (items.arr.filter(item => item.checked).length > 0))
    onOpenChange(true);
}


export const formatDocument = (tipoDoc, value) => {
  if (tipoDoc == 1)
    return formatDni(value);
  if (tipoDoc == 2)
    return formatNif(value);
  if (tipoDoc == 3)
    return formatCif(value);
}

export const formatDni = (dni_limpio) => {
  if (dni_limpio == undefined || dni_limpio.length == 0)
    return "";

  var dni_mostrado = dni_limpio.substr(0, 2);
  if (dni_limpio.length > 2)
    dni_mostrado = dni_limpio.substr(0, 2) + "." + dni_limpio.substr(2, 3);
  if (dni_limpio.length > 5)
    dni_mostrado = dni_limpio.substr(0, 2) + "." + dni_limpio.substr(2, 3) + "." + dni_limpio.substr(5, 3);
  if (dni_limpio.length > 8)
    dni_mostrado = dni_limpio.substr(0, 2) + "." + dni_limpio.substr(2, 3) + "." + dni_limpio.substr(5, 3) + "-" + dni_limpio.substr(8, 1);

  return dni_mostrado;
}

export const formatNif = (dni_limpio) => {
  if (dni_limpio == undefined || dni_limpio.length == 0)
    return "";

  var dni_mostrado = dni_limpio.substr(0, 1);
  if (dni_limpio.length > 1)
    dni_mostrado = dni_limpio.substr(0, 1) + " " + dni_limpio.substr(1, 1);
  if (dni_limpio.length > 2)
    dni_mostrado = dni_limpio.substr(0, 1) + " " + dni_limpio.substr(1, 1) + "." + dni_limpio.substr(2, 3);
  if (dni_limpio.length > 5)
    dni_mostrado = dni_limpio.substr(0, 1) + " " + dni_limpio.substr(1, 1) + "." + dni_limpio.substr(2, 3) + "." + dni_limpio.substr(5, 3);
  if (dni_limpio.length > 8)
    dni_mostrado = dni_limpio.substr(0, 1) + " " + dni_limpio.substr(1, 1) + "." + dni_limpio.substr(2, 3) + "." + dni_limpio.substr(5, 3) + "-" + dni_limpio.substr(8, 1);
  return dni_mostrado
}

export const formatCif = (dni_limpio) => {
  if (dni_limpio == undefined || dni_limpio.length == 0)
    return "";

  var dni_mostrado = dni_limpio.substr(0, 1);
  if (dni_limpio.length > 1)
    dni_mostrado = dni_limpio.substr(0, 1) + " " + dni_limpio.substr(1, 2);
  if (dni_limpio.length > 2)
    dni_mostrado = dni_limpio.substr(0, 1) + " " + dni_limpio.substr(1, 2) + "." + dni_limpio.substr(3, 3);
  if (dni_limpio.length > 5)
    dni_mostrado = dni_limpio.substr(0, 1) + " " + dni_limpio.substr(1, 2) + "." + dni_limpio.substr(3, 3) + "." + dni_limpio.substr(6, 3);
  if (dni_limpio.length > 8)
    dni_mostrado = dni_limpio.substr(0, 1) + " " + dni_limpio.substr(1, 2) + "." + dni_limpio.substr(3, 3) + "." + dni_limpio.substr(6, 3) + "-" + dni_limpio.substr(9, 1);
  return dni_mostrado
}

export const formatDefaultPhone = (inputphones) => {
  const phones = (typeof (inputphones) === "string") ? JSON.parse(inputphones) : inputphones;
  if (phones === undefined || phones.length == 0)
    return "";

  const seleccionado = phones.filter(i => i.default);
  if (seleccionado.length > 0)
    return seleccionado[0].value;

  return phones[0].value;
}

export const formatDefaultEmail = (inputemails) => {
  //console.log("formatenado");
  let emails = (typeof (inputemails) == "string") ? JSON.parse(inputemails) : inputemails;
  //console.debug(emails);
  if (emails == 'undefined' || emails.length == 0)
    return "";
  const seleccionado = emails.filter(i => i.default);
  if (seleccionado.length > 0)
    return seleccionado[0].value;

  return emails[0].value;
}
