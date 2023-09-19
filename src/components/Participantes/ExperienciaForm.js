import ClayButton from '@clayui/button';
import ClayCard from "@clayui/card";
import ClayDatePicker from '@clayui/date-picker';
import ClayForm, { ClayInput, ClaySelect } from '@clayui/form';
import React from "react";
import { getLanguageId, spritemap } from '../../includes/LiferayFunctions';
import { getDays, getMonths } from '../../includes/interface/DatesLang';
import { EXPERIENCIA_ACTIONS } from "../../includes/reducers/experiencias.reducer";

//import RenderFields from "./RenderFields";

export const ExperienciaForm = ({ experiencias, experienciasHandler }) => {

  return (
    <>
      <ClayCard>
        <ClayCard.Body>
          <ClayCard.Description displayType="title">
            {"Añadiendo experiencia"}
          </ClayCard.Description>
          <ClayCard.Description truncate={false} displayType="text">
            <ClayForm >
              <div className="row">
                {/* ---------------------------------------------------------------------------------------------------------------- */}
                <ClayForm.Group className="col">
                  <label htmlFor="basicInput">{"Fecha Inicio"}</label>
                  <ClayDatePicker
                    onChange={val => experienciasHandler({ type: EXPERIENCIA_ACTIONS.SETFIELD, fieldname: 'ini', value: val }) }
                    placeholder={""}
                    firstDayOfWeek={1}
                    months={getMonths(getLanguageId())}
                    spritemap={spritemap}
                    timezone="GMT+01:00"
                    value={experiencias.item.ini}
                    weekdaysShort={getDays(getLanguageId())}
                    years={{
                      end: 2025,
                      start: 1990
                    }}
                  />
                </ClayForm.Group>

                <ClayForm.Group className="col">
                  <label htmlFor="basicInput">{"Fecha Fin"}</label>
                  <ClayDatePicker
                    onChange={val => { experienciasHandler({ type: EXPERIENCIA_ACTIONS.SETFIELD, fieldname: 'fin', value: val }) }}
                    placeholder={""}
                    firstDayOfWeek={1}
                    months={getMonths(getLanguageId())}
                    spritemap={spritemap}
                    timezone="GMT+01:00"
                    value={experiencias.item.fin}
                    weekdaysShort={getDays(getLanguageId())}
                    years={{
                      end: 2025,
                      start: 1990
                    }}
                  />
                </ClayForm.Group>
                <ClayForm.Group className="col">
                  <label htmlFor="basicInput">{Liferay.Language.get("TipoContrato")}</label>
                  <ClaySelect aria-label="Select Label"
                    id={"tipoContratoId"}
                    name={"tipoContratoId"}
                    key={"tipoContratoId1"}
                    disabled={false}
                    onChange={evt => {
                      experienciasHandler({ type: EXPERIENCIA_ACTIONS.SETFIELD, fieldname: 'tipoContratoId', value: evt.target.value })
                    }}
                    value={experiencias.item.tipoContratoId} >
                    {
                      experiencias.tipoContratoOptions.map(option => {
                        return (
                          <ClaySelect.Option
                            label={option.label}
                            value={option.value}
                          />
                        )
                      })
                    }
                  </ClaySelect>
                </ClayForm.Group>
              </div>
              <div className="row">
                <ClayForm.Group className="col">
                  <label htmlFor="basicInput">{Liferay.Language.get("CIF")}</label>
                  <ClayInput
                    placeholder={"placeholder"}
                    type="text"
                    name={"cif"}
                    key={"cif"}
                    value={experiencias.item.cif}
                    onChange={e => {
                      experienciasHandler({ type: EXPERIENCIA_ACTIONS.SETFIELD, fieldname: 'cif', value: e.target.value });
                    }}>
                  </ClayInput>
                </ClayForm.Group>
                <ClayForm.Group className="col">
                  <label htmlFor="basicInput">{Liferay.Language.get("RazonSocial")}</label>
                  <ClayInput
                    placeholder={"placeholder"}
                    type="text"
                    name={"razonSocial"}
                    key={"razonSocial"}
                    value={experiencias.item.razonSocial}
                    onChange={e => {
                      //validate(e.target.name, e.target.value);
                      experienciasHandler({ type: EXPERIENCIA_ACTIONS.SETFIELD, fieldname: 'razonSocial', value: e.target.value });
                    }}>
                  </ClayInput>
                </ClayForm.Group>
                <ClayForm.Group className="col">
                  <label htmlFor="basicInput">{Liferay.Language.get("Puesto")}</label>
                  <ClayInput
                    placeholder={"Puesto"}
                    type="text"
                    name={"puesto"}
                    key={"puesto"}
                    value={experiencias.item.puesto}
                    onChange={e => {
                      experienciasHandler({ type: EXPERIENCIA_ACTIONS.SETFIELD, fieldname: 'puesto', value: e.target.value });
                    }}>
                  </ClayInput>
                </ClayForm.Group>
              </div>
              <div className="row">

              <ClayForm.Group className="col">
                  <label htmlFor="basicInput">{Liferay.Language.get("Ocupacion")}</label>
                  <ClaySelect aria-label="Select Label"
                    id={"ocupacion"}
                    name={"ocupacion"}
                    key={"ocupacion"}
                    disabled={false}
                    onChange={evt => {
                      experienciasHandler({ type: EXPERIENCIA_ACTIONS.SETFIELD, fieldname: 'ocupacion', value: evt.target.value })
                    }}
                    value={experiencias.item.ocupacion} >
                    {
                      experiencias.ocupacionesOptions.map(option => {
                        return (
                          <ClaySelect.Option
                            label={option.label}
                            value={option.value}
                          />
                        )
                      })
                    }
                  </ClaySelect>
                </ClayForm.Group>

                <ClayForm.Group className="col">
                  <label htmlFor="basicInput">{Liferay.Language.get("Duracion")}</label>
                  <ClayInput
                    placeholder={"Duración"}
                    type="text"
                    name={"duracion"}
                    key={"duracion"}
                    value={experiencias.item.duracion}
                    onChange={e => {
                      experienciasHandler({ type: EXPERIENCIA_ACTIONS.SETFIELD, fieldname: 'duracion', value: e.target.value });
                    }}>
                  </ClayInput>
                </ClayForm.Group>

                <ClayForm.Group className="col">
                  <label htmlFor="basicInput">{Liferay.Language.get("MotivoBaja")}</label>
                  <ClaySelect aria-label="Select Label"
                    id={"motivoBajaId"}
                    name={"motivoBajaId"}
                    key={"motivoBajaId1"}
                    disabled={false}
                    onChange={evt => {
                      experienciasHandler({ type: EXPERIENCIA_ACTIONS.SETFIELD, fieldname: 'motivoBajaId', value: evt.target.value })
                    }}
                    value={experiencias.item.motivoBajaId} >
                    {
                      experiencias.motivosOptions.map(option => {
                        return (
                          <ClaySelect.Option
                            label={option.label}
                            value={option.value}
                          />
                        )
                      })
                    }
                  </ClaySelect>
                </ClayForm.Group>
              </div>

              <div className="row">
                <ClayForm.Group className="col">
                  <label htmlFor="observaciones">{Liferay.Language.get("Observaciones")}</label>
                  <ClayInput
                    component="textarea"
                    id="observaciones"
                    placeholder="Insert your name here"
                    type="text"
                    value={experiencias.item.observaciones}
                    onChange={evt => experienciasHandler({ type: EXPERIENCIA_ACTIONS.SETFIELD, fieldname: 'observaciones', value: evt.target.value })}
                  />
                </ClayForm.Group>
              </div>

            </ClayForm>
          </ClayCard.Description>
          <div className="btn-group">
            <div className="btn-group-item">
              <ClayButton onClick={e => experienciasHandler({type: EXPERIENCIA_ACTIONS.CANCEL})} displayType="secondary">{Liferay.Language.get('Cancelar')}</ClayButton>
            </div>
            <div className="btn-group-item">
              <ClayButton onClick={ e => {
                experienciasHandler({type: EXPERIENCIA_ACTIONS.SAVE});
              }}
                displayType="primary">{Liferay.Language.get('Guardar')}
              </ClayButton>
            </div>
          </div>
        </ClayCard.Body>
      </ClayCard>

    </>
  );


};
