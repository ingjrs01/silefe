import ClayButton, { ClayButtonWithIcon } from '@clayui/button';
import { ClayCheckbox } from '@clayui/form';
import ClayTable from '@clayui/table';
import React from "react";
import { Liferay } from '../../common/services/liferay/liferay';
import { spritemap } from '../../includes/LiferayFunctions';
//import { CENTROS_ACTIONS } from "../../includes/reducers/centros.reducer";
import RenderFields from '../../includes/interface/RenderFields';
import { REDUCER_ACTIONS } from '../../includes/reducers/actions';

const CentrosRender = ({reducer,centrosHandle}) =>  {

    const rows = reducer.fields.rows;

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
                                onClick={ () =>  centrosHandle({type: REDUCER_ACTIONS.SELECT_ITEM,index: index})}
                                displayType="secondary"
                                spritemap={spritemap}
                                aria-label="Edit"
                                symbol="pencil"
                                title="Edit"
                            />
                            <ClayButtonWithIcon
                                className='ml-1'
                                onClick={ () => centrosHandle({type: REDUCER_ACTIONS. DELETE_ITEM, index:index}) }
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
            <ClayButton onClick={ () => centrosHandle({type: REDUCER_ACTIONS.NEW_ITEM}) }
                displayType="primary">{Liferay.Language.get('Nuevo')}
            </ClayButton>
            </>
        }

        {
            (reducer.status === 'edit') &&
            <>
            <RenderFields
                rows={rows}
                itemsHandle={centrosHandle}
                items={reducer}
                plugin={"lalala"}
            />
            <div className="btn-group">
                <div className="btn-group-item">
                    <ClayButton onClick={e => centrosHandle({ type: REDUCER_ACTIONS.CANCEL })} displayType="secondary">{Liferay.Language.get('Cancelar')}</ClayButton>
                </div>
                <div className="btn-group-item">
                    <ClayButton onClick={() => centrosHandle({ type: REDUCER_ACTIONS.SAVE })} displayType="primary">{Liferay.Language.get('Guardar')}</ClayButton>
                </div>
            </div>
        </>
            
        }

        </>
    );
}

export default CentrosRender;
