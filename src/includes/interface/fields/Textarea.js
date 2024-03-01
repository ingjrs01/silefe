import ClayForm, { ClayInput } from '@clayui/form';
import { spritemap } from '../../LiferayFunctions';
import { validate } from '../../Validators';
import { ITEMS_ACTIONS } from '../../reducers/items.reducer';

export const Textarea = ({ itemsHandle, field, item, action, error }) => {

  const accion = (action !== undefined) ? action : ITEMS_ACTIONS.SET

  const onChange = (value) => {
    validate(field.name, value,field, itemsHandle);
    itemsHandle({ type: accion, fieldname: field.name, value: value })
  }

  return (
    <>
      <ClayForm.Group
        className={`${error != 'undefined' && error.length > 0 ? 'has-error' : 'has-success'} ${(field.hasOwnProperty('className')) ? field.className : 'col'} `}
        key={"Group-" + field.key} >

        <label htmlFor="basicInputText" key={"label" + field.key}>{field.label}</label>
        <ClayInput
          component="textarea"
          id={field.name + field.key}
          placeholder={field.placeholder}
          type="text"
          key={"tarea" + field.key}
          value={item}
          onChange={e => onChange(e.target.value)}
        />

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