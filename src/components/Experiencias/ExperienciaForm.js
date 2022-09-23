import React, { useState } from "react";
import ClayForm, { ClayInput } from '@clayui/form';
import ClayCard from "@clayui/card";
import ClayButton from '@clayui/button';

const spritemap = '/icons.svg';

const ExperienciaForm = ({ setItem, item,save,cancel }) => {

  return (
    <ClayCard>
      <ClayCard.Body>
        <ClayCard.Description displayType="title">
          {"Card Title"}
        </ClayCard.Description>
        <ClayCard.Description truncate={false} displayType="text">
          <ClayForm>
            <ClayForm.Group className="hs-success">
              <label htmlFor="basicInput">ID</label>
              <ClayInput placeholder="Identificador" type="text" name="id" value={item.id} onChange={e => { setItem({ ...item, id: e.target.value }) }}></ClayInput>
            </ClayForm.Group>
            <ClayForm.Group className="hs-warning">
              <label htmlFor="basicInput">Descripción</label>
              <textarea className="form-control" placeholder="Descripción" name="descripcion" value={item.descripcion} onChange={e => { setItem({ ...item, descripcion: e.target.value }) }}></textarea>
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

export default ExperienciaForm;