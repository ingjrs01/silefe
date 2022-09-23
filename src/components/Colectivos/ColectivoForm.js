import React from "react";
import ClayForm, { ClayInput } from '@clayui/form';
import ClayCard from "@clayui/card";
import ClayButton from '@clayui/button';

const spritemap = '/icons.svg';

const ColectivoForm = ({ setItem, item, cancel, save }) => {

  return (
    <ClayCard>
      <ClayCard.Body>
        <ClayCard.Description displayType="title">
          {"Card Title"}
        </ClayCard.Description>
        <ClayForm>
          <ClayForm.Group className="hs-success">
            <label htmlFor="basicInput">Código</label>
            <ClayInput placeholder="Código" type="text" name="codigo" value={item.codigo} onChange={e => { setItem({ ...item, codigo: e.target.value }) }}></ClayInput>
          </ClayForm.Group>
          <ClayForm.Group className="hs-warning">
            <label htmlFor="basicInput">Descripción</label>
            <textarea className="form-control" placeholder="Descripción" name="descripcion" value={item.descripcion} onChange={e => { setItem({ ...item, descripcion: e.target.value }) }}></textarea>
          </ClayForm.Group>
        </ClayForm>
        <ClayCard.Description truncate={false} displayType="text">
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

export default ColectivoForm;