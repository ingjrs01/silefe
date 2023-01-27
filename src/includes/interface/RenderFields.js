import React, { useState } from "react";
import ClayForm, { ClayInput, ClaySelect, ClayToggle, ClaySelectBox, ClayRadio, ClayRadioGroup } from '@clayui/form';
import ClayDatePicker from '@clayui/date-picker';
//import ClayButton from '@clayui/button';
import { ITEMS_ACTIONS } from '../reducers/items.reducer';
import ClayLocalizedInput from '@clayui/localized-input';
import { getMonths, getDays } from './DatesLang';
import { getLanguageId } from '../LiferayFunctions'

const RenderFields =  ({ rows,  itemsHandle, items }) => {

    const [selectedLocale, setSelectedLocale] = useState(locales[0]);
    const [act2,setAct2] = useState(0);
    debugger;
    
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

    return (
        <>
            {rows.map(row => {
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
                                  console.log("Cambiando select");
                                  if (Object.hasOwnProperty('change')) {
                                    items.fields.fields[it].change();
                                  }
                                  itemsHandle({ type: ITEMS_ACTIONS.SET, fieldname: evt.target.name, value: evt.target.value });
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
                                  end:  (((new Date().getFullYear()) +  items.fields.fields[it].yearmax) ),
                                  start: (( new Date().getFullYear() - items.fields.fields[it].yearmin))
                                }}
                              />
                            </>}

                            {items.fields.fields[it].type == 'radio' &&
                            <>
                              <ClayRadioGroup
                                active={act2}
                                defaultValue="H"
                                onActiveChange={setAct2}
                                onChange={ evt => {console.log("este es el general")}}
                                inline
                              >
                                {items.fields.fields[it].options.map(it5 => {
                                  return (
                                    <ClayRadio 
                                      key={items.fields.fields[it].name + it5.key}
                                      label={it5.label}
                                      value={it5.value}
                                      onClick={a => {console.log("man hecho click")}}
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

        </>
    );

}

export default RenderFields;