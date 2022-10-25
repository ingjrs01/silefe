import React from "react";
import ClayForm, {ClayInput} from '@clayui/form';
import ClayCard from "@clayui/card";
import ClayButton from '@clayui/button';
import {ITEMS_ACTIONS} from '../includes/reducers/items.reducer';
import { t } from "../includes/Lang";

const spritemap = '/icons.svg';

const DefaultForm = ({form, item, itemsHandle,save,errors,setErrors }) => {

    const validate = (name,value) => {

      if (form.rows[1]["conditions"] == "number") {
        if (isNaN(value)) {
          setErrors({...errors,[name]:{classname: 'has-error', messages: [t('error-numero')]}});
          return false;
        }
      }
      if (form.rows[1]["conditions"] == "text") {
        if (!isNaN(value)) {
          setErrors({...errors,[name]:{classname: 'has-error', messages: [Liferay.Language.get('error-texto')]}});
          return false;
        }
      }
      setErrors({...errors,[name]:{classname: 'has-success', messages: []}});
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

              { form.rows.map( row => {
                return (
                  <ClayForm.Group className={`${errors[row.name]['classname']}`} key={row.key} >
                    <label htmlFor="basicInput">{row.label}</label>
                    <ClayInput 
                      placeholder={row.placeholder} 
                      type="text" 
                      name={row.name} 
                      value={item[row.name]} 
                      onChange={e => {
                        validate(e.target.name,e.target.value);
                        itemsHandle({type:ITEMS_ACTIONS.SET,fieldname:e.target.name, value:e.target.value}); 
                        }}>
                    </ClayInput>
                    {
                      errors[row.name]['messages'].length > 0 &&
                    <ClayForm.FeedbackGroup>
                      <ClayForm.FeedbackItem>
                        <ClayForm.FeedbackIndicator
                          spritemap={spritemap}
                          symbol="check-circle-full"
                        />
                        {  errors[row.name]['messages'][0] }
                      </ClayForm.FeedbackItem>
                    </ClayForm.FeedbackGroup>
                    }

                  </ClayForm.Group> 
                      
                )
              })}

            </ClayForm>
          </ClayCard.Description>
          <div className="btn-group">
            <div className="btn-group-item">
              <ClayButton onClick={e => itemsHandle({type:ITEMS_ACTIONS.CANCEL})} displayType="secondary">{Liferay.Language.get('Cancelar')}</ClayButton>
            </div>
            <div className="btn-group-item">
              <ClayButton onClick={e => save()} displayType="primary">{Liferay.Language.get('Guardar')}</ClayButton>
            </div>
          </div>
        </ClayCard.Body>
      </ClayCard>
    );
  }

export default DefaultForm;