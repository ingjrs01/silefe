import Button from '@clayui/button';
import { ClayInput } from '@clayui/form';
import React from 'react';
import { ITEMS_ACTIONS } from '../../reducers/main.reducer';

export const Fileinput = ({ itemsHandle, field, item }) => {
    //if (item == null)
    //    return (<>Cargando</>)

    console.log("Esto es la entrada de un fichero");
    return (
        <>
            {/*<label htmlFor="basicInput" key={"label" + field.name}>{field.label}</label>*/}

            <div className="form-group" key={"gf" + field.key} >
                <label className="sr-only" for="inputFile" key={"fi" + field.key}>FILE UPLOAD</label>

                <input 
                    id="inputFile" 
                    key={"inf" + field.key} 
                    type="file" 
                    onChange={(e) => {
                    //itemsHandle({ type: ITEMS_ACTIONS.SET, fieldname: it, value: e.target.files[0] });
                    console.log("se cambia el fichero");
                    } } />
                    
                <label className="sr-only" for="inputFile" key={"fi" + field.key}>Título</label>
                <ClayInput
                  placeholder={field.placeholder}
                  type="text"
                  name={field.name}
                  id={field.name}
                  key={field.key}
                  value={item}
                  onChange={e => {
                    //validate(e.target.name, e.target.value, field, itemsHandle);
                    itemsHandle({ type: ITEMS_ACTIONS.SET, fieldname: e.target.name, value: e.target.value });
                  }}>
                </ClayInput>
                
                <Button>Añadir</Button>
            </div>
            {/*
                                
            <ClayButton
                size={"xs"}
                displayType={"secondary"}
                key={"add" + field.name}
                onClick={evt => itemsHandle({ type: ITEMS_ACTIONS.ADD_MULTIFIELD, fieldname: field.name })} >
                {Liferay.Language.get("Añadir")}
            </ClayButton>
                                */}
        </>
    )

}

