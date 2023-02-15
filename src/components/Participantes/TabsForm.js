import React from "react";
import ClayForm from '@clayui/form';
import ClayTabs from '@clayui/tabs';
import ClayCard from "@clayui/card";
import ClayButton from '@clayui/button';
import { ITEMS_ACTIONS } from '../../includes/reducers/items.reducer';
import RenderFields from "./RenderFields";

const TabsForm = ({ itemsHandle, save, items, titulaciones, notify, setTitulaciones }) => {
  //const [active, setActive] = useState(0);

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
          {items.fields.title}
        </ClayCard.Description>

        <ClayCard.Description truncate={false} displayType="text">
        <ClayForm>

        <ClayTabs active={items.fields.tabActive} modern onActiveChange={e => {console.log("cambiando");}}>
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

      </ClayTabs>
      <ClayTabs.Content activeIndex={items.fields.tabActive} fade>
          { items.fields.tabs.map( tab => {
            return (
              <ClayTabs.TabPane aria-labelledby="tab-1" key={"tab-content-" + tab.key}>                
                <RenderFields 
                rows={tab.rows}
                itemsHandle={itemsHandle} 
                items={items}
                titulaciones={titulaciones}
                setTitulaciones={setTitulaciones}
                />
              </ClayTabs.TabPane>

            );
          })}

      </ClayTabs.Content>
          </ClayForm>

        </ClayCard.Description>
        <div className="btn-group">
          <div className="btn-group-item">
            <ClayButton aria-label="Cancel" onClick={e => itemsHandle({ type: ITEMS_ACTIONS.CANCEL })} displayType="secondary">{Liferay.Language.get('Cancelar')}</ClayButton>
          </div>
          <div className="btn-group-item">
            <ClayButton aria-label="Save" onClick={e => {
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