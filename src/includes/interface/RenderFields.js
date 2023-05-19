import React, { useState } from "react";
import ClayForm, { ClayInput, ClaySelect, ClayToggle, ClaySelectBox, ClayRadio, ClayRadioGroup, ClayCheckbox } from '@clayui/form';
import ClayTable from '@clayui/table';
import ClayButton, {ClayButtonWithIcon} from '@clayui/button';
import ClayDatePicker from '@clayui/date-picker';
import ClayAutocomplete from '@clayui/autocomplete';
import { ITEMS_ACTIONS } from '../reducers/items.reducer';
import ClayLocalizedInput from '@clayui/localized-input';
import { getMonths, getDays } from './DatesLang';
import { getLanguageId } from '../LiferayFunctions'

const spritemap = "./o/my-project/icons.svg";

const RenderFields =  ({ rows,  itemsHandle, items, plugin }) => {

    const locales = [
    {
      label: "es-ES",
      symbol: "es-es"
    },
    {
      label: "en-US",
      symbol: "en-us"
    },
    {
      label: "gl-ES",
      symbol: "gl-es"
    }
    ]
    const [selectedLocale, setSelectedLocale] = useState(locales[0]);
    const [act2,setAct2] = useState(0);
    
    const validateAll = () => {
      console.log("validando todo");
      Object.keys(items.fields.fields).forEach( campo => {
        //console.log(campo);
        switch (items.fields.fields[campo].type) {
          case "text": 
            if (!validate(campo, items.item[campo]))
              return false;
            break;
          case "multilang":
            if (!validateLocalized(campo, items.item[campo]))
              return false;
            break;
          case "toggle":
            break;
        }
  
      });
      console.log("todo ok");
      return true;
    }
  
    const validate = (name, value) => {
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
  
    const validateLocalized = (fieldname, values) => {
      const languages = Object.keys(values);
      let l = "";
      for (l in languages) {
        if (!validate(fieldname, values[languages[l]]))
          return false;
      }
      return true;
    }

    return (
        <>
            {rows.map(row => {
              return (
                <div className="row">
                  { row.cols.map(it => {
                    //console.log(items.fields.fields[it]);
                    return (
                      <>
                        <ClayForm.Group className={`${items.errors[it].length > 0 ? 'has-error' : 'has-success'} col`} key={ "Group-" + items.fields.fields[it].key} >
                          {(items.fields.fields[it].type === 'text') &&
                            <>
                              <label htmlFor="basicInput">{items.fields.fields[it].label}</label>
                              <ClayInput
                                placeholder={items.fields.fields[it].placeholder}
                                type="text"
                                name={it}
                                key={it}
                                value={items.item[it]}
                                onChange={e => {
                                  validate(e.target.name, e.target.value);
                                  itemsHandle({ type: ITEMS_ACTIONS.SET, fieldname: e.target.name, value: e.target.value });
                                }}>
                              </ClayInput>
                            </>}

                            {(items.fields.fields[it].type === 'multitext') &&
                            <>
                              <label htmlFor="basicInput">{items.fields.fields[it].label}</label>
                              {
                                items.item[it].map( (v,k) => {return ( 
                                  <>
                                  <ClayInput.Group spaced={"any"}>
                                  <ClayInput
                                    //className="col-6"
                                    key={it + v.key}
                                    type="text"
                                    name={it}
                                    value={v.value}
                                    onChange={e =>   {
                                      //validate(e.target.name, e.target.value);
                                      itemsHandle({ type: ITEMS_ACTIONS.SET_MULTIFIELD, fieldname: e.target.name,pos: k, value: e.target.value });
                                    }}
                                  />
                                  <ClayCheckbox
                                    aria-label="I'm checked indefinitely"
                                    checked={ v.default}
                                    containerProps={{ id: "test"}}
                                    onChange={() => itemsHandle({ type: ITEMS_ACTIONS.SET_MULTIFIELDCHECK, fieldname: it,pos: k})}
                                  />
                                  <ClayButtonWithIcon 
                                    //className="col-1" 
                                    aria-label="Close" displayType="secondary" spritemap={spritemap} symbol="times" title="Close"
                                    onClick={e => itemsHandle({ type: ITEMS_ACTIONS.REMOVE_MULTIFIELD, fieldname: it, pos:k })}
                                  />
                                  </ClayInput.Group>
                                </>
                                )})
                              }
                              <ClayButton size={"xs"} displayType={"secondary"} onClick={evt => {
                                console.log("direccion");
                                itemsHandle({ type: ITEMS_ACTIONS.ADD_MULTIFIELD, fieldname: it });
                                
                              }}>{"Añadir"}</ClayButton>
                            </>}


                            {items.fields.fields[it].type == 'multilang' &&
                            <ClayLocalizedInput
                              id={it}
                              key={it}
                              label={items.fields.fields[it].label}
                              locales={locales}
                              onSelectedLocaleChange={setSelectedLocale}
                              onTranslationsChange={evt => {
                                validateLocalized(it, evt);
                                itemsHandle({ type: ITEMS_ACTIONS.SET, fieldname: it, value: evt });
                              }
                              }
                              selectedLocale={selectedLocale}
                              translations={items.item[it]}
                            />
                          }
                          {items.fields.fields[it].type == 'select' &&
                            <>
                              <label htmlFor="basicInput">{items.fields.fields[it].label}</label>
                              <ClaySelect aria-label="Select Label"
                                id={it}
                                name={it}
                                key={it}
                                disabled={ !items.fields.fields[it].enabled }
                                onChange={evt => {
                                  if (items.fields.fields[it].hasOwnProperty('change')) {
                                    console.log("tiene change");
                                    items.fields.fields[it].change(evt.target.value);
                                  }
                                  else
                                    console.log("no tiene change");
                                  
                                  itemsHandle({ type: ITEMS_ACTIONS.SET, fieldname: evt.target.name, value: evt.target.value });
                                }}
                                value={items.item[it]} >
                                {items.fields.fields[it].options.map(item => (
                                  <ClaySelect.Option
                                    key={it + "option-" + item.value}
                                    label={item.label}
                                    value={item.value}
                                  />
                                ))}
                              </ClaySelect>
                            </>
                          }
                          {items.fields.fields[it].type == 'autocomplete' &&
                          <>
                            <label htmlFor={it} id={it+"label"}> {items.fields.fields[it].label} </label>
                            <ClayAutocomplete
                              aria-labelledby={it+"label"}
                              id={it}
                              key={it}
                              onChange={(evt) => {itemsHandle({ type: ITEMS_ACTIONS.SET, fieldname: it, value: evt }); }}
                              value={items.item[it]}
                              placeholder="Introduzca las primeras letras"
                            >
                            {items.fields.fields[it].options.map(item => { 
                              return(
                                <ClayAutocomplete.Item key={it + "option-" + item.value}>{item.label}</ClayAutocomplete.Item>
                              )})}
                            </ClayAutocomplete>
                          </>
                          }
                          {items.fields.fields[it].type == 'toggle' &&
                            <>
                              <ClayToggle 
                                label={items.fields.fields[it].label} 
                                onToggle={val => {
                                  if (items.fields.fields[it].hasOwnProperty("change"))
                                    items.fields.fields[it].change(val);
                                  itemsHandle({ type: ITEMS_ACTIONS.SET, fieldname: it, value: val });
                                }} 
                                toggled={items.item[it]}
                              />
                            </>
                          }
                          {(items.fields.fields[it].type === 'date') &&
                            <>
                              <label htmlFor="basicInput">{items.fields.fields[it].label}</label>
                              <ClayDatePicker
                                onChange={val => { itemsHandle({ type: ITEMS_ACTIONS.SET, fieldname: it, value: val });}}
                                placeholder={items.fields.fields[it].placeholder}
                                firstDayOfWeek={1}
                                months={getMonths(getLanguageId())}
                                spritemap={spritemap}
                                timezone="GMT+01:00"
                                value={items.item[it]}
                                weekdaysShort={getDays(getLanguageId())}
                                years={{
                                  end:  (((new Date().getFullYear()) +  items.fields.fields[it].yearmax) ),
                                  start: (( new Date().getFullYear() - items.fields.fields[it].yearmin))
                                }}
                              />
                            </>}

                            {items.fields.fields[it].type == 'radio' &&
                            <>
                              <ClayRadioGroup
                                active={act2}
                                defaultValue="M"
                                value={items.item[it]}
                                //onActiveChange={setAct2}
                                onChange={ evt => {console.log("este es el general")}}
                                inline
                              >
                                {items.fields.fields[it].options.map(it5 => {
                                  return (
                                    <ClayRadio 
                                      key={items.fields.fields[it].name + it5.key}
                                      label={it5.label}
                                      value={it5.value}
                                      onClick={a => { itemsHandle({type: ITEMS_ACTIONS.SET, fieldname:it, value: a.target.value}); }}
                                    />
                                  )
                                })}

                              </ClayRadioGroup>
                            </>
                            }

                            {(items.fields.fields[it].type === 'multilist') &&
                            <>                            
                              <ClaySelectBox
                                items={items.fields.fields[it].options}
                                label={items.fields.fields[it].label}
                                multiple
                                //onItemsChange={console.log("Cambiando los items dentro de ClaySelecBox")}
                                onSelectChange={val => {itemsHandle({ type: ITEMS_ACTIONS.SET, fieldname: it, value: val });}}
                                spritemap={spritemap}
                                value={items.item[it]}
                              />                            
                            </>}
                            {(items.fields.fields[it].type === 'textarea') &&
                            <>                            
                              <label htmlFor="basicInputText">{items.fields.fields[it].label}</label>
                              <ClayInput
                                component="textarea"
                                id={items.fields.fields[it].name + items.fields.fields[it].key}
                                placeholder={items.fields.fields[it].placeholder}
                                type="text"
                                value={items.item[it]}
                                onChange={e => { 
                                  itemsHandle({ type: ITEMS_ACTIONS.SET, fieldname: it, value: e.target.value }); 
                                }}
                              />
                            </>}
                            {(items.fields.fields[it].type === 'other') &&
                            <>
                              { plugin()[items.fields.fields[it].componentName] }
                            </>}
                          {
                            items.errors[it].length > 0 && //  -> items.fields.rows[it].name
                            <ClayForm.FeedbackGroup>
                              <ClayForm.FeedbackItem>
                                <ClayForm.FeedbackIndicator
                                  spritemap={spritemap}
                                  symbol="check-circle-full"
                                />
                                {items.errors[it][0]}
                              </ClayForm.FeedbackItem>
                            </ClayForm.FeedbackGroup>
                          }
                        </ClayForm.Group>
                      </>
                    )
                  })
                  }
                </div>
              )
            })}

        </>
    );

}

export default RenderFields;
