import React, { useState } from "react";
import ClayForm, { ClayInput, ClaySelect, ClayToggle, ClaySelectBox, ClayRadio, ClayRadioGroup, ClayCheckbox } from '@clayui/form';
import ClayCard from "@clayui/card";
import ClayButton from '@clayui/button';
import ClayDatePicker from '@clayui/date-picker';
import { ITEMS_ACTIONS } from '../../includes/reducers/items.reducer';
import { getMonths, getDays } from '../../includes/interface/DatesLang';
import { getLanguageId } from '../../includes/LiferayFunctions'
import { TITULACIONES_ACTIONS } from "../../includes/reducers/titulaciones.reducer";
//import RenderFields from "./RenderFields";

const spritemap = './icons.svg';


export const TableForm = ({itemsHandle,titulacion,setTitulacion, changeSelectsTitulacion, redTitulaciones, titulacionHandler, titulaciones, setTitulaciones}) => {

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
                            <label htmlFor="basicInput">{"Fecha Inicio"}</label>
                            <ClayDatePicker
                                onChange={val => { setTitulacion({...titulacion,ini:val})}}
                                placeholder={"lalala"}
                                firstDayOfWeek={1}
                                months={getMonths(getLanguageId())}
                                spritemap={spritemap}
                                timezone="GMT+01:00"
                                value={titulacion.ini}
                                weekdaysShort={getDays(getLanguageId())}
                                years={{
                                end:  2025,
                                start: 1990
                                }}
                            />
                        </ClayForm.Group>

                        <ClayForm.Group className="col">
                            <label htmlFor="basicInput">{"Fecha Fin"}</label>
                            <ClayDatePicker
                                onChange={val => { setTitulacion({...titulacion,fin:val})}}
                                placeholder={"lalala"}
                                firstDayOfWeek={1}
                                months={getMonths(getLanguageId())}
                                spritemap={spritemap}
                                timezone="GMT+01:00"
                                value={titulacion.fin}
                                weekdaysShort={getDays(getLanguageId())}
                                years={{
                                end:  2025,
                                start: 1990
                                }}
                            />
                        </ClayForm.Group>
                        </div>
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
                                  changeSelectsTitulacion("tipo",evt.target.value);
                                  titulacionHandler({type: TITULACIONES_ACTIONS.LOAD_NIVELES, value:evt.target.value})
                                 }}
                                value={redTitulaciones.titulacionTipoId} >
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
                                  changeSelectsTitulacion("nivel",evt.target.value); 
                                  titulacionHandler({type: TITULACIONES_ACTIONS.LOAD_FAMILIAS, value:evt.target.value})
                                }}
                                value={redTitulaciones.titulacionNivelId} >
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
                                onChange={evt => { console.log("cambiando" + evt) }}
                                value={1} >
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
                                  console.log("cambiando" + evt);
                                  titulacionHandler({type:TITULACIONES_ACTIONS.CHG_TITULACION,value:evt.target.value});
                                  setTitulacion({...titulacion,titulacionId:evt.target.value});
                                }}
                                value={redTitulaciones.titulacionId} >
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
                        <div className="row">
                        <ClayForm.Group className="col">
                            <label htmlFor="basicInputText">{Liferay.Language.get("Comentarios")}</label>
                            <ClayInput
                                component="textarea"
                                id="basicInputText"
                                placeholder="Insert your name here"
                                type="text"
                                value={titulacion.comentarios}
                                onChange={evt => {
                                  setTitulacion({...titulacion,comentarios:evt.target.value});
                                }}
                            />
                            </ClayForm.Group>                            
                        </div>

                    </ClayForm>
                    </ClayCard.Description>                
                    <div className="btn-group">
                        <div className="btn-group-item">
                            <ClayButton onClick={e =>  itemsHandle({type:ITEMS_ACTIONS.SET_STATUS,status:'edit'})} displayType="secondary">{Liferay.Language.get('Cancelar')}</ClayButton>
                        </div>
                        <div className="btn-group-item">
                            <ClayButton onClick={e => { 
                              setTitulaciones([...titulaciones,{
                                id:  2,
                                ini: "2022-01-01",
                                fin: "2022-12-31",
                                titulacionId: 821,
                                titulacionName: "Uno nuevo",
                                comentarios: "Comentario nuevo"
                            }]);
                              itemsHandle({type:ITEMS_ACTIONS.SET_STATUS,status:'edit'});                            

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
