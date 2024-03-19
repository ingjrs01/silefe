import ClayForm, { ClayInput } from '@clayui/form';
import { spritemap } from '../../LiferayFunctions';
import { validateNumber } from '../../Validators';
import { ITEMS_ACTIONS } from '../../reducers/actions';

export const Number = ({itemsHandle, field, item, action, error}) => {

    const accion = action !== undefined ? action: ITEMS_ACTIONS.SET;

    const onChange = (value) => {
      console.log("onChange");

      validateNumber(field.name, value, field, itemsHandle);
      itemsHandle({ type: accion, fieldname: field.name, value: value });
}

    return (
      <>
      <ClayForm.Group
        className={`${error !== undefined && error.length > 0 ? 'has-error' : 'has-success'} ${(field.hasOwnProperty('className')) ? field.className : 'col'} `}
        key={"Group-" + field.key} >

        <label htmlFor="basicInput" key={"label" + field.label}>{field.label}</label>
        <ClayInput
          placeholder={field.placeholder}
          type="number"
          name={field.name}
          key={field.key}
          value={item}
          min={ field.min != 'undefined' ? field.min : null}
          max={ field.max != 'undefined' ? field.max : null}
          onChange={e => onChange(e.target.value)}>
        </ClayInput>

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