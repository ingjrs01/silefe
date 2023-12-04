import ClayButton, { ClayButtonWithIcon } from '@clayui/button';
import { ClayCheckbox } from '@clayui/form';
import ClayTable from '@clayui/table';
import React from "react";
import { spritemap } from '../../includes/LiferayFunctions';
import { EXPERIENCIA_ACTIONS } from "../../includes/reducers/experiencias.reducer";
import { ExperienciaForm } from "./ExperienciaForm";

export const ExperienciasRender = ({experiencias,experienciasHandler}) =>  {
    if (!experiencias.items) 
        return (<div>{Liferay.Language.get('Cargando')}</div>)

    return (
        <>
        { ( experiencias.status === "list" ) &&
        <>
            <ClayTable>
            <ClayTable.Head>
                <ClayTable.Row>
                <ClayTable.Cell headingCell><ClayCheckbox checked={false} />
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
                <ClayTable.Cell><ClayCheckbox checked={false} />
                </ClayTable.Cell>
                <ClayTable.Cell>{item.ini}</ClayTable.Cell>
                <ClayTable.Cell>{item.fin}</ClayTable.Cell>
                <ClayTable.Cell headingTitle>{ item.puesto}</ClayTable.Cell>
                <ClayTable.Cell>
                    <ClayButtonWithIcon 
                        onClick={e => {
                            experienciasHandler({type: EXPERIENCIA_ACTIONS.SELECT_ITEM , index:index});
                        }} 
                        displayType="secondary"
                        spritemap={spritemap}
                        symbol="pencil"
                        title="Edit"
                    />
                    <ClayButtonWithIcon 
                        className='ml-1'
                        onClick={e => experienciasHandler({type:EXPERIENCIA_ACTIONS.DELETE_ITEM,index:index}) }
                        displayType="danger"
                        spritemap={spritemap}
                        symbol="trash"
                        title="Close"
                    />
                    
                </ClayTable.Cell>
                </ClayTable.Row>
                </> 
                );})}

            </ClayTable.Body>
            </ClayTable>
            <ClayButton onClick={e => { 
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
