import React,{useState} from "react";
import ClayForm, {ClayInput} from '@clayui/form';

const spritemap = '/icons.svg';

const CnoForm = ({setItem, item, show}) => {
    const [vis,setVis] = useState(false);

    const clicke = (e) => {
      e.preventDefault();
      console.log("lalala");
      setVis(!vis);
    }

    return (
      <ClayForm active={vis}>
        <ClayForm.Group className="hs-success">
          <label htmlFor="basicInput">Identificador</label>
          <ClayInput placeholder="Identificador" type="text" name="id" value={item.id} onChange={ e => { setItem({...item,id:e.target.value})} }></ClayInput>
        </ClayForm.Group>

        <ClayForm.Group className="hs-success" active={vis}>
          <label htmlFor="basicInput">Código</label>
          <ClayInput placeholder="Código" type="text" name="codigo" value={item.codigo} onChange={ e => { setItem({...item,codigo:e.target.value})} }></ClayInput>
        </ClayForm.Group>

        <ClayForm.Group className="hs-warning">
          <label htmlFor="basicInput">Descripción</label>
          <textarea className="form-control" placeholder="Descripción" name="descripcion" value={item.descripcion} onChange={ e => {setItem({...item,descripcion:e.target.value})}}></textarea>
        </ClayForm.Group>

        <button onClick={e => clicke(e)}>lalala</button>

      </ClayForm>
    );
  }

export default CnoForm;