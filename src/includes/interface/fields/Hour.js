import ClayForm, { ClayInput } from '@clayui/form';
import React from 'react';
import { spritemap } from '../../LiferayFunctions';
import { validateHour } from '../../Validators';
import { ITEMS_ACTIONS } from '../../reducers/main.reducer';

export const Hour = ({ itemsHandle, field, item, className, action, error }) => {

    const accion = action !== undefined?action:ITEMS_ACTIONS.SET;

    const onChange = (value) => {
      validateHour(field.name, value, field, itemsHandle);
      itemsHandle({ type: accion, fieldname: field.name, value: value });
    }

    return (
      <>
      <ClayForm.Group
        className={`${error != 'undefined' && error.length > 0 ? 'has-error' : 'has-success'} ${(field.hasOwnProperty('className')) ? field.className : 'col'} `}
        key={"Group-" + field.key} >
        <label htmlFor="basicInput" key={"label" + field.name}>{field.label}</label>
        <ClayInput
          type="time"
          name={field.name}
          key={field.key}
          value={item}
          min={ field.min != 'undefined' ? field.min : null}
          max={ field.max != 'undefined' ? field.max : null}
          className={className}
          onChange={e => onChange(e.target.value)}>
        </ClayInput>
 
        {
          error != 'undefined' && error.length > 0 &&
          <ClayForm.FeedbackGroup key={"error" + field.name}>
            <ClayForm.FeedbackItem key={"err" + field.name}>
              <ClayForm.FeedbackIndicator key={"erfi" + field.name} spritemap={spritemap} symbol="check-circle-full" />{error[0]} </ClayForm.FeedbackItem>
          </ClayForm.FeedbackGroup>
        }
      </ClayForm.Group>
    </>
 
    )

}