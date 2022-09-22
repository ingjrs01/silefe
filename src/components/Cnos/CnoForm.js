import React,{useState} from "react";
import ClayForm, {ClayInput} from '@clayui/form';
import ClayButton from '@clayui/button';
import ClayCard from '@clayui/card';

const spritemap = '/icons.svg';

const CnoForm = ({setItem, item, setShow}) => {

    const clicke = (e) => {
      e.preventDefault();
      console.log("lalala");
      setShow(false);
    }

    return (
      <ClayCard>
        <ClayCard.Body>
          <ClayCard.Description displayType="title">
            {"Card Title"}
          </ClayCard.Description>
          <ClayCard.Description truncate={false} displayType="text">
            <ClayForm>
              <ClayForm.Group className="hs-success">
                <label htmlFor="basicInput">Identificador</label>
                <ClayInput placeholder="Identificador" type="text" name="id" value={item.id} onChange={ e => { setItem({...item,id:e.target.value})} }></ClayInput>
              </ClayForm.Group>

              <ClayForm.Group className="hs-success">
                <label htmlFor="basicInput">Código</label>
                <ClayInput placeholder="Código" type="text" name="codigo" value={item.codigo} onChange={ e => { setItem({...item,codigo:e.target.value})} }></ClayInput>
              </ClayForm.Group>

              <ClayForm.Group className="hs-warning">
                <label htmlFor="basicInput">Descripción</label>
                <textarea className="form-control" placeholder="Descripción" name="descripcion" value={item.descripcion} onChange={ e => {setItem({...item,descripcion:e.target.value})}}></textarea>
              </ClayForm.Group>

              <ClayButton onClick={e => clicke(e)} displayType="primary">
              Mostrar
            </ClayButton>
            </ClayForm>
          </ClayCard.Description>

          <ClayButton onClick={e => clicke(e)} displayType="danger">{"Cancelar"}</ClayButton>
          <ClayButton onClick={e => clicke(e)} displayType="primary">{"Guardar"}</ClayButton>

        </ClayCard.Body>
      </ClayCard>
    );
  }

export default CnoForm;