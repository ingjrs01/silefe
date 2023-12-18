import { ClayInput } from '@clayui/form';
import { validate } from '../../Validators';
import { ITEMS_ACTIONS } from '../../reducers/items.reducer';

export const Number = ({itemsHandle, field, item}) => {
    return (
        <>
        <label htmlFor="basicInput" key={"label" + field.label}>{field.label}</label>
        <ClayInput
          placeholder={field.placeholder}
          type="number"
          name={field.name}
          key={field.key}
          value={item}
          min={ field.min != 'undefined' ? field.min : null}
          max={ field.max != 'undefined' ? field.max : null}
          onChange={e => {
            validate(e.target.name, e.target.value, field, itemsHandle);
            itemsHandle({ type: ITEMS_ACTIONS.SET, fieldname: e.target.name, value: e.target.value });
          }}>
        </ClayInput>
      </>

    )
}