import ClayButton, { ClayButtonWithIcon } from '@clayui/button';
import ClayCard from "@clayui/card";
import { ClayCheckbox, ClayInput } from '@clayui/form';
import ClayIcon from '@clayui/icon';
import ClayManagementToolbar from '@clayui/management-toolbar';
import ClayTable from '@clayui/table';
import React from "react";
import { Liferay } from "../../common/services/liferay/liferay";
import { getLanguageId, spritemap } from '../LiferayFunctions';
import { Dateinput } from '../interface/fields/Dateinput';
import { Hour } from '../interface/fields/Hour';
import { Select } from '../interface/fields/Select';
import { Textarea } from '../interface/fields/Textarea';
import { Textinput } from '../interface/fields/Textinput';
import { CITAS_ACTIONS, ITEMS_ACTIONS } from '../reducers/actions';
import { CITAS_STATES } from '../reducers/citas.reducer';
import { MiniPaginator } from "./MiniPaginator";

const Citas = ({ items, handler, editUrl, backUrl, ancestorId }) => {
    const lang = getLanguageId();

    const changePageSearch = (page) => {
        handler({ type: CITAS_ACTIONS.SETPAGE, page: page });
    }

    const setSearchMobile = () => {
        console.log("lalala");
    }

    if (items === undefined ) //|| items.items.length < 1)
        return (
            <div>{Liferay.Language.get("No hay elementos para mostrar")}</div>
        )
    console.log("lalala");
    console.debug(items);

    return (
        <>
            {
                <>
                    <ClayManagementToolbar>
                        <ClayManagementToolbar.ItemList>
                            <ClayManagementToolbar.Search>
                                <ClayInput.Group>
                                    <ClayInput.GroupItem>
                                        <ClayInput
                                            aria-label="Search"
                                            className="form-control input-group-inset input-group-inset-after"
                                            defaultValue=""
                                            type="text"
                                        />
                                        <ClayInput.GroupInsetItem after tag="span">
                                            <ClayButtonWithIcon
                                                aria-label="Close search"
                                                className="navbar-breakpoint-d-none"
                                                displayType="unstyled"
                                                onClick={() => setSearchMobile(false)}
                                                spritemap={spritemap}
                                                symbol="times"
                                            />
                                            <ClayButtonWithIcon
                                                aria-label="Search"
                                                displayType="unstyled"
                                                spritemap={spritemap}
                                                symbol="search"
                                                type="submit"
                                            />
                                        </ClayInput.GroupInsetItem>
                                    </ClayInput.GroupItem>
                                </ClayInput.Group>
                            </ClayManagementToolbar.Search>

                            <ClayManagementToolbar.Item>
                                <ClayButton
                                    aria-label="Info"
                                    className="nav-link nav-link-monospaced"
                                    displayType="unstyled"
                                    onClick={() => { }}
                                >
                                    <ClayIcon spritemap={spritemap} symbol="info-circle-open" />
                                </ClayButton>
                            </ClayManagementToolbar.Item>

                            <ClayManagementToolbar.Item>
                                <ClayButtonWithIcon
                                    aria-label="Add"
                                    onClick={() => handler({ type: CITAS_ACTIONS.NEW_ITEM })}
                                    className="nav-btn nav-btn-monospaced"
                                    spritemap={spritemap}
                                    symbol="plus"
                                />
                            </ClayManagementToolbar.Item>
                        </ClayManagementToolbar.ItemList>
                    </ClayManagementToolbar>
                    {
                        ( items.status === CITAS_STATES.VIEW ) &&
                        <div className="col-12">
                            <ClayCard>
                                <ClayCard.Body>
                                    <ClayCard.Description displayType="title">
                                        {Liferay.Language.get("Datos de la Cita")}
                                    </ClayCard.Description>
                                    <ClayCard.Description truncate={false} displayType="text">
                                        {
                                            <>
                                                <div className='row'>
                                                    <Select
                                                        itemsHandle={handler}
                                                        field={items.form.fields["tipoCitaId"]}
                                                        item={items.item["tipoCitaId"]}
                                                        action={CITAS_ACTIONS.SET}
                                                    />
                                                    <Dateinput
                                                        itemsHandle={handler}
                                                        field={items.form.fields["appointmentDate"]}
                                                        item={items.item["appointmentDate"]}
                                                        action={ITEMS_ACTIONS.SET}
                                                    />
                                                    <Hour
                                                        itemsHandle={handler}
                                                        field={items.form.fields["appointmentHour"]}
                                                        item={items.item["appointmentHour"]}
                                                        action={ITEMS_ACTIONS.SET}
                                                    />
                                                </div>
                                                <div className='row'>
                                                    <Textinput itemsHandle={handler} field={items.form.fields["subject"]} item={items.item["subject"]} />
                                                </div>
                                                <Textarea itemsHandle={handler} field={items.form.fields["comments"]} item={items.item["comments"]} />
                                            </>
                                        }

                                    </ClayCard.Description>
                                    <ClayButtonWithIcon
                                        onClick={() => { handler({ type: CITAS_ACTIONS.CLOSEVIEW }) }}
                                        displayType="secondary"
                                        spritemap={spritemap}
                                        aria-label="Cerrar"
                                        symbol="times"
                                        title="Edit"
                                    >{"Cerrar"}
                                    </ClayButtonWithIcon>

                                    <ClayButtonWithIcon
                                        onClick={() => { handler({ type: CITAS_ACTIONS.SAVE }) }}
                                        displayType="primary"
                                        spritemap={spritemap}
                                        aria-label="Cerrar"
                                        symbol="disk"
                                        title="Save"
                                    >{"Cerrar"}
                                    </ClayButtonWithIcon>

                                </ClayCard.Body>
                            </ClayCard>
                        </div>
                    }

                    <ClayTable>
                        <ClayTable.Head>
                            <ClayTable.Row>
                                {
                                    items.form.table.map(tableCol => {
                                        const tipo = tableCol.columnType;
                                        if (tipo === "string" || tipo === "multilang")
                                            return (
                                                <ClayTable.Cell key={tableCol.key}  >
                                                    <strong>{tableCol.columnTitle}</strong>
                                                    <span className="navbar-breakpoint-d-none">  </span>
                                                    <ClayIcon
                                                        symbol="order-ascending"
                                                        spritemap={spritemap}
                                                        onClick={() => { console.log("orden");/*itemsHandle({ type: ITEMS_ACTIONS.SET_ORDER, fieldname: tableCol })*/ }}
                                                    />
                                                </ClayTable.Cell>)
                                        if (tableCol.columnType === "boolean")
                                            return (
                                                <ClayTable.Cell
                                                    key={tableCol.key}
                                                >
                                                    <strong>{tableCol.columnTitle}</strong>
                                                    <span className="navbar-breakpoint-d-none">  </span>
                                                    <ClayIcon
                                                        symbol="order-ascending"
                                                        spritemap={spritemap}
                                                        onClick={() => {
                                                            console.log("ordenando");
                                                            /*itemsHandle({ type: ITEMS_ACTIONS.SET_ORDER, fieldname: tableCol })*/
                                                        }}
                                                    />
                                                </ClayTable.Cell>
                                            )
                                        if (tableCol.columnType === "checkbox")
                                            return (
                                                <ClayTable.Cell key={tableCol.key} headingCell>
                                                    <ClayCheckbox checked={items.form.checkall} onChange={() => {/*itemsHandle({ type: ITEMS_ACTIONS.CHECKALL })*/ }} />
                                                </ClayTable.Cell>)
                                    })
                                }
                                {
                                    items.form.options.table.showActions &&
                                    <ClayTable.Cell className={"table-cell-minw-100"} ><strong>{Liferay.Language.get("Acciones")}</strong></ClayTable.Cell>
                                }
                            </ClayTable.Row>
                        </ClayTable.Head>
                        <ClayTable.Body>
                            {
                                (items.items !== undefined) && items.items.map((row, index) => {
                                    return (
                                        <ClayTable.Row key={row.id} >
                                            {
                                                items.form.table.map(column => {
                                                    switch (column.columnType) {
                                                        case "multilang":
                                                            return (<ClayTable.Cell key={column.columnName + row.id}>{row[column.columnName][lang]}</ClayTable.Cell>)
                                                        case "string":
                                                            return (<ClayTable.Cell key={column.columnName + row.id}>{row[column.columnName]}</ClayTable.Cell>)
                                                        case "boolean":
                                                            return (<ClayTable.Cell key={column.columName + row.id}>{<ClayCheckbox checked={row[column.columName]} disabled />} </ClayTable.Cell>)
                                                        case "checkbox":
                                                            return (
                                                                <ClayTable.Cell key={column.key + row.id}><ClayCheckbox checked={row.checked} onChange={() => {
                                                                    //itemsHandle({ type: ITEMS_ACTIONS.CHECK, index: index }); 
                                                                }} value={row[column.columName]} />
                                                                    <span>{row[column.columName]}</span>
                                                                </ClayTable.Cell>
                                                            )
                                                    }
                                                })
                                            }
                                            {
                                            items.form.options.table.showActions &&
                                            <ClayTable.Cell>
                                                {
                                                    items.form.options.table.actions.includes("edit") &&
                                                    <ClayButtonWithIcon
                                                        onClick={() =>  handler({ type: CITAS_ACTIONS.SELECT_ITEM, index: index }) }
                                                        displayType="secondary"
                                                        spritemap={spritemap}
                                                        aria-label="Edit"
                                                        symbol="pencil"
                                                        title="Edit"
                                                    />
                                                }
                                                {
                                                    items.form.options.table.actions.includes("delete") &&
                                                    <ClayButtonWithIcon
                                                        className="ml-1"
                                                        onClick={() => handler({ type: CITAS_ACTIONS.DELETE, index: index })}
                                                        displayType="danger"
                                                        spritemap={spritemap}
                                                        aria-label="Delete"
                                                        symbol="trash"
                                                        title="Delete"
                                                    />
                                                }
                                            </ClayTable.Cell>
                                            }
                                        </ClayTable.Row>
                                    )
                                })
                            }
                        </ClayTable.Body>
                    </ClayTable>
                    <MiniPaginator
                        pagination={items.pagination}
                        changePage={changePageSearch}
                    />
                </>
            }
        </>
    );
}

export default Citas;