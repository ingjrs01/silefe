import ClayButton from '@clayui/button';
import ClayCard from "@clayui/card";
import ClayForm, { ClaySelect } from '@clayui/form';
import ClayLocalizedInput from '@clayui/localized-input';
import React, { useState } from "react";
import { Liferay } from '../../common/services/liferay/liferay';
import { locales, spritemap } from '../../includes/LiferayFunctions';
import { validateAll } from '../../includes/Validators';
import { ITEMS_ACTIONS } from "../../includes/reducers/actions";
import { TITULACIONES_ACTIONS } from "../../includes/reducers/titulaciones.reducer";

export const TitulacionForm = ({redTitulaciones, titulacionHandler, itemsHandle,items,save}) => {
    const [selectedLocale, setSelectedLocale] = useState(locales[0]);

    return(
        <>
            <ClayCard>
                <ClayCard.Body>
                    <ClayCard.Description displayType="title">
                        {Liferay.Language.get("Añadiendo titulación")}
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
                                onChange={evt => titulacionHandler({type: TITULACIONES_ACTIONS.SET_TITULACIONTIPO, value:evt.target.value}) }
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
                                onChange={evt => titulacionHandler({type: TITULACIONES_ACTIONS.SET_TITULACIONNIVEL, value:evt.target.value}) }
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
                                onChange={evt => titulacionHandler({ type:TITULACIONES_ACTIONS.SET_TITULACIONFAMILIA,value: evt.target.value}) }                                  
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
                              <ClayLocalizedInput
                                id={"tdescripcion"}
                                key={"tdescripcion"}
                                label={"Descripcion"}
                                locales={locales}
                                spritemap={spritemap}
                                onSelectedLocaleChange={setSelectedLocale}
                                onTranslationsChange={evt => {
                                  //validateLocalized(it, evt);
                                  itemsHandle({ type: ITEMS_ACTIONS.SET, fieldname: "descripcion", value: evt });
                                  console.log("escribiendo");
                                }
                                }
                                selectedLocale={selectedLocale}
                                translations={items.item["descripcion"]}
                              />

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
                            <ClayButton onClick={ () => {validateAll && save() }} 
                              displayType="primary">{Liferay.Language.get('Guardar')}
                            </ClayButton>
                        </div>
                    </div>
                </ClayCard.Body>
            </ClayCard>

        </>
    );


};
