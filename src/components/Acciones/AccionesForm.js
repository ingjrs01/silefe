import ClayButton, { ClayButtonWithIcon } from '@clayui/button';
import ClayCard from "@clayui/card";
import ClayDatePicker from '@clayui/date-picker';
import ClayForm, { ClayInput, ClaySelect, ClayToggle } from '@clayui/form';
import ClayLocalizedInput from '@clayui/localized-input';
import ClayPanel from '@clayui/panel';
import ClayTabs from '@clayui/tabs';
import React, { useState } from "react";
import { Liferay } from '../../common/services/liferay/liferay';
import { getLanguageId, locales, spritemap } from '../../includes/LiferayFunctions';
import { getDays, getMonths } from '../../includes/interface/DatesLang';
import ParticipantesTable from '../../includes/interface/ParticipantesTable';
import { ITEMS_ACTIONS } from '../../includes/reducers/items.reducer';
import { Formacion } from './Formacion';

const AccionesForm = ({ save, items, itemsHandle, docentes, docentesHandler, participantes, participantesHandler, ejecucion, ejecucionHandler, loadHistory }) => {
  const [selectedLocale, setSelectedLocale] = useState(locales[0]);

  return (
    <div className="container">
    <ClayCard>
      <ClayCard.Body>
        <ClayCard.Description displayType="title">
          {Liferay.Language.get("Acciones")}
        </ClayCard.Description>

        <ClayCard.Description truncate={false} displayType="text">
          <ClayForm>
            <ClayTabs active={items.fields.tabActive} modern>
              <ClayTabs.Item
                key={"tab-item1"}
                innerProps={{ "aria-controls": "tabpanel-1" }}
              >
                <a onClick={() => itemsHandle({type: ITEMS_ACTIONS.SET_ACTIVETAB, active: 0}) }> { Liferay.Language.get("PRINCIPAL") } </a>
              </ClayTabs.Item>
              <ClayTabs.Item
                key={"tab-item2"}
                innerProps={{ "aria-controls": "tabpanel-2" }}
              >
                <a onClick={() =>  itemsHandle({type: ITEMS_ACTIONS.SET_ACTIVETAB, active: 1}) }>  { Liferay.Language.get("Ejecución")}  </a>
              </ClayTabs.Item>

              <ClayTabs.Item
                key={"tab-item3"}
                innerProps={{ "aria-controls": "tabpanel-3" }}
              >
                <a onClick={() => itemsHandle({type: ITEMS_ACTIONS.SET_ACTIVETAB, active: 2})}>  { Liferay.Language.get("Docentes")}  </a>
              </ClayTabs.Item>
              <ClayTabs.Item
                key={"tab-item4"}
                innerProps={{ "aria-controls": "tabpanel-4" }}
              >
                <a onClick={() => itemsHandle({type: ITEMS_ACTIONS.SET_ACTIVETAB, active: 3})}>  { Liferay.Language.get("Participantes")}  </a>
              </ClayTabs.Item>
              <ClayTabs.Item
                key={"tab-item5"}
                innerProps={{ "aria-controls": "tabpanel-5" }}
              >
                <a onClick={() => itemsHandle({type: ITEMS_ACTIONS.SET_ACTIVETAB, active: 4})}>  { Liferay.Language.get("Elearning")}  </a>
              </ClayTabs.Item>
              <ClayTabs.Item
                key={"tab-item6"}
                innerProps={{ "aria-controls": "tabpanel-5" }}
              >
                <a onClick={() => itemsHandle({type: ITEMS_ACTIONS.SET_ACTIVETAB, active: 5})}>  { Liferay.Language.get("Estado")}  </a>
              </ClayTabs.Item>

            </ClayTabs>

            <ClayTabs.Content activeIndex={items.fields.tabActive} fade>
              <ClayTabs.TabPane aria-labelledby="tab-1" key={"tab-content-1"}>
                  <div className="row"> 
                    <ClayForm.Group className={'has-success col'} key={"Group-1"} >
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
                    <ClayForm.Group className={'has-success col'} key={"Group-nombre"} >
                      <ClayLocalizedInput
                        id={items.item['nombre']}
                        key={items.fields.fields['nombre'].key}
                        label={items.fields.fields['nombre'].label}
                        locales={locales}
                        spritemap={spritemap}
                        onSelectedLocaleChange={setSelectedLocale}
                        onTranslationsChange={evt => {
                          itemsHandle({ type: ITEMS_ACTIONS.SET, fieldname: 'nombre', value: evt });
                        }
                        }
                        selectedLocale={selectedLocale}
                        translations={items.item['nombre']}
                      />
                    </ClayForm.Group>

                  </div>
                {
                  (items.item.accionTipoId == 1) &&
                  <>
                    <div className="row">

                    <ClayForm.Group className={'has-success col'} key={"Group-1"} >
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

                      <ClayForm.Group className={'has-success col'} key={"Group-teorica"} >
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

                      <ClayForm.Group className={'has-success col'} key={"Group-practica"} >
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

                      <ClayForm.Group className={'has-success col'} key={"Group-grupal"} >
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

                      <ClayForm.Group className={'has-success  col'} key={"Group-nhoras"} >
                    <label htmlFor="basicInput">{items.fields.fields['horas'].label}</label>
                    <ClayInput
                      placeholder={items.fields.fields['horas'].placeholder}
                      type="text"
                      name={items.fields.fields['horas'].name}
                      key={items.fields.fields['horas'].name}
                      value={items.item['horas']}
                      onChange={e => {
                        itemsHandle({ type: ITEMS_ACTIONS.SET, fieldname: e.target.name, value: e.target.value });
                      }}>
                    </ClayInput>
                  </ClayForm.Group>

                    </div>
                  </>
                }

                <div className="row">
                <ClayForm.Group className={'has-success col'} key={"Group-tecnico"} >
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
                <div className="row">
                <ClayForm.Group className={'has-success'} key={"Group-4"} >
                </ClayForm.Group>
                </div>

              </ClayTabs.TabPane>

              <ClayTabs.TabPane aria-labelledby="tab-2" key={"tab-content-2"}>
                {
                  (items.item.accionTipoId != 1) &&
                  <>
                  <div className="row">

                    <ClayForm.Group className={"col-6"} key={"Group-91"} >
                            <label htmlFor="basicInput">{"Fecha Inicio"}</label>
                            <ClayDatePicker
                                onChange={val => console.log("aaa")}
                                firstDayOfWeek={1}
                                months={getMonths(getLanguageId())}
                                spritemap={spritemap}
                                timezone="GMT+01:00"
                                value={"2023-08-23"}
                                weekdaysShort={getDays(getLanguageId())}
                                years={{
                                  end: (((new Date().getFullYear()) + 2)),
                                  start: ((new Date().getFullYear() - 0))
                                }}
                                />
                    </ClayForm.Group>

                    <ClayForm.Group className={"col-6"} key={"Group-92"} >
                            <label htmlFor="basicInput">{"Fecha Fin"}</label>
                            <ClayDatePicker
                                onChange={val => console.log("aaa")}
                                firstDayOfWeek={1}
                                months={getMonths(getLanguageId())}
                                spritemap={spritemap}
                                timezone="GMT+01:00"
                                value={"2023-08-01"}
                                weekdaysShort={getDays(getLanguageId())}
                                years={{
                                  end: (((new Date().getFullYear()) + 2)),
                                  start: ((new Date().getFullYear() - 0))
                                }}
                                />
                    </ClayForm.Group>
                    </div>
                  </>
                }
                {
                  (items.item.accionTipoId == 1 || items.item.accionTipoId == 3) &&
                  <>
                  <ClayPanel
                    collapsable
                    displayTitle="Formación Teórica"
                    displayType="secondary"
                    showCollapseIcon={true}
                    spritemap={spritemap}
                  >
                  <ClayPanel.Body>
                    <Formacion
                      ejecucion={ejecucion[0]}
                      ejecucionHandler={ejecucionHandler[0]}
                    />
                  </ClayPanel.Body>
                  </ClayPanel>

                  <ClayPanel
                    collapsable
                    displayTitle="Formación Práctica"
                    displayType="secondary"
                    showCollapseIcon={true}
                    spritemap={spritemap}
                  >
                  <ClayPanel.Body>
                    <Formacion
                      ejecucion={ejecucion[1]}
                      ejecucionHandler={ejecucionHandler[1]}
                    />
                  </ClayPanel.Body>
                  </ClayPanel>

                  <ClayPanel
                    collapsable
                    displayTitle="Formación Grupal"
                    displayType="secondary"
                    showCollapseIcon={true}
                    spritemap={spritemap}
                  >
                  <ClayPanel.Body>
                    <Formacion
                      ejecucion={ejecucion[2]}
                      ejecucionHandler={ejecucionHandler[2]}
                    />
                  </ClayPanel.Body>
                  </ClayPanel>


                  </>

                }

              </ClayTabs.TabPane>

              <ClayTabs.TabPane aria-labelledby="tab-3" key={"tab-content-3"}>
                
                <ParticipantesTable
                  participantes={docentes}
                  participantesHandler={docentesHandler}
                  editUrl={"/docente/"}
                  backUrl={"/accion/"}
                  ancestorId={items.item.id}
  
                />
                
              </ClayTabs.TabPane>

              <ClayTabs.TabPane aria-labelledby="tab-4" key={"tab-content-4"}>
                <ParticipantesTable
                  participantes={participantes}
                  participantesHandler={participantesHandler}
                  editUrl={"/participante/"}
                  backUrl={"/accion/"}
                  ancestorId={items.item.id}
                  />
              </ClayTabs.TabPane>
              <ClayTabs.TabPane aria-labelledby="tab-5" key={"tab-content-5"}>
                <h3>{"ELEARNING"}</h3>
                <div className="row">
                  <ClayForm.Group className={'has-success  col'} key={"Group-plataforma"} >
                    <label htmlFor="basicInput">{items.fields.fields['plataformaId'].label}</label>
                    <ClaySelect aria-label="Select Label"
                      id={items.fields.fields['plataformaId'].name}
                      name={items.fields.fields['plataformaId'].name}
                      key={items.fields.fields['plataformaId'].key}
                      disabled={false}
                      onChange={evt => {
                        itemsHandle({ type: ITEMS_ACTIONS.SET, fieldname: evt.target.name, value: evt.target.value });
                      }}
                      value={items.item['plataformaId']} >
                      {items.fields.fields['plataformaId'].options.map(item => (
                        <ClaySelect.Option
                          key={ "option-" + items.fields.fields['plataformaId'] + item.value}
                          label={item.label}
                          value={item.value}
                        />
                      ))}
                    </ClaySelect>
                  </ClayForm.Group>

                  <ClayForm.Group className={'has-success col'} key={"Group-categoria"} >
                    <label htmlFor="basicInput">{items.fields.fields['categoriaId'].label}</label>
                    <ClaySelect aria-label="Select Label"
                      id={items.fields.fields['categoriaId'].name}
                      name={items.fields.fields['categoriaId'].name}
                      key={items.fields.fields['categoriaId'].key}
                      disabled={false}
                      onChange={evt => {
                        itemsHandle({ type: ITEMS_ACTIONS.SET, fieldname: evt.target.name, value: evt.target.value });
                      }}
                      value={items.item['categoriaId']} >
                      {items.fields.fields['categoriaId'].options.map(item => (
                        <ClaySelect.Option
                          key={ "option-" + items.fields.fields['categoriaId'] + item.value}
                          label={item.label}
                          value={item.value}
                        />
                      ))}
                    </ClaySelect>
                  </ClayForm.Group>

                  <ClayForm.Group className={'has-success  col'} key={"Group-curso"} >
                    <label htmlFor="basicInput">{items.fields.fields['cursoId'].label}</label>
                    <ClaySelect aria-label="Select Label"
                      id={items.fields.fields['cursoId'].name}
                      name={items.fields.fields['cursoId'].name}
                      key={items.fields.fields['cursoId'].key}
                      disabled={false}
                      onChange={evt => {
                        itemsHandle({ type: ITEMS_ACTIONS.SET, fieldname: evt.target.name, value: evt.target.value });
                      }}
                      value={items.item['cursoId']} >
                      {items.fields.fields['cursoId'].options.map(item => (
                        <ClaySelect.Option
                          key={ "option-" + items.fields.fields['cursoId'] + item.value}
                          label={item.label}
                          value={item.value}
                        />
                      ))}
                    </ClaySelect>
                  </ClayForm.Group>

                </div>
                <div className="row">

                  <ClayForm.Group className={'has-success  col'} key={"Group-nparticipantes"} >
                    <label htmlFor="basicInput">{items.fields.fields['nparticipantes'].label}</label>
                    <ClayInput
                      placeholder={items.fields.fields['nparticipantes'].placeholder}
                      type="text"
                      name={items.fields.fields['nparticipantes'].name}
                      key={items.fields.fields['nparticipantes'].name}
                      value={items.item['nparticipantes']}
                      onChange={e => {
                        itemsHandle({ type: ITEMS_ACTIONS.SET, fieldname: e.target.name, value: e.target.value });
                      }}>
                    </ClayInput>
                  </ClayForm.Group>

                  <ClayForm.Group className={'has-success col'} key={"Group-sincronizados"} >
                    <label htmlFor="basicInput">{items.fields.fields['sincronizados'].label}</label>
                    <ClayInput
                      placeholder={items.fields.fields['sincronizados'].placeholder}
                      type="text"
                      name={items.fields.fields['sincronizados'].name}
                      key={items.fields.fields['sincronizados'].name}
                      value={items.item['sincronizados']}
                      onChange={e => {
                        itemsHandle({ type: ITEMS_ACTIONS.SET, fieldname: e.target.name, value: e.target.value });
                      }}>
                    </ClayInput>
                  </ClayForm.Group>

                </div>
                
              </ClayTabs.TabPane>
              {  /*  lalala */}
              <ClayTabs.TabPane aria-labelledby="tab-5" key={"tab-content-6"}>
                <h3>{"ESTADO"}</h3>
                <div className="row">
                  <ClayForm.Group className={'has-success  col-12'} key={"Group-estado"} >
                    <label htmlFor="basicInput">{items.fields.fields['estadoId'].label}</label>
                    <div className="input-group">
                      <ClaySelect aria-label="Select Label"
                        id={items.fields.fields['estadoId'].name}
                        name={items.fields.fields['estadoId'].name}
                        key={items.fields.fields['estadoId'].key}
                        disabled={false}
                        onChange={evt => {
                          itemsHandle({ type: ITEMS_ACTIONS.SET, fieldname: evt.target.name, value: evt.target.value });
                        }}
                        value={items.item['estadoId']} >
                        {items.fields.fields['estadoId'].options.map(item => (
                          <ClaySelect.Option
                            key={ "option-" + items.fields.fields['estadoId'] + item.value}
                            label={item.label}
                            value={item.value}
                          />
                        ))}
                      </ClaySelect>
                      <ClayButtonWithIcon
                          aria-label={Liferay.Language.get("History")}
                          spritemap={spritemap}
                          symbol="time"
                          title="historia"
                          displayType="secondary"
                          size="md"
                          className='ml-1'
                          onClick={()=> loadHistory()}
                      />
                    </div>

                  </ClayForm.Group>
                  </div>
                  <div className="row">

                    <ClayForm.Group className={'has-success  col'} key={"Group-objservaciones"} >
                      <label htmlFor="basicInputText">{items.fields.fields['observaciones'].label}</label>
                      <ClayInput
                        component="textarea"
                        id={items.fields.fields['observaciones'].name}
                        name={items.fields.fields['observaciones'].name}
                        placeholder={Liferay.Language.get("observaciones")}
                        type="text"
                        onChange={evt => {
                          itemsHandle({ type: ITEMS_ACTIONS.SET, fieldname: evt.target.name, value: evt.target.value });
                        }}
                        value={items.item['observaciones']}
                        />
                    </ClayForm.Group>

                </div>
                
              </ClayTabs.TabPane>

            </ClayTabs.Content>
          </ClayForm>

        </ClayCard.Description>

        <div className="btn-group">
          <div className="btn-group-item">
            <ClayButton
              aria-label="Cancel"
              onClick={e => itemsHandle({type: ITEMS_ACTIONS.CANCEL})}
              displayType="secondary">{Liferay.Language.get('Cancelar')}
            </ClayButton>
          </div>

          <div className="btn-group-item">
            <ClayButton aria-label="Save" onClick={() => {
              save();
            }}
              displayType="primary">{Liferay.Language.get('Guardar')}
            </ClayButton>
          </div>
        </div>
      </ClayCard.Body>
    </ClayCard>
    </div>
  );
}

export default AccionesForm;