import ClayForm, { ClayInput } from '@clayui/form';
import { spritemap } from '../../LiferayFunctions';
import { ITEMS_ACTIONS } from '../../reducers/items.reducer';

export const Percent = ({itemsHandle, field, item, action, error}) => {
    const accion = action !== undefined ? action: ITEMS_ACTIONS.SET;
    return (
      <>
      <ClayForm.Group
        className={`${error !== undefined && error.length > 0 ? 'has-error' : 'has-success'} ${(field.hasOwnProperty('className')) ? field.className : 'col'} `}
        key={"Group-" + field.key} >

        <label htmlFor="basicInput" key={"label" + field.label}>{field.label}</label>
        <ClayInput.Group>
          <ClayInput.GroupItem prepend>
            <ClayInput
              type="number"
              name={field.name}
              key={field.key}
              value={item}
              max={100}
              min={0}
              onChange={e => {
                //validate(e.target.name, e.target.value);
                itemsHandle({ type: accion, fieldname: e.target.name, value: e.target.value });
              }}>
            </ClayInput>
          </ClayInput.GroupItem>
          <ClayInput.GroupItem shrink prepend>
            <ClayInput.GroupText>{"%"}</ClayInput.GroupText>
          </ClayInput.GroupItem>
        </ClayInput.Group>

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