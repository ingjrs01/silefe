import ClayButton from '@clayui/button';
import ClayCard from "@clayui/card";
import ClayForm, { ClayInput, ClaySelect } from '@clayui/form';
import React from "react";
import { Liferay } from '../../common/services/liferay/liferay';
import { CENTROS_ACTIONS } from "../../includes/reducers/centros.reducer";

export const CentrosForm = ({ reducer, centrosHandle }) => {

  return (
    <>
      <ClayCard>
        <ClayCard.Body>
          <ClayCard.Description displayType="title">
            {Liferay.Language.get("Centro")}
          </ClayCard.Description>
          <ClayCard.Description truncate={false} displayType="text">
            <ClayForm >
              <div className="row">
                <ClayForm.Group className="col-10">
                  <label htmlFor="basicInput">{Liferay.Language.get("Nombre")}</label>
                  <ClayInput
                    placeholder={"placeholder"}
                    type="text"
                    name={"nombre"}
                    key={"nombre"}
                    value={reducer.item.nombre}
                    onChange={e => {
                      centrosHandle({ type: CENTROS_ACTIONS.SETFIELD, fieldname: 'nombre', value: e.target.value });
                    }}>
                  </ClayInput>
                </ClayForm.Group>

                <ClayForm.Group className="col-2">
                  <label htmlFor="cp">{Liferay.Language.get("CP")}</label>
                  <ClayInput
                    placeholder={"00000"}
                    type="text"
                    name={"cp"}
                    key={"cp"}
                    value={reducer.item.cp}
                    onChange={e => {
                      centrosHandle({ type: CENTROS_ACTIONS.SETFIELD, fieldname: 'cp', value: e.target.value });
                    }}>
                  </ClayInput>
                </ClayForm.Group>

              </div>
              <div className="row">
                <ClayForm.Group className="col">
                  <label htmlFor="basicInput">{Liferay.Language.get("Provincia")}</label>
                  <ClaySelect aria-label="Select Label"
                    id={"provinciaId"}
                    name={"provinciaId"}
                    key={"provinciaId"}
                    disabled={false}
                    onChange={evt => centrosHandle({type: CENTROS_ACTIONS.SETFIELD, fieldname: 'provinciaId', value: evt.target.value}) }
                    value={reducer.item.provinciaId} >
                    {
                      reducer.provincias.map(option => {
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
                  <label htmlFor="basicInput">{Liferay.Language.get("Municipio")}</label>
                  <ClaySelect aria-label="Select Label"
                    id={"municipioId"}
                    name={"municipioId"}
                    key={"municipioId"}
                    disabled={false}
                    onChange={evt => centrosHandle({type: CENTROS_ACTIONS.SETFIELD, fieldname: 'municipioId', value: evt.target.value}) }
                    value={reducer.item.municipioId} >
                    {
                      reducer.municipios.map(option => {
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
                  <label htmlFor="basicInput">{Liferay.Language.get("Localidad")}</label>
                  <ClayInput
                    placeholder={Liferay.Language.get("Localidad")}
                    type="text"
                    name={"localidad"}
                    key={"localidad"}
                    value={reducer.item.localidad}
                    onChange={e => {
                      centrosHandle({ type: CENTROS_ACTIONS.SETFIELD, fieldname: 'localidad', value: e.target.value });
                    }}>
                  </ClayInput>
                </ClayForm.Group>
              </div>
              <div className="row">
              <ClayForm.Group className="col-3">
                  <label htmlFor="tipoViaId">{Liferay.Language.get("TiposVia")}</label>
                  <ClaySelect aria-label="Select Label"
                    id={"tipoViaId"}
                    name={"tipoViaId"}
                    key={"tipoViaId"}
                    disabled={false}
                    onChange={evt => centrosHandle({type: CENTROS_ACTIONS.SETFIELD, fieldname: 'tipoViaId', value: evt.target.value}) }
                    value={reducer.item.tipoViaId} >
                    {
                      reducer.tipos_via.map(option => {
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

                <ClayForm.Group className="col-5">
                  <label htmlFor="nombreVia">{Liferay.Language.get("NombreVia")}</label>
                  <ClayInput
                    placeholder={Liferay.Language.get("NombreVia")}
                    type="text"
                    name={"nombreVia"}
                    key={"nombreVia"}
                    value={reducer.item.nombreVia}
                    onChange={e => {
                      centrosHandle({ type: CENTROS_ACTIONS.SETFIELD, fieldname: 'nombreVia', value: e.target.value });
                    }}>
                  </ClayInput>
                </ClayForm.Group>

                <ClayForm.Group className="col-2">
                  <label htmlFor="numero">{Liferay.Language.get("Numero")}</label>
                  <ClayInput
                    placeholder={Liferay.Language.get("Numero")}
                    type="text"
                    name={"numero"}
                    key={"numero"}
                    value={reducer.item.numero}
                    onChange={e => {
                      centrosHandle({ type: CENTROS_ACTIONS.SETFIELD, fieldname: 'numero', value: e.target.value });
                    }}>
                  </ClayInput>
                </ClayForm.Group>

                <ClayForm.Group className="col-2">
                  <label htmlFor="piso">{Liferay.Language.get("Piso")}</label>
                  <ClayInput
                    placeholder={Liferay.Language.get("Piso")}
                    type="text"
                    name={"piso"}
                    key={"piso"}
                    value={reducer.item.piso}
                    onChange={e => {
                      centrosHandle({ type: CENTROS_ACTIONS.SETFIELD, fieldname: 'piso', value: e.target.value });
                    }}>
                  </ClayInput>
                </ClayForm.Group>

              </div>

            </ClayForm>
          </ClayCard.Description>
          <div className="btn-group">
            <div className="btn-group-item">
              <ClayButton onClick={e => centrosHandle({ type: CENTROS_ACTIONS.CANCEL })} displayType="secondary">{Liferay.Language.get('Cancelar')}</ClayButton>
            </div>
            <div className="btn-group-item">
              <ClayButton onClick={() => centrosHandle({ type: CENTROS_ACTIONS.SAVE })}
                displayType="primary">{Liferay.Language.get('Guardar')}
              </ClayButton>
            </div>
          </div>
        </ClayCard.Body>
      </ClayCard>

    </>
  );


};
