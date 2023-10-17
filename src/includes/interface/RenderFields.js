import ClayAutocomplete from '@clayui/autocomplete';
import ClayButton, { ClayButtonWithIcon } from '@clayui/button';
import ClayDatePicker from '@clayui/date-picker';
import ClayForm, { ClayCheckbox, ClayInput, ClayRadio, ClayRadioGroup, ClaySelect, ClaySelectBox, ClayToggle } from '@clayui/form';
import ClayLocalizedInput from '@clayui/localized-input';
import React, { useState } from "react";
import { getLanguageId, locales, spritemap } from '../LiferayFunctions';
import { validate, validateDni, validateLocalized } from '../Validators';
import { ITEMS_ACTIONS } from '../reducers/items.reducer';
import { getDays, getMonths } from './DatesLang';

const RenderFields = ({ rows, itemsHandle, items, plugin }) => {
  const [selectedLocale, setSelectedLocale] = useState(locales[0]);
  const [act2, setAct2] = useState(0);

  const writeDni = (name, value) => {
    const dni_limpio = value.split(".").join("").replace("-", "").toLocaleUpperCase();
    validateDni(items.item.tipoDoc, name, dni_limpio,itemsHandle);
    itemsHandle({ type: ITEMS_ACTIONS.SET, fieldname: name, value: dni_limpio });
  }

  const formatDocument = (tipoDoc, value) => {
    if (tipoDoc == 1)
      return formatDni(value);
    if (tipoDoc == 2)
      return formatNif(value);
  }

  const formatDni = (dni_limpio) => {
    if (dni_limpio == undefined || dni_limpio.length == 0)
      return "";

    var dni_mostrado = dni_limpio.substr(0, 2);
    if (dni_limpio.length > 2)
      dni_mostrado = dni_limpio.substr(0, 2) + "." + dni_limpio.substr(2, 3);
    if (dni_limpio.length > 5)
      dni_mostrado = dni_limpio.substr(0, 2) + "." + dni_limpio.substr(2, 3) + "." + dni_limpio.substr(5, 3);
    if (dni_limpio.length > 8)
      dni_mostrado = dni_limpio.substr(0, 2) + "." + dni_limpio.substr(2, 3) + "." + dni_limpio.substr(5, 3) + "-" + dni_limpio.substr(8, 1);

    return dni_mostrado;
  }

  const formatMoney = (value) => {
    if (value == null)
      return "";
    var temp = "";
    //debugger;

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

  const formatNif = (dni_limpio) => {
    if (dni_limpio == undefined || dni_limpio.length == 0)
      return "";
    
    var dni_mostrado = dni_limpio.substr(0, 1);

    if (dni_limpio.length > 1)
      dni_mostrado = dni_limpio.substr(0, 1) + " " + dni_limpio.substr(1, 1);

    if (dni_limpio.length > 2)
      dni_mostrado = dni_limpio.substr(0, 1) + " " + dni_limpio.substr(1, 1) + "." + dni_limpio.substr(2, 3);

    if (dni_limpio.length > 5)
      dni_mostrado = dni_limpio.substr(0, 1) + " " + dni_limpio.substr(1, 1) + "." + dni_limpio.substr(2, 3) + "." + dni_limpio.substr(5, 3);

    if (dni_limpio.length > 8)
      dni_mostrado = dni_limpio.substr(0, 1) + " " + dni_limpio.substr(1, 1) + "." + dni_limpio.substr(2, 3) + "." + dni_limpio.substr(5, 3) + "-" + dni_limpio.substr(8, 1);

    return dni_mostrado
  }

  const writeDocument = (target, name, value) => {
    switch (items.item.tipoDoc) {
      case '1':
        writeDni(name, value);
        break;
      case '2':
        writeNif(name, value);
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

                    {(items.fields.fields[it].type === 'multitext') &&
                      <>
                        <label htmlFor="basicInput" key={"label" + it}>{items.fields.fields[it].label}</label>
                        {
                          items.item[it].map((v, k) => {
                            return (
                              <>
                                <ClayInput.Group spaced={"any"} className='mt-1' key={"cig" + v.key}>
                                  <ClayInput
                                    //className="col-6"
                                    key={it + v.key}
                                    type="text"
                                    name={it}
                                    value={v.value}
                                    onChange={e => {
                                      //validate(e.target.name, e.target.value);
                                      itemsHandle({ type: ITEMS_ACTIONS.SET_MULTIFIELD, fieldname: e.target.name, pos: k, value: e.target.value });
                                    }}
                                  />
                                  <ClayCheckbox
                                    aria-label="I'm checked indefinitely"
                                    key={"ckv" + v.key}
                                    checked={v.default}
                                    containerProps={{ id: "test" }}
                                    onChange={() => itemsHandle({ type: ITEMS_ACTIONS.SET_MULTIFIELDCHECK, fieldname: it, pos: k })}
                                  />
                                  <ClayButtonWithIcon
                                    //className="col-1" 
                                    aria-label="Close" displayType="secondary" spritemap={spritemap} symbol="times" title="Close"
                                    onClick={e => itemsHandle({ type: ITEMS_ACTIONS.REMOVE_MULTIFIELD, fieldname: it, pos: k })}
                                    key={"cbtt" + v.key}
                                  />
                                </ClayInput.Group>
                              </>
                            )
                          })
                        }
                        <ClayButton
                          size={"xs"}
                          displayType={"secondary"}
                          key={"add" + it}
                          onClick={evt => itemsHandle({ type: ITEMS_ACTIONS.ADD_MULTIFIELD, fieldname: it })} >
                          {Liferay.Language.get("Añadir")}
                        </ClayButton>
                      </>
                    }

                    {items.fields.fields[it].type == 'multilang' &&
                      <ClayLocalizedInput
                        id={it}
                        key={it + items.fields.fields[it].key}
                        label={items.fields.fields[it].label}
                        locales={locales}
                        spritemap={spritemap}
                        onSelectedLocaleChange={setSelectedLocale}
                        onTranslationsChange={evt => {
                          console.log("changiando");
                          console.debug(items);
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
                    {items.fields.fields[it].type == 'autocomplete' &&
                      <>
                        <label htmlFor={it} id={it + "label"} key={"label" + it}> {items.fields.fields[it].label} </label>
                        <ClayAutocomplete
                          aria-labelledby={it + "label"}
                          id={it}
                          key={it}
                          onChange={(evt) => { itemsHandle({ type: ITEMS_ACTIONS.SET, fieldname: it, value: evt }); }}
                          value={items.item[it]}
                          placeholder="Introduzca las primeras letras"
                        >
                          {items.fields.fields[it].options.map(item => {
                            return (
                              <ClayAutocomplete.Item key={it + "a-" + item.value}>{item.label}</ClayAutocomplete.Item>
                            )
                          })}
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
                    {(items.fields.fields[it].type === 'other') &&
                      <>
                        {
                          plugin()[items.fields.fields[it].componentName]
                        }
                      </>}
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
