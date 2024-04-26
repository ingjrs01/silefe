import ClayAutocomplete from '@clayui/autocomplete';
import ClayForm from '@clayui/form';
import { MD5 } from 'crypto-js';
import React, { useEffect, useState } from 'react';
import { Liferay } from '../../../common/services/liferay/liferay';
import { spritemap } from '../../LiferayFunctions';
import { validateSelectFilter } from '../../Validators';
import { ITEMS_ACTIONS } from '../../reducers/actions';

export const Selectfilter = ({ itemsHandle, field, item, action, error }) => {
    const [options, setOptions] = useState(new Map());
    const [val, setVal ] = useState ("");
    const [ivalue, setIvalue] = useState(0);
    var selected = "";
    var sha1 = ""; 

    const accion = action !== undefined ? action: ITEMS_ACTIONS.SET; 

    const change = (fieldname,value) => {
        if (validateSelectFilter(field.name,value,field,itemsHandle))
            itemsHandle({ type: accion, fieldname: fieldname, value: value });
    }
     
    const loadOptions = () => {
        var tmp = new Map();       
        selected = "";
        let sitem = "";
        if (item == undefined || item == null)
            setVal("");
        else
            sitem = item.toString();

        for ( var opcion of field.options) {            
            if (sitem == opcion.value) {
                selected = MD5(opcion.label).toString();
                setVal(opcion.label);
            }
            sha1 = MD5(opcion.label);       
            tmp.set(sha1.toString(),{...opcion,hash: sha1.toString()});
        }
        return tmp;
    }

    useEffect( ()=>{
        const opts = loadOptions();
        setOptions(opts);
    },[field.options]);

    const onChangeSelect = (value) => {
        if (value === null || value === "" ) {
            setIvalue(0);
        }

        var s = MD5(value).toString();
        const ttmp = options.get(s);
        if (ttmp != undefined) {
            setIvalue(ttmp.value);
            change(field.name,ttmp.value);            
        }
        //else   
        //    console.log("Todavía no hay un elemento válido");
        setVal(value);
    }

    const cambiar = () => {
        return (Array.from( options.values())).map(i => {return (i.label)}) 
    };

    const salida = () => {
        validateSelectFilter(field.name,ivalue,field,itemsHandle);
    }
 
    return (
        <>
        <ClayForm.Group
          className={`${error !== undefined && error.length > 0 ? 'has-error' : 'has-success'} ${(field.hasOwnProperty('className')) ? field.className : 'col'} `}
          key={"Group-" + field.key} >
  
  
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
                onBlur={salida}
            >
                {
                    cambiar().map(item => (<ClayAutocomplete.Item key={item}>{item}</ClayAutocomplete.Item>))
                }
            </ClayAutocomplete>
          {
            error !== undefined && error.length > 0 &&
            <ClayForm.FeedbackGroup key={"error" + field.name}>
              <ClayForm.FeedbackItem key={"err" + field.name}>
                <ClayForm.FeedbackIndicator key={"erfi" + field.name} spritemap={spritemap} symbol="check-circle-full" />{error[0]} </ClayForm.FeedbackItem>
            </ClayForm.FeedbackGroup>
          }
        </ClayForm.Group>
      </>
   
    )
}
