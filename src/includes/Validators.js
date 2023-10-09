import { ITEMS_ACTIONS } from "./reducers/items.reducer";

const dniletter = ["T", "R", "W", "A", "G", "M", "Y", "F", "P", "D", "X", "B", "N", "J", "Z", "S", "Q", "V", "H", "L", "C", "K", "E"];

export const validateDni = (name, value, itemsHandle) => {
    console.log("validateDNI desde includes ");
    //var DNI_REGEX = /^(\d{8})([A-Z])$/;
    //[0-9-]{2}.[0-9-]{3}.[0-9-]{3} ([A-Za-z])
    var DNI_REGEX = /^[0-9-]{2}.[0-9-]{3}.[0-9-]{3} ([A-Za-z])$/;
    var CIF_REGEX = /^([ABCDEFGHJKLMNPQRSUVW])(\d{7})([0-9A-J])$/;
    var NIE_REGEX = /^[XYZ]\d{7,8}[A-Z]$/;

    if (value.match(DNI_REGEX)) {
        const numerodni = parseInt(value.replace(/[.a-zA-Z-]+/g, ""));

        if (value.length >= 11 && value.substring(11, 13).toLocaleUpperCase() != dniletter[numerodni % 23]) {
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
    return false;
}

export const validateAll = (items, itemsHandle) => {
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
                    if (!validateDni(campo, items.item[campo], itemsHandle))
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
