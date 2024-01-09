import { ClayInput } from '@clayui/form';
import React from 'react';
//import { spritemap } from '../../LiferayFunctions';
import { ITEMS_ACTIONS } from '../../reducers/items.reducer';


export const Hour = ({ itemsHandle, field, item, className }) => {

    return (
        <>
        <label htmlFor="basicInput" key={"label" + field.name}>{field.label}</label>
        <ClayInput
          type="time"
          name={field.name}
          key={field.key}
          value={item}
          min={ field.min != 'undefined' ? field.min : null}
          max={ field.max != 'undefined' ? field.max : null}
          className={className}
          onChange={e => {
            //validate(e.target.name, e.target.value, items, itemsHandle);
            itemsHandle({ type: ITEMS_ACTIONS.SET, fieldname: e.target.name, value: e.target.value });
          }}>
        </ClayInput>
      </>

    )

}