import ClayButton, { ClayButtonWithIcon } from '@clayui/button';
import { ClayCheckbox, ClayInput, ClaySelect } from '@clayui/form';
import ClayIcon from '@clayui/icon';
import ClayTable from '@clayui/table';
import ClayUpperToolbar from '@clayui/upper-toolbar';
import React, { useState } from "react";
import { Liferay } from '../../common/services/liferay/liferay';
import { getLanguageId, spritemap } from '../../includes/LiferayFunctions';
import { MiniPaginator } from "../../includes/interface/MiniPaginator";
import { SUBTABLE_ACTIONS } from "../../includes/reducers/subtable.reducer";

const AccionesTable = ({ data, handler, editUrl, backUrl, ancestorId }) => {
    let lang = getLanguageId();
    //const backUrl = '/proyectos';
    const [showSearch, setShowSearch] = useState(false);

    const changePage = (page) => {
        handler({type: SUBTABLE_ACTIONS.SETPAGE,page:page});
    }

    const changePageSearch = (page) => {
        handler({type: SUBTABLE_ACTIONS.SETPAGESEARCH,page:page});
    }

    if (!data.items)
        return (<div>{Liferay.Language.get('Cargando')}</div>)
    return (
        <>
            {(data.status === "list") &&
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
                                    handler({ type: SUBTABLE_ACTIONS.LOAD });
                                    setShowSearch(!showSearch);
                                }}
                            />
                        </ClayUpperToolbar.Item>
                        {showSearch &&
                            <>
                                <ClayUpperToolbar.Item className="text-left">
                                    <ClayInput
                                        placeholder={"Buscar..."}
                                        type="text"
                                        name={"cif"}
                                        key={"cif"}
                                        value={data.search}
                                        onChange={e => {
                                            handler({ type: SUBTABLE_ACTIONS.SETSEARCH, value: e.target.value });
                                        }}>
                                    </ClayInput>
                                </ClayUpperToolbar.Item>
                                <ClayUpperToolbar.Item className="text-left">
                                    <ClaySelect aria-label="Select Label"
                                        id={"campo"}
                                        name={"campo"}
                                        key={"campo"}
                                        onChange={evt => handler({ type: SUBTABLE_ACTIONS.SETSEARCHFIELD, value: evt.target.value })}
                                        value={ data.form.searchField} >
                                        { data.form.searchFields.map( searchitem => (
                                            <ClaySelect.Option
                                                key={searchitem}
                                                label={ data.form.fields[searchitem].label}
                                                value={searchitem}
                                            />
                                        ))}
                                    </ClaySelect>
                                </ClayUpperToolbar.Item>

                                <ClayUpperToolbar.Item className="text-left" expand>
                                    <ClayButtonWithIcon
                                        aria-label={Liferay.Language.get("Buscar")}
                                        spritemap={spritemap}
                                        symbol="search"
                                        title="Search"
                                        onClick={() => handler({ type: SUBTABLE_ACTIONS.LOAD })}
                                    />
                                </ClayUpperToolbar.Item>
                            </>
                        }
                    </ClayUpperToolbar>
                    {/* tabla de búsqueda */}
                    {showSearch &&
                    <>
                    <ClayTable>
                        <caption>{"Buscando acciones"}</caption>
                        <ClayTable.Head>
                            <ClayTable.Row>
                                <ClayTable.Cell headingCell><ClayCheckbox checked={data.checkAll} onChange={() => handler({ type: SUBTABLE_ACTIONS.CHECKALLSEARCH })} />
                                </ClayTable.Cell>
                                {
                                    data.form.table.map(column => (
                                        <ClayTable.Cell headingCell>{column.columnTitle}</ClayTable.Cell>
                                    ))
                                }
                                <ClayTable.Cell className='table-cell-minw-100'>
                                    {"Acciones"}
                                </ClayTable.Cell>
                            </ClayTable.Row>
                        </ClayTable.Head>
                        <ClayTable.Body>
                            {data.searchItems.map((item, index) => {
                                return (
                                    <>
                                        <ClayTable.Row key={"k-" + item.id}>
                                            <ClayTable.Cell><ClayCheckbox checked={item.checked} onChange={() => handler({ type: SUBTABLE_ACTIONS.CHECKSEARCH, index: index })} />
                                            </ClayTable.Cell>
                                            {
                                                data.form.table.map(column => {
                                                    //console.log(lang);console.debug(column);
                                                    //console.log(item[column.columnName][lang]);
                                                    //console.debug(item);
                                                    //console.log("---------");
                                                    switch (column.columnType) {
                                                        case "multilang":
                                                            return (<ClayTable.Cell> {item[column.columnName][lang]} </ClayTable.Cell>)
                                                        case "string":
                                                            return (<ClayTable.Cell>{item[column.columnName]}</ClayTable.Cell>)
                                                        case "boolean":
                                                            return (<ClayTable.Cell key={column.columnName + item.id}>
                                                                {<ClayCheckbox checked={item[column.columnName]} disabled />}
                                                            </ClayTable.Cell>)
                                                    }
                                                    <ClayTable.Cell headingCell>{item[column.columnName]}</ClayTable.Cell>
                                                })
                                            }

                                            <ClayTable.Cell>
                                                <div className="btn-toolbar pull-right">
                                                    <ClayButtonWithIcon
                                                        aria-label={Liferay.Language.get("Seleccionar")}
                                                        key={"bi-" + item.id}
                                                        className="ml-1"
                                                        spritemap={spritemap}
                                                        symbol="plus"
                                                        title={Liferay.Language.get("Añadir")}
                                                        displayType="primary"
                                                        onClick={() => handler({ type: SUBTABLE_ACTIONS.SELECT_ITEM, index: index })}
                                                    />
                                                </div>
                                            </ClayTable.Cell>
                                        </ClayTable.Row>
                                    </>
                                );
                            })}

                        </ClayTable.Body>
                    </ClayTable>                    
                    <MiniPaginator
                        pagination={data.paginationSearch}
                        changePage={changePageSearch}
                    />

                <ClayButton displayType="primary" onClick={ ()=> handler({type:SUBTABLE_ACTIONS.SELECT_ITEMS})}>
				    {Liferay.Language.get("Seleccionar")}
			    </ClayButton>
                {/* */}
                    </>
                    }
                    <ClayTable>
                        <caption>{data.form.title}</caption>
                        <ClayTable.Head>
                            <ClayTable.Row>
                                <ClayTable.Cell headingCell><ClayCheckbox checked={data.checkAll} onChange={() => handler({ type: SUBTABLE_ACTIONS.CHECKALL })} />
                                </ClayTable.Cell>
                                {
                                    data.form.table.map(column => (
                                        <ClayTable.Cell headingCell>{column.columnTitle}</ClayTable.Cell>
                                    ))
                                }
                                <ClayTable.Cell className='table-cell-minw-100'>
                                    {"Acciones"}
                                </ClayTable.Cell>
                            </ClayTable.Row>
                        </ClayTable.Head>
                        <ClayTable.Body>
                            {data.items.map((item, index) => {
                                return (
                                    <>
                                        <ClayTable.Row key={"k-" + item.id}>
                                            <ClayTable.Cell><ClayCheckbox checked={item.checked} onChange={() => handler({ type: SUBTABLE_ACTIONS.CHECK, index: index })} />
                                            </ClayTable.Cell>
                                            {
                                                data.form.table.map(column => {
                                                    switch (column.columnType) {
                                                        case "multilang":
                                                            return (<ClayTable.Cell> {item[column.columnName][lang]} </ClayTable.Cell>)
                                                        case "string":
                                                            return (<ClayTable.Cell>{item[column.columnName]}</ClayTable.Cell>)
                                                        case "boolean":
                                                            return (<ClayTable.Cell key={column.columnName + item.id}>
                                                                {<ClayCheckbox checked={item[column.columnName]} disabled />}
                                                            </ClayTable.Cell>)
                                                    }
                                                    <ClayTable.Cell headingCell>{item[column.columnName]}</ClayTable.Cell>
                                                })
                                            }

                                            <ClayTable.Cell>
                                                <div className="btn-toolbar pull-right">
                                                    {/*

                                                    <Link to={{ pathname: `${editUrl}${item.id}` }} state={{ backUrl, ancestorId }}  > {
                                                    <ClayButtonWithIcon
                                                        aria-label={Liferay.Language.get("Editar")}
                                                        key={"edit-" + item.id}
                                                        spritemap={spritemap}
                                                        symbol="pencil"
                                                        title="Edit"
                                                        displayType="secondary"
                                                    />}</Link>*/
                                                    }
                                                        <ClayButtonWithIcon
                                                            aria-label={Liferay.Language.get("Quitar")}
                                                            key={"bi-" + item.id}
                                                            className="ml-1"
                                                            spritemap={spritemap}
                                                            symbol="hr"
                                                            title="Delete"
                                                            displayType="danger"
                                                            onClick={() => handler({ type: SUBTABLE_ACTIONS.DELETE_ITEM, index: index })}
                                                        />
                                                </div>
                                            </ClayTable.Cell>
                                        </ClayTable.Row>
                                    </>
                                );
                            })}

                        </ClayTable.Body>
                    </ClayTable>
                    <MiniPaginator
                        pagination={data.pagination}
                        changePage={changePage}
                    />
                </>
            }
        </>
    );
}

export default AccionesTable;