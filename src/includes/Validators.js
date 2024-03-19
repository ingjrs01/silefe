import { Liferay } from '../common/services/liferay/liferay';
import { ITEMS_ACTIONS } from "./reducers/actions";

const dniletter = ["T", "R", "W", "A", "G", "M", "Y", "F", "P", "D", "X", "B", "N", "J", "Z", "S", "Q", "V", "H", "L", "C", "K", "E"];

export const validateDni = ( tipoDoc, name, value, itemsHandle) => {
    var DNI_REGEX = /^[0-9-]{8}([A-Za-z])$/;
    //var CIF_REGEX = /^([ABCDEFGHJKLMNPQRSUVW])(\d{7})([0-9A-J])$/;
    const NIE_REGEX = /^[XYZ][0-9-]{7}[A-Za-z]$/;
    //const PASS_REGEX = /^[a-z]{3}[0-9]{6}[a-z]?$/i;

    if (value === undefined || value === null|| value.length === 0) {
        itemsHandle({ type: ITEMS_ACTIONS.ADDERROR, name: name, value: Liferay.Language.get('no-vacío') });
        return false;
    }

    switch (tipoDoc) {
        case '1': // SI EL TIPO ES 1, SE TRATA DE UN DNI
            if (value.match(DNI_REGEX)) {
                const numerodni = parseInt(value.replace(/[.a-zA-Z-]+/g, ""));
                //console.log(dniletter[numerodni % 23] + "  === " + value.substring(8, 9).toLocaleUpperCase());
                if (value.length >= 8 && value.substring(8, 9).toLocaleUpperCase() !== dniletter[numerodni % 23]) {
                    itemsHandle({ type: ITEMS_ACTIONS.ADDERROR, name: name, value: Liferay.Language.get('error-dni') });
                    return false;
                }
                itemsHandle({ type: ITEMS_ACTIONS.CLEARERRORS, name: name });
                return true;
            }
            else {
                itemsHandle({ type: ITEMS_ACTIONS.ADDERROR, name: name, value: Liferay.Language.get('error-dni') });
                return false;
            }
        case '2':
            if (value.match(NIE_REGEX)) {
                const inicio = value.substring(0,1);
                var p1 = (inicio.charCodeAt(0) - 88) * 10000000;
                
                const numerodni = p1 + parseInt(value.replace(/[.a-zA-Z-]+/g, ""));
                //console.log(value.substring(8, 11).toLocaleUpperCase() + "  ===  " + dniletter[numerodni % 23]);

                if (value.length >= 7 && value.substring(8, 11).toLocaleUpperCase() !== dniletter[numerodni % 23]) {
                    itemsHandle({ type: ITEMS_ACTIONS.ADDERROR, name: name, value: Liferay.Language.get('error-nie') });
                    return false;
                }
                itemsHandle({ type: ITEMS_ACTIONS.CLEARERRORS, name: name });
                return true;
            }
            else {
                itemsHandle({ type: ITEMS_ACTIONS.ADDERROR, name: name, value: Liferay.Language.get('error-nie') });
                return false;
            }
        case '3':
            return true;
        default: 
            //throw new Error("Accion invalida");
            break;
    }
    return false;
}

export const validateDate = (name, value, items, itemsHandle) => {
    for (var condicion of items.fields.fields[name]["conditions"]) {
        if (condicion === "number") {
            if (isNaN(value)) {
                itemsHandle({ type: ITEMS_ACTIONS.ADDERROR, name: name, value: Liferay.Language.get('error-numero') });
                return false;
            }
        }

        if (condicion === "text") {
            if (!isNaN(value)) {
                itemsHandle({ type: ITEMS_ACTIONS.ADDERROR, name: name, value: Liferay.Language.get('error-texto') });
                return false;
            }
        }

        if (condicion === "required") {
            if (value === 'undefined' || value === null|| value.length === 0) {
                itemsHandle({ type: ITEMS_ACTIONS.ADDERROR, name: name, value: Liferay.Language.get('no-vacío') });
                return false;
            }
        }
    }

    if (value === undefined || value === null|| value.length === 0) { // si llego aqui, no es requerido
        itemsHandle({ type: ITEMS_ACTIONS.CLEARERRORS, name: name });
        return true;
    }
    // comprobar si la fecha tiene buena pinta.
    const parts = value.split("-");
    const anio  = parseInt(parts[0]);
    const month = parseInt(parts[1]);
    const day   = parseInt(parts[2]);

    if ( isNaN(anio) || isNaN(month) || isNaN(day)) {
        itemsHandle({ type: ITEMS_ACTIONS.ADDERROR, name: name, value: Liferay.Language.get('no-es-una-fecha') });
        return false;
    }

    if (items.fields.fields[name].hasOwnProperty('yearmin') ) {
        const aniomin = new Date().getFullYear() - items.fields.fields[name].yearmin;
        if (anio < aniomin) {
            itemsHandle({ type: ITEMS_ACTIONS.ADDERROR, name: name, value: Liferay.Language.get('fecha-no-válida') });
            return false;
        }
    }

    if (items.fields.fields[name].hasOwnProperty('yearmax') ) {
        const aniomin   = new Date().getFullYear() - items.fields.fields[name].yearmax;
        const datetmp   = new Date(aniomin,month - 1,day);
        const valuedate = new Date(anio,month - 1,day);
        if ( valuedate > datetmp   ) {
            itemsHandle({ type: ITEMS_ACTIONS.ADDERROR, name: name, value: Liferay.Language.get('fecha-no-válida') });
            return false;
        }
    }

    if (month > 12) {
        itemsHandle({ type: ITEMS_ACTIONS.ADDERROR, name: name, value: Liferay.Language.get('fecha-no-válida') });
        return false;
    }
    if (day > 31) {
        itemsHandle({ type: ITEMS_ACTIONS.ADDERROR, name: name, value: Liferay.Language.get('fecha-no-válida') });
        return false;
    }
    
    itemsHandle({ type: ITEMS_ACTIONS.CLEARERRORS, name: name });

    return true;
}

