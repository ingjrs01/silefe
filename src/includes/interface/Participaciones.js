import { ClayButtonWithIcon } from '@clayui/button';
import React from "react";
//import { ClayCheckbox, ClayInput, ClaySelect } from '@clayui/form';
//import ClayIcon from '@clayui/icon';
//import ClayUpperToolbar from '@clayui/upper-toolbar';
//import { MiniPaginator } from "./MiniPaginator";
//import ClayCard from "@clayui/card";
import { ClayCheckbox } from '@clayui/form';
import ClayIcon from '@clayui/icon';
import ClayTable from '@clayui/table';
import { Liferay } from "../../common/services/liferay/liferay";
import { getLanguageId, spritemap } from '../LiferayFunctions';
//import { Dateinput } from '../interface/fields/Dateinput';
//import { Hour } from '../interface/fields/Hour';
//import { Select } from '../interface/fields/Select';
//import { Textarea } from '../interface/fields/Textarea';
//import { Textinput } from '../interface/fields/Textinput';
//import { CITAS_ACTIONS, CITAS_STATES } from '../reducers/citas.reducer';

const Participaciones = ({ items, handler, editUrl, backUrl, ancestorId }) => {
    const lang = getLanguageId();

    if (items === undefined || items.items.length < 1)
        return (
            <div>{Liferay.Language.get("No hay citas para mostrar")}</div>
        )

    return (
        <>
            {
                <>
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
                                <ClayTable.Cell className={"table-cell-minw-100"} ><strong>{Liferay.Language.get("Acciones")}</strong></ClayTable.Cell>
                            </ClayTable.Row>
                        </ClayTable.Head>
                        <ClayTable.Body>
                            {
                                items.items.map((row, index) => {
                                    return (
                                        <ClayTable.Row key={row.id} >
                                            {
                                                items.form.table.map(column => {
                                                    console.log("recorriendo tabla");
                                                    console.debug(column);
                                                    console.debug(row);
                                                    switch (column.columnType) {
                                                        case "multilang":
                                                            return (<ClayTable.Cell key={column.columnName + row.id}>{row[column.columnName][lang]}</ClayTable.Cell>)
                                                        case "string":
                                                            console.log("bla: " + column.columnName + "-" + row[column.columnName])
                                                            return (<ClayTable.Cell key={column.columnName + row.id}>{row[column.columnName]}</ClayTable.Cell>)
                                                        case "boolean":
                                                            return (<ClayTable.Cell key={column.columName + row.id}>{<ClayCheckbox checked={row[column.columName]} disabled />} </ClayTable.Cell>)
                                                        case "checkbox":
                                                            return (
                                                                <ClayTable.Cell key={column.key + row.id}><ClayCheckbox checked={row.checked} onChange={() => {
                                                                    console.log("lalala");
                                                                    //itemsHandle({ type: ITEMS_ACTIONS.CHECK, index: index }); 
                                                                }} value={row[column.columName]} />
                                                                    <span>{row[column.columName]}</span>
                                                                </ClayTable.Cell>
                                                            )
                                                    }
                                                })
                                            }
                                            <ClayTable.Cell>
                                                <ClayButtonWithIcon
                                                    onClick={() => {
                                                        console.log("editando")
                                                        /*itemsHandle({ type: ITEMS_ACTIONS.SELECT_ITEM, index: index })*/
                                                        handler({ type: CITAS_ACTIONS.VIEW, index: 0 });
                                                    }}
                                                    displayType="secondary"
                                                    spritemap={spritemap}
                                                    aria-label="Edit"
                                                    symbol="pencil"
                                                    title="Edit"
                                                />
                                                <ClayButtonWithIcon
                                                    className="ml-1"
                                                    onClick={() => { console.log("borrando")/*handleDelete(index, items, itemsHandle, onOpenChange)*/ }}
                                                    displayType="danger"
                                                    spritemap={spritemap}
                                                    aria-label="Delete"
                                                    symbol="trash"
                                                    title="Delete"
                                                />
                                            </ClayTable.Cell>
                                        </ClayTable.Row>
                                    )
                                })
                            }
                        </ClayTable.Body>
                    </ClayTable>
                </>

            }
        </>
    );
}

export default Participaciones;