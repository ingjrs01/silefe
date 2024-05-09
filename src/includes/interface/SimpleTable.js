import ClayButton, { ClayButtonWithIcon } from '@clayui/button';
import { ClayCheckbox } from '@clayui/form';
import ClayTable from '@clayui/table';
//import { default as React, default as React } from "react";
import { Liferay } from '../../common/services/liferay/liferay'; //  '../common/services/liferay/liferay';
import { getLanguageId, spritemap } from '../LiferayFunctions';
import { REDUCER_ACTIONS } from '../reducers/actions';
import RenderFields from './RenderFields';
import { SearchBar } from './SearchBar';

export const SimpleTable = ({ reducer, handler }) => {
    const rows = reducer.fields.rows;
    let lang = getLanguageId();

    if (!reducer.items)
        return (<div>{Liferay.Language.get('Cargando')}</div>)

    return (
        <>
          {reducer.fields.showSearchBar !== undefined && reducer.fields.showSearchBar &&        
            <SearchBar
                itemsHandle={handler}
                items={reducer}
            />            
         
            }
            {(reducer.status === "list") &&
                <>
                    <ClayTable>
                        <ClayTable.Head>
                            <ClayTable.Row key={"tabletoptitles"}>
                                <ClayTable.Cell key={"tableTopcheck"} headingCell><ClayCheckbox checked={reducer.checkAll} onChange={() => handler({ type: REDUCER_ACTIONS.CHECKALL })} />
                                </ClayTable.Cell>
                                {reducer.fields.table.map(column => (
                                    <ClayTable.Cell headingCell key={"top" + column.columnTitle}>{column.columnTitle}</ClayTable.Cell>
                                ))}
                                <ClayTable.Cell key={"table-top_accines"} className='table-cell-minw-100'>
                                    {"Acciones"}
                                </ClayTable.Cell>
                            </ClayTable.Row>
                        </ClayTable.Head>
                        <ClayTable.Body>

                            {reducer.items.map((item, index) => {
                                return (
                                    <>
                                        <ClayTable.Row key={"ktop-" + index}>
                                            <ClayTable.Cell><ClayCheckbox checked={item.checked} onChange={() => handler({ type: REDUCER_ACTIONS.CHECK, index: index })} />
                                            </ClayTable.Cell>
                                            {
                                                reducer.fields.table.map(column => {
                                                    switch (column.columnType) {
                                                        case "multilang":
                                                            return (<ClayTable.Cell key={"ttop" + item.id + column.columnName} > {item[column.columnName][lang]} </ClayTable.Cell>)
                                                        case "string":
                                                            return (<ClayTable.Cell key={"ttop" + item.id + column.columnName}>{item[column.columnName]}</ClayTable.Cell>)
                                                        case "select":
                                                            let aa = "";
                                                            if (item[column.columnName] === undefined || item[column.columnName] === null)
                                                                aa = "ND";
                                                            else {
                                                                let arr = reducer.fields.fields[column.columnName].options.filter(i => i.value === item[column.columnName].toString());
                                                                if (arr.length > 0)
                                                                    aa = arr[0].label;
                                                                else
                                                                    aa = "ND";
                                                            }
                                                            return (<ClayTable.Cell key={"ttop" + item.id + column.columnName}>{aa} </ClayTable.Cell>)
                                                        case "boolean":
                                                            return (<ClayTable.Cell key={"ttop" + item.id + column.columnName}>
                                                                {<ClayCheckbox checked={item[column.columnName]} disabled />}
                                                            </ClayTable.Cell>)
                                                        default: 
                                                            return (<ClayTable.Cell headingCell key={"ttop" + item.id + column.columnName}>{item[column.columnName]}</ClayTable.Cell>)
                                                    }
                                                    
                                                })
                                            }
    
                                            <ClayTable.Cell key={"acciones_top" + item.id}>
                                                <div className="btn-toolbar pull-right">
                                                    <ClayButtonWithIcon
                                                        onClick={ () =>  handler({type: REDUCER_ACTIONS.SELECT_ITEM,index: index})}
                                                        displayType="secondary"
                                                        spritemap={spritemap}
                                                        aria-label="Edit"
                                                        symbol="pencil"
                                                        title="Edit"
                                                    />
                                                    <ClayButtonWithIcon
                                                        className='ml-1'
                                                        onClick={ () => handler({type: REDUCER_ACTIONS.DELETE_ITEM, index:index}) }
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
                                );
                            })}
                        </ClayTable.Body>
                    </ClayTable>
                    <ClayButton onClick={() => handler({ type: REDUCER_ACTIONS.NEW_ITEM })}
                        displayType="primary">{Liferay.Language.get('Nuevo')}
                    </ClayButton>
                </>
            }
            {
                (reducer.status === 'edit') &&
                <>
                    <RenderFields
                        rows={rows}
                        itemsHandle={handler}
                        items={reducer}
                        plugin={"lalala"}
                    />
                    <div className="btn-group">
                        <div className="btn-group-item">
                            <ClayButton onClick={e => handler({ type: REDUCER_ACTIONS.CANCEL })} displayType="secondary">{Liferay.Language.get('Cancelar')}</ClayButton>
                        </div>
                        <div className="btn-group-item">
                            <ClayButton onClick={() => handler({ type: REDUCER_ACTIONS.SAVE })} displayType="primary">{Liferay.Language.get('Guardar')}</ClayButton>
                        </div>
                    </div>
                </>
            }

        </>
    );
}