// esta es la nueva version de la funcion que tengo

export const validateDate2 = (name, value, field, itemsHandle) => {

    for (var condicion of field["conditions"]) {
        //if (condicion == "number") {
        //    if (isNaN(value)) {
        //        itemsHandle({ type: ITEMS_ACTIONS.ADDERROR, name: name, value: Liferay.Language.get('error-numero') });
        //        return false;
        //    }
        //}

        if (condicion === "required") {
            if (value === undefined || value === null|| value.length === 0) {
                itemsHandle({ type: ITEMS_ACTIONS.ADDERROR, name: name, value: Liferay.Language.get('no-vacío') });
                return false;
            }
        }
    }

    if (value === 'undefined' || value === null|| value.length === 0) { // si llego aqui, no es requerido
        itemsHandle({ type: ITEMS_ACTIONS.CLEARERRORS, name: name });
        return true;
    }
    // comprobar si la fecha tiene buena pinta.
    const parts = value.split("-");
    const anio  = parseInt(parts[0]);
    const month = parseInt(parts[1]);
    const day   = parseInt(parts[2]);

    if ( isNaN(anio) || isNaN(month) || isNaN(day)) {
        itemsHandle({ type: ITEMS_ACTIONS.ADDERROR, name: name, value: Liferay.Language.get('no-es-una-fecha') });
        return false;
    }

    if (field.hasOwnProperty('yearmin') ) {
        const aniomin = new Date().getFullYear() - field.yearmin;
        if (anio < aniomin) {
            itemsHandle({ type: ITEMS_ACTIONS.ADDERROR, name: name, value: Liferay.Language.get('fecha-no-válida') });
            return false;
        }
    }

    if (field.hasOwnProperty('yearmax') ) {
        const aniomax   = new Date().getFullYear() + field.yearmax;
        const datetmp   = new Date(aniomax,month - 1,day);
        const valuedate = new Date(anio,month - 1,day);
        if ( valuedate > datetmp   ) {
            itemsHandle({ type: ITEMS_ACTIONS.ADDERROR, name: name, value: Liferay.Language.get('fecha-no-válida') });
            return false;
        }
    }

    if (month > 12) {
        itemsHandle({ type: ITEMS_ACTIONS.ADDERROR, name: name, value: Liferay.Language.get('fecha-no-válida') });
        return false;
    }
    if (day > 31) {
        itemsHandle({ type: ITEMS_ACTIONS.ADDERROR, name: name, value: Liferay.Language.get('fecha-no-válida') });
        return false;
    }
    
    itemsHandle({ type: ITEMS_ACTIONS.CLEARERRORS, name: name });

    return true;
}

