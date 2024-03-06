import ClayForm, { ClayRadio, ClayRadioGroup } from '@clayui/form';
import { useState } from 'react';
import { spritemap } from '../../LiferayFunctions';
import { ITEMS_ACTIONS } from '../../reducers/items.reducer';

export const Radio = ({itemsHandle, field, item, action, error}) => {

    const accion = action !== undefined ? action:ITEMS_ACTIONS.SET; 
    const [act2, setAct2] = useState(0);

    return (

      <>
      <ClayForm.Group
        className={`${error !== undefined && error.length > 0 ? 'has-error' : 'has-success'} ${(field.hasOwnProperty('className')) ? field.className : 'col'} `}
        key={"Group-" + field.key} >

          <label htmlFor="basicInput" key={"label" + field.key}>{field.label}</label>
          <ClayRadioGroup
            active={act2}
            key={"rg" + field.key}
            //defaultValue="M"
            value={item}
            //onActiveChange={setAct2}
            //onChange={ evt => {console.log("este es el general")}}
            inline
          >
            {field.options != "undefined" && field.options.map(it5 => {
              return (
                <ClayRadio
                  key={field.name + it5.key}
                  label={it5.label}
                  value={it5.value}
                  onClick={a => { itemsHandle({ type: accion, fieldname: it, value: a.target.value }); }}
                />
              )
            })}
         
          </ClayRadioGroup>

        {
          error !== undefined && error.length > 0 &&
          <ClayForm.FeedbackGroup key={"error" + field.name}>
            <ClayForm.FeedbackItem key={"err" + field.name}>
              <ClayForm.FeedbackIndicator key={"erfi" + field.name} spritemap={spritemap} symbol="check-circle-full" />{error[0]} </ClayForm.FeedbackItem>
          </ClayForm.FeedbackGroup>
        }
      </ClayForm.Group>
    </>

    )
}