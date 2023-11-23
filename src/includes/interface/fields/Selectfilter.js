import ClayAutocomplete from '@clayui/autocomplete';
import React from 'react';
import { ITEMS_ACTIONS } from '../../reducers/items.reducer';
CryptoJS = require('crypto-js');

export const Selectfilter = ({ itemsHandle, field, item }) => {
    var selected = "";
    var selectedLabel = "";
    var tmp = new Map();
    var sha1 = ""; 
    
    for ( var opcion of field.options) {
        if (item == opcion.value) {
            selected = CryptoJS.MD5(opcion.label).toString();
            selectedLabel = opcion.label;
        }
        sha1 = CryptoJS.MD5(opcion.label);       
        tmp.set(sha1.toString(),{...opcion,hash: sha1.toString()});
    }

    const onChangeSelect = (value) => {
        var s = CryptoJS.MD5(value).toString();
        var ttmp = tmp.get(s);
        if (ttmp != 'undefined')
            itemsHandle({ type: ITEMS_ACTIONS.SET, fieldname: field.name, value: ttmp.value })
    }

    //if (item == null)
    //    return (<>Cargando</>)

    const opciones = field.options.map( i => {return i.label})
    return (
        <>
            <label htmlFor="basicInput" key={"label-" + field.name}>{field.label}</label>
            <ClayAutocomplete
                aria-labelledby="clay-autocomplete-label-1"
                id={"autocomplete-"+field.key }
                defaultItems={ opciones }
                defaultValue={ selectedLabel }
                messages={{
                    loading: Liferay.Language.get("Cargando..."),
                    notFound: Liferay.Language.get("Sin resultados"),
                }}
                placeholder={ (field.placeholder != 'undefined')?field.placeholder:""}
                onChange={onChangeSelect}
            >
                {item => (
                    <ClayAutocomplete.Item key={item}>{item}</ClayAutocomplete.Item>
                )}
            </ClayAutocomplete>
        </>
    )
}

