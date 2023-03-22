import React from "react";
import ClayForm, { ClayInput, ClaySelect, ClayToggle, ClaySelectBox, ClayRadio, ClayRadioGroup, ClayCheckbox, ClaySelectWithOption } from '@clayui/form';
import ClayTable from '@clayui/table';
import ClayCard from "@clayui/card";
import ClayButton, { ClayButtonWithIcon } from '@clayui/button';
import { getMonths, getDays } from '../../includes/interface/DatesLang';
import { getLanguageId } from '../../includes/LiferayFunctions'
import { PARTICIPANTES_OPTIONS } from "../../includes/reducers/candidatos.reducer";

const spritemap = './icons.svg';

export const ParticipantesForm = ({ redParticipantes, participantesHandle }) => {

  return (
    <>
      <ClayCard>
        <ClayCard.Body>
          <ClayCard.Description displayType="title">
            {Liferay.Language.get("Participante")}
          </ClayCard.Description>
          <ClayCard.Description truncate={false} displayType="text">
            <ClayForm >
              <div className="row">
                <ClayForm.Group className="col">
                  <label htmlFor="basicInput">{Liferay.Language.get("Nombre")}</label>
                  <ClayInput
                    placeholder={"placeholder"}
                    type="text"
                    name={"nombre"}
                    key={"nombre"}
                    value={redParticipantes.item.nombre}
                    onChange={e => participantesHandle({ type: PARTICIPANTES_OPTIONS.SETFIELD, fieldname: 'nombre', value: e.target.value })}>
                  </ClayInput>
                </ClayForm.Group>
                <ClayForm.Group className="col">
                  <label htmlFor="apellido1">{Liferay.Language.get("Apellido1")}</label>
                  <ClayInput
                    placeholder={"Apellido1"}
                    type="text"
                    name={"Apellido1"}
                    key={"Apellido1"}
                    value={redParticipantes.item.apellido1}
                    onChange={e => {
                      participantesHandle({ type: PARTICIPANTES_OPTIONS.SETFIELD, fieldname: 'apellido1', value: e.target.value });
                    }}>
                  </ClayInput>
                </ClayForm.Group>

                <ClayForm.Group className="col">
                  <label htmlFor="apellido2">{Liferay.Language.get("Apellido2")}</label>
                  <ClayInput
                    placeholder={"Apellido2"}
                    type="text"
                    name={"Apellido2"}
                    key={"Apellido2"}
                    value={redParticipantes.item.apellido2}
                    onChange={e => {
                      participantesHandle({ type: PARTICIPANTES_OPTIONS.SETFIELD, fieldname: 'apellido2', value: e.target.value });
                    }}>
                  </ClayInput>
                </ClayForm.Group>
              </div>
            <div className="btn-group-item">
              <ClayButton onClick={() => participantesHandle({ type: PARTICIPANTES_OPTIONS.SEARCH }) }
                displayType="primary">{Liferay.Language.get('Buscar')}
              </ClayButton>
            </div>

            </ClayForm>
          </ClayCard.Description>

          
            <ClayTable>
            <caption>{Liferay.Language.get("Candidatos")}</caption>
            <ClayTable.Head>
                <ClayTable.Row> <ClayTable.Cell headingCell><ClayCheckbox checked={redParticipantes.checkall} onChange={() => participantesHandle({type:PARTICIPANTES_OPTIONS.TOGGLE_CHECKALL})} /> </ClayTable.Cell>
                <ClayTable.Cell headingCell>{"Nombre"}</ClayTable.Cell>
                <ClayTable.Cell headingCell>{"Apellido 1"}</ClayTable.Cell>
                <ClayTable.Cell expanded headingCell>{Liferay.Language.get("Apellido 2")}</ClayTable.Cell>
                <ClayTable.Cell expanded headingCell>{Liferay.Language.get("Cargo")}</ClayTable.Cell>
                <ClayTable.Cell headingCell>{ Liferay.Language.get("Acciones")}</ClayTable.Cell>
                </ClayTable.Row>
            </ClayTable.Head>
            <ClayTable.Body>
                { redParticipantes.candidatos.map( (item,index) => { return(
                <>
                <ClayTable.Row>
                <ClayTable.Cell><ClayCheckbox checked={item.check} onChange={() => participantesHandle({type: PARTICIPANTES_OPTIONS.TOGGLE_CHECK, index:index })} />
                </ClayTable.Cell>
                <ClayTable.Cell>{item.nombre}</ClayTable.Cell>
                <ClayTable.Cell>{item.apellido1}</ClayTable.Cell>
                <ClayTable.Cell>{item.apellido2}</ClayTable.Cell>
                <ClayTable.Cell>{item.participanteId }</ClayTable.Cell>
                <ClayTable.Cell>
                  <ClayButton onClick={ () => participantesHandle({type: PARTICIPANTES_ACTIONS.DELETE, index:index}) } 
                    displayType="danger">{"B"} 
                    </ClayButton>
                </ClayTable.Cell>
                </ClayTable.Row>
                </> 
                );})}

            </ClayTable.Body>
            </ClayTable>


          <div className="btn-group">
            <div className="btn-group-item">
              <ClayButton onClick={e => participantesHandle({ type: PARTICIPANTES_OPTIONS.CANCEL })} displayType="secondary">{Liferay.Language.get('Cancelar')}</ClayButton>
            </div>
            <div className="btn-group-item">
              <ClayButton onClick={() => participantesHandle({ type: PARTICIPANTES_OPTIONS.SAVE }) }
                displayType="primary">{Liferay.Language.get('Añadir')}
              </ClayButton>
            </div>
          </div>
        </ClayCard.Body>
      </ClayCard>

    </>
  );


}