export const validateHour = (name, value, field, itemsHandle) => {

    for (var condicion of field["conditions"]) {
        if (condicion === "required") {
            if (value === 'undefined' || value === null|| value.length === 0) {
                itemsHandle({ type: ITEMS_ACTIONS.ADDERROR, name: name, value: Liferay.Language.get('no-vacío') });
                return false;
            }
        }
    }

    if (value === 'undefined' || value === null|| value.length === 0) { // si llego aqui, no es requerido
        itemsHandle({ type: ITEMS_ACTIONS.CLEARERRORS, name: name });
        return true;
    }
    // comprobar si la fecha tiene buena pinta.
    const parts  = value.split(":");
    const hour   = parseInt(parts[0]);
    const minute = parseInt(parts[1]);

    if ( isNaN(hour) || isNaN(minute) ) {
        itemsHandle({ type: ITEMS_ACTIONS.ADDERROR, name: name, value: Liferay.Language.get('no-es-una-hora') });
        return false;
    }

    //if (field.hasOwnProperty('yearmin') ) {
    //    const aniomin = new Date().getFullYear() - field.yearmin;
    //    if (anio < aniomin) {
    //        itemsHandle({ type: ITEMS_ACTIONS.ADDERROR, name: name, value: Liferay.Language.get('fecha-no-válida') });
    //        return false;
    //    }
    //}

    //if (field.hasOwnProperty('yearmax') ) {
    //    const aniomin   = new Date().getFullYear() - field.yearmax;
    //    const datetmp   = new Date(aniomin,month - 1,day);
    //    const valuedate = new Date(anio,month - 1,day);
    //    if ( valuedate > datetmp   ) {
    //        itemsHandle({ type: ITEMS_ACTIONS.ADDERROR, name: name, value: Liferay.Language.get('fecha-no-válida') });
    //        return false;
    //    }
    //}

    if (hour > 23) {
        itemsHandle({ type: ITEMS_ACTIONS.ADDERROR, name: name, value: Liferay.Language.get('hora-no-válida') });
        return false;
    }
    if (minute > 59) {
        itemsHandle({ type: ITEMS_ACTIONS.ADDERROR, name: name, value: Liferay.Language.get('hora-no-válida') });
        return false;
    }
    
    itemsHandle({ type: ITEMS_ACTIONS.CLEARERRORS, name: name });

    return true;
}

//00000000000000000000000000000000000000000000000000000000000000000

export const validateEmails = (campo,emails, itemsHandle) => {
    for (var email of emails) 
        if (!validateEmail(campo,email.value,itemsHandle)) 
            return false;
    
    const seleccionados = emails.filter( item => item.default);
    if (seleccionados.length === 0) {
        itemsHandle({ type: ITEMS_ACTIONS.ADDERROR, name: campo, value: Liferay.Language.get('debe-seleccionar-un-email-por-defecto') });
        return false;
    }
    if (seleccionados.length > 1) {
        itemsHandle({ type: ITEMS_ACTIONS.ADDERROR, name: campo, value: Liferay.Language.get('debe-seleccionar-solo-email-por-defecto') });
        return false;
    }
    itemsHandle({ type: ITEMS_ACTIONS.CLEARERRORS, name: campo });
    return true;
}

export const validatePhoneNumbers = (name, phones, itemsHandle) => {
    for (var phone of phones) 
        if (!validatePhoneNumber(name,phone.value,itemsHandle)) 
            return false;
    
    const seleccionados = phones.filter( item => item.default);
    if (seleccionados.length === 0) {
        itemsHandle({ type: ITEMS_ACTIONS.ADDERROR, name: name, value: Liferay.Language.get('debe-seleccionar-un-telefono-por-defecto') });
        return false;
    }
    if (seleccionados.length > 1) {
        itemsHandle({ type: ITEMS_ACTIONS.ADDERROR, name: name, value: Liferay.Language.get('debe-seleccionar-solo-telefono-por-defecto') });
        return false;
    }
    itemsHandle({ type: ITEMS_ACTIONS.CLEARERRORS, name: name });            
    return true;
}

export const validateEmail = (name,value,itemsHandle) => {
    var EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (!value.match(EMAIL_REGEX)) {
        itemsHandle({ type: ITEMS_ACTIONS.ADDERROR, name: name, value: Liferay.Language.get('email-no-válido') });
        return false;
    }

    itemsHandle({ type: ITEMS_ACTIONS.CLEARERRORS, name: name });
    return true;
}

export const validatePhoneNumber = (name,value,itemsHandle) => {
    var PHONE_REGEZ = /^(\+34|0034|34)?[ -]*(6|7|8|9)[ -]*([0-9][ -]*){8}$/;
    if (!value.match(PHONE_REGEZ)) {
        itemsHandle({ type: ITEMS_ACTIONS.ADDERROR, name: name, value: Liferay.Language.get('teléfono-no-válido') });
        return false;
    }

    itemsHandle({ type: ITEMS_ACTIONS.CLEARERRORS, name: name });
    return true;
}

export const validaRadio = (campo,items,itemsHandle) => {
    if (items.item[campo] === null) {
        itemsHandle({ type: ITEMS_ACTIONS.ADDERROR, name: campo, value: Liferay.Language.get('debe-elegir-una-opcion') });
        return false;
    }

    itemsHandle({ type: ITEMS_ACTIONS.CLEARERRORS, name: campo });
    return true;
}

