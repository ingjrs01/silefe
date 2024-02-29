import ClayButton from '@clayui/button';
import ClayCard from "@clayui/card";
import ClayForm, { ClayCheckbox } from '@clayui/form';
import ClayPanel from '@clayui/panel';
import ClayTabs from '@clayui/tabs';
import React from "react";
import { Liferay } from '../../common/services/liferay/liferay';
import { spritemap } from '../../includes/LiferayFunctions';
import DoubleTable from '../../includes/interface/DoubleTable';
import { FHistoryEntity } from '../../includes/interface/FHistoryEntity';
import { Fileinput } from '../../includes/interface/fields/Fileinput';
import { LocalizedInput } from '../../includes/interface/fields/LocalizedInput';
import { Select } from '../../includes/interface/fields/Select';
import { Textarea } from '../../includes/interface/fields/Textarea';
import { Textinput } from '../../includes/interface/fields/Textinput';
import { Toggle } from '../../includes/interface/fields/Toggle';
import { ITEMS_ACTIONS } from '../../includes/reducers/items.reducer';
import { Formacion } from './Formacion';


const AccionesForm = ({ save, items, itemsHandle, docentes, docentesHandler, participantes, participantesHandler, ejecucion, ejecucionHandler, loadHistory, historico, handleHistorico, user }) => {

  return (
    <div className="container">
      <ClayCard>
        <ClayCard.Body>
          {/*
        <ClayCard.Description displayType="title">
          {Liferay.Language.get("Acciones")}
        </ClayCard.Description>
  */}

          <ClayCard.Description truncate={false} displayType="text">
            <ClayForm>
              <ClayTabs active={items.fields.tabActive} modern>
                <ClayTabs.Item
                  key={"tab-item1"}
                  innerProps={{ "aria-controls": "tabpanel-1" }}
                >
                  <a onClick={() => itemsHandle({ type: ITEMS_ACTIONS.SET_ACTIVETAB, active: 0 })}> {Liferay.Language.get("PRINCIPAL")} </a>
                </ClayTabs.Item>
                <ClayTabs.Item
                  key={"tab-item2"}
                  innerProps={{ "aria-controls": "tabpanel-2" }}
                >
                  <a onClick={() => itemsHandle({ type: ITEMS_ACTIONS.SET_ACTIVETAB, active: 1 })}>  {Liferay.Language.get("Ejecución")}  </a>
                </ClayTabs.Item>

                <ClayTabs.Item
                  key={"tab-item3"}
                  innerProps={{ "aria-controls": "tabpanel-3" }}
                >
                  <a onClick={() => itemsHandle({ type: ITEMS_ACTIONS.SET_ACTIVETAB, active: 2 })}>  {Liferay.Language.get("Docentes")}  </a>
                </ClayTabs.Item>
                <ClayTabs.Item
                  key={"tab-item4"}
                  innerProps={{ "aria-controls": "tabpanel-4" }}
                >
                  <a onClick={() => itemsHandle({ type: ITEMS_ACTIONS.SET_ACTIVETAB, active: 3 })}>  {Liferay.Language.get("Participantes")}  </a>
                </ClayTabs.Item>
                <ClayTabs.Item
                  key={"tab-item5"}
                  innerProps={{ "aria-controls": "tabpanel-5" }}
                >
                  <a onClick={() => itemsHandle({ type: ITEMS_ACTIONS.SET_ACTIVETAB, active: 4 })}>  {Liferay.Language.get("Elearning")}  </a>
                </ClayTabs.Item>
                {
                  user.roles.includes("Administrator") &&
                  <ClayTabs.Item
                    key={"tab-item6"}
                    innerProps={{ "aria-controls": "tabpanel-5" }}
                  >
                    <a onClick={() => itemsHandle({ type: ITEMS_ACTIONS.SET_ACTIVETAB, active: 5 })}>  {Liferay.Language.get("Histórico")}  </a>
                  </ClayTabs.Item>
                }

              </ClayTabs>

              <ClayTabs.Content activeIndex={items.fields.tabActive} fade>
                <ClayTabs.TabPane aria-labelledby="tab-1" key={"tab-content-1"}>
                  <div className="row">
                    <ClayForm.Group className={'has-success col'} key={"Group-1"} >
                      <Select itemsHandle={itemsHandle} field={items.fields.fields['accionTipoId']} item={items.item.accionTipoId} action={ITEMS_ACTIONS.SET} />
                    </ClayForm.Group>
                    <ClayForm.Group className={'has-success col'} key={"Group-nombre"} >
                      <LocalizedInput itemsHandle={itemsHandle} field={items.fields.fields['nombre']} item={items.item.nombre} action={ITEMS_ACTIONS.SET} />}
                    </ClayForm.Group>

                  </div>
                  {
                    (items.item.accionTipoId == 1) &&
                    <>
                      <div className="row">

                        <ClayForm.Group className={'has-success col'} key={"Group-1"} >
                          <Select itemsHandle={itemsHandle} field={items.fields.fields['accionTipoFormacionId']} item={items.item.accionTipoFormacionId} action={ITEMS_ACTIONS.SET} />
                        </ClayForm.Group>

                        <ClayForm.Group className={'has-success col'} key={"Group-teorica"} >
                          <Toggle itemsHandle={itemsHandle} field={items.fields.fields['teorica']} item={items.item.teorica} action={ITEMS_ACTIONS.SET} />
                        </ClayForm.Group>

                        <ClayForm.Group className={'has-success col'} key={"Group-practica"} >
                          <Toggle itemsHandle={itemsHandle} field={items.fields.fields['practica']} item={items.item.practica} action={ITEMS_ACTIONS.SET} />
                        </ClayForm.Group>

                        <ClayForm.Group className={'has-success col'} key={"Group-grupal"} >
                          <Toggle itemsHandle={itemsHandle} field={items.fields.fields['grupal']} item={items.item.grupal} action={ITEMS_ACTIONS.SET} />
                        </ClayForm.Group>

                        <ClayForm.Group className={'has-success  col'} key={"Group-nhoras"} >
                          <Textinput itemsHandle={itemsHandle} field={items.fields.fields['horas']} item={items.item.grupal} action={ITEMS_ACTIONS.SET} />
                        </ClayForm.Group>
                      </div>
                    </>
                  }

                  <div className="row">
                    <ClayForm.Group className={'has-success col'} key={"Group-tecnico"} >
                      <Select itemsHandle={itemsHandle} field={items.fields.fields['tecnicoId']} item={items.item.tecnicoId} action={ITEMS_ACTIONS.SET} />
                    </ClayForm.Group>

                  </div>

                  <div className="row">
                    <ClayForm.Group className={'has-success  col-12'} key={"Group-estado"} >
                      <Select itemsHandle={itemsHandle} field={items.fields.fields['estadoId']} item={items.item.estadoId} action={ITEMS_ACTIONS.SET} />

                    </ClayForm.Group>
                  </div>
                  <div className="row">
                    <ClayForm.Group className={'has-success  col'} key={"Group-objservaciones"} >
                      <Textarea itemsHandle={itemsHandle} field={items.fields.fields['observaciones']} item={items.item.observaciones} action={ITEMS_ACTIONS.SET} />
                    </ClayForm.Group>
                  </div>

                  <div className="row">
                    <ClayForm.Group className={'has-success  col'} key={"Group-objservaciones"} >
                      <Fileinput itemsHandle={itemsHandle} field={items.fields.fields["adjuntos"]} item={items.item["adjuntos"]} />
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
                        {
                          /*
                          <ClayForm.Group className={"col-3"} key={"Group-91"} >
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
      
                          <ClayForm.Group className={"col-3"} key={"Group-92"} >
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
                          </ClayForm.Group>*/
                        }

                        <ClayForm.Group className={"col-2"} key={"Group-92a"} >
                          <label htmlFor="basicInput">{Liferay.Language.get("Teórica")}</label>
                          <ClayCheckbox
                            checked={false}
                            onChange={() => console.log("eso es lo que no se sabe")}
                          />
                        </ClayForm.Group>

                        <ClayForm.Group className={"col-2"} key={"Group-92b"} >
                          <label htmlFor="basicInput">{Liferay.Language.get("Práctica")}</label>
                          <ClayCheckbox
                            checked={false}
                            onChange={() => console.log("eso es lo que no se sabe")}
                          />
                        </ClayForm.Group>

                        <ClayForm.Group className={"col-2"} key={"Group-92c"} >
                          <label htmlFor="basicInput">{Liferay.Language.get("Grupal")}</label>
                          <ClayCheckbox
                            checked={false}
                            onChange={() => console.log("eso es lo que no se sabe")}
                          />
                        </ClayForm.Group>

                      </div>
                    </>
                  }
                  {
                    (items.item.accionTipoId == 1 || items.item.accionTipoId == 3) &&
                    <>
                      {
                        (items.item.teorica) &&
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
                              items={items}
                            />
                          </ClayPanel.Body>
                        </ClayPanel>
                      }
                      {
                        (items.item.practica) &&
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
                              items={items}
                            />
                          </ClayPanel.Body>
                        </ClayPanel>
                      }
                      {
                        (items.item.grupal) &&
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
                              items={items}
                            />
                          </ClayPanel.Body>
                        </ClayPanel>
                      }
                    </>
                  }

                </ClayTabs.TabPane>

                <ClayTabs.TabPane aria-labelledby="tab-3" key={"tab-content-3"}>
                  <DoubleTable
                    data={docentes}
                    handler={docentesHandler}
                    editUrl={"/docente/"}
                    backUrl={"/accion/"}
                    ancestorId={items.item.id}
                  />
                </ClayTabs.TabPane>

                <ClayTabs.TabPane aria-labelledby="tab-4" key={"tab-content-4"}>
                  <DoubleTable
                    data={participantes}
                    handler={participantesHandler}
                    editUrl={"/participante/"}
                    backUrl={"/accion/"}
                    ancestorId={items.item.id}
                  />
                </ClayTabs.TabPane>
                <ClayTabs.TabPane aria-labelledby="tab-5" key={"tab-content-5"}>
                  <h3>{"ELEARNING"}</h3>
                  <div className="row">
                    <ClayForm.Group className={'has-success  col'} key={"Group-plataforma"} >
                      <Select itemsHandle={itemsHandle} field={items.fields.fields['plataformaId']} item={items.item.plataformaId} action={ITEMS_ACTIONS.SET} />
                    </ClayForm.Group>

                    <ClayForm.Group className={'has-success col'} key={"Group-categoria"} >
                      <Select itemsHandle={itemsHandle} field={items.fields.fields['categoriaId']} item={items.item.categoriaId} action={ITEMS_ACTIONS.SET} />
                    </ClayForm.Group>

                    <ClayForm.Group className={'has-success  col'} key={"Group-curso"} >
                      <Select itemsHandle={itemsHandle} field={items.fields.fields['cursoId']} item={items.item.cursoId} action={ITEMS_ACTIONS.SET} />
                    </ClayForm.Group>

                  </div>
                  <div className="row">

                    <ClayForm.Group className={'has-success  col'} key={"Group-nparticipantes"} >
                      <Textinput itemsHandle={itemsHandle} field={items.fields.fields['nparticipantes']} item={items.item.nparticipantes} action={ITEMS_ACTIONS.SET} />
                    </ClayForm.Group>

                    <ClayForm.Group className={'has-success col'} key={"Group-sincronizados"} >
                      <Textinput itemsHandle={itemsHandle} field={items.fields.fields['sincronizados']} item={items.item.sincronizados} action={ITEMS_ACTIONS.SET} />
                    </ClayForm.Group>

                  </div>

                </ClayTabs.TabPane>
                <ClayTabs.TabPane aria-labelledby="tab-5" key={"tab-content-6"}>
                  <h3>{Liferay.Language.get("Histórico")}</h3>
                  <FHistoryEntity
                    data={historico}
                    handler={handleHistorico}
                  />

                </ClayTabs.TabPane>

              </ClayTabs.Content>
            </ClayForm>

          </ClayCard.Description>

          <div className="btn-group">
            <div className="btn-group-item">
              <ClayButton
                aria-label="Cancel"
                onClick={e => itemsHandle({ type: ITEMS_ACTIONS.CANCEL })}
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
// Esto tiene 578