import React from "react";
import ClayForm, { ClayInput, ClaySelect, ClayCheckbox } from '@clayui/form';
import ClayDatePicker from '@clayui/date-picker';
import { getMonths, getDays } from '../../includes/interface/DatesLang';
import { getLanguageId } from '../../includes/LiferayFunctions';
import { EJECUCION_ACTIONS } from './Ejecucion.reducer';

const spritemap = "./o/my-project/icons.svg";

export const Formacion = ({ ejecucion, ejecucionHandler }) => {

    return (
        <>
            <div class="container">

                <h3>{"Tipo de Formacion"}</h3>
                <div class="row">
                    <ClayForm.Group className={"col-3"} key={"Group-101"} >
                        <label htmlFor="basicInput">{"Fecha Inicio"}</label>
                        <ClayDatePicker
                            onChange={val => ejecucionHandler({ type: EJECUCION_ACTIONS.SETFIELD, fieldname: "inicio", value: val })}
                            firstDayOfWeek={1}
                            months={getMonths(getLanguageId())}
                            spritemap={spritemap}
                            timezone="GMT+01:00"
                            value={ejecucion.item.inicio}
                            weekdaysShort={getDays(getLanguageId())}
                            years={{
                                end: (((new Date().getFullYear()) + 2)),
                                start: ((new Date().getFullYear() - 0))
                            }}
                        />
                    </ClayForm.Group>
                    <ClayForm.Group className={"col-3"} key={"Group-102"} >
                        <label htmlFor="basicInput">{"Fecha fin"}</label>
                        <ClayDatePicker
                            onChange={val => ejecucionHandler({ type: EJECUCION_ACTIONS.SETFIELD, fieldname: 'fin', value: val })}
                            //placeholder={items.fields.fields[it].placeholder}
                            firstDayOfWeek={1}
                            months={getMonths(getLanguageId())}
                            spritemap={spritemap}
                            timezone="GMT+01:00"
                            value={ejecucion.item.fin}
                            weekdaysShort={getDays(getLanguageId())}
                            years={{
                                end: (((new Date().getFullYear()) + 2)),
                                start: ((new Date().getFullYear() - 0))
                            }}
                        />

                    </ClayForm.Group>

                    <div class="col-6">
                        <div class="row">
                            <ClayForm.Group className={"col-1"} key={"Group-103"} >
                                <label htmlFor="basicInput">{"L"}</label>
                                <ClayCheckbox
                                    checked={ejecucion.item.dias.L.value}
                                    onChange={() => ejecucionHandler({ type: EJECUCION_ACTIONS.SETFIELD, fieldname: "dias",value:"L" })}
                                />
                            </ClayForm.Group>

                            <ClayForm.Group className={"col-1"} key={"Group-104"} >
                                <label htmlFor="basicInput">{"M"}</label>
                                <ClayCheckbox 
                                    checked={ejecucion.item.dias.M.value} 
                                    onChange={() => ejecucionHandler({ type: EJECUCION_ACTIONS.SETFIELD, fieldname: "dias",value:"M" })}
                                />
                            </ClayForm.Group>

                            <ClayForm.Group className={"col-1"} key={"Group-105"} >
                                <label htmlFor="basicInput">{"X"}</label>
                                <ClayCheckbox 
                                    checked={ejecucion.item.dias.X.value} 
                                    onChange={() => ejecucionHandler({ type: EJECUCION_ACTIONS.SETFIELD, fieldname: "dias",value:"X" })}
                                />
                            </ClayForm.Group>

                            <ClayForm.Group className={"col-1"} key={"Group-106"} >
                                <label htmlFor="basicInput">{"J"}</label>
                                <ClayCheckbox 
                                    checked={ejecucion.item.dias.J.value} 
                                    onChange={() => ejecucionHandler({ type: EJECUCION_ACTIONS.SETFIELD, fieldname: "dias",value:"J" })}
                                />
                            </ClayForm.Group>

                            <ClayForm.Group className={"col-1"} key={"Group-107"} >
                                <label htmlFor="basicInput">{"V"}</label>
                                <ClayCheckbox 
                                    checked={ejecucion.item.dias.V.value} 
                                    onChange={() => ejecucionHandler({ type: EJECUCION_ACTIONS.SETFIELD, fieldname: "dias",value:"V" })}
                                />
                            </ClayForm.Group>

                            <ClayForm.Group className={"col-1"} key={"Group-108"} >
                                <label htmlFor="basicInput">{"S"}</label>
                                <ClayCheckbox 
                                    checked={ejecucion.item.dias.S.value} 
                                    onChange={() => ejecucionHandler({ type: EJECUCION_ACTIONS.SETFIELD, fieldname: "dias",value:"S" })}
                                />
                            </ClayForm.Group>

                            <ClayForm.Group className={"col-1"} key={"Group-109"} >
                                <label htmlFor="basicInput">{"D"}</label>
                                <ClayCheckbox 
                                    checked={ejecucion.item.dias.D.value} 
                                    onChange={() => ejecucionHandler({ type: EJECUCION_ACTIONS.SETFIELD, fieldname: "dias",value:"D" })}
                                />
                            </ClayForm.Group>
                        </div>
                    </div>
                </div>
                <div class="row">

                    <ClayForm.Group className={"col-2"} key={"Group-110"} >
                        <label htmlFor="basicInput">{"Hora Inicio M."}</label>
                        <ClayInput
                            placeholder={"prueba2"}
                            type="time"
                            name={"escondido-3"}
                            key={"prueba-4"}
                            value={ejecucion.item.hIni1}
                            onChange={evt => ejecucionHandler({type:EJECUCION_ACTIONS.SETFIELD, fieldname: "hIni1", value:evt.target.value })}
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
                            value={ejecucion.item.hFin1}
                            onChange={evt => ejecucionHandler({type:EJECUCION_ACTIONS.SETFIELD, fieldname: "hFin1", value:evt.target.value })}
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
                            value={ejecucion.item.hIni2}
                            onChange={evt => ejecucionHandler({type:EJECUCION_ACTIONS.SETFIELD, fieldname: "hIni2", value:evt.target.value })}
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
                            value={ejecucion.item.hFin2}
                            onChange={evt => ejecucionHandler({type:EJECUCION_ACTIONS.SETFIELD, fieldname: "hFin2", value:evt.target.value })}
                        >
                        </ClayInput>
                    </ClayForm.Group>
                </div>

                <div class="row">
                    <ClayForm.Group className={"col-4"} key={"Group-114"} >
                        <label htmlFor="basicInput">{"Empresa"}</label>
                        <ClaySelect aria-label="Select Label"
                            id={"entidadId"}
                            name={"entidadId"}
                            key={"entidadId"}
                            disabled={false}
                            onChange={evt => {
                                console.log("probando el cambio de empresa");
                                ejecucionHandler({ type: EJECUCION_ACTIONS.SETFIELD, fieldname: "entidadId", value: evt.target.value })
                            }}
                            value={ejecucion.item.entidadId} >
                            {
                                ejecucion.form.fields.empresaId.options.map( option => (
                                    <ClaySelect.Option
                                        key={"option-"+option.label+option.value}
                                        label={option.label}
                                        value={option.value}
                                    />
                                ))
                            }

                        </ClaySelect>
                    </ClayForm.Group>
                </div>
                <div class="row">
                    <ClayForm.Group className={"col-4"} key={"Group-115"} >
                        <label htmlFor="basicInput">{"Centro"}</label>
                        <ClaySelect aria-label="Select Label"
                            id={"lugarId"}
                            name={"lugarId"}
                            key={"lugarId"}
                            disabled={false}
                            onChange={evt => {
                                ejecucionHandler({type: EJECUCION_ACTIONS.SETFIELD, fieldname: "lugarId", value:evt.target.value})
                            }}
                            value={ejecucion.item.lugarId} >                                
                            {
                                ejecucion.form.fields.lugarId.options.map( option => (
                                    <ClaySelect.Option
                                        key={"option-"+option.label+option.value}
                                        label={option.label}
                                        value={option.value}
                                    />
                                ))
                            }
                        </ClaySelect>
                    </ClayForm.Group>
                </div>
            </div>
        </>
    )

}
