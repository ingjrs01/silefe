import React from "react";
import ClayForm, { ClayInput } from '@clayui/form';
import ClayCard from "@clayui/card";
import ClayButton from '@clayui/button';

const spritemap = '/icons.svg';

const ProvinciaForm = ({setItem, item, cancel, save}) => {

    return (
      <ClayCard>
        <ClayCard.Body>
          <ClayCard.Description displayType="title">
            {"Card Title"}
          </ClayCard.Description>
          <ClayCard.Description truncate={false} displayType="text">
            <ClayForm>
              <ClayForm.Group className="hs-success">
                <label htmlFor="basicInput">Código</label>
                <ClayInput placeholder="Código" type="text" name="codigo" value={item.id} onChange={e => { setItem({ ...item, id: e.target.value }) }}></ClayInput>
              </ClayForm.Group>
              <ClayForm.Group className="hs-warning">
                <label htmlFor="basicInput">Nombre</label>
                <textarea className="form-control" placeholder="Descripción" name="descripcion" value={item.nombre} onChange={e => { setItem({ ...item, nombre: e.target.value }) }}></textarea>
              </ClayForm.Group>
            </ClayForm>
          </ClayCard.Description>
          <div className="btn-group">
            <div className="btn-group-item">
              <ClayButton onClick={e => cancel()} displayType="secondary">{"Cancelar"}</ClayButton>
            </div>
            <div className="btn-group-item">
              <ClayButton onClick={e => save()} displayType="primary">{"Guardar"}</ClayButton>
            </div>
          </div>
        </ClayCard.Body>
      </ClayCard>
    );
  }

export default ProvinciaForm;