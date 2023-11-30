import ClayButton, { ClayButtonWithIcon } from '@clayui/button';
import { ClayCheckbox } from '@clayui/form';
import ClayTable from '@clayui/table';
import React from "react";
import { spritemap } from '../../includes/LiferayFunctions';
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
            <ClayTable.Head>
                <ClayTable.Row> <ClayTable.Cell headingCell><ClayCheckbox checked={false} onChange={() =>console.log("lalala")} /> </ClayTable.Cell>
                <ClayTable.Cell headingCell>{"Nombre"}</ClayTable.Cell>
                <ClayTable.Cell headingCell>{"CP"}</ClayTable.Cell>
                <ClayTable.Cell expanded headingCell>{Liferay.Language.get("Localidad")}</ClayTable.Cell>
                <ClayTable.Cell headingCell>{ Liferay.Language.get("Acciones")}</ClayTable.Cell>
                </ClayTable.Row>
            </ClayTable.Head>
            <ClayTable.Body>
                { reducer.items.map( (item,index) => { return(
                <>
                <ClayTable.Row key={item.id} >
                <ClayTable.Cell><ClayCheckbox checked={false} onChange={() =>console.log("lalala")} />
                </ClayTable.Cell>
                <ClayTable.Cell>{item.nombre}</ClayTable.Cell>
                <ClayTable.Cell>{item.cp}</ClayTable.Cell>
                <ClayTable.Cell headingTitle>{ item.localidad}</ClayTable.Cell>
                <ClayTable.Cell>
                    <div className="btn-toolbar pull-right">
                            <ClayButtonWithIcon
                                onClick={ () =>  centrosHandle({type: CENTROS_ACTIONS.SELECT_ITEM,index: index})}
                                displayType="secondary"
                                spritemap={spritemap}
                                aria-label="Edit"
                                symbol="pencil"
                                title="Edit"
                            />
                            <ClayButtonWithIcon
                                className='ml-1'
                                onClick={ () => centrosHandle({type: CENTROS_ACTIONS.DELETE, index:index}) }
                                displayType="danger"
                                spritemap={spritemap}
                                aria-label="Delete"
                                symbol="trash"
                                title="Delete"
                            />
                    </div>
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
