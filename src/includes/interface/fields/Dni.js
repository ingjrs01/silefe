import { ClayInput } from '@clayui/form';
import { validateDni } from '../../Validators';
import { ITEMS_ACTIONS } from '../../reducers/items.reducer';
import { formatDocument } from '../../utils';

export const Dni = ({itemsHandle, field, item, tipoDoc }) => {

    const writeDocument = (target, name, value) => {
        switch (tipoDoc) {
          case '1':
            writeDni(name, value);
            break;
          case '2':
            writeNif(name, value);
            break;
          case '3': 
            writeCif(name,value);
            break;
        }
      }

      const writeNif = (name, value) => {
        const dni_limpio = value.split(" ").join("").split(".").join("").replace("-", "").toLocaleUpperCase();
        validateDni(tipoDoc, name, dni_limpio,itemsHandle);
        itemsHandle({ type: ITEMS_ACTIONS.SET, fieldname: name, value: dni_limpio });
      }
    
      const writeCif = (name, value) => {
        const dni_limpio = value.split(" ").join("").split(".").join("").replace("-", "").toLocaleUpperCase();
        //validateDni(items.item.tipoDoc, name, dni_limpio,itemsHandle);
        itemsHandle({ type: ITEMS_ACTIONS.SET, fieldname: name, value: dni_limpio });
      }

      const writeDni = (name, value) => {
        const dni_limpio = value.split(".").join("").replace("-", "").toLocaleUpperCase();
        validateDni(tipoDoc, name, dni_limpio,itemsHandle);
        itemsHandle({ type: ITEMS_ACTIONS.SET, fieldname: name, value: dni_limpio });
      }

    return (
        <>
        <label htmlFor="basicInput" key={"label" + field.label}>{field.label} </label>
        <ClayInput
          readOnly={(field.enabled !== undefined || field.enabled) ?false:true}
          type="text"
          name={field.name}
          key={field.key}
          placeholder='00.000.000-A'
          value={ formatDocument(tipoDoc,item) }
          onChange={e => writeDocument(e.target, e.target.name, e.target.value)}>
        </ClayInput>
      </>

    )
}