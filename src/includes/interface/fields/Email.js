import ClayButton, { ClayButtonWithIcon } from '@clayui/button';
import ClayForm, { ClayCheckbox, ClayInput } from '@clayui/form';
import React from 'react';
import { Liferay } from '../../../common/services/liferay/liferay';
import { spritemap } from '../../LiferayFunctions';
import { validateEmail } from '../../Validators';
import { ITEMS_ACTIONS } from '../../reducers/items.reducer';

export const Email = ({ itemsHandle, field, item, action, error }) => {

    const accion = action !== undefined ? action:ITEMS_ACTIONS.SET; 
    if (item == null)
        return (<>Cargando</>)

    return (

        <>
        <ClayForm.Group
          className={`${error != 'undefined' && error.length > 0 ? 'has-error' : 'has-success'} ${(field.hasOwnProperty('className')) ? field.className : 'col'} `}
          key={"Group-" + field.key} >
  
        <>
            <label htmlFor="basicInput" key={"label-" + field.name}>{ field.label }</label>
            {
                item.map((v, k) => {
                    return (
                        
                            <ClayInput.Group spaced={"any"} className='mt-1' key={"cig" + v.key}>
                                <ClayInput
                                    key={field.name + v.key}
                                    type="text"
                                    name={field.name}
                                    value={v.value}
                                    onChange={e => {
                                        validateEmail(e.target.name, e.target.value,itemsHandle);
                                        itemsHandle({ type: ITEMS_ACTIONS.SET_MULTIFIELD, fieldname: e.target.name, pos: k, value: e.target.value });
                                    }}
                                />
                                <ClayCheckbox
                                    aria-label="I'm checked indefinitely"
                                    key={"ckv" + v.key}
                                    checked={v.default}
                                    containerProps={{ id: "test" }}
                                    onChange={() => itemsHandle({ type: ITEMS_ACTIONS.SET_MULTIFIELDCHECK, fieldname: field.name, pos: k })}
                                />
                                <ClayButtonWithIcon
                                    aria-label="Close" displayType="secondary" spritemap={spritemap} symbol="times" title="Close"
                                    onClick={e => itemsHandle({ type: ITEMS_ACTIONS.REMOVE_MULTIFIELD, fieldname: field.name, pos: k })}
                                    key={"cbtt" + v.key}
                                />
                            </ClayInput.Group>
                        
                    )
                })
            }
            <ClayButton
                size={"xs"}
                displayType={"secondary"}
                key={"add" + field.name}
                onClick={evt => itemsHandle({ type: ITEMS_ACTIONS.ADD_MULTIFIELD, fieldname: field.name })} >
                {Liferay.Language.get("Añadir")}
            </ClayButton>
        </>
  
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

