import React, { useState } from "react";
import ClayTabs from '@clayui/tabs';
import ClayCard from "@clayui/card";
import ClayButton from '@clayui/button';
import ClayForm, { ClayInput, ClaySelect, ClayToggle, ClaySelectBox, ClayRadio, ClayRadioGroup, ClayCheckbox } from '@clayui/form';
import ClayDatePicker from '@clayui/date-picker';
import { getMonths, getDays } from '../../includes/interface/DatesLang'; //'./DatesLang';
import { getLanguageId } from '../../includes/LiferayFunctions';
import { EJECUCION_ACTIONS } from './Ejecucion.reducer';

const spritemap = "./o/my-project/icons.svg";

export const Formacion = ({ejecucion,ejecucionHandler}) => {

    console.log("Formacion");
    console.debug(ejecucion);

return (
    <>
        <div class="container">

        <h3>{"Tipo de Formacion"}</h3>
        <div class="row">
            <ClayForm.Group className={"col-3"} key={"Group-101"} >
            <label htmlFor="basicInput">{"Fecha Inicio"}</label>
            <ClayDatePicker
                onChange={val => ejecucionHandler({type:EJECUCION_ACTIONS.SETFIELD, fieldname:"inicio", value:val})}
                //placeholder={items.fields.fields[it].placeholder}
                firstDayOfWeek={1}
                months={getMonths(getLanguageId())}
                spritemap={spritemap}
                timezone="GMT+01:00"
                value={ ejecucion.item.inicio }
                weekdaysShort={getDays(getLanguageId())}
                years={{
                    end:  (((new Date().getFullYear()) +  2) ),
                    start: (( new Date().getFullYear() - 0))
                }}
            />
            </ClayForm.Group>
            <ClayForm.Group className={"col-3"} key={"Group-102"} >
            <label htmlFor="basicInput">{"Fecha fin"}</label>
            <ClayDatePicker
                onChange={val => ejecucionHandler({type:EJECUCION_ACTIONS.SETFIELD, fieldname: 'fin', value:val})}
                //placeholder={items.fields.fields[it].placeholder}
                firstDayOfWeek={1}
                months={getMonths(getLanguageId())}
                spritemap={spritemap}
                timezone="GMT+01:00"
                value={ ejecucion.item.fin }
                weekdaysShort={getDays(getLanguageId())}
                years={{
                    end:  (((new Date().getFullYear()) +  2) ),
                    start: (( new Date().getFullYear() - 0))
                }}
            />

        </ClayForm.Group>

        <div class="col-6">
            <div class="row">
                    <ClayForm.Group className={"col-1"} key={"Group-103"} >
                        <label htmlFor="basicInput">{"L"}</label>
                        <ClayCheckbox 
                            checked={ ejecucion.item.dias.L.value} 
                            onChange={() => ejecucionHandler({type: EJECUCION_ACTIONS.SETFIELD, fieldname: "dias"})} 
                        />
                    </ClayForm.Group>

                    <ClayForm.Group className={"col-1"} key={"Group-104"} >
                        <label htmlFor="basicInput">{"M"}</label>
                        <ClayCheckbox checked={false} onChange={() => console.log("lalala2")} />
                    </ClayForm.Group>

                    <ClayForm.Group className={"col-1"} key={"Group-105"} >
                        <label htmlFor="basicInput">{"X"}</label>
                        <ClayCheckbox checked={false} onChange={() => console.log("lalala")} />
                    </ClayForm.Group>

                    <ClayForm.Group className={"col-1"} key={"Group-106"} >
                        <label htmlFor="basicInput">{"J"}</label>
                        <ClayCheckbox checked={false} onChange={() => console.log("lalala")} />
                    </ClayForm.Group>

                    <ClayForm.Group className={"col-1"} key={"Group-107"} >
                        <label htmlFor="basicInput">{"V"}</label>
                        <ClayCheckbox checked={false} onChange={() => console.log("lalala")} />
                    </ClayForm.Group>

                    <ClayForm.Group className={"col-1"} key={"Group-108"} >
                        <label htmlFor="basicInput">{"S"}</label>
                        <ClayCheckbox checked={false} onChange={() => console.log("lalala")} />
                    </ClayForm.Group>

                    <ClayForm.Group className={"col-1"} key={"Group-109"} >
                        <label htmlFor="basicInput">{"D"}</label>
                        <ClayCheckbox checked={false} onChange={() => console.log("lalala")} />
                    </ClayForm.Group>

                </div>
        </div>









        </div>
        <div class="row">

        <ClayForm.Group className={"col-2"} key={"Group-110"} >
            <label htmlFor="basicInput">{"Hora Inicia M."}</label>
            <ClayInput
                placeholder={"prueba2"}
                type="time"
                name={"escondido-3"}
                key={"prueba-4"}
                onChange={evt => {
                    console.log("poniendo una hora");
                    console.debug(evt.target.value);
                }}
                >
            </ClayInput>
        </ClayForm.Group>

        <ClayForm.Group className={"col-2"} key={"Group-111"} >
            <label htmlFor="basicInput">{"Hora Inicio T."}</label>
            <ClayInput
                placeholder={"prueba2"}
                type="time"
                name={"escondido-3"}
                key={"prueba-4"}
                onChange={evt => {
                    console.log("poniendo una hora");
                    console.debug(evt.target.value);
                }}
                >
            </ClayInput>
        </ClayForm.Group>

        <ClayForm.Group className={"col-2"} key={"Group-112"} >
            <label htmlFor="basicInput">{"Hora Inicio T."}</label>
            <ClayInput
                placeholder={"prueba2"}
                type="time"
                name={"escondido-3"}
                key={"prueba-4"}
                onChange={evt => {
                    console.log("poniendo una hora");
                    console.debug(evt.target.value);
                }}
                >
            </ClayInput>
        </ClayForm.Group>
        <ClayForm.Group className={"col-2"} key={"Group-113"} >
        <label htmlFor="basicInput">{"Hora Fin T."}</label>
            <ClayInput
                placeholder={"prueba2"}
                type="time"
                name={"escondido-3"}
                key={"prueba-4"}
                onChange={evt => {
                    console.log("poniendo una hora");
                    console.debug(evt.target.value);
                }}
                >
            </ClayInput>
        </ClayForm.Group>
                </div>

        <div class="row">
        <ClayForm.Group className={"col-4"} key={"Group-114"} >
            <label htmlFor="basicInput">{"Empresa"}</label>
            <ClaySelect aria-label="Select Label"
            id={"a"}
            name={"entidadId"}
            key={"aaa"}
            disabled={ false}
            onChange={evt => {
                console.log("probando el cambio de mepresa");
                ejecucionHandler({type:EJECUCION_ACTIONS.SETFIELD,fieldname:"entidadId", value:3})
            }}
            value={ ejecucion.item.entidadId } >
            
                <ClaySelect.Option
                key={ "option-"}
                label={"Diputación de Pontevedra"}
                value={1}
                />
                <ClaySelect.Option
                key={"option-"}
                label={"Otra empresa"}
                value={2}
                />

            </ClaySelect>

        </ClayForm.Group>

        </div>

        <div class="row">
        <ClayForm.Group className={"col-4"} key={"Group-115"} >
        <label htmlFor="basicInput">{"Centro"}</label>
                              <ClaySelect aria-label="Select Label"
                                id={"a"}
                                name={"aa"}
                                key={"aaa"}
                                disabled={ false}
                                onChange={evt => {
                                    console.log("probando");
                                }}
                                value={0} >
                                
                                  <ClaySelect.Option
                                    key={ "option-"}
                                    label={"Aula CeMIT"}
                                    value={1}
                                  />
                                  <ClaySelect.Option
                                    key={ "option-"}
                                    label={"Aula poligono Barro"}
                                    value={2}
                                  />
                                
                              </ClaySelect>

        </ClayForm.Group>

        </div>

        </div>
    </>

)


}
