import ClayButton, { ClayButtonWithIcon } from '@clayui/button';
import ClayForm, { ClayCheckbox, ClayInput, ClaySelect } from '@clayui/form';
import ClayIcon, { ClayIconSpriteContext } from '@clayui/icon';
import ClayModal, { useModal } from '@clayui/modal';
import ClayTable from '@clayui/table';
import ClayUpperToolbar from '@clayui/upper-toolbar';
import React, { useState } from "react";
import { Liferay } from '../../common/services/liferay/liferay';
import { getLanguageId, spritemap } from '../LiferayFunctions';
import { RenderFormFields } from '../interface/RenderFormFields';
import { SUBTABLE_ACTIONS } from "../reducers/subtable.reducer";
import { MiniPaginator } from "./MiniPaginator";

const DoubleTable = ({ data, handler, editUrl, backUrl, ancestorId }) => {
    const { observer, onOpenChange, open } = useModal();

    let lang = getLanguageId();
    //const backUrl = '/proyectos';
    const [showSearch, setShowSearch] = useState(false);

    const changePage = (page) => {
        handler({ type: SUBTABLE_ACTIONS.SETPAGE, page: page });
    }

    const changePageSearch = (page) => {
        handler({ type: SUBTABLE_ACTIONS.SETPAGESEARCH, page: page });
    }

    if (!data.items)
        return (<div>{Liferay.Language.get('Cargando')}</div>)

    return (
        <>

            {open && (
                <ClayForm className="sheet">
                    <ClayModal
                        observer={observer}
                        size="lg"
                        spritemap={spritemap}
                        status="info"
                    >
                        <ClayModal.Header>{data.form.title}</ClayModal.Header>
                        <ClayModal.Body>

                            <RenderFormFields
                                itemsHandle={handler}
                                items={data}
                            />

                        </ClayModal.Body>
                        <ClayModal.Footer
                            last={
                                <ClayButton.Group spaced>
                                    <ClayButton
                                        displayType="secondary"
                                        onClick={() => onOpenChange(false)}
                                    >
                                        {Liferay.Language.get("Cancel")}
                                    </ClayButton>
                                    <ClayButton onClick={() => {
                                        handler({ type: SUBTABLE_ACTIONS.SAVE });
                                        onOpenChange(false);
                                    }}>
                                        {Liferay.Language.get("Guardar")}
                                    </ClayButton>
                                </ClayButton.Group>
                            }
                        />
                    </ClayModal>
                </ClayForm>
            )}

            {(data.status === "list") &&
                <>
                    <ClayUpperToolbar key={"toolbarTop"}>
                        <ClayUpperToolbar.Item className="text-left">
                            <label htmlFor="basicInput">{Liferay.Language.get("Candidatos")}</label>
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
                                        name={"tableTopSearch"}
                                        value={data.search}
                                        onChange={e => handler({ type: SUBTABLE_ACTIONS.SETSEARCH, value: e.target.value })}>
                                    </ClayInput>
                                </ClayUpperToolbar.Item>
                                <ClayUpperToolbar.Item className="text-left">
                                    <ClaySelect aria-label="Select Label"
                                        id={"tableTopSearchField"}
                                        name={"tableTopSearchField"}
                                        key={"tableTopSearchField"}
                                        onChange={evt => handler({ type: SUBTABLE_ACTIONS.SETSEARCHFIELD, value: evt.target.value })}
                                        value={data.form.searchField} >
                                        {data.form.searchFields.map(searchitem => (
                                            <ClaySelect.Option
                                                key={"tableTop" + searchitem}
                                                label={data.form.fields[searchitem].label}
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
                            <ClayTable key="TableTop">
                                <caption>{Liferay.Language.get("Buscando")}</caption>
                                <ClayTable.Head>
                                    <ClayTable.Row key={"tabletoptitles"}>
                                        <ClayTable.Cell key={"tableTopcheck"} headingCell><ClayCheckbox checked={data.checkAll} onChange={() => handler({ type: SUBTABLE_ACTIONS.CHECKALLSEARCH })} />
                                        </ClayTable.Cell>
                                        {data.form.table.map(column => (<ClayTable.Cell headingCell key={"top"+column.columnTitle}>{column.columnTitle}</ClayTable.Cell>))}
                                        <ClayTable.Cell key={"table-top_accines"} className='table-cell-minw-100'>
                                            {"Acciones"}
                                        </ClayTable.Cell>
                                    </ClayTable.Row>
                                </ClayTable.Head>
                                <ClayTable.Body>
                                    {data.searchItems.map((item, index) => {
                                        return (
                                            <>
                                                <ClayTable.Row key={"ktop-" + index}>
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
                                                                    return (<ClayTable.Cell key={"ttop" + item.id + column.columnName} > {item[column.columnName][lang]} </ClayTable.Cell>)
                                                                case "string":
                                                                    return (<ClayTable.Cell key={"ttop" + item.id + column.columnName}>{item[column.columnName]}</ClayTable.Cell>)
                                                                case "select":
                                                                    let aa = "";
                                                                    if (item[column.columnName] === undefined || item[column.columnName] === null)
                                                                        aa = "ND";
                                                                    else {
                                                                        let arr = data.form.fields[column.columnName].options.filter(i => i.value == item[column.columnName].toString());
                                                                        if (arr.length > 0)
                                                                            aa = arr[0].label;
                                                                        else
                                                                            aa = "ND";
                                                                    }
                                                                    return (<ClayTable.Cell key={"ttop" + item.id + column.columnName}>{aa} </ClayTable.Cell>)
                                                                case "boolean":
                                                                    return (<ClayTable.Cell  key={"ttop" + item.id + column.columnName}>
                                                                        {<ClayCheckbox checked={item[column.columnName]} disabled />}
                                                                    </ClayTable.Cell>)
                                                            }
                                                            <ClayTable.Cell headingCell key={"ttop" + item.id + column.columnName}>{item[column.columnName]}</ClayTable.Cell>
                                                        })
                                                    }

                                                    <ClayTable.Cell key={"acciones_top" + item.id}>
                                                        <div className="btn-toolbar pull-right">
                                                            <ClayButtonWithIcon
                                                                aria-label={Liferay.Language.get("Seleccionar")}
                                                                key={"toSel-" + item.id}
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
                                key={"paginatorbottom"}
                                pagination={data.paginationSearch}
                                changePage={changePageSearch}
                            />

                            <ClayButton displayType="primary" onClick={() => handler({ type: SUBTABLE_ACTIONS.SELECT_ITEMS })}>
                                {Liferay.Language.get("Seleccionar")}
                            </ClayButton>
                            {/* */}
                        </>
                    }

                    <hr className="hr hr-blurry" />

                    <ClayUpperToolbar key={"toolbarBottom"}>
                        <ClayUpperToolbar.Item className="text-left">
                        </ClayUpperToolbar.Item>
                        <>
                            <ClayUpperToolbar.Item className="text-left">
                                {data.form.fields[data.form.searchFieldMain].type === "select" &&
                                    <>
                                        {
                                            <ClaySelect aria-label="Select Label"
                                                id={"searchBottonField"}
                                                name={"searchBottonField"}
                                                key={"searchBottonField"}
                                                value={data.search2}
                                                onChange={e => { handler({ type: SUBTABLE_ACTIONS.SETSEARCH, value: e.target.value, table: 1 }) }}>
                                                {data.form.fields[data.form.searchFieldMain].options.map(field => (
                                                    <ClaySelect.Option
                                                        key={field.key}
                                                        label={field.label}
                                                        value={field.value}
                                                    />
                                                ))}
                                            </ClaySelect>
                                        }
                                    </>
                                }
                                {
                                    data.form.fields[data.form.searchFieldMain].type == "text" &&
                                    <ClayInput
                                        placeholder={"Buscar..."}
                                        type="text"
                                        name={"searchBottonValue"}
                                        key={"searchBottonValue"}
                                        value={data.search2}
                                        onChange={e => {
                                            handler({ type: SUBTABLE_ACTIONS.SETSEARCH, value: e.target.value, table: 1 });
                                        }}>
                                    </ClayInput>
                                }
                            </ClayUpperToolbar.Item>
                            <ClayUpperToolbar.Item className="text-left">
                                <ClaySelect aria-label="Select Label"
                                    id={"searchBottonSelect"}
                                    name={"searchBottonSelect"}
                                    key={"searchBottonSelect"}
                                    onChange={evt => handler({ type: SUBTABLE_ACTIONS.SETSEARCHFIELD, value: evt.target.value, table: 1 })}
                                    value={data.form.searchFieldMain} >
                                    {data.form.searchFieldsMain.map(searchitem => (
                                        <ClaySelect.Option
                                            key={"botSelSearch" + data.form.title + searchitem}
                                            label={data.form.fields[searchitem].label}
                                            value={searchitem}
                                        />
                                    ))}
                                </ClaySelect>
                            </ClayUpperToolbar.Item>

                            <ClayUpperToolbar.Item className="text-left" expand>
                                <ClayButtonWithIcon
                                    aria-label={Liferay.Language.get("Buscar")}
                                    spritemap={spritemap}
                                    symbol="search-plus"
                                    title="Search"
                                    onClick={() => {
                                        handler({ type: SUBTABLE_ACTIONS.ADD_FILTER, name: "clase", value: "lalala", table: 1 })
                                        //handler({ type: SUBTABLE_ACTIONS.LOAD });
                                    }}
                                />
                            </ClayUpperToolbar.Item>
                        </>
                    </ClayUpperToolbar>


                    <ClayIconSpriteContext.Provider value={spritemap}>
                        {
                        data.filters.length > 0 &&
                        <nav className="tbar tbar-inline-md-down subnav-tbar subnav-tbar-primary">
                            <div className="container-fluid container-fluid-max-xl">
                                <ul className="tbar-nav tbar-nav-wrap">
                                    <li className="tbar-item">
                                        <div className="tbar-section">
                                            <span className="component-text text-truncate-inline">
                                                <span className="text-truncate"></span>
                                            </span>
                                        </div>
                                    </li>

                                    {
                                        data.filters.map(x => (
                                            <li className="tbar-item tbar-item-exand">
                                                <div className="tbar-section">
                                                    <span className="label label-dismissible component-label tbar-label">
                                                        <span className="label-item label-item-expand">
                                                            <div className="label-section">Filtro: <strong>{x.name} {x.value}</strong></div>
                                                        </span>
                                                        <span className="label-item label-item-after">
                                                            <ClayIcon
                                                                symbol="times"
                                                                onClick={() => handler({ type: SUBTABLE_ACTIONS.REMOVE_FILTER, fieldname: x.name })}
                                                            />
                                                        </span>
                                                    </span>
                                                </div>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </nav>
                        }

                    </ClayIconSpriteContext.Provider>
                    <ClayTable key="TableBottom">
                        <ClayTable.Head>
                            <ClayTable.Row  key={"tablebottomtitles"}>
                                <ClayTable.Cell  key={"tablebottomchecks"} headingCell><ClayCheckbox checked={data.checkAll} onChange={() => handler({ type: SUBTABLE_ACTIONS.CHECKALL })} />
                                </ClayTable.Cell>
                                {data.form.table.map(column => (<ClayTable.Cell headingCell key={"bottonTitle"+column.columnTitle}>{column.columnTitle}</ClayTable.Cell>))}
                                <ClayTable.Cell key={"tablebottomacciones"} className='table-cell-minw-100'>
                                    {"Acciones"}
                                </ClayTable.Cell>
                            </ClayTable.Row>
                        </ClayTable.Head>
                        <ClayTable.Body key={"tablebottombody"}>
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
                                                            return (<ClayTable.Cell key={"tbot" + index + column.columnName}> {item[column.columnName][lang]} </ClayTable.Cell>)
                                                        case "string":
                                                            return (<ClayTable.Cell key={"tbot" + index + column.columnName}>{item[column.columnName]}</ClayTable.Cell>)
                                                        case "select":
                                                            let aa = "";
                                                            if (item[column.columnName] === undefined || item[column.columnName] === null)
                                                                aa = "ND";
                                                            else {
                                                                let arr = data.form.fields[column.columnName].options.filter(i => i.value == item[column.columnName].toString());
                                                                if (arr.length > 0)
                                                                    aa = arr[0].label;
                                                                else
                                                                    aa = "ND";
                                                            }
                                                            return (<ClayTable.Cell key={"tbot" + index + column.columnName}>{aa} </ClayTable.Cell>)
                                                        case "boolean":
                                                            return (<ClayTable.Cell key={column.columnName + item.id}>
                                                                {<ClayCheckbox checked={item[column.columnName]} disabled />}
                                                            </ClayTable.Cell>)
                                                    }
                                                    <ClayTable.Cell headingCell key={"tbot" + index + column.columnName}>{item[column.columnName]}</ClayTable.Cell>
                                                })
                                            }

                                            <ClayTable.Cell>
                                                <div className="btn-toolbar pull-right">
                                                    {data.form.tableOptions !== undefined && data.form.tableOptions.editButton &&
                                                        <ClayButtonWithIcon
                                                            aria-label={Liferay.Language.get("Editar")}
                                                            key={"edit-" + item.id}
                                                            spritemap={spritemap}
                                                            symbol="pencil"
                                                            title="Edit"
                                                            displayType="secondary"
                                                            onClick={() => {
                                                                handler({ type: SUBTABLE_ACTIONS.EDIT_ITEM, index: index });
                                                                onOpenChange(true);
                                                            }}
                                                        />
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
                        key={"paginatorbottom"}
                        pagination={data.pagination}
                        changePage={changePage}
                    />
                </>
            }
        </>
    );
}

export default DoubleTable;