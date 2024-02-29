import { ClaySelect } from '@clayui/form';

export const Select = ({itemsHandle, field, item, className, action}) => {

    return (
        <>
        <label htmlFor="basicInput" key={"label" + field.label}>{field.label}</label>
        <ClaySelect aria-label="Select Label"
          id={field.name}
          name={field.name}
          key={field.key}
          disabled={!field.enabled}
          className={className}
          onChange={evt => itemsHandle({ type: action, fieldname: evt.target.name, value: evt.target.value })}
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