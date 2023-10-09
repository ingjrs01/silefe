import ClayButton from '@clayui/button';
import ClayForm from '@clayui/form';
import React from "react";
import { validateAll } from '../Validators';
import { ITEMS_ACTIONS } from '../reducers/items.reducer';
import RenderFields from "./RenderFields";

const DefaultForm = ({ itemsHandle, save, items }) => {
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
            validateAll(items, itemsHandle) && save()
          }}
            displayType="primary">{Liferay.Language.get('Guardar')}
          </ClayButton>
        </div>
      </div>
    </ClayForm>
  );
}

export default DefaultForm;
