import React, {useState} from "react";
import ClayForm, {ClayInput} from '@clayui/form';

const spritemap = '/icons.svg';

const ProvinciaForm = ({setItem, item}) => {

    return (
      <ClayForm>
        <ClayForm.Group className="hs-success">
          <label htmlFor="basicInput">Código</label>
          <ClayInput placeholder="Código" type="text" name="codigo" value={item.id} onChange={ e => { setItem({...item,id:e.target.value})} }></ClayInput>
        </ClayForm.Group>

        <ClayForm.Group className="hs-warning">
          <label htmlFor="basicInput">Nombre</label>
          <textarea className="form-control" placeholder="Descripción" name="descripcion" value={item.nombre} onChange={ e => {setItem({...item,nombre:e.target.value})}}></textarea>
        </ClayForm.Group>

      </ClayForm>
    );
  }

export default ProvinciaForm;