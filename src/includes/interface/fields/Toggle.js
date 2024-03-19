import ClayForm, { ClayToggle } from '@clayui/form';
import { ITEMS_ACTIONS } from '../../reducers/actions';

export const Toggle = ({itemsHandle, field, item, action, error}) => {

    const accion = (action !== undefined)?action:ITEMS_ACTIONS.SET;
    return (
      <ClayForm.Group
        className={`${error !== undefined && error.length > 0 ? 'has-error' : 'has-success'} ${(field.hasOwnProperty('className')) ? field.className : 'col'} pt-3 `} 
        key={"Group-" + field.key} 
      >

        <ClayToggle
          label={field.label}
          onToggle={val => {
            if (field.hasOwnProperty("change"))
              field.change(val);
            itemsHandle({ type: accion, fieldname: field.name, value: val });
          }}
          toggled={item}
          key={field.key}
        />
      
      </ClayForm.Group>
    )
}