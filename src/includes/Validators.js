import { ITEMS_ACTIONS } from "./reducers/items.reducer";

const dniletter = ["T", "R", "W", "A", "G", "M", "Y", "F", "P", "D", "X", "B", "N", "J", "Z", "S", "Q", "V", "H", "L", "C", "K", "E"];

export const validateDni = ( tipoDoc, name, value, itemsHandle) => {
    var DNI_REGEX = /^[0-9-]{8}([A-Za-z])$/;
    var CIF_REGEX = /^([ABCDEFGHJKLMNPQRSUVW])(\d{7})([0-9A-J])$/;
    const NIE_REGEX = /^[XYZ][0-9-]{7}[A-Za-z]$/;
    const PASS_REGEX = /^[a-z]{3}[0-9]{6}[a-z]?$/i;

    console.log("validateDni " + value + "  tipoDoc: " + tipoDoc);
    switch (tipoDoc) {
        case '1': // SI EL TIPO ES 1, SE TRATA DE UN DNI
            if (value.match(DNI_REGEX)) {
                const numerodni = parseInt(value.replace(/[.a-zA-Z-]+/g, ""));
                console.log(dniletter[numerodni % 23] + "  === " + value.substring(8, 9).toLocaleUpperCase());
                if (value.length >= 8 && value.substring(8, 9).toLocaleUpperCase() != dniletter[numerodni % 23]) {
                    itemsHandle({ type: ITEMS_ACTIONS.ADDERROR, name: name, value: Liferay.Language.get('error-dni') });
                    return false;
                }
                itemsHandle({ type: ITEMS_ACTIONS.CLEARERRORS, name: name });
                return true
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
                console.log(value.substring(8, 11).toLocaleUpperCase() + "  ===  " + dniletter[numerodni % 23]);

                if (value.length >= 7 && value.substring(8, 11).toLocaleUpperCase() != dniletter[numerodni % 23]) {
                    itemsHandle({ type: ITEMS_ACTIONS.ADDERROR, name: name, value: Liferay.Language.get('error-nie') });
                    return false;
                }
                itemsHandle({ type: ITEMS_ACTIONS.CLEARERRORS, name: name });
                return true
            }
            else
                itemsHandle({ type: ITEMS_ACTIONS.ADDERROR, name: name, value: Liferay.Language.get('error-nie') });

            break;
        case '3':
            console.log("Esto es un pasaporte");
            break;
    }
    return false;
}

export const validateAll = (items, itemsHandle) => {
    console.log("Validando todos los campos");
    Object.keys(items.fields.fields).forEach(campo => {
        if ( items.fields.fields[campo].validate !== 'undefined' &&  items.fields.fields[campo].validate == false) 
            console.log("Este campo no se valida: " + campo);
        else
            switch (items.fields.fields[campo].type) {
                case "text":
                    console.log("text");
                    if (!validate(campo, items.item[campo],items,itemsHandle))
                        return false;
                    break;
                case "multilang":
                    console.log("multilang");
                    if (!validateLocalized(campo, items.item[campo], items,itemsHandle))
                        return false;
                    break;
                case "dni":
                    console.log("dni");
                    if (!validateDni(items.item.tipoDoc,campo, items.item[campo], itemsHandle))
                        return false;
                case "toggle":
                    console.log("toggle");
                    break;
            }
    });
    return true;
}

export const validate = (name, value,items,itemsHandle) => {
    let condicion = "";

    for (condicion of items.fields.fields[name]["conditions"]) {
        if (condicion == "number") {
            if (isNaN(value)) {
                itemsHandle({ type: ITEMS_ACTIONS.ADDERROR, name: name, value: Liferay.Language.get('error-numero') });
                return false;
            }
        }

        if (condicion == "text") {
            if (!isNaN(value)) {
                itemsHandle({ type: ITEMS_ACTIONS.ADDERROR, name: name, value: Liferay.Language.get('error-texto') });
                return false;
            }
        }
    }
    itemsHandle({ type: ITEMS_ACTIONS.CLEARERRORS, name: name });
    return true;
}

export const validateLocalized = (fieldname, values, items, itemsHandle) => {
    const languages = Object.keys(values);
    let l = "";
    for (l in languages) {
        if (!validate(fieldname, values[languages[l]],items,itemsHandle))
            return false;
    }
    return true;
}

const formatMoney = (value) => {
    var temp = "";
    temp = (typeof (value) === 'number') ? value.toString() : value;
    var input = temp.replace(/[\D\s\._\-]+/g, "");
    input = input ? parseInt(input, 10) : 0;
    return (input.toLocaleString("es-ES"));
}
