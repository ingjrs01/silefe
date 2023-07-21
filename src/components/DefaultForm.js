import React, { useState } from "react";
import ClayForm, { ClayInput, ClaySelect, ClayToggle } from '@clayui/form';
import ClayDatePicker from '@clayui/date-picker';
import ClayCard from "@clayui/card";
import ClayButton from '@clayui/button';
import { ITEMS_ACTIONS } from '../includes/reducers/items.reducer';
import ClayLocalizedInput from '@clayui/localized-input';
import {getMonths, getDays} from '../includes/interface/DatesLang';
import {getLanguageId} from '../includes/LiferayFunctions';

const spritemap = "./o/my-project/icons.svg";

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
    let campo = "";
    for (let fila of items.fields.rows) {
      for (campo of Object.keys(fila.cols)) {
        switch (fila.cols[campo].type) {
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
      }
    }
    return true;
  }

  const validate = (name, value) => {
    let condicion = "";
    
    for (let fila of items.fields.rows) {
      if (fila.cols.hasOwnProperty(name) ) {
        for (condicion of fila.cols[name]["conditions"]) {
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
        return false
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
            { /* Recorremos las filas*/}
            {items.fields.rows.map(row => {
              return (
                <div className="row">
                  {Object.keys(row.cols).map(it => {
                    return (
                      <>
                        <ClayForm.Group className={`${items.errors != 'undefined' && items.errors[it].length > 0 ? 'has-error' : 'has-success'} col`} key={row.cols[it].key} >
                          {(row.cols[it].type === 'text') &&
                            <>
                              <label htmlFor="basicInput">{row.cols[it].label}</label>
                              <ClayInput
                                placeholder={row.cols[it].placeholder}
                                type="text"
                                name={row.cols[it].name}
                                value={items.item[row.cols[it].name]}
                                onChange={e => {
                                  validate(e.target.name, e.target.value);
                                  itemsHandle({ type: ITEMS_ACTIONS.SET, fieldname: e.target.name, value: e.target.value });
                                }}>
                              </ClayInput>
                            </>}
                          {row.cols[it].type == 'multilang' &&
                            <ClayLocalizedInput
                              id={row.cols[it].name}
                              label={row.cols[it].label}
                              locales={locales}
                              onSelectedLocaleChange={setSelectedLocale}
                              onTranslationsChange={evt => {
                                validateLocalized(it, evt);
                                itemsHandle({ type: ITEMS_ACTIONS.SET, fieldname: it, value: evt });
                              }
                              }
                              selectedLocale={selectedLocale}
                              translations={items.item[row.cols[it].name]}
                            />
                          }
                          {row.cols[it].type == 'select' &&
                            <>
                              <label htmlFor="basicInput">{row.cols[it].label}</label>
                              <ClaySelect aria-label="Select Label"
                                id={row.cols[it].name}
                                name={row.cols[it].name}
                                disabled={ !row.cols[it].enabled }
                                onChange={evt => {
                                  row.cols[it].change();
                                  itemsHandle({ type: ITEMS_ACTIONS.SET, fieldname: evt.target.name, value: evt.target.value });
                                  notify(evt.target.name,evt.target.value);
                                }}
                                value={items.item[row.cols[it].name]} >
                                {row.cols[it].options.map(item => (
                                  <ClaySelect.Option
                                    key={item.value}
                                    label={item.label}
                                    value={item.value}
                                  />
                                ))}
                              </ClaySelect>
                            </>
                          }
                          {row.cols[it].type == 'toggle' &&
                            <>
                              <ClayToggle 
                                label={row.cols[it].label} 
                                onToggle={val => {
                                  row.cols[it].change(val);
                                  itemsHandle({ type: ITEMS_ACTIONS.SET, fieldname: row.cols[it].name, value: val });
                                }} 
                                toggled={items.item[row.cols[it].name]}
                              />
                            </>
                          }
                          {(row.cols[it].type === 'date') &&
                            <>
                              <label htmlFor="basicInput">{row.cols[it].label}</label>
                              <ClayDatePicker
                                onChange={val => { itemsHandle({ type: ITEMS_ACTIONS.SET, fieldname: row.cols[it].name, value: val });}}
                                placeholder={row.cols[it].placeholder}
                                disabled
                                firstDayOfWeek={1}
                                months={getMonths(getLanguageId())}
                                spritemap={spritemap}
                                timezone="GMT+01:00"
                                value={items.item[row.cols[it].name]}
                                weekdaysShort={getDays(getLanguageId())}
                                years={{
                                  end: 2024,
                                  start: 2008
                                }}
                              />
                            </>}

                          {
                            items.errors != 'undefined' && items.errors[it].length > 0 && //  -> items.fields.rows[it].name
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
            {/* aqui dejamos de recorrer las filas  */}

          </ClayForm>
        </ClayCard.Description>
        <div className="btn-group">
          <div className="btn-group-item">
            <ClayButton onClick={e => itemsHandle({ type: ITEMS_ACTIONS.CANCEL })} displayType="secondary">{Liferay.Language.get('Cancelar')}</ClayButton>
          </div>
          <div className="btn-group-item">
            <ClayButton onClick={e => { validateAll() && save() }} displayType="primary">{Liferay.Language.get('Guardar')}</ClayButton>
          </div>
        </div>
      </ClayCard.Body>
    </ClayCard>
  );
}

export default DefaultForm;