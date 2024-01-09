import { ClaySelect } from '@clayui/form';
import { ITEMS_ACTIONS } from '../../reducers/items.reducer';

export const Select = ({itemsHandle, field, item, className}) => {

    return (
        <>
        <label htmlFor="basicInput" key={"label" + field.label}>{field.label}</label>
        <ClaySelect aria-label="Select Label"
          id={field.name}
          name={field.name}
          key={field.key}
          disabled={!field.enabled}
          className={className}
          onChange={evt => itemsHandle({ type: ITEMS_ACTIONS.SET, fieldname: evt.target.name, value: evt.target.value })}
          value={item} >
          {field.options !== 'undefined' && field.options.map(item => (
            <ClaySelect.Option
              key={field.name + "o" + item.value}
              label={item.label}
              value={item.value}
            />
          ))}
        </ClaySelect>
      </>
    )

}