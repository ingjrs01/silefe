import React from "react";
import { ClayCheckbox } from '@clayui/form';
import ClayTable from '@clayui/table';
import ClayButton from '@clayui/button';
import { CENTROS_ACTIONS } from "../../includes/reducers/centros.reducer";
import { CentrosForm } from "./CentrosForm";

const CentrosRender = ({reducer,centrosHandle}) =>  {
    if (!reducer.items) 
        return (<div>{Liferay.Language.get('Cargando')}</div>)

    return (
        <>
        { ( reducer.status === "list" ) &&
        <>
            <ClayTable>
            <caption>{Liferay.Language.get("Centros")}</caption>
            <ClayTable.Head>
                <ClayTable.Row>
                <ClayTable.Cell headingCell><ClayCheckbox checked={false} onChange={() =>console.log("lalala")} />
                </ClayTable.Cell>
                <ClayTable.Cell headingCell>{"Nombre"}</ClayTable.Cell>
                <ClayTable.Cell headingCell>{"Fin"}</ClayTable.Cell>
                <ClayTable.Cell expanded headingCell>{Liferay.Language.get("Puesto")}</ClayTable.Cell>
                <ClayTable.Cell headingCell>{"Acciones"}</ClayTable.Cell>
                </ClayTable.Row>
            </ClayTable.Head>
            <ClayTable.Body>
                { reducer.items.map( (item,index) => { return(
                <>
                <ClayTable.Row>
                <ClayTable.Cell><ClayCheckbox checked={false} onChange={() =>console.log("lalala")} />
                </ClayTable.Cell>
                <ClayTable.Cell>{item.nombre}</ClayTable.Cell>
                <ClayTable.Cell>{item.cp}</ClayTable.Cell>
                <ClayTable.Cell headingTitle>{ item.provinciaId}</ClayTable.Cell>
                <ClayTable.Cell>
                    <ClayButton onClick={ () =>  centrosHandle({type: CENTROS_ACTIONS.SELECT_ITEM,index: index})} 
                    displayType="secondary">{"E"} 
                    </ClayButton>
                    <ClayButton onClick={ () => centrosHandle({type: CENTROS_ACTIONS.DELETE, index:index}) } 
                    displayType="danger">{"B"} 
                    </ClayButton>
                </ClayTable.Cell>
                </ClayTable.Row>
                </> 
                );})}

            </ClayTable.Body>
            </ClayTable>
            <ClayButton onClick={ () => centrosHandle({type: CENTROS_ACTIONS.NEW_ITEM}) } 
                displayType="primary">{Liferay.Language.get('Nuevo')} 
            </ClayButton>
            </>
        }

        {
            (reducer.status === 'edit') &&  
            
            <CentrosForm 
                reducer={reducer}
                centrosHandle={centrosHandle}
            /> 
            
        }

        </>
      
    );
}

export default CentrosRender;