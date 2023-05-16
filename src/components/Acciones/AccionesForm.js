import React, { useState } from "react";
import ClayTabs from '@clayui/tabs';
import ClayCard from "@clayui/card";
import ClayButton from '@clayui/button';
import ClayForm, { ClayInput, ClaySelect, ClayToggle, ClaySelectBox, ClayRadio, ClayRadioGroup, ClayCheckbox } from '@clayui/form';
import { ITEMS_ACTIONS } from '../../includes/reducers/items.reducer';

const AccionesForm = ({ items, itemsHandle }) => {
  const [tab, setTab] = useState(0);

  return (
    <ClayCard>
      <ClayCard.Body>
        <ClayCard.Description displayType="title">
          {Liferay.Language.get("Acciones")}
        </ClayCard.Description>

        <ClayCard.Description truncate={false} displayType="text">
          <ClayForm>

            <ClayTabs active={0} modern onActiveChange={e => { setActive(0) }}>
              <ClayTabs.Item
                key={"tab-item1"}
                innerProps={{ "aria-controls": "tabpanel-1" }}
              >
                <a onClick={a => { setTab(0) }}>  {"PRINCIPAL"}  </a>
              </ClayTabs.Item>
              <ClayTabs.Item
                key={"tab-item2"}
                innerProps={{ "aria-controls": "tabpanel-2" }}
              >
                <a onClick={a => { setTab(1) }}>  { Liferay.Language.get("Ejecución")}  </a>
              </ClayTabs.Item>

              <ClayTabs.Item
                key={"tab-item3"}
                innerProps={{ "aria-controls": "tabpanel-3" }}
              >
                <a onClick={a => { console.log("setting"); setTab(2); }}>  { Liferay.Language.get("Docentes")}  </a>
              </ClayTabs.Item>

            </ClayTabs>

            <ClayTabs.Content activeIndex={tab} fade>
              <ClayTabs.TabPane aria-labelledby="tab-1" key={"tab-content-1"}>
                  <div className="row"> 
                    <ClayForm.Group className={'has-success'} key={"Group-1"} >
                      <label htmlFor="basicInput">{"ACCION TIPO"}</label>
                      <ClaySelect aria-label="Select Label"
                        id={"accionTipoId"}
                        name={"accionTipoId"}
                        key={"accionTipoId"}
                        disabled={false}
                        onChange={evt => {
                          itemsHandle({ type: ITEMS_ACTIONS.SET, fieldname: evt.target.name, value: evt.target.value });
                        }}
                        value={items.item['accionTipoId']} >
                        {items.fields.fields['accionTipoId'].options.map(item => (
                          <ClaySelect.Option
                            key={"Aoption-" + item.value}
                            label={item.label}
                            value={item.value}
                          />
                        ))}
                      </ClaySelect>
                    </ClayForm.Group>
                  </div>

                {
                  (items.item.accionTipoId == 1) &&
                  <>
                    <div className="row">

                    <ClayForm.Group className={'has-success'} key={"Group-1"} >
                      <label htmlFor="basicInput">{"ACCION TIPO formacion"}</label>
                      <ClaySelect aria-label="Select Label"
                        id={"accionTipoFormacionId"}
                        name={"accionTipoFormacionId"}
                        key={"accionTipoFormacionId"}
                        disabled={false}
                        onChange={evt => {
                          itemsHandle({ type: ITEMS_ACTIONS.SET, fieldname: evt.target.name, value: evt.target.value });
                        }}
                        value={items.item['accionTipoFormacionId']} >
                        {items.fields.fields['accionTipoFormacionId'].options.map(item => (
                          <ClaySelect.Option
                            key={"AFoption-" + item.value}
                            label={item.label}
                            value={item.value}
                          />
                        ))}
                      </ClaySelect>
                    </ClayForm.Group>

                      <ClayForm.Group className={'has-success'} key={"Group-teorica"} >
                        <ClayToggle
                          label={items.fields.fields['teorica'].label}
                          onToggle={val => {
                            if (items.fields.fields['teorica'].hasOwnProperty("change"))
                              items.fields.fields['teorica'].change(val);
                            itemsHandle({ type: ITEMS_ACTIONS.SET, fieldname: 'teorica', value: val });
                          }}
                          toggled={items.item['teorica']}
                        />
                      </ClayForm.Group>

                      <ClayForm.Group className={'has-success'} key={"Group-practica"} >
                        <ClayToggle
                          label={items.fields.fields['practica'].label}
                          onToggle={val => {
                            if (items.fields.fields['practica'].hasOwnProperty("change"))
                              items.fields.fields['practica'].change(val);
                            itemsHandle({ type: ITEMS_ACTIONS.SET, fieldname: 'practica', value: val });
                          }}
                          toggled={items.item['practica']}
                        />
                      </ClayForm.Group>

                      <ClayForm.Group className={'has-success'} key={"Group-grupal"} >
                        <ClayToggle
                          label={items.fields.fields['grupal'].label}
                          onToggle={val => {
                            if (items.fields.fields['grupal'].hasOwnProperty("change"))
                              items.fields.fields['grupal'].change(val);
                            itemsHandle({ type: ITEMS_ACTIONS.SET, fieldname: 'grupal', value: val });
                          }}
                          toggled={items.item['grupal']}
                        />
                      </ClayForm.Group>
                    </div>
                  </>
                }

                <div className="row">
                <ClayForm.Group className={'has-success'} key={"Group-tecnico"} >
                  <label htmlFor="basicInput">{"TECNICO"}</label>
                  <ClaySelect aria-label="Select Label"
                    id={"tecnicoId"}
                    name={"tecnicoId"}
                    key={"tecnicoId"}
                    disabled={false}
                    onChange={evt => {
                      itemsHandle({ type: ITEMS_ACTIONS.SET, fieldname: evt.target.name, value: evt.target.value });
                    }}
                    value={items.item['tecnicoId']} >
                    {items.fields.fields['tecnicoId'].options.map(item => (
                      <ClaySelect.Option
                        key={"Aoption-" + item.value}
                        label={item.label}
                        value={item.value}
                      />
                    ))}
                  </ClaySelect>
                </ClayForm.Group>

                </div>


                <ClayForm.Group className={'has-success'} key={"Group-4"} >
                  <ClayInput
                    placeholder={"prueba"}
                    type="text"
                    name={"prueba-4"}
                    key={"prueba-4"}
                    value={"AAA"}
                    onChange={e => { console.log("estamos") }}>
                  </ClayInput>
                </ClayForm.Group>

              </ClayTabs.TabPane>

              <ClayTabs.TabPane aria-labelledby="tab-2" key={"tab-content-2"}>
                <ClayInput
                  placeholder={"prueba2"}
                  type="text"
                  name={"prueba-2"}
                  key={"prueba-2"}
                  value={"bbb"}
                  onChange={e => { console.log("estamos en 2") }}>
                </ClayInput>
              </ClayTabs.TabPane>

              <ClayTabs.TabPane aria-labelledby="tab-3" key={"tab-content-3"}>
                <ClayInput
                  placeholder={"prueba4"}
                  type="text"
                  name={"prueba-4"}
                  key={"prueba-4"}
                  value={"ccc"}
                  onChange={e => { console.log("estamos en 2") }}>
                </ClayInput>
              </ClayTabs.TabPane>

            </ClayTabs.Content>
          </ClayForm>

        </ClayCard.Description>

        <div className="btn-group">
          <div className="btn-group-item">
            <ClayButton aria-label="Cancel" onClick={e => console.log("pulsan en cancelar")} displayType="secondary">{Liferay.Language.get('Cancelar')}</ClayButton>
          </div>

          <div className="btn-group-item">
            <ClayButton aria-label="Save" onClick={() => {
              console.log("pulsan en guardar");
            }}
              displayType="primary">{Liferay.Language.get('Guardar')}
            </ClayButton>
          </div>
        </div>
      </ClayCard.Body>
    </ClayCard>
  );
}

export default AccionesForm;