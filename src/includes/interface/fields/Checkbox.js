import ClayForm, { ClayCheckbox } from '@clayui/form';

export const Checkbox = ({ itemsHandle, field, item, action }) => {
  return (
    <ClayForm.Group
    className={`${error !== undefined && error.length > 0 ? 'has-error' : 'has-success'} ${(field.hasOwnProperty('className')) ? field.className : 'col'} pt-5`} 
    key={"Group-" + field.key} 
  >
   
      <label htmlFor="basicInput">{field.label}</label>
      <ClayCheckbox
        checked={ejecucion.item.dias.M.value}
        onChange={() => itemsHandle({ type: action, fieldname: field.name, value: item })}
        key={field.key}
      />

    </ClayForm.Group>

  )
}