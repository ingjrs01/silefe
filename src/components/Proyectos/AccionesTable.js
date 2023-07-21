import React, {useState} from "react";
import ClayTable from '@clayui/table';
import ClayButton, {ClayButtonWithIcon} from '@clayui/button';
//import {ClayButtonWithIcon}, ClayButton from '@clayui/button';
import ClayToolbar from '@clayui/toolbar';
import { ClayInput, ClayCheckbox, ClaySelect } from '@clayui/form';
import { PARTICIPANTE_ACTIONS } from "../../includes/reducers/participantes.reducer";
import { SUBTABLE_ACTIONS } from "../../includes/reducers/subtable.reducer";
import ClayUpperToolbar from '@clayui/upper-toolbar';
import {getLanguageId } from   '../../includes/LiferayFunctions';
import { MiniPaginator } from "../../includes/interface/MiniPaginator";
import ClayIcon from '@clayui/icon';
import { Link } from "react-router-dom";

const spritemap = "./o/my-project/icons.svg";

const AccionesTable = ({data,handler,editUrl,backUrl}) =>  {
    let lang = getLanguageId().replace("_","-");
    //const backUrl = '/proyectos';
    const [showSearch, setShowSearch] = useState(false);
    
    if (!data.items) 
        return (<div>{Liferay.Language.get('Cargando')}</div>)

    return (
        <>
        { ( data.status === "list" ) &&
        <>
            <ClayUpperToolbar>
                <ClayUpperToolbar.Item className="text-left">
                    <label htmlFor="basicInput">{Liferay.Language.get("Buscar")}</label>
                </ClayUpperToolbar.Item>

                <ClayUpperToolbar.Item className="text-left">                    
                    <ClayIcon 
                        symbol="view" 
                        spritemap={spritemap} 
                        onClick={() => {
                            handler({type: PARTICIPANTE_ACTIONS.LOAD});
                            setShowSearch(!showSearch);
                        }} 
                    />
                </ClayUpperToolbar.Item>
                { showSearch && 
                <>
                <ClayUpperToolbar.Item className="text-left">
                    <ClayInput
                        placeholder={"Buscar..."}
                        type="text"
                        name={"cif"}
                        key={"cif"}
                        value={data.search}
                        onChange={e => {
                            handler({ type: PARTICIPANTE_ACTIONS.SETSEARCH, value: e.target.value });
                        }}>
                    </ClayInput>
                </ClayUpperToolbar.Item>
                <ClayUpperToolbar.Item className="text-left">
                    <ClaySelect aria-label="Select Label"
                        id={"campo"}
                        name={"campo"}
                        key={"campo"}
                        onChange={evt => handler({ type: PARTICIPANTE_ACTIONS.SETSEARCHFIELD, value: evt.target.value })}
                        value={ data.searchField} >                                                    
                            <ClaySelect.Option
                                key={"option-1"}
                                label={"Nombre"}
                                value={"nombre"}
                            />                            
                            <ClaySelect.Option
                                key={"option-2"}
                                label={"Apellidos"}
                                value={"apellidos"}
                            />                            
                            <ClaySelect.Option
                                key={"option-3"}
                                label={"Documento"}
                                value={"documento"}
                            />                            
                    </ClaySelect>
                </ClayUpperToolbar.Item>

                <ClayUpperToolbar.Item className="text-left" expand>
                    <ClayButtonWithIcon
                        aria-label={Liferay.Language.get("Buscar")}
                        spritemap={spritemap}
                        symbol="search"
                        title="Search"
                        onClick={() => handler({type: PARTICIPANTE_ACTIONS.LOAD})}
                    />
                </ClayUpperToolbar.Item>
                </>
                }
            </ClayUpperToolbar>
            <ClayTable>
            <caption>{ data.form.title }</caption>
            <ClayTable.Head>
                <ClayTable.Row>
                <ClayTable.Cell headingCell><ClayCheckbox checked={data.checkAll} onChange={() => handler({type: PARTICIPANTE_ACTIONS.CHECKALL})} />
                </ClayTable.Cell>
                {
                    data.form.table.map(column => (
                        <ClayTable.Cell headingCell>{ column.columnTitle }</ClayTable.Cell>
                    ))
                }
                </ClayTable.Row>
            </ClayTable.Head>
            <ClayTable.Body>
                { data.items.map( (item,index) => { return(
                <>
                <ClayTable.Row key={"k-"+item.id}>
                <ClayTable.Cell><ClayCheckbox checked={item.checked} onChange={() => handler({type: PARTICIPANTE_ACTIONS.CHECK, index: index})} />
                </ClayTable.Cell>
                {
                    data.form.table.map(column => {
                        switch (column.columnType) {
                            case "multilang":
                              return (<ClayTable.Cell> { item[column.columnName][lang] } </ClayTable.Cell> )
                            case "string":                        
                              return (<ClayTable.Cell>{ item[column.columnName] }</ClayTable.Cell> )                              
                            case "boolean": 
                              return (<ClayTable.Cell key={column.columnName + item.id}>
                                {<ClayCheckbox checked={item[column.columnName]}  disabled  />}
                              </ClayTable.Cell>)
                        }
                        <ClayTable.Cell headingCell>{ item[column.columnName] }</ClayTable.Cell>
                    })
                }

                <ClayTable.Cell>
                    <ClayToolbar>
                      <ClayToolbar.Nav>
                        <ClayToolbar.Item className="text-left">
                        <ClayButton.Group>
                            <Link to={{pathname:`${editUrl}${item.id}`}} state={{ backUrl }}  > {
                                <ClayButtonWithIcon
                                    aria-label={Liferay.Language.get("Editar")}
                                    key={"edit-"+item.id}
                                    className="nav-btn nav-btn-monospaced"
                                    spritemap={spritemap}
                                    symbol="pencil"
                                    title="editar"
                                    displayType="primary"
                                />                        
                            }  </Link>
                            <ClayButtonWithIcon
                                aria-label={Liferay.Language.get("Quitar")}
                                key={"bi-"+item.id}
                                className="nav-btn nav-btn-monospaced"
                                spritemap={spritemap}
                                symbol="minus-circle"
                                title="quitar"
                                displayType="danger"
                                onClick={ () => handler({type: PARTICIPANTE_ACTIONS.DELETE_ITEM, index: index}) }
                            />                    
                            </ClayButton.Group>
                        </ClayToolbar.Item>

                        </ClayToolbar.Nav>
                    </ClayToolbar>
                </ClayTable.Cell>
                </ClayTable.Row>
                </> 
                );})}

            </ClayTable.Body>
            </ClayTable>
            <MiniPaginator 
                items={data} 
                itemsHandle={handler} 
                ITEMS_ACTIONS={SUBTABLE_ACTIONS}
            />
            </>
        }
        </>
    );
}

export default AccionesTable;