import ClayForm, { ClayInput } from '@clayui/form';
import { spritemap } from '../../LiferayFunctions';
import { validateDni } from '../../Validators';
import { ITEMS_ACTIONS } from '../../reducers/actions';
import { formatDocument } from '../../utils';

export const Dni = ({ itemsHandle, field, item, tipoDoc, error, action }) => {

  const accion = (action !== undefined)?action:ITEMS_ACTIONS.SET;

  const writeDocument = (target, name, value) => {
    switch (tipoDoc) {
      case '1':
        writeDni(name, value);
        break;
      case '2':
        writeNif(name, value);
        break;
      case '3':
        writeCif(name, value);
        break;
    }
  }

  const writeNif = (name, value) => {
    const dni_limpio = value.split(" ").join("").split(".").join("").replace("-", "").toLocaleUpperCase();
    validateDni(tipoDoc, name, dni_limpio, itemsHandle);
    itemsHandle({ type: accion, fieldname: name, value: dni_limpio });
  }

  const writeCif = (name, value) => {
    const dni_limpio = value.split(" ").join("").split(".").join("").replace("-", "").toLocaleUpperCase();
    //validateDni(items.item.tipoDoc, name, dni_limpio,itemsHandle);
    itemsHandle({ type: accion, fieldname: name, value: dni_limpio });
  }

  const writeDni = (name, value) => {
    const dni_limpio = value.split(".").join("").replace("-", "").toLocaleUpperCase();
    validateDni(tipoDoc, name, dni_limpio, itemsHandle);
    itemsHandle({ type: accion, fieldname: name, value: dni_limpio });
  }
  
  return (
    <>
      <ClayForm.Group
        className={`${error !== undefined && error.length > 0 ? 'has-error' : 'has-success'} ${(field.hasOwnProperty('className')) ? field.className : 'col'} `}
        key={"Group-" + field.key} >

      <label htmlFor="basicInput" key={"label" + field.label}>{field.label} </label>
      <ClayInput
        readOnly={(field.enabled !== 'undefined' || field.enabled) ? false : true}
        type="text"
        name={field.name}
        key={field.key}
        placeholder='00.000.000-A'
        value={formatDocument(tipoDoc, item)}
        onChange={e => writeDocument(e.target, e.target.name, e.target.value)}>
      </ClayInput>

        {
          error !== undefined && error.length > 0 &&
          <ClayForm.FeedbackGroup key={"error" + field.name}>
            <ClayForm.FeedbackItem key={"err" + field.name}>
              <ClayForm.FeedbackIndicator key={"erfi" + field.name} spritemap={spritemap} symbol="check-circle-full" />{error[0]} </ClayForm.FeedbackItem>
          </ClayForm.FeedbackGroup>
        }
      </ClayForm.Group>
    </>
 



  )
}