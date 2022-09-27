import React, {useState} from "react";
import ClayForm, {ClayInput} from '@clayui/form';
import ClayCard from "@clayui/card";
import ClayButton from '@clayui/button';

const spritemap = '/icons.svg';

const DefaultForm = ({form, setItem, item, cancel, save}) => {

    return (
      <ClayCard>
        <ClayCard.Body>
          <ClayCard.Description displayType="title">
            <h2>{form.title}</h2>
          </ClayCard.Description>

          <ClayCard.Description truncate={false} displayType="text">
            <ClayForm>

              { form.rows.map( row => {
                return (
              <ClayForm.Group className="hs-success" key={row.key} >
                <label htmlFor="basicInput">{row.label}</label>
                <ClayInput placeholder={row.placeholder} type="text" name="codigo" value={item.codigo} onChange={e => { setItem({ ...item, codigo: e.target.value }) }}></ClayInput>
              </ClayForm.Group>

                )
              })}


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

export default DefaultForm;