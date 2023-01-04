import React, { useState } from "react";
import ClayForm, { ClayInput, ClaySelect } from '@clayui/form';
import ClayCard from "@clayui/card";
import ClayButton from '@clayui/button';
import { ITEMS_ACTIONS } from '../includes/reducers/items.reducer';
import ClayLocalizedInput from '@clayui/localized-input';

const spritemap = '/icons.svg';

const DefaultForm = ({ itemsHandle, save, items }) => {

  const  locales = [
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
    for (campo of Object.keys(items.fields.rows)) {
      if (typeof items.item[campo] == 'object') {
        if (!validateLocalized(campo,items.item[campo]))
          return false;
      }
      else {
        if (!validate(campo,items.item[campo]))
          return false;
      }
    }
    return true;
  }

  const validate = (name, value) => {
    let condicion = "";
    for (condicion of items.fields.rows[name]["conditions"]) {
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

  const validateLocalized = (fieldname,values) => {
    const languages = Object.keys(values);
    let l = "";
    for (l in languages) {
      if (!validate(fieldname,values[languages[l]]))
        return false
    }
    return true;
  }
  //debugger;
  console.log("llego aqui");

  return (
    <ClayCard>
      <ClayCard.Body>
        <ClayCard.Description displayType="title">
          <h2>{items.fields.title}</h2>
        </ClayCard.Description>

        <ClayCard.Description truncate={false} displayType="text">
          <ClayForm>
            { Object.keys(items.fields.rows).map(it => {
              return (
                <ClayForm.Group className={`${items.errors[items.fields.rows[it].name].length > 0 ? 'has-error' : 'has-success'}`} key={items.fields.rows[it].key} >
                   { (items.fields.rows[it].type === 'text') &&
                    <>
                    <label htmlFor="basicInput">{items.fields.rows[it].label}</label>
                    <ClayInput
                      placeholder={items.fields.rows[it].placeholder}
                      type="text"
                      name={items.fields.rows[it].name}
                      value={items.item[items.fields.rows[it].name]}
                      onChange={e => {
                        validate(e.target.name, e.target.value);
                        itemsHandle({ type: ITEMS_ACTIONS.SET, fieldname: e.target.name, value: e.target.value });
                      }}>
                    </ClayInput>
                    </>}
                   { items.fields.rows[it].type == 'multilang' &&
                    <ClayLocalizedInput
                      id={items.fields.rows[it].name}
                      label={items.fields.rows[it].label}
                      locales={locales}
                      onSelectedLocaleChange={ setSelectedLocale }
                      onTranslationsChange={ evt => { 
                          validateLocalized(it, evt);
                          itemsHandle({ type: ITEMS_ACTIONS.SET, fieldname: it, value: evt });
                        }
                      }
                      selectedLocale={ selectedLocale }
                      translations={items.item[items.fields.rows[it].name]}
                    />
                  }
                  { items.fields.rows[it].type == 'select' &&
                    <ClaySelect aria-label="Select Label" 
                      id={items.fields.rows[it].name} 
                      name={items.fields.rows[it].name} 
                      onChange={evt => {
                        itemsHandle({ type: ITEMS_ACTIONS.SET, fieldname: evt.target.name, value: evt.target.value });
                      }} 
                      value={items.item[items.fields.rows[it].name]} >
                      {items.fields.rows[it].options.map(item => (
                        <ClaySelect.Option
                          key={item.value}
                          label={item.label}
                          value={item.value}
                        />
                      ))}
                    </ClaySelect>
                  }
                  {
                    items.errors[items.fields.rows[it].name].length > 0 &&
                    <ClayForm.FeedbackGroup>
                      <ClayForm.FeedbackItem>
                        <ClayForm.FeedbackIndicator
                          spritemap={spritemap}
                          symbol="check-circle-full"
                        />
                        {items.errors[items.fields.rows[it].name][0]}
                      </ClayForm.FeedbackItem>
                    </ClayForm.FeedbackGroup>
                  }

                </ClayForm.Group>
              )
            })
            }

          </ClayForm>
        </ClayCard.Description>
        <div className="btn-group">
          <div className="btn-group-item">
            <ClayButton onClick={e => itemsHandle({ type: ITEMS_ACTIONS.CANCEL })} displayType="secondary">{Liferay.Language.get('Cancelar')}</ClayButton>
          </div>
          <div className="btn-group-item">
            <ClayButton onClick={e => {validateAll() && save()}} displayType="primary">{Liferay.Language.get('Guardar')}</ClayButton>
          </div>
        </div>
      </ClayCard.Body>
    </ClayCard>
  );
}

export default DefaultForm;