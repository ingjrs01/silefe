import ClayAutocomplete from '@clayui/autocomplete';
import React, { useEffect, useState } from 'react';
import { ITEMS_ACTIONS } from '../../reducers/items.reducer';
CryptoJS = require('crypto-js');

export const Selectfilter = ({ itemsHandle, field, item }) => {
    const [options, setOptions] = useState(new Map());
    const [val, setVal ] = useState ("");
    var selected = "";
    var sha1 = ""; 
    
    const loadOptions = () => {
        var tmp = new Map();       
        selected = "";
        console.log("loadOptions");
        console.debug(field);
        console.debug(item);
        if (item == undefined || item == null)
            return tmp;
        const sitem = item.toString();
        for ( var opcion of field.options) {            
            if (sitem == opcion.value) {
                selected = CryptoJS.MD5(opcion.label).toString();
                setVal(opcion.label);
            }
            sha1 = CryptoJS.MD5(opcion.label);       
            tmp.set(sha1.toString(),{...opcion,hash: sha1.toString()});
        }
        return tmp;
    }

    useEffect( ()=>{
        const opts = loadOptions();
        setOptions(opts);
    },[field.options]);

    const onChangeSelect = (value) => {
        var s = CryptoJS.MD5(value).toString();
        const ttmp = options.get(s);
        if (ttmp != undefined)
            itemsHandle({ type: ITEMS_ACTIONS.SET, fieldname: field.name, value: ttmp.value })
        else   
            console.log("Todavía no hay un elemento válido");
        setVal(value);
    }

    const cambiar = () => {
        return (Array.from( options.values())).map(i => {return (i.label)}) 
    };

    return (
        <>
            <label htmlFor="basicInput" key={"label-" + field.name}>{field.label}</label>
            <ClayAutocomplete
                aria-labelledby="clay-autocomplete-label-1"
                id={"autocomplete-"+field.key }
                defaultItems={ cambiar() }
                value={ val }
                messages={{
                    loading: Liferay.Language.get("Cargando..."),
                    notFound: Liferay.Language.get("Sin resultados"),
                }}
                placeholder={ (field.placeholder != 'undefined')?field.placeholder:""}
                onChange={onChangeSelect}
                onItemsChange={()=>console.log("los items han cambiado")}
            >
                {
                    cambiar().map(item => (<ClayAutocomplete.Item key={item}>{item}</ClayAutocomplete.Item>))
                }
            </ClayAutocomplete>
        </>
    )
}
