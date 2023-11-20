import ClayButton, { ClayButtonWithIcon } from '@clayui/button';
import { ClayCheckbox, ClayInput } from '@clayui/form';
import React from 'react';
import { spritemap } from '../../LiferayFunctions';
import { validatePhoneNumber } from '../../Validators';
import { ITEMS_ACTIONS } from '../../reducers/items.reducer';

export const Phone = ({ itemsHandle, field, item }) => {
    if (item == null)
        return (<>Cargando</>)

    return (
        <>
            <label htmlFor="basicInput" key={"label-" + field.name}>{ field.label }</label>
            {
                item.map((v, k) => {
                    return (
                        <>
                            <ClayInput.Group spaced={"any"} className='mt-1' key={"cig" + v.key}>
                                <ClayInput
                                    key={field.name + v.key}
                                    type="text"
                                    name={field.name}
                                    value={v.value}
                                    onChange={e => {
                                        validatePhoneNumber(e.target.name,e.target.value,itemsHandle);
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
                        </>
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
    )

}

