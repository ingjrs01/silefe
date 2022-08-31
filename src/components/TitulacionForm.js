import React, {useState} from "react";
import ClayForm, {ClayInput} from '@clayui/form';

const spritemap = '/icons.svg';

const TitulacionForm = ({setItem, item}) => {
    //const [active, setActive] = useState(false);

    //function handleCodigo(e) {
    //    console.log("cambiando el codigo");
    //    
    //    console.log(e.target);
    //    console.log(e.target.name);
    //    console.log(e.target.value);
    //    //setState(e.target.value); 
    //    setItem({...item,[e.target.name]:e.target.value})
    //}

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

export default TitulacionForm;