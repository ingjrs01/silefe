import React from "react";
import { ClayCheckbox } from '@clayui/form';
import ClayTable from '@clayui/table';
import ClayButton from '@clayui/button';
import { EXPERIENCIA_ACTIONS } from "../../includes/reducers/experiencias.reducer";
import { ExperienciaForm } from "./ExperienciaForm";


const ExperienciaRender = ({experiencias,experienciasHandler,  edit}) =>  {

    console.debug(experiencias);

    if (!experiencias.items) 
        return (<div>{Liferay.Language.get('Cargando')}</div>)

    return (
        <>
        { ( experiencias.status === "list" ) &&
        <>
            <ClayTable>
            <caption>Experiencias</caption>
            <ClayTable.Head>
                <ClayTable.Row>
                <ClayTable.Cell headingCell><ClayCheckbox checked={false} onChange={() =>console.log("lalala")} />
                </ClayTable.Cell>
                <ClayTable.Cell headingCell>{"Inicio"}</ClayTable.Cell>
                <ClayTable.Cell headingCell>{"Fin"}</ClayTable.Cell>
                <ClayTable.Cell expanded headingCell>{Liferay.Language.get("Puesto")}</ClayTable.Cell>
                <ClayTable.Cell headingCell>{"Acciones"}</ClayTable.Cell>
                </ClayTable.Row>
            </ClayTable.Head>
            <ClayTable.Body>
                { experiencias.items.map( (item,index) => { return(
                <>
                <ClayTable.Row>
                <ClayTable.Cell><ClayCheckbox checked={false} onChange={() =>console.log("lalala")} />
                </ClayTable.Cell>
                <ClayTable.Cell>{item.ini}</ClayTable.Cell>
                <ClayTable.Cell>{item.fin}</ClayTable.Cell>
                <ClayTable.Cell headingTitle>{ item.puesto}</ClayTable.Cell>
                <ClayTable.Cell>
                    <ClayButton onClick={e => {
                        experienciasHandler({type: EXPERIENCIA_ACTIONS.SELECT_ITEM , index:index});
                    }} 
                    displayType="secondary">{"E"} 
                    </ClayButton>
                    <ClayButton onClick={e => {
                        experienciasHandler({type:EXPERIENCIA_ACTIONS.DELETE_ITEM,index:index});
                    }} 
                    displayType="danger">{"B"} 
                    </ClayButton>
                </ClayTable.Cell>
                </ClayTable.Row>
                </> 
                );})}

            </ClayTable.Body>
            </ClayTable>
            <ClayButton onClick={e => { 
                //edit(-1);
                experienciasHandler({type: EXPERIENCIA_ACTIONS.NEW_ITEM})
            }} 
            displayType="primary">{Liferay.Language.get('Nuevo')} 
            </ClayButton>
            </>
        }

        {
            (experiencias.status === 'edit') &&  
            
            <ExperienciaForm
                experiencias={experiencias}
                experienciasHandler={experienciasHandler}
            />
            
        }

        </>
      
    );
}

export default ExperienciaRender;