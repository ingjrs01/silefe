import { ClayToggle } from '@clayui/form';
import { ITEMS_ACTIONS } from '../../reducers/items.reducer';

export const Toggle = ({itemsHandle, field, item}) => {
    return (
        <>
        <ClayToggle
          label={field.label}
          onToggle={val => {
            if (field.hasOwnProperty("change"))
              field.change(val);
            itemsHandle({ type: ITEMS_ACTIONS.SET, fieldname: field.name, value: val });
          }}
          toggled={item}
          key={field.key}
        />
      </>

    )
}