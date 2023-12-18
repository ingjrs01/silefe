import { ClayRadio, ClayRadioGroup } from '@clayui/form';
import { useState } from 'react';
import { ITEMS_ACTIONS } from '../../reducers/items.reducer';

export const Radio = ({itemsHandle, field, item}) => {
    const [act2, setAct2] = useState(0);

    return (
        <>
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
                onClick={a => { itemsHandle({ type: ITEMS_ACTIONS.SET, fieldname: it, value: a.target.value }); }}
              />
            )
          })}

        </ClayRadioGroup>
      </>

    )
}