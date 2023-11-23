import ClayDatePicker from '@clayui/date-picker';
import ClayForm, { ClayInput, ClayRadio, ClayRadioGroup, ClaySelect, ClaySelectBox, ClayToggle } from '@clayui/form';
import ClayLocalizedInput from '@clayui/localized-input';
import React, { useState } from "react";
import { getLanguageId, locales, spritemap } from '../LiferayFunctions';
import { validate, validateDni, validateLocalized } from '../Validators';
import { ITEMS_ACTIONS } from '../reducers/items.reducer';
import { formatDocument } from '../utils';
import { getDays, getMonths } from './DatesLang';
import { Email } from './fields/Email';
import { Hour } from './fields/Hour';
import { Phone } from './fields/Phone';
import { Selectfilter } from './fields/Selectfilter';

const RenderFields = ({ rows, itemsHandle, items, plugin }) => {
  const [selectedLocale, setSelectedLocale] = useState(locales[0]);
  const [act2, setAct2] = useState(0);

  const writeDni = (name, value) => {
    const dni_limpio = value.split(".").join("").replace("-", "").toLocaleUpperCase();
    validateDni(items.item.tipoDoc, name, dni_limpio,itemsHandle);
    itemsHandle({ type: ITEMS_ACTIONS.SET, fieldname: name, value: dni_limpio });
  }

  const formatMoney = (value) => {
    if (value == null)
      return "";
    var temp = "";
    temp = (typeof (value) === 'number') ? value.toString() : value;

    var input = temp.replace(/[\D\s\._\-]+/g, "");
    input = input ? parseInt(input, 10) : 0;
    return (input.toLocaleString("es-ES"));
  }

  const writeNif = (name, value) => {
    const dni_limpio = value.split(" ").join("").split(".").join("").replace("-", "").toLocaleUpperCase();
    validateDni(items.item.tipoDoc, name, dni_limpio,itemsHandle);
    itemsHandle({ type: ITEMS_ACTIONS.SET, fieldname: name, value: dni_limpio });
  }

  const writeCif = (name, value) => {
    const dni_limpio = value.split(" ").join("").split(".").join("").replace("-", "").toLocaleUpperCase();
    //validateDni(items.item.tipoDoc, name, dni_limpio,itemsHandle);
    itemsHandle({ type: ITEMS_ACTIONS.SET, fieldname: name, value: dni_limpio });
  }

  const writeDocument = (target, name, value) => {
    //debugger;
    switch (items.item.tipoDoc) {
      case '1':
        writeDni(name, value);
        break;
      case '2':
        writeNif(name, value);
        break;
      case '3': 
        writeCif(name,value);
        break;
    }
  }

  return (
    <>
      {rows.map(row => {
        return (
          <div className="row">
            {row.cols.map(it => {
              //console.log("iterando");
              //console.debug(items.fields.fields[it]);
              return (
                <>
                  <ClayForm.Group
                    className={`${items.errors[it] != 'undefined' && items.errors[it].length > 0 ? 'has-error' : 'has-success'} ${(items.fields.fields[it].hasOwnProperty('className')) ? items.fields.fields[it].className : 'col'} `}
                    key={"Group-" + items.fields.fields[it].key} >
                    {(items.fields.fields[it].type === 'text') &&
                      <>
                        <label htmlFor="basicInput" key={"label" + it}>{items.fields.fields[it].label}</label>
                        <ClayInput
                          placeholder={items.fields.fields[it].placeholder}
                          type="text"
                          name={it}
                          id={it}
                          key={it}
                          value={items.item[it]}
                          onChange={e => {
                            validate(e.target.name, e.target.value, items, itemsHandle);
                            itemsHandle({ type: ITEMS_ACTIONS.SET, fieldname: e.target.name, value: e.target.value });
                          }}>
                        </ClayInput>
                      </>
                    }
                    {(items.fields.fields[it].type === 'number') &&
                      <>
                        <label htmlFor="basicInput" key={"label" + it}>{items.fields.fields[it].label}</label>
                        <ClayInput
                          placeholder={items.fields.fields[it].placeholder}
                          type="number"
                          name={it}
                          key={it}
                          value={items.item[it]}
                          min={ items.fields.fields[it].min != 'undefined' ? items.fields.fields[it].min : null}
                          max={ items.fields.fields[it].max != 'undefined' ? items.fields.fields[it].max : null}
                          onChange={e => {
                            validate(e.target.name, e.target.value, items, itemsHandle);
                            itemsHandle({ type: ITEMS_ACTIONS.SET, fieldname: e.target.name, value: e.target.value });
                          }}>
                        </ClayInput>
                      </>
                    }
                    {(items.fields.fields[it].type === 'percent') &&
                      <>
                        <label htmlFor="basicInput" key={"label" + it}>{items.fields.fields[it].label}</label>
                        <ClayInput.Group>
                          <ClayInput.GroupItem prepend>
                            <ClayInput
                              type="number"
                              name={it}
                              key={it}
                              value={items.item[it]}
                              max={100}
                              min={0}
                              onChange={e => {
                                //validate(e.target.name, e.target.value);
                                itemsHandle({ type: ITEMS_ACTIONS.SET, fieldname: e.target.name, value: e.target.value });
                              }}>
                            </ClayInput>
                          </ClayInput.GroupItem>
                          <ClayInput.GroupItem shrink prepend>
                            <ClayInput.GroupText>{"%"}</ClayInput.GroupText>
                          </ClayInput.GroupItem>
                        </ClayInput.Group>

                      </>
                    }

                    {(items.fields.fields[it].type === 'money') &&
                      <>
                        <label htmlFor="basicInput" key={"label" + it}>{items.fields.fields[it].label}</label>
                        <ClayInput.Group>
                          <ClayInput.GroupItem prepend>
                            <ClayInput
                              type="text"
                              name={it}
                              key={it}
                              value={formatMoney(items.item[it])}
                              pattern={"^\$\d{1,3}(,\d{3})*(\.\d+)?$"}
                              onChange={e => {
                                //validate(e.target.name, e.target.value);
                                itemsHandle({ type: ITEMS_ACTIONS.SET, fieldname: e.target.name, value: e.target.value });
                              }}>
                            </ClayInput>
                          </ClayInput.GroupItem>
                          <ClayInput.GroupItem shrink prepend>
                            <ClayInput.GroupText>{"€"}</ClayInput.GroupText>
                          </ClayInput.GroupItem>
                        </ClayInput.Group>

                      </>
                    }
                    {(items.fields.fields[it].type === 'dni') &&
                      <>
                        <label htmlFor="basicInput" key={"label" + it}>{items.fields.fields[it].label} DNI</label>
                        <ClayInput
                          type="text"
                          name={it}
                          key={it}
                          placeholder='00.000.000-A'
                          value={ formatDocument(items.item.tipoDoc, items.item[it]) }
                          //onFocus={e => initDni(e.target)}
                          onBlur={() => { }}
                          onChange={e => writeDocument(e.target, e.target.name, e.target.value)}>
                        </ClayInput>
                      </>
                    }

                    {(items.fields.fields[it].type === 'multitext')   && <Phone         itemsHandle={itemsHandle} field={items.fields.fields[it]} item={items.item[it]} /> }
                    {(items.fields.fields[it].type === 'hour')        && <Hour          itemsHandle={itemsHandle} field={items.fields.fields[it]} item={items.item[it]} /> }
                    {(items.fields.fields[it].type === 'phone')       && <Phone         itemsHandle={itemsHandle} field={items.fields.fields[it]} item={items.item[it]} /> }
                    {(items.fields.fields[it].type === 'email')       && <Email         itemsHandle={itemsHandle} field={items.fields.fields[it]} item={items.item[it]} /> }
                    {(items.fields.fields[it].type === 'selectfilter')&& <Selectfilter  itemsHandle={itemsHandle} field={items.fields.fields[it]} item={items.item[it]} /> }
                    {(items.fields.fields[it].type === 'other')       && <> { plugin()[items.fields.fields[it].componentName] } </> }

                    {items.fields.fields[it].type == 'multilang' &&
                      <ClayLocalizedInput
                        id={it}
                        key={it + items.fields.fields[it].key}
                        label={items.fields.fields[it].label}
                        locales={locales}
                        spritemap={spritemap}
                        onSelectedLocaleChange={setSelectedLocale}
                        onTranslationsChange={evt => {
                          validateLocalized(it, evt, items, itemsHandle);
                          itemsHandle({ type: ITEMS_ACTIONS.SET, fieldname: it, value: evt });
                        }
                        }
                        selectedLocale={selectedLocale}
                        translations={items.item[it]}
                      />
                    }
                    {items.fields.fields[it].type == 'select' &&
                      <>
                        <label htmlFor="basicInput" key={"label" + it}>{items.fields.fields[it].label}</label>
                        <ClaySelect aria-label="Select Label"
                          id={it}
                          name={it}
                          key={it}
                          disabled={!items.fields.fields[it].enabled}
                          onChange={evt => itemsHandle({ type: ITEMS_ACTIONS.SET, fieldname: evt.target.name, value: evt.target.value })}
                          value={items.item[it]} >
                          {items.fields.fields[it].options !== 'undefined' && items.fields.fields[it].options.map(item => (
                            <ClaySelect.Option
                              key={it + "o" + item.value}
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
                            if (items.fields.fields[it].hasOwnProperty("change"))
                              items.fields.fields[it].change(val);
                            itemsHandle({ type: ITEMS_ACTIONS.SET, fieldname: it, value: val });
                          }}
                          toggled={items.item[it]}
                          key={"toggle" + it}
                        />
                      </>
                    }
                    {(items.fields.fields[it].type === 'date') &&
                      <>
                        <label htmlFor="basicInput" key={"label" + it}>{items.fields.fields[it].label}</label>
                        <ClayDatePicker
                          onChange={val => { itemsHandle({ type: ITEMS_ACTIONS.SET, fieldname: it, value: val }); }}
                          id={it}
                          placeholder={items.fields.fields[it].placeholder}
                          firstDayOfWeek={1}
                          months={getMonths(getLanguageId())}
                          spritemap={spritemap}
                          timezone="GMT+01:00"
                          value={items.item[it]}
                          weekdaysShort={getDays(getLanguageId())}
                          key={"dtpkr" + it}
                          years={{
                            end: (((new Date().getFullYear()) + items.fields.fields[it].yearmax)),
                            start: ((new Date().getFullYear() - items.fields.fields[it].yearmin))
                          }}
                        />
                      </>}

                    {items.fields.fields[it].type == 'radio' &&
                      <>
                        <label htmlFor="basicInput" key={"label" + it}>{items.fields.fields[it].label}</label>
                        <ClayRadioGroup
                          active={act2}
                          key={"rg" + it}
                          //defaultValue="M"
                          value={items.item[it]}
                          //onActiveChange={setAct2}
                          //onChange={ evt => {console.log("este es el general")}}
                          inline
                        >
                          {items.fields.fields[it].options != "undefined" && items.fields.fields[it].options.map(it5 => {
                            return (
                              <ClayRadio
                                key={items.fields.fields[it].name + it5.key}
                                label={it5.label}
                                value={it5.value}
                                onClick={a => { itemsHandle({ type: ITEMS_ACTIONS.SET, fieldname: it, value: a.target.value }); }}
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
                          key={"sb" + it}
                          multiple
                          //onItemsChange={console.log("Cambiando los items dentro de ClaySelecBox")}
                          onSelectChange={val => { itemsHandle({ type: ITEMS_ACTIONS.SET, fieldname: it, value: val }); }}
                          spritemap={spritemap}
                          value={items.item[it]}
                        />
                      </>}
                    {(items.fields.fields[it].type === 'textarea') &&
                      <>
                        <label htmlFor="basicInputText" key={"label" + it}>{items.fields.fields[it].label}</label>
                        <ClayInput
                          component="textarea"
                          id={items.fields.fields[it].name + items.fields.fields[it].key}
                          placeholder={items.fields.fields[it].placeholder}
                          type="text"
                          key={"tarea" + it}
                          value={items.item[it]}
                          onChange={e => {
                            itemsHandle({ type: ITEMS_ACTIONS.SET, fieldname: it, value: e.target.value });
                          }}
                        />
                      </>}
                    {
                      (items.fields.fields[it].type === 'file') &&
                      <div className="form-group" key={"gf" + it} >
                        <label className="sr-only" for="inputFile" key={"fi" + it}>FILE UPLOAD</label>
                        <input id="inputFile" key={"inf" + it} type="file" onChange={(e) => {
                          itemsHandle({ type: ITEMS_ACTIONS.SET, fieldname: it, value: e.target.files[0] });
                          // setFile(e.target.files[0]);
                        }} />
                      </div>
                    }
                    {
                      items.errors[it] != 'undefined' && items.errors[it].length > 0 &&
                      <ClayForm.FeedbackGroup key={"error" + it}>
                        <ClayForm.FeedbackItem key={"err" + it}>
                          <ClayForm.FeedbackIndicator
                            key={"erfi" + it}
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
