import React from 'react';

export const Fileinput = ({ itemsHandle, field, item }) => {
    //if (item == null)
    //    return (<>Cargando</>)

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

