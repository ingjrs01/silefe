import ClayButton from '@clayui/button';
import ClayCard from "@clayui/card";
import ClayForm from '@clayui/form';
import ClayTabs from '@clayui/tabs';
import React from "react";
import RenderFields from '../../includes/interface/RenderFields'; //"./RenderFields";
import { ITEMS_ACTIONS } from '../../includes/reducers/items.reducer';
import ExperienciaRender from "./ExperienciaRender";
import TitulacionesRender from "./TitulacionesRender";

const TabsForm = ({ itemsHandle, save, items, experiencias, experienciasHandler,  redTitulaciones, titulacionHandler }) => {

  const validateAll = () => {
    let error = false;
    Object.keys(items.fields.fields).forEach( campo => {
      switch (items.fields.fields[campo].type) {
        case "text":
          if (!validate(campo, items.item[campo])) {
            error = true;
            return false;
          }
          break;
        case "multilang":
          if (!validateLocalized(campo, items.item[campo]))
            return false;
          break;
        case "toggle":
          break;
      }

    });
    if (error)
      return false;

    return true;
  }

  const validate = (name, value) => {
    let condicion = "";
    
    for (condicion of items.fields.fields[name]["conditions"]) {
      if (condicion == "number") {
        if (isNaN(value)) {
          itemsHandle({ type: ITEMS_ACTIONS.ADDERROR, name: name, value: Liferay.Language.get('error-numero') });
          return false;
        }
      }

      if (condicion == "text") {
        if (!isNaN(value)) {
          itemsHandle({ type: ITEMS_ACTIONS.ADDERROR, name: name, value: Liferay.Language.get('error-texto') });
          return false;
        }
      }
    }
    itemsHandle({ type: ITEMS_ACTIONS.CLEARERRORS, name: name });
    return true;
  }

  const validateLocalized = (fieldname, values) => {
    const languages = Object.keys(values);
    let l = "";
    for (l in languages) {
      if (!validate(fieldname, values[languages[l]]))
        return false;
    }
    return true;
  }

  const edit = () => {
    console.log("edit");
  }

  return (
    <ClayCard>
      <ClayCard.Body>
        <ClayCard.Description displayType="title">
          {items.fields.title}
        </ClayCard.Description>

        <ClayCard.Description truncate={false} displayType="text">
        <ClayForm>

        <ClayTabs active={items.fields.tabActive} modern >
          { items.fields.tabs.map((tab,index) => {
            return (
              <ClayTabs.Item
                key={"tab-item" + tab.key}
                innerProps={{
                  "aria-controls": "tabpanel-2"
                }}
              >
                <a onClick={a => { itemsHandle({ type:ITEMS_ACTIONS.SET_ACTIVETAB,active: index})}}>  {tab.caption }  </a>
              </ClayTabs.Item>
            );
          })}
          <ClayTabs.Item
            key={"tab-item3"}
            innerProps={{
              "aria-controls": "tabpanel-3"
            }}
          >
            <a onClick={a => { itemsHandle({ type:ITEMS_ACTIONS.SET_ACTIVETAB,active: 2})}}>  {"Titulaciones" }  </a>
          </ClayTabs.Item>

          <ClayTabs.Item
            key={"tab-item4"}
            innerProps={{
              "aria-controls": "tabpanel-4"
            }}
          >
            <a onClick={a => { itemsHandle({ type:ITEMS_ACTIONS.SET_ACTIVETAB,active: 3})}}>  {"Experiencias" }  </a>
          </ClayTabs.Item>

      </ClayTabs>
      <ClayTabs.Content activeIndex={items.fields.tabActive} fade>
          { items.fields.tabs.map( tab => {
            return (
              <ClayTabs.TabPane aria-labelledby="tab-1" key={"tab-content-" + tab.key}>
                <RenderFields
                rows={tab.rows}
                itemsHandle={itemsHandle}
                items={items}
                />
              </ClayTabs.TabPane>

            );
          })}
          <ClayTabs.TabPane aria-labelledby="tab-3" key={"tab-content-3"}>
            <TitulacionesRender
              redTitulaciones={redTitulaciones}
              titulacionHandler={titulacionHandler}
            />
          </ClayTabs.TabPane>

          <ClayTabs.TabPane aria-labelledby="tab-4" key={"tab-content-4"}> 
            <ExperienciaRender
              experiencias={experiencias}
              experienciasHandler={experienciasHandler}
              edit={edit}
            />
          </ClayTabs.TabPane>

      </ClayTabs.Content>
          </ClayForm>

        </ClayCard.Description>
        <div className="btn-group">
          <div className="btn-group-item">
            <ClayButton aria-label="Cancel" onClick={e => itemsHandle({ type: ITEMS_ACTIONS.CANCEL })} displayType="secondary">{Liferay.Language.get('Cancelar')}</ClayButton>
          </div>
          <div className="btn-group-item">
            <ClayButton aria-label="Save" onClick={() => {
              if (validateAll() ) {
                save();
              }
            }}
              displayType="primary">{Liferay.Language.get('Guardar')}
            </ClayButton>
          </div>
        </div>
      </ClayCard.Body>
    </ClayCard>
  );
}

export default TabsForm;