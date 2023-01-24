import React, { useState } from "react";
import ClayForm, { ClayInput, ClaySelect, ClayToggle, ClaySelectBox } from '@clayui/form';
import ClayDatePicker from '@clayui/date-picker';
import ClayCard from "@clayui/card";
import ClayButton from '@clayui/button';
import { ITEMS_ACTIONS } from '../reducers/items.reducer';
import ClayLocalizedInput from '@clayui/localized-input';
import {getMonths, getDays} from './DatesLang';
import {getLanguageId } from '../LiferayFunctions'

const spritemap = '/icons.svg';

const DefaultForm = ({ itemsHandle, save, items, notify }) => {
  const locales = [
    {
      label: "es-ES",
      symbol: "es-ES"
    },
    {
      label: "en-US",
      symbol: "en-US"
    },
    {
      label: "gl-ES",
      symbol: "gl-ES"
    }
  ]

  const [selectedLocale, setSelectedLocale] = useState(locales[0]);

  const validateAll = () => {
    console.log("validando todo");
    Object.keys(items.fields.fields).forEach( campo => {
      console.log(campo);
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
    <ClayCard>
      <ClayCard.Body>
        <ClayCard.Description displayType="title">
          <h2>{items.fields.title}</h2>
        </ClayCard.Description>

        <ClayCard.Description truncate={false} displayType="text">
          <ClayForm>
            {items.fields.rows.map(row => {
              return (
                <div className="row">
                  { row.cols.map(it => {
                    return (
                      <>
                        <ClayForm.Group className={`${items.errors[it].length > 0 ? 'has-error' : 'has-success'} col`} key={ items.fields.fields[it].key} >
                          {(items.fields.fields[it].type === 'text') &&
                            <>
                              <label htmlFor="basicInput">{items.fields.fields[it].label}</label>
                              <ClayInput
                                placeholder={items.fields.fields[it].placeholder}
                                type="text"
                                name={it}
                                value={items.item[it]}
                                onChange={e => {
                                  validate(e.target.name, e.target.value);
                                  itemsHandle({ type: ITEMS_ACTIONS.SET, fieldname: e.target.name, value: e.target.value });
                                }}>
                              </ClayInput>
                            </>}
                            {items.fields.fields[it].type == 'multilang' &&
                            <ClayLocalizedInput
                              id={it}
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
                                disabled={ !items.fields.fields[it].enabled }
                                onChange={evt => {
                                  items.fields.fields[it].change();
                                  itemsHandle({ type: ITEMS_ACTIONS.SET, fieldname: evt.target.name, value: evt.target.value });
                                  notify(evt.target.name,evt.target.value);
                                }}
                                value={items.item[it]} >
                                {items.fields.fields[it].options.map(item => (
                                  <ClaySelect.Option
                                    key={item.value}
                                    label={item.label}
                                    value={item.value}
                                  />
                                ))}
                              </ClaySelect>
                            </>
                          }
                          {items.fields.fields[it].type == 'toggle' &&
                            <>
                              <ClayToggle 
                                label={items.fields.fields[it].label} 
                                onToggle={val => {
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
                                  end: 2024,
                                  start: 2008
                                }}
                              />
                            </>}
                            {(items.fields.fields[it].type === 'multilist') &&
                            <>                            
                              <ClaySelectBox
                                items={items.fields.fields[it].options}
                                label={items.fields.fields[it].label}
                                multiple
                                onItemsChange={console.log("Cambiando los items dentro de ClaySelecBox")}
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
                                  console.debug(e);
                                  console.log(e.target.name);
                                  console.log(e.target.value);
                                  itemsHandle({ type: ITEMS_ACTIONS.SET, fieldname: it, value: e.target.value }); 
                                }}
                              />
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

          </ClayForm>
        </ClayCard.Description>
        <div className="btn-group">
          <div className="btn-group-item">
            <ClayButton onClick={e => itemsHandle({ type: ITEMS_ACTIONS.CANCEL })} displayType="secondary">{Liferay.Language.get('Cancelar')}</ClayButton>
          </div>
          <div className="btn-group-item">
            <ClayButton onClick={e => { 
              validateAll() && save() 
            }} 
              displayType="primary">{Liferay.Language.get('Guardar')}
            </ClayButton>
          </div>
        </div>
      </ClayCard.Body>
    </ClayCard>
  );
}

export default DefaultForm;