import { ClaySelectBox } from '@clayui/form';
import { spritemap } from '../../LiferayFunctions';
import { ITEMS_ACTIONS } from "../../reducers/items.reducer";

export const Multilist = ({itemsHandle, field, item}) => {
    return (
        <>
        <ClaySelectBox
          items={field.options}
          label={field.label}
          key={"sb" + field.key}
          multiple
          //onItemsChange={console.log("Cambiando los items dentro de ClaySelecBox")}
          onSelectChange={val => { itemsHandle({ type: ITEMS_ACTIONS.SET, fieldname: field.name, value: val }); }}
          spritemap={spritemap}
          value={item}
        />
      </>

    )
}