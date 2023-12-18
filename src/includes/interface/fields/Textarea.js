import { ClayInput } from '@clayui/form';
import { ITEMS_ACTIONS } from '../../reducers/items.reducer';

export const Textarea = ({itemsHandle, field, item}) => {

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
          onChange={e => itemsHandle({ type: ITEMS_ACTIONS.SET, fieldname: it, value: e.target.value }) }
        />
      </>

    )
}