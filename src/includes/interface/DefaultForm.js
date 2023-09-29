import ClayButton from '@clayui/button';
import ClayForm from '@clayui/form';
import React from "react";
import { ITEMS_ACTIONS } from '../reducers/items.reducer';
import RenderFields from "./RenderFields";

const DefaultForm = ({ itemsHandle, save, items, notify }) => {

  const validateAll = () => {
    Object.keys(items.fields.fields).forEach(campo => {
      //console.log(campo);
      //debugger;
      if ((items.fields.fields[campo].validate === undefined) || (items.fields.fields[campo].validate != false)) {
        switch (items.fields.fields[campo].type) {
          case "text":
            if (!validate(campo, items.item[campo]))
              //console.log("no pasa texto");
              return false;
            break;
          case "multilang":
            if (!validateLocalized(campo, items.item[campo]))
              //console.log("no pasa multi");
              return false;
            break;
          case "toggle":
            //console.log("toggle");
            break;
        }
      }


    });
    //console.log("validado ok");
    return true;
  }

  const validate = (name, value) => {
    let condicion = "";
    //console.log("validating");
    for (condicion of items.fields.fields[name]["conditions"]) {
      if (condicion == "number") {
        if (isNaN(value)) {
          itemsHandle({ type: ITEMS_ACTIONS.ADDERROR, name: name, value: Liferay.Language.get('error-numero') });
          return false;
        }
      }

      if (condicion == "text") {
        if (!isNaN(value)) {
          itemsHandle({ type: ITEMS_ACTIONS.ADDERROR, name: name, value: Liferay.Language.get('error-texto') });
          return false;
        }
      }
    }
    itemsHandle({ type: ITEMS_ACTIONS.CLEARERRORS, name: name });
    //    console.log("validated");
    return true;
  }

  const validateLocalized = (fieldname, values) => {
    const languages = Object.keys(values);
    let l = "";
    for (l in languages) {
      if (!validate(fieldname, values[languages[l]]))
        return false;
    }
    return true;
  }

  return (
    <ClayForm className="sheet">
      <RenderFields
        rows={items.fields.rows}
        itemsHandle={itemsHandle}
        items={items}
      />

      <div className="btn-group">
        <div className="btn-group-item">
          <ClayButton onClick={e => itemsHandle({ type: ITEMS_ACTIONS.CANCEL })} displayType="secondary">{Liferay.Language.get('Cancelar')}</ClayButton>
        </div>
        <div className="btn-group-item">
          <ClayButton onClick={e => {
            validateAll() && save()
          }}
            displayType="primary">{Liferay.Language.get('Guardar')}
          </ClayButton>
        </div>
      </div>
    </ClayForm>
  );
}

export default DefaultForm;
