import { ClayButtonWithIcon } from '@clayui/button';
import ClayCard from "@clayui/card";
import { ClayCheckbox } from '@clayui/form';
import ClayIcon from '@clayui/icon';
import ClayTable from '@clayui/table';
import React from "react";
import { Liferay } from "../../common/services/liferay/liferay";
import { getLanguageId, spritemap } from '../LiferayFunctions';
import { Dateinput } from '../interface/fields/Dateinput';
import { Hour } from '../interface/fields/Hour';
import { Select } from '../interface/fields/Select';
import { Textarea } from '../interface/fields/Textarea';
import { Textinput } from '../interface/fields/Textinput';
import { ITEMS_ACTIONS } from '../reducers/actions';
import { CITAS_ACTIONS, CITAS_STATES } from '../reducers/citas.reducer';
import { MiniPaginator } from "./MiniPaginator";

const Citas = ({ items, handler, editUrl, backUrl, ancestorId }) => {    
    const lang = getLanguageId();

    const changePageSearch = (page) => {
        handler({ type: CITAS_ACTIONS.SETPAGE, page: page });
    }

    if (items === undefined || items.items.length < 1)
        return (
            <div>{Liferay.Language.get("No hay elementos para mostrar")}</div>
        )

    return (
        <>
            {
                <>
                    {
                        (items.status === CITAS_STATES.VIEW) &&
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
                                            <Textinput  itemsHandle={handler} field={items.form.fields["subject"]} item={items.item["subject"]} />
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
                                            <ClayTable.Cell>
                                                <ClayButtonWithIcon
                                                    onClick={() => { handler({ type: CITAS_ACTIONS.VIEW, index: 0 });}}
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