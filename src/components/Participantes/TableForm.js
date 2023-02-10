import React, { useState } from "react";
import ClayForm, { ClayInput, ClaySelect, ClayToggle, ClaySelectBox, ClayRadio, ClayRadioGroup, ClayCheckbox } from '@clayui/form';
import ClayCard from "@clayui/card";
import ClayButton from '@clayui/button';
import ClayDatePicker from '@clayui/date-picker';
import { ITEMS_ACTIONS } from '../../includes/reducers/items.reducer';
import { getMonths, getDays } from '../../includes/interface/DatesLang';
import { getLanguageId } from '../../includes/LiferayFunctions'
//import RenderFields from "./RenderFields";

const spritemap = './icons.svg';


export const TableForm = ({itemsHandle}) => {

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
                                onChange={val => { itemsHandle({ type: ITEMS_ACTIONS.SET, fieldname: it, value: val });}}
                                placeholder={"lalala"}
                                firstDayOfWeek={1}
                                months={getMonths(getLanguageId())}
                                spritemap={spritemap}
                                timezone="GMT+01:00"
                                value={"2023-02-10"}
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
                                onChange={val => { itemsHandle({ type: ITEMS_ACTIONS.SET, fieldname: it, value: val });}}
                                placeholder={"lalala"}
                                firstDayOfWeek={1}
                                months={getMonths(getLanguageId())}
                                spritemap={spritemap}
                                timezone="GMT+01:00"
                                value={"2023-02-10"}
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
                            <label htmlFor="basicInput">{ "Tipo" }</label>
                              <ClaySelect aria-label="Select Label"
                                id={"it"}
                                name={"it"}
                                key={"it"}
                                disabled={ false }
                                onChange={evt => { console.log("cambiando" + evt) }}
                                value={1} >
                                  <ClaySelect.Option
                                    label={"Opcion 1"}
                                    value={1}
                                  />
                                  <ClaySelect.Option
                                    label={"Opcion 2"}
                                    value={2}
                                  />
                            </ClaySelect>
                        </ClayForm.Group>
                        {/* ---------------------------------------------------------------------------------------------------------------- */}
                        <ClayForm.Group className="col">
                            <label htmlFor="basicInput">{ "Nivel" }</label>
                              <ClaySelect aria-label="Select Label"
                                id={"it"}
                                name={"it"}
                                key={"it"}
                                disabled={ false }
                                onChange={evt => { console.log("cambiando" + evt) }}
                                value={1} >
                                  <ClaySelect.Option
                                    label={"Opcion 1"}
                                    value={1}
                                  />
                                  <ClaySelect.Option
                                    label={"Opcion 2"}
                                    value={2}
                                  />
                            </ClaySelect>
                        </ClayForm.Group>
                        {/* ---------------------------------------------------------------------------------------------------------------- */}
                        <ClayForm.Group className="col">
                            <label htmlFor="basicInput">{ "Familia" }</label>
                              <ClaySelect aria-label="Select Label"
                                id={"it"}
                                name={"it"}
                                key={"it"}
                                disabled={ false }
                                onChange={evt => { console.log("cambiando" + evt) }}
                                value={1} >
                                  <ClaySelect.Option
                                    label={"Opcion 1"}
                                    value={1}
                                  />
                                  <ClaySelect.Option
                                    label={"Opcion 2"}
                                    value={2}
                                  />
                            </ClaySelect>
                        </ClayForm.Group>
                        {/* ---------------------------------------------------------------------------------------------------------------- */}
                        </div>
                        <div className="row">
                        <ClayForm.Group className="col">
                            <label htmlFor="basicInputText">Name</label>
                            <ClayInput
                                component="textarea"
                                id="basicInputText"
                                placeholder="Insert your name here"
                                type="text"
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
                            itemsHandle({type:ITEMS_ACTIONS.SET_STATUS,status:'edit'}) 
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
