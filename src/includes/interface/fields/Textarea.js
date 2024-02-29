import { ClayInput } from '@clayui/form';
import { ITEMS_ACTIONS } from '../../reducers/items.reducer';

export const Textarea = ({itemsHandle, field, item, action }) => {

    const accion = (action !== undefined)?action:ITEMS_ACTIONS.SET
    return (
        <>
        <label htmlFor="basicInputText" key={"label" + field.key}>{field.label}</label>
        <ClayInput
          component="textarea"
          id={field.name + field.key}
          placeholder={field.placeholder}
          type="text"
          key={"tarea" + field.key}
          value={item}
          onChange={e => itemsHandle({ type: accion, fieldname: field.name, value: e.target.value }) }
        />
      </>

    )
}