import React from "react";
import { ClayCheckbox } from '@clayui/form';
import ClayTable from '@clayui/table';
import ClayButton from '@clayui/button';
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
            <caption>{Liferay.Language.get("Contactos")}</caption>
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
                    <ClayButton onClick={ () =>  contactosHandle({type: CONTACTOS_ACTIONS.SELECT_ITEM,index: index})} 
                      displayType="secondary">{"E"} 
                    </ClayButton> 
                  <ClayButton onClick={ () => contactosHandle({type: CONTACTOS_ACTIONS.DELETE, index:index}) } 
                    displayType="danger">{"B"} 
                    </ClayButton>
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
