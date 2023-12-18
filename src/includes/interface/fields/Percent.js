import { ClayInput } from '@clayui/form';
import { ITEMS_ACTIONS } from '../../reducers/items.reducer';

export const Percent = ({itemsHandle, field, item}) => {
    return (
        <>
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
                itemsHandle({ type: ITEMS_ACTIONS.SET, fieldname: e.target.name, value: e.target.value });
              }}>
            </ClayInput>
          </ClayInput.GroupItem>
          <ClayInput.GroupItem shrink prepend>
            <ClayInput.GroupText>{"%"}</ClayInput.GroupText>
          </ClayInput.GroupItem>
        </ClayInput.Group>
      </>
    )
}