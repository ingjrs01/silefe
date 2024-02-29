import { ClayCheckbox } from "@clayui/form";

export const Checkbox = ({ itemsHandle, field, item, action }) => {
  return (
    <div className="pt-3">

      <label htmlFor="basicInput">{field.label}</label>
      <ClayCheckbox
        checked={ejecucion.item.dias.M.value}
        onChange={() => itemsHandle({ type: action, fieldname: field.name, value: item })}
        key={field.key}
      />

    </div>

  )
}