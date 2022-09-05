import React, {useState} from "react";
import ClayForm, {ClayInput} from '@clayui/form';

const spritemap = '/icons.svg';

const ColectivoForm = ({setItem, item}) => {

    return (
      <ClayForm>
        { /*<input id="lalala" name="tiulacionId" type="hidden" value={item.id} /> */}
        <ClayForm.Group className="hs-success">
          <label htmlFor="basicInput">Código</label>
          <ClayInput placeholder="Código" type="text" name="codigo" value={item.codigo} onChange={ e => { setItem({...item,codigo:e.target.value})} }></ClayInput>
        </ClayForm.Group>

        <ClayForm.Group className="hs-warning">
          <label htmlFor="basicInput">Descripción</label>
          <textarea className="form-control" placeholder="Descripción" name="descripcion" value={item.descripcion} onChange={ e => {setItem({...item,descripcion:e.target.value})}}></textarea>
        </ClayForm.Group>

      </ClayForm>
    );
  }

export default ColectivoForm;