import React from "react";
import { ClayCheckbox } from '@clayui/form';
import ClayTable from '@clayui/table';
import ClayButton from '@clayui/button';
import { PARTICIPANTES_OPTIONS } from '../../includes/reducers/candidatos.reducer';
import { ParticipantesForm } from "./ParticipantesForm";

export const ParticipantesRender = ({redParticipantes, participantesHandle}) =>  {

      if (!redParticipantes.items ) 
        return (<div>{Liferay.Language.get('Cargando')}</div>)

    return (
        <>
        { ( redParticipantes.status === "list" ) &&
        <>
            <ClayTable>
            <caption>{Liferay.Language.get("Candidatos")}</caption>
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
                { redParticipantes.items.map( (item,index) => { return(
                <>
                <ClayTable.Row>
                <ClayTable.Cell><ClayCheckbox checked={false} onChange={() =>console.log("lalala")} />
                </ClayTable.Cell>
                <ClayTable.Cell>{item.nombre}</ClayTable.Cell>
                <ClayTable.Cell>{item.apellido1}</ClayTable.Cell>
                <ClayTable.Cell>{item.apellido2}</ClayTable.Cell>
                <ClayTable.Cell>{item.cargo }</ClayTable.Cell>
                <ClayTable.Cell>
                    <ClayButton onClick={ () =>  participantesHandle({type: PARTICIPANTES_ACTIONS.SELECT_ITEM,index: index})} 
                      displayType="secondary">{"E"} 
                    </ClayButton> 
                  <ClayButton onClick={ () => participantesHandle({type: PARTICIPANTES_ACTIONS.DELETE, index:index}) } 
                    displayType="danger">{"B"} 
                    </ClayButton>
                </ClayTable.Cell>
                </ClayTable.Row>
                </> 
                );})}

            </ClayTable.Body>
            </ClayTable>
            <ClayButton onClick={ ()  => participantesHandle({type: PARTICIPANTES_OPTIONS.NEW_ITEM}) } displayType="primary">{Liferay.Language.get('Añadir')} 
            </ClayButton>
            </>
        }

        {
            (redParticipantes.status === 'edit') &&  
               
            <ParticipantesForm 
                redParticipantes={redParticipantes}
                participantesHandle={participantesHandle}
            />  
        }

        </>

    )
}

//export default ParticipantesRender;
