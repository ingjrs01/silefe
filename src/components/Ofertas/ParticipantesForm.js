import React from "react";
import ClayForm, { ClayInput, ClaySelect, ClayToggle, ClaySelectBox, ClayRadio, ClayRadioGroup, ClayCheckbox, ClaySelectWithOption } from '@clayui/form';
import ClayTable from '@clayui/table';
import ClayCard from "@clayui/card";
import ClayButton, { ClayButtonWithIcon } from '@clayui/button';
import { getMonths, getDays } from '../../includes/interface/DatesLang';
import { getLanguageId } from '../../includes/LiferayFunctions'
import { PARTICIPANTES_OPTIONS } from "../../includes/reducers/candidatos.reducer";

const spritemap = "./o/my-project/icons.svg";

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
                    value={redParticipantes.filters.nombre}
                    onChange={e => participantesHandle({ type: PARTICIPANTES_OPTIONS.SET_FILTER, fieldname: 'nombre', value: e.target.value })}>
                  </ClayInput>
                </ClayForm.Group>
                <ClayForm.Group className="col">
                  <label htmlFor="apellido1">{Liferay.Language.get("Apellido1")}</label>
                  <ClayInput
                    placeholder={"Apellido1"}
                    type="text"
                    name={"Apellido1"}
                    key={"Apellido1"}
                    value={redParticipantes.filters.apellido1}
                    onChange={e => {
                      participantesHandle({ type: PARTICIPANTES_OPTIONS.SET_FILTER, fieldname: 'apellido1', value: e.target.value });
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
                    value={redParticipantes.filters.apellido2}
                    onChange={e => {
                      participantesHandle({ type: PARTICIPANTES_OPTIONS.SET_FILTER, fieldname: 'apellido2', value: e.target.value });
                    }}>
                  </ClayInput>
                </ClayForm.Group>
              </div>
            <div className="row">
                <ClayForm.Group className="col">
                  <label htmlFor="provinciaId">{Liferay.Language.get("Provincia")}</label>
                  <ClaySelect aria-label="Select Label"
                      id={"provinciaId"}
                      name={"provinciaId"}
                      key={"provinciaId"}
                      onChange={evt => { participantesHandle({type: PARTICIPANTES_OPTIONS.SET_PROVINCIA, provinciaId: evt.target.value })}}
                      value={ redParticipantes.filters.provinciaId} >
                      {redParticipantes.provinciasOptions.map(item => (
                         <ClaySelect.Option
                             key={"option-" + item.value}
                             label={item.label}
                             value={item.value}
                         />
                     ))}
                  </ClaySelect>
                </ClayForm.Group>

                <ClayForm.Group className="col">
                  <label htmlFor="municipioId">{Liferay.Language.get("Municipio")}</label>
                  <ClaySelect aria-label="Select Label"
                      id={"municipioId"}
                      name={"municipioId"}
                      key={"municipioId"}
                      onChange={evt => { participantesHandle({type: PARTICIPANTES_OPTIONS.SET_FILTER,fieldname: 'municipioId' ,value: evt.target.value })}}
                      value={ redParticipantes.filters.municipioId} >
                      {redParticipantes.municipiosOptions.map(item => (
                         <ClaySelect.Option
                             key={"option-" + item.value}
                             label={item.label}
                             value={item.value}
                         />
                     ))}
                  </ClaySelect>
                </ClayForm.Group>

            </div>

              <div class="row">
                <ClayForm.Group className="col">
                  <label htmlFor="titulacion">{Liferay.Language.get("Titulacion")}</label>
                  <ClayInput
                    placeholder={"Titulación"}
                    type="text"
                    name={"titulacion"}
                    key={"titulacion"}
                    value={redParticipantes.filters.titulacion}
                    onChange={e => {
                      participantesHandle({ type: PARTICIPANTES_OPTIONS.SET_FILTER, fieldname: 'titulacion', value: e.target.value });
                    }}>
                  </ClayInput>
                </ClayForm.Group>

                <ClayForm.Group className="col">
                  <label htmlFor="rangoSalarial">{Liferay.Language.get("RangoSalarial")}</label>
                  <ClaySelect aria-label="Select Label"
                      id={"rangoSalarial"}
                      name={"rangoSalarial"}
                      key={"rangoSalarial"}
                      onChange={evt => { participantesHandle({type: PARTICIPANTES_OPTIONS.SET_FILTER, fieldname: 'rangoId', value: evt.target.value })}}
                     value={ redParticipantes.filters.rangoId} >
                     {redParticipantes.rangosOptions.map(item => (
                         <ClaySelect.Option
                             key={"option-" + item.value}
                             label={item.label}
                             value={item.value}
                         />
                     ))}
                  </ClaySelect>
                </ClayForm.Group>

                <ClayForm.Group className="col">
                  <label htmlFor="jornadaId">{Liferay.Language.get("Jornada")}</label>
                  <ClaySelect aria-label="Select Label"
                      id={"jornadaId"}
                      name={"jornadaId"}
                      key={"jornadaId"}
                      onChange={evt => { participantesHandle({type: PARTICIPANTES_OPTIONS.SET_FILTER, fieldname: 'jornadaId', value: evt.target.value })}}
                      value={ redParticipantes.filters.jornadaId} >
                      {redParticipantes.jornadaOptions.map(item => (
                         <ClaySelect.Option
                             key={"option-" + item.value}
                             label={item.label}
                             value={item.value}
                         />
                     ))}
                  </ClaySelect>
                </ClayForm.Group>

              </div>
            <div className="row">
                <ClayForm.Group className="col">
                  <label htmlFor="ocupacionId">{Liferay.Language.get("Colectivos")}</label>
                  <ClaySelect aria-label="Select Label"
                      id={"colectivoId"}
                      name={"colectivoId"}
                      key={"colectivoId"}
                      onChange={evt => { participantesHandle({type: PARTICIPANTES_OPTIONS.SET_FILTER,fieldname: 'colectivoId' ,value: evt.target.value })}}
                      value={ redParticipantes.filters.colectivoId} >
                      {redParticipantes.colectivosOptions.map(item => (
                         <ClaySelect.Option
                             key={"option-" + item.value}
                             label={item.label}
                             value={item.value}
                         />
                     ))}
                  </ClaySelect>
                </ClayForm.Group>

                <ClayForm.Group className="col">
                  <label htmlFor="ocupacionId">{Liferay.Language.get("Ocupacion")}</label>
                  <ClaySelect aria-label="Select Label"
                      id={"ocupacionId"}
                      name={"ocupacionId"}
                      key={"ocupacionId"}
                      onChange={evt => { participantesHandle({type: PARTICIPANTES_OPTIONS.SET_FILTER,fieldname: 'ocupacionId' ,value: evt.target.value })}}
                      value={ redParticipantes.filters.ocupacionId} >
                      {redParticipantes.ocupacionesOptions.map(item => (
                         <ClaySelect.Option
                             key={"option-" + item.value}
                             label={item.label}
                             value={item.value}
                         />
                     ))}
                  </ClaySelect>
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
                  <ClayButton onClick={ () => participantesHandle({type: PARTICIPANTES_OPTIONS.DELETE, index:index}) } 
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
