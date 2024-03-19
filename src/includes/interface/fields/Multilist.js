import ClayForm, { ClaySelectBox } from '@clayui/form';
import { spritemap } from '../../LiferayFunctions';
import { ITEMS_ACTIONS } from "../../reducers/actions";

export const Multilist = ({itemsHandle, field, item, action, error}) => {

    const accion = action !== undefined ? action: ITEMS_ACTIONS.SET;
    return (

      <>
      <ClayForm.Group
        className={`${error !== undefined && error.length > 0 ? 'has-error' : 'has-success'} ${(field.hasOwnProperty('className')) ? field.className : 'col'} `}
        key={"Group-" + field.key} >

          <ClaySelectBox
            items={field.options}
            label={field.label}
            key={"sb" + field.key}
            multiple
            //onItemsChange={console.log("Cambiando los items dentro de ClaySelecBox")}
            onSelectChange={val => { itemsHandle({ type: accion, fieldname: field.name, value: val }); }}
            spritemap={spritemap}
            value={item}
          />

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