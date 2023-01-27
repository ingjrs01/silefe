import React, { useState } from "react";
import ClayForm from '@clayui/form';
import ClayTabs from '@clayui/tabs';
import ClayCard from "@clayui/card";
import ClayButton from '@clayui/button';
import { ITEMS_ACTIONS } from '../reducers/items.reducer';
import RenderFields from "./RenderFields";

const TabsForm = ({ itemsHandle, save, items, notify }) => {

  const [active, setActive] = useState(0);

  const validateAll = () => {
    console.log("validando todo");
    Object.keys(items.fields.fields).forEach( campo => {
      console.log(campo);
      switch (items.fields.fields[campo].type) {
        case "text": 
          if (!validate(campo, items.item[campo]))
            return false;
          break;
        case "multilang":
          if (!validateLocalized(campo, items.item[campo]))
            return false;
          break;
        case "toggle":
          break;
      }

    });
    console.log("todo ok");
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

  return (
    <ClayCard>
      <ClayCard.Body>
        <ClayCard.Description displayType="title">
          <h2>{items.fields.title}</h2>
        </ClayCard.Description>

        <ClayCard.Description truncate={false} displayType="text">
        <ClayForm>

        <ClayTabs active={active} modern onActiveChange={e => {console.log("cambaindo");setActive()}}>
          { items.fields.tabs.map((tab,index) => {
            return (
              <ClayTabs.Item
                innerProps={{
                  "aria-controls": "tabpanel-2"
                }}
              >
                <a onClick={a => {setActive(index)}}>  {tab.caption }  </a>
              </ClayTabs.Item>
            );
          })}

      </ClayTabs>
      <ClayTabs.Content activeIndex={active} fade>
          { items.fields.tabs.map( tab => {
            return (
              <ClayTabs.TabPane aria-labelledby="tab-1">
                <RenderFields 
                rows={tab.rows}
                itemsHandle={itemsHandle} 
                items={items}
                />
              </ClayTabs.TabPane>

            );
          })}

      </ClayTabs.Content>
          </ClayForm>

        </ClayCard.Description>
        <div className="btn-group">
          <div className="btn-group-item">
            <ClayButton onClick={e => itemsHandle({ type: ITEMS_ACTIONS.CANCEL })} displayType="secondary">{Liferay.Language.get('Cancelar')}</ClayButton>
          </div>
          <div className="btn-group-item">
            <ClayButton onClick={e => {
              validateAll() && save()
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