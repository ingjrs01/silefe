import ClayButton, { ClayButtonWithIcon } from '@clayui/button';
import { ClayCheckbox } from '@clayui/form';
import ClayTable from '@clayui/table';
import React from "react";
import { spritemap } from '../../includes/LiferayFunctions';
import { CONTACTOS_ACTIONS } from "../../includes/reducers/contactos.reducer";
import { ContactosForm } from "./ContactosForm";

const ContactosRender = ({redContactos,contactosHandle}) =>  {
    if (!redContactos.items) 
        return (<div>{Liferay.Language.get('Cargando')}</div>)

    return (
        <>
        { ( redContactos.status === "list" ) &&
        <>
            <ClayTable>
            <ClayTable.Head>
                <ClayTable.Row> <ClayTable.Cell headingCell><ClayCheckbox checked={false} onChange={() =>console.log("lalala")} /> </ClayTable.Cell>
                <ClayTable.Cell headingCell>{"Nombre"}</ClayTable.Cell>
                <ClayTable.Cell headingCell>{"Apellido 1"}</ClayTable.Cell>
                <ClayTable.Cell expanded headingCell>{Liferay.Language.get("Apellido 2")}</ClayTable.Cell>
                <ClayTable.Cell expanded headingCell>{Liferay.Language.get("Cargo")}</ClayTable.Cell>
                <ClayTable.Cell headingCell>{ Liferay.Language.get("Acciones")}</ClayTable.Cell>
                </ClayTable.Row>
            </ClayTable.Head>
            <ClayTable.Body>
                { redContactos.items.map( (item,index) => { return(
                <>
                <ClayTable.Row>
                <ClayTable.Cell><ClayCheckbox checked={false} onChange={() =>console.log("lalala")} />
                </ClayTable.Cell>
                <ClayTable.Cell>{item.nombre}</ClayTable.Cell>
                <ClayTable.Cell>{item.apellido1}</ClayTable.Cell>
                <ClayTable.Cell>{item.apellido2}</ClayTable.Cell>
                <ClayTable.Cell>{item.cargo }</ClayTable.Cell>
                <ClayTable.Cell>
                    <ClayButtonWithIcon 
                        onClick={ () => contactosHandle({type: CONTACTOS_ACTIONS.SELECT_ITEM,index: index})}
                        displayType="secondary"
                        spritemap={spritemap}
                        aria-label="Edit"
                        symbol="pencil"
                        title="Edit"
                    />
                    <ClayButtonWithIcon
                        className="ml-1"
                        onClick={ () => contactosHandle({type: CONTACTOS_ACTIONS.DELETE, index:index}) }
                        displayType="danger"
                        spritemap={spritemap}
                        aria-label="Delete"
                        symbol="trash"
                        title="Delete"
                    />
                </ClayTable.Cell>
                </ClayTable.Row>
                </>
                );})}

            </ClayTable.Body>
            </ClayTable>
            <ClayButton onClick={ ()  => contactosHandle({type: CONTACTOS_ACTIONS.NEW_ITEM}) } displayType="primary">{Liferay.Language.get('Nuevo')}
            </ClayButton>
            </>
        }

        {
            (redContactos.status === 'edit') &&
            <ContactosForm
                redContactos={redContactos}
                contactosHandle={contactosHandle}
            />
        }

        </>
    );
}

export default ContactosRender;
