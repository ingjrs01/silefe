import { ClayInput } from '@clayui/form';
import { validate } from '../../Validators';
import { ITEMS_ACTIONS } from '../../reducers/items.reducer';

export const Textinput = ({itemsHandle, field, item, action }) => {  

    const accion = (action !== undefined ) ? action:ITEMS_ACTIONS.SET;
    return (
        <>
        <label htmlFor="basicInput" key={"label" + field.label}>{field.label}</label>
        <ClayInput
          placeholder={field.placeholder}
          type="text"
          name={field.name}
          id={field.name}
          key={field.key}
          value={item}
          onChange={e => {
            validate(e.target.name, e.target.value, field, itemsHandle);
            itemsHandle({ type: accion, fieldname: e.target.name, value: e.target.value });
          }}>
        </ClayInput>
      </>
    )    
}