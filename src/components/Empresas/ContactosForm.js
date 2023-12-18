import ClayButton, { ClayButtonWithIcon } from '@clayui/button';
import ClayCard from "@clayui/card";
import ClayForm, { ClayCheckbox, ClayInput } from '@clayui/form';
import React from "react";
import { Liferay } from '../../common/services/liferay/liferay';
import { spritemap } from '../../includes/LiferayFunctions';
import { CONTACTOS_ACTIONS } from "../../includes/reducers/contactos.reducer";

export const ContactosForm = ({ redContactos, contactosHandle }) => {

  return (
    <>
      <ClayCard>
        <ClayCard.Body>
          <ClayCard.Description displayType="title">
            {Liferay.Language.get("Contacto")}
          </ClayCard.Description>
          <ClayCard.Description truncate={false} displayType="text">
            <ClayForm >
              <div className="row">
                <ClayForm.Group className="col">
                  <label htmlFor="basicInput">{Liferay.Language.get("Nombre")}</label>
                  <ClayInput
                    placeholder={Liferay.Language.get("Nombre")}
                    type="text"
                    name={"nombre"}
                    key={"nombre"}
                    value={redContactos.item.nombre}
                    onChange={e => contactosHandle({ type: CONTACTOS_ACTIONS.SETFIELD, fieldname: 'nombre', value: e.target.value })}>
                  </ClayInput>
                </ClayForm.Group>
                <ClayForm.Group className="col">
                  <label htmlFor="apellido1">{Liferay.Language.get("Apellido1")}</label>
                  <ClayInput
                    placeholder={Liferay.Language.get("Apellido")}
                    type="text"
                    name={"Apellido1"}
                    key={"Apellido1"}
                    value={redContactos.item.apellido1}
                    onChange={e => {
                      contactosHandle({ type: CONTACTOS_ACTIONS.SETFIELD, fieldname: 'apellido1', value: e.target.value });
                    }}>
                  </ClayInput>
                </ClayForm.Group>

                <ClayForm.Group className="col">
                  <label htmlFor="apellido2">{Liferay.Language.get("Apellido2")}</label>
                  <ClayInput
                    placeholder={ Liferay.Language.get("Apellido")}
                    type="text"
                    name={"Apellido2"}
                    key={"Apellido2"}
                    value={redContactos.item.apellido2}
                    onChange={e => {
                      contactosHandle({ type: CONTACTOS_ACTIONS.SETFIELD, fieldname: 'apellido2', value: e.target.value });
                    }}>
                  </ClayInput>
                </ClayForm.Group>
              </div>
              <div className="row">
                <ClayForm.Group className="col">
                  <label htmlFor="basicInput">{Liferay.Language.get("Teléfono")}</label>
                  {
                    redContactos.item.telefono.map((v, k) => {
                      return (
                        <>
                          <ClayInput.Group spaced={"any"}>
                            <ClayInput
                              key={"telefono"}
                              type="text"
                              name={"telefono"}
                              value={v.value}
                              onChange={e => contactosHandle({ type: CONTACTOS_ACTIONS.SET_MULTIFIELD, fieldname: e.target.name, pos: k, value: e.target.value })}
                            />
                            <ClayCheckbox
                              aria-label="I'm checked indefinitely"
                              checked={v.default}
                              containerProps={{ id: "test" }}
                              onChange={() => contactosHandle({ type: CONTACTOS_ACTIONS.SET_MULTIFIELDCHECK, fieldname: "telefono", pos: k })}
                            />
                            <ClayButtonWithIcon
                              aria-label="Close" displayType="secondary" spritemap={spritemap} symbol="times" title="Close"
                              onClick={e => contactosHandle({ type: CONTACTOS_ACTIONS.REMOVE_MULTIFIELD, fieldname: "telefono", pos: k })}
                            >X</ClayButtonWithIcon>
                          </ClayInput.Group>
                        </>
                      )
                    })
                  }
                  <ClayButton size={"xs"}
                    displayType={"secondary"}
                    onClick={evt => contactosHandle({ type: CONTACTOS_ACTIONS.ADD_MULTIFIELD, fieldname: "telefono" })}>
                    {Liferay.Language.get("Añadir")}
                  </ClayButton>
                </ClayForm.Group>
                <ClayForm.Group className="col">
                  <label htmlFor="basicInput">{Liferay.Language.get("Email")}</label>
                  {
                    redContactos.item.email.map((v, k) => {
                      return (
                        <>
                          <ClayInput.Group spaced={"any"}>
                            <ClayInput
                              key={"email"}
                              type="text"
                              name={"email"}
                              value={v.value}
                              onChange={e => contactosHandle({ type: CONTACTOS_ACTIONS.SET_MULTIFIELD, fieldname: e.target.name, pos: k, value: e.target.value })}
                            />
                            <ClayCheckbox
                              aria-label="Chequea aquí"
                              checked={v.default}
                              containerProps={{ id: "test" }}
                              onChange={() => contactosHandle({ type: CONTACTOS_ACTIONS.SET_MULTIFIELDCHECK, fieldname: "email", pos: k })}
                            />
                            <ClayButtonWithIcon
                              aria-label="Close" displayType="secondary" spritemap={spritemap} symbol="times" title="Close"
                              onClick={e => contactosHandle({ type: CONTACTOS_ACTIONS.REMOVE_MULTIFIELD, fieldname: "email", pos: k })}
                            >X</ClayButtonWithIcon>
                          </ClayInput.Group>
                        </>
                      )
                    })
                  }
                  <ClayButton size={"xs"}
                    displayType={"secondary"}
                    onClick={evt => contactosHandle({ type: CONTACTOS_ACTIONS.ADD_MULTIFIELD, fieldname: "email" })}>
                    {Liferay.Language.get("Añadir")}
                  </ClayButton>
                </ClayForm.Group>
                <ClayForm.Group className="col">
                  <label htmlFor="cargo">{Liferay.Language.get("Cargo")}</label>
                  <ClayInput
                    placeholder={ Liferay.Language.get("Cargo")}
                    type="text"
                    name={"cargo"}
                    key={"cargo"}
                    value={redContactos.item.cargo}
                    onChange={e => contactosHandle({ type: CONTACTOS_ACTIONS.SETFIELD, fieldname: 'cargo', value: e.target.value })}>
                  </ClayInput>
                </ClayForm.Group>
              </div>

            </ClayForm>
          </ClayCard.Description>
          <div className="btn-group">
            <div className="btn-group-item">
              <ClayButton onClick={e => contactosHandle({ type: CONTACTOS_ACTIONS.CANCEL })} displayType="secondary">{Liferay.Language.get('Cancelar')}</ClayButton>
            </div>
            <div className="btn-group-item">
              <ClayButton onClick={() => {
                console.log("Guardnado");
                contactosHandle({ type: CONTACTOS_ACTIONS.SAVE });
              }}
                displayType="primary">{Liferay.Language.get('Guardar')}
              </ClayButton>
            </div>
          </div>
        </ClayCard.Body>
      </ClayCard>

    </>
  );


}
