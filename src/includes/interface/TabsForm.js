import ClayButton from '@clayui/button';
import ClayForm from '@clayui/form';
import ClayTabs from '@clayui/tabs';
import React from "react";
import { Liferay } from '../../common/services/liferay/liferay';
import { validateAll } from '../Validators';
import { ITEMS_ACTIONS } from '../reducers/items.reducer';
import RenderFields from "./RenderFields";

const TabsForm = ({ itemsHandle, save, items, plugin, user }) => {
 
  return (
    <>
      <ClayForm className='sheet'>
        <ClayTabs active={items.fields.tabActive} modern >
          {items.fields.tabs.map((tab, index) => {
            if (tab.hasOwnProperty("admin") ) {
              if (user.roles.includes("Administrator"))
                return (
                  <ClayTabs.Item
                  key={"tab-item" + tab.key}
                  innerProps={{
                    "aria-controls": "tabpanel-2"
                  }}
                >
                  <a onClick={a => { itemsHandle({ type: ITEMS_ACTIONS.SET_ACTIVETAB, active: index }) }}>  {tab.caption}  </a>
                </ClayTabs.Item>
                )
            }
            else {
              return (
                
                <ClayTabs.Item
                  key={"tab-item" + tab.key}
                  innerProps={{
                    "aria-controls": "tabpanel-2"
                  }}
                >
                  <a onClick={a => { itemsHandle({ type: ITEMS_ACTIONS.SET_ACTIVETAB, active: index }) }}>  {tab.caption} </a>
                </ClayTabs.Item>
                
              );
            }
          })}
        </ClayTabs>
        <ClayTabs.Content activeIndex={items.fields.tabActive} fade>
          {items.fields.tabs.map(tab => {
            return (
              <ClayTabs.TabPane aria-labelledby="tab-1" key={"tab-content-" + tab.key}>
                <RenderFields
                  rows={tab.rows}
                  itemsHandle={itemsHandle}
                  items={items}
                  plugin={plugin}
                  key={"renderFields"+tab.key}
                />
              </ClayTabs.TabPane>
            );
          })}
        </ClayTabs.Content>

        <div className="btn-group">
          <div className="btn-group-item">
            <ClayButton aria-label="Cancel" onClick={e => itemsHandle({ type: ITEMS_ACTIONS.CANCEL })} displayType="secondary">{Liferay.Language.get('Cancelar')}</ClayButton>
          </div>
          <div className="btn-group-item">
            <ClayButton aria-label="Save"
              onClick={e => { validateAll(items,itemsHandle) && save() }}
              displayType="primary">{Liferay.Language.get('Guardar')}
            </ClayButton>
          </div>
        </div>

      </ClayForm>
    </>
  );
}
export default TabsForm;