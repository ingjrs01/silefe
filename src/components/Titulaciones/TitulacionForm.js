import React, { useState } from "react";
import ClayForm, { ClayInput, ClaySelect, ClayToggle, ClaySelectBox, ClayRadio, ClayRadioGroup, ClayCheckbox, ClaySelectWithOption } from '@clayui/form';
import ClayCard from "@clayui/card";
import ClayButton from '@clayui/button';
import ClayDatePicker from '@clayui/date-picker';
import { getMonths, getDays } from '../../includes/interface/DatesLang';
import { getLanguageId } from '../../includes/LiferayFunctions'
import { TITULACIONES_ACTIONS } from "../../includes/reducers/titulaciones.reducer";
import { ITEMS_ACTIONS } from "../../includes/reducers/items.reducer";

const spritemap = './icons.svg';

export const TitulacionForm = ({redTitulaciones, titulacionHandler, itemsHandle}) => {

    return(
        <>
            <ClayCard>
                <ClayCard.Body>
                    <ClayCard.Description displayType="title">
                        {"Añadiendo titulación"}
                    </ClayCard.Description>
                    <ClayCard.Description truncate={false} displayType="text">
                    <ClayForm >
                        <div className="row">


                        {/* ---------------------------------------------------------------------------------------------------------------- */}
                        <ClayForm.Group className="col">
                            <label htmlFor="basicInput">{ Liferay.Language.get("Tipo") }</label>
                              <ClaySelect aria-label="Select Label"
                                id={"it"}
                                name={"it"}
                                key={"it"}
                                disabled={ false }
                                onChange={evt => { 
                                  titulacionHandler({type: TITULACIONES_ACTIONS.SET_TITULACIONTIPO, value:evt.target.value});                                  
                                 }}
                                value={redTitulaciones.titulacion.titulacionTipoId} >
                                  {
                                    redTitulaciones.tipoOptions.map( option => { return (
                                      <ClaySelect.Option
                                        label={option.label}
                                        value={option.value}
                                      />
                                    )})
                                  }
                            </ClaySelect>
                        </ClayForm.Group>
                        {/* ---------------------------------------------------------------------------------------------------------------- */}
                        <ClayForm.Group className="col">
                            <label htmlFor="basicInput">{ Liferay.Language.get("Nivel") }</label>
                              <ClaySelect aria-label="Select Label"
                                id={"it"}
                                name={"it"}
                                key={"it"}
                                disabled={ false }
                                onChange={evt => { 
                                  //titulacionHandler({
                                  //  type:TITULACIONES_ACTIONS.SET_TITULACION,
                                  //  titulacion: {...redTitulaciones.titulacion,titulacionNivelId: evt.target.value}
                                  //});
                                  titulacionHandler({type: TITULACIONES_ACTIONS.SET_TITULACIONNIVEL, value:evt.target.value})
                                }}
                                value={redTitulaciones.titulacion.titulacionNivelId} >
                                  {
                                    redTitulaciones.nivelOptions.map( option => { return (
                                      <ClaySelect.Option
                                        label={option.label}
                                        value={option.value}
                                      />
                                    )})
                                  }
                            </ClaySelect>
                        </ClayForm.Group>
                        {/* ---------------------------------------------------------------------------------------------------------------- */}
                        <ClayForm.Group className="col">
                            <label htmlFor="basicInput">{ Liferay.Language.get("Familia") }</label>
                              <ClaySelect aria-label="Select Label"
                                id={"it"}
                                name={"it"}
                                key={"it"}
                                disabled={ false }
                                onChange={evt => { 
                                  titulacionHandler({ type:TITULACIONES_ACTIONS.SET_TITULACIONFAMILIA,value: evt.target.value}) 
                                }}
                                  
                                value={redTitulaciones.titulacion.titulacionFamiliaId} >
                                {
                                  redTitulaciones.familiaOptions.map( option => { return (
                                    <ClaySelect.Option
                                      label={option.label}
                                      value={option.value}
                                    />
                                  )})
                                }
                            </ClaySelect>
                        </ClayForm.Group>
                        {/* ---------------------------------------------------------------------------------------------------------------- */}
                        </div>
                        <div className="row">
                        <ClayForm.Group className="col">
                            <label htmlFor="basicInput">{ Liferay.Language.get("Titulacion") }</label>
                              <ClaySelect aria-label="Select Label"
                                id={"it"}
                                name={"it"}
                                key={"it"}
                                disabled={ false }
                                onChange={evt => { 
                                  titulacionHandler({type:TITULACIONES_ACTIONS.SET_TITULACIONID,value:evt.target.value});
                                }}
                                value={redTitulaciones.titulacion.titulacionId} >
                                {
                                  redTitulaciones.titulacionOptions.map( option => { return (
                                    <ClaySelect.Option
                                      label={option.label}
                                      value={option.value}
                                    />
                                  )})
                                }
                            </ClaySelect>
                        </ClayForm.Group>
                        </div>

                    </ClayForm>
                    </ClayCard.Description>                
                    <div className="btn-group">
                        <div className="btn-group-item">
                            <ClayButton onClick={e => { 
                              titulacionHandler({type: TITULACIONES_ACTIONS.CANCEL });
                              itemsHandle({type: ITEMS_ACTIONS.CANCEL});
                            }} 
                              displayType="secondary">{Liferay.Language.get('Cancelar')}
                            </ClayButton>
                        </div>
                        <div className="btn-group-item">
                            <ClayButton onClick={e =>  titulacionHandler({type: TITULACIONES_ACTIONS.SAVE_ITEM}) } 
                              displayType="primary">{Liferay.Language.get('Guardar')}
                            </ClayButton>
                        </div>
                    </div>
                </ClayCard.Body>
            </ClayCard>

        </>
    );


};