export const validateNumber = (name, value,field,itemsHandle) => {

    //console.log("Estoy en validateNumber: " + value);
    //if (condicion == "required") {
    //    if (value === undefined || value === "") {
    //        itemsHandle({ type: ITEMS_ACTIONS.ADDERROR, name: name, value: Liferay.Language.get('requerido') });
    //        return false;
    //    }
    //}

    //itemsHandle({ type: ITEMS_ACTIONS.ADDERROR, name: name, value: Liferay.Language.get('aaaa') });
    //return false;

    return true;
}

export const validateAll = (items, itemsHandle) => {
    console.log("Estoy validando todo");

    console.log("----------------");
    var result = true;
    for (var campo in items.fields.fields) {
        console.log("Campo: -> " + campo);
        if ( items.fields.fields[campo].validate !== 'undefined' &&  items.fields.fields[campo].validate === false)
            console.log("Este campo no se valida: " + campo);
        else
            switch (items.fields.fields[campo].type) {
                case "text":
                case "textarea": 
                    console.log("es un campo de texto: ");
                    console.debug(items);
                    result = validate(campo, items.item[campo],items.fields.fields[campo],itemsHandle)
                    if (result === false) {
                        console.log("El campo " + campo + " no valida");
                        return false;
                    }
                    break;
                case "multilang":
                    if (!validateLocalized(campo, items.item[campo], items.fields.fields[campo],itemsHandle))
                        return false;
                    break;
                case "dni":
                    result = validateDni(items.item.tipoDoc,campo, items.item[campo], itemsHandle);
                    if (result === false)
                        return false;
                    break;
                case "date":
                    result = validateDate2(campo, items.item[campo],items.fields.fields[campo],itemsHandle);
                    if (!result) return false;
                    break;
                case "radio": 
                    result = validaRadio(campo,items,itemsHandle);
                    if (!result) return false;
                    break;
                case "email":
                    result = validateEmails(campo,items.item[campo], itemsHandle);
                    if (!result) return false;
                    break;
                case "phone":
                    result = validatePhoneNumbers(campo,items.item[campo],itemsHandle);
                    if (!result) return false;
                    break;
                case "toggle":
                    console.log("toggle");
                    break;
                case "select": 
                    result = validateSelect(campo, items.item[campo],items.fields.fields[campo],itemsHandle)
                    if (!result) return false;
                    break;
                default: 
                    break;
            }
    }
    return true;
}

export const validate = (name, value,field,itemsHandle) => {
    let condicion = "";

    //console.log("validate" + name + ": " + value);
    //console.debug(field);

    if (!field.hasOwnProperty('conditions'))
        return true;
    
    for (condicion of field.conditions) {
        if (condicion === "number") {
            if (isNaN(value)) {
                itemsHandle({ type: ITEMS_ACTIONS.ADDERROR, name: name, value: Liferay.Language.get('error-numero') });
                return false;
            }
        }

        if (condicion === "text") {            
            if (!isNaN(value)) {
                itemsHandle({ type: ITEMS_ACTIONS.ADDERROR, name: name, value: Liferay.Language.get('error-texto') });
                return false;
            }
        }

        if (condicion === "required") {
            if (value === undefined || value === "" || value === null) {
                itemsHandle({ type: ITEMS_ACTIONS.ADDERROR, name: name, value: Liferay.Language.get('requerido') });
                return false;
            }
        }
    }
    itemsHandle({ type: ITEMS_ACTIONS.CLEARERRORS, name: name });
    return true;
}

export const validateLocalized = (fieldname, values, field, itemsHandle) => {
    const languages = Object.keys(values);
    let l = "";
    for (l in languages) {
        if (!validate(fieldname, values[languages[l]],field,itemsHandle))
            return false;
    }
    return true;
}

export const validateSelect = (fieldname, value, field, itemsHandle) => {
    let condicion = "";

    if (!field.hasOwnProperty("conditions"))
        return true;

    for (condicion of field.conditions) {        
        if (condicion === "required" && value === "0") {
            itemsHandle({ type: ITEMS_ACTIONS.ADDERROR, name: fieldname, value: Liferay.Language.get('Debe seleccionar un elemento') });
            return false
        }
    }

    itemsHandle({ type: ITEMS_ACTIONS.CLEARERRORS, name: fieldname });
    return true;
}

//const formatMoney = (value) => {
//    var temp = "";
//    temp = (typeof (value) === 'number') ? value.toString() : value;
//    var input = temp.replace(/[\D\s\._\-]+/g, "");
//    input = input ? parseInt(input, 10) : 0;
//    return (input.toLocaleString("es-ES"));
//}
