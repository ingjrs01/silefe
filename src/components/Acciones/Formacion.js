import { ClayButtonWithIcon } from '@clayui/button';
import ClayCard from '@clayui/card';
import ClayForm, { ClayCheckbox } from '@clayui/form';
import React from "react";
import { Link } from "react-router-dom";
import { Liferay } from '../../common/services/liferay/liferay';
import { spritemap } from '../../includes/LiferayFunctions';
import { Dateinput } from '../../includes/interface/fields/Dateinput';
import { Hour } from '../../includes/interface/fields/Hour';
import { Select } from '../../includes/interface/fields/Select';
import { EJECUCION_ACTIONS } from './Ejecucion.reducer';

export const Formacion = ({ ejecucion, ejecucionHandler }) => {
    
    const editUrl = "/lugar/";
    const backUrl = "/accion/";
    const ancestorId = "11";
    const empresaUrl = '/empresa/';

    console.log("estoy en Formacion");
    console.debug(ejecucion);

    return (
        <>
            <div className="container">
                <div className="row">
                    <Dateinput itemsHandle={ejecucionHandler} field={ejecucion.form.fields["inicio"]} item={ejecucion.item.inicio} action={EJECUCION_ACTIONS.SETFIELD} error={ejecucion.errors['inicio']} />
                    <Dateinput itemsHandle={ejecucionHandler} field={ejecucion.form.fields["fin"]} item={ejecucion.item.fin} action={EJECUCION_ACTIONS.SETFIELD} error={ejecucion.errors['fin']}  />

                    <div className="col-6">
                        <div className="row">
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
                <div className="row">
                    <Hour itemsHandle={ejecucionHandler} field={ejecucion.form.fields["hIni1"]} item={ejecucion.item.hIni1} action={EJECUCION_ACTIONS.SETFIELD} error={ejecucion.errors['hIni1']}  />
                    <Hour itemsHandle={ejecucionHandler} field={ejecucion.form.fields["hFin1"]} item={ejecucion.item.hFin1} action={EJECUCION_ACTIONS.SETFIELD} error={ejecucion.errors['hFin1']}  />
                    <Hour itemsHandle={ejecucionHandler} field={ejecucion.form.fields["hIni2"]} item={ejecucion.item.hIni2} action={EJECUCION_ACTIONS.SETFIELD} error={ejecucion.errors['hIni2']} />
                    <Hour itemsHandle={ejecucionHandler} field={ejecucion.form.fields["hFin2"]} item={ejecucion.item.hFin2} action={EJECUCION_ACTIONS.SETFIELD} error={ejecucion.errors['hFin2']}  />
                </div>

                <div className="row">
                    <ClayForm.Group className={"col-6"} key={"Group-114"} >
                        <Select  itemsHandle={ejecucionHandler} field={ejecucion.form.fields["empresaId"]} item={ejecucion.item.empresaId} action={EJECUCION_ACTIONS.SETFIELD} error={ejecucion.errors['empresaId']}  /> 
                        
                        <ClayCard>
                            <ClayCard.Body>
                            <ClayCard.Description displayType="title">
                                {"Datos empresa"}
                            </ClayCard.Description>
                            <ClayCard.Description truncate={false} displayType="text">
                                {
                                    <>
                                    <p></p>
                                    <p>{ejecucion.item.empresa.razonSocial} - {ejecucion.item.empresa.documento}
                                    <Link to={{ pathname: `${empresaUrl}${ejecucion.item.empresaId}` }} state={{ backUrl, ancestorId }}  > {
                                        <ClayButtonWithIcon
                                            aria-label={Liferay.Language.get("Editar")}
                                            spritemap={spritemap}
                                            symbol="pencil"
                                            title="editar"
                                            displayType="secondary"
                                            size="xs"
                                            className='ml-1'
                                        />
                                    }</Link>

                                    </p>
                                    </>
                                }
                            </ClayCard.Description>
                            
                            </ClayCard.Body>
                        </ClayCard>

                    </ClayForm.Group>
                    <ClayForm.Group className={"col-6"} key={"Group-115"} >
                        <Select  itemsHandle={ejecucionHandler} field={ejecucion.form.fields["lugarId"]} item={ejecucion.item.lugarId} action={EJECUCION_ACTIONS.SETFIELD} error={ejecucion.errors['lugarId']}  /> 
                        <ClayCard>
                            <ClayCard.Body>
                            <ClayCard.Description displayType="title">
                                {"Datos lugar"}
                            </ClayCard.Description>
                            <ClayCard.Description truncate={false} displayType="text">
                                {
                                    <>
                                    <p></p>
                                    <p>{ejecucion.item.lugar.nombre}
                                    <Link to={{ pathname: `${editUrl}${ejecucion.item.lugarId}` }} state={{ backUrl, ancestorId }}  > {
                                        <ClayButtonWithIcon
                                            aria-label={Liferay.Language.get("Editar")}
                                            spritemap={spritemap}
                                            symbol="pencil"
                                            title="editar"
                                            displayType="secondary"
                                            size="xs"
                                            className='ml-1'
                                        />
                                    }</Link>
                                    </p>
                                    <p>{ejecucion.item.lugar.provincia} - {ejecucion.item.lugar.municipio} - {ejecucion.item.lugar.localidad}</p>
                                    <p>{ejecucion.item.lugar.via} - {ejecucion.item.lugar.numero} - {ejecucion.item.lugar.piso}</p>
                                    </>
                                }
                            </ClayCard.Description>
                            
                            </ClayCard.Body>
                        </ClayCard>
                    </ClayForm.Group>
                </div>
            </div>
        </>
    )

}