import React from "react";
import ClayForm, { ClayInput } from '@clayui/form';
import ClayCard from "@clayui/card";
import ClayButton from '@clayui/button';
import { ITEMS_ACTIONS } from '../includes/reducers/items.reducer';

const spritemap = '/icons.svg';

const DefaultForm = ({ form, itemsHandle, save, items }) => {

  const validateAll = () => {
    let campo = "";
    for (campo of Object.keys(form.rows)) {
      if (!validate(campo,items.item[campo]))
        return false
    }

    return true
  }

  const validate = (name, value) => {
    let condicion = "";
    for (condicion of form.rows[name]["conditions"]) {
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

  return (
    <ClayCard>
      <ClayCard.Body>
        <ClayCard.Description displayType="title">
          <h2>{form.title}</h2>
        </ClayCard.Description>

        <ClayCard.Description truncate={false} displayType="text">
          <ClayForm>
            {Object.keys(form.rows).map(it => {
              return (
                <ClayForm.Group className={`${items.errors[form.rows[it].name].length > 0 ? 'has-error' : 'has-success'}`} key={form.rows[it].key} >
                  <label htmlFor="basicInput">{form.rows[it].label}</label>
                  <ClayInput
                    placeholder={form.rows[it].placeholder}
                    type="text"
                    name={form.rows[it].name}
                    value={items.item[form.rows[it].name]}
                    onChange={e => {
                      validate(e.target.name, e.target.value);
                      itemsHandle({ type: ITEMS_ACTIONS.SET, fieldname: e.target.name, value: e.target.value });
                    }}>
                  </ClayInput>
                  {
                    items.errors[form.rows[it].name].length > 0 &&
                    <ClayForm.FeedbackGroup>
                      <ClayForm.FeedbackItem>
                        <ClayForm.FeedbackIndicator
                          spritemap={spritemap}
                          symbol="check-circle-full"
                        />
                        {items.errors[form.rows[it].name][0]}
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