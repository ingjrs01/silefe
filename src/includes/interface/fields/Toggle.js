import { ClayToggle } from '@clayui/form';
import { ITEMS_ACTIONS } from '../../reducers/items.reducer';

export const Toggle = ({itemsHandle, field, item, action}) => {

    const accion = (action !== undefined)?action:ITEMS_ACTIONS.SET;
    return (
        <div className="pt-3">        
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
      </div>

    )
}