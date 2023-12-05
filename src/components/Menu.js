import ClayButton, { ClayButtonWithIcon } from '@clayui/button';
import { ClayInput, ClaySelect } from '@clayui/form';
import { ClayIconSpriteContext } from '@clayui/icon';
import ClayToolbar from '@clayui/toolbar';
import React from 'react';
import { spritemap } from '../includes/LiferayFunctions';
import { MgtToolbar } from '../includes/interface/MgtToolbar';
import { ITEMS_ACTIONS } from '../includes/reducers/items.reducer';
import { handleDelete } from '../includes/utils';

const Menu = ({ itemsHandle, items, handleSave, download, onOpenChange }) => {

  return (
    <>
      <ClayIconSpriteContext.Provider value={spritemap}>
        <ClayToolbar>
          <ClayToolbar.Nav>
            <ClayToolbar.Item className="text-left" expand>
              <ClayToolbar.Section>
                <h2 className='h1'>{items.fields.title}</h2>
              </ClayToolbar.Section>
            </ClayToolbar.Item>

            {
              items.status == "list" && items.fields.searchFields != undefined && items.fields.searchFields.length > 1 &&
              <ClayToolbar.Item>
                <ClaySelect aria-label="Select Label"
                  id={"fieldMenu"}
                  name={"fieldMenu"}
                  key={"fieldMenu"}
                  onChange={evt => {
                    itemsHandle({ type: ITEMS_ACTIONS.SET_SEARCHFIELD, value: evt.target.value });
                  }}
                  value={items.searchField} >
                  <ClaySelect.Option
                    key={"Aon-0"}
                    label={Liferay.Language.get("Seleccionar")}
                    value={-1}
                  />
                  {items.fields.searchFields.map(field => (
                    <ClaySelect.Option
                      key={"Aon-" + items.fields.fields[field].key}
                      label={items.fields.fields[field].label}
                      value={items.fields.fields[field].name}
                    />
                  ))}
                </ClaySelect>
              </ClayToolbar.Item>
            }

            {
              (items.status == "list") &&
              <ClayToolbar.Item>
                <ClayInput.Group>
                  <ClayInput.GroupItem>
                    <ClayInput
                      className="form-contrl-inline"
                      placeholder={Liferay.Language.get("Texto a buscar")}
                      onChange={e => itemsHandle({ type: ITEMS_ACTIONS.SEARCH, value: e.target.value })}
                    />
                  </ClayInput.GroupItem>
                </ClayInput.Group>
              </ClayToolbar.Item>
            }

            <ClayToolbar.Item>
              <ClayToolbar.Section>
                <ClayButton.Group>
                  <ClayButtonWithIcon
                    displayType="danger"
                    aria-label="Delete"
                    className="nav-btn nav-btn-monospaced"
                    onClick={() => handleDelete(-1, items, itemsHandle, onOpenChange)}
                    spritemap={spritemap}
                    symbol="trash"
                  />
                  {
                    (items.status === 'list') &&
                    <ClayButtonWithIcon
                      aria-label="Edit"
                      className="nav-btn nav-btn-monospaced"
                      onClick={() => itemsHandle({ type: ITEMS_ACTIONS.SELECT_ITEM })}
                      spritemap={spritemap}
                      symbol="pencil"
                    />

                  }

                  {
                    (items.status === 'new' || items.status === 'edit') &&
                    <ClayButtonWithIcon
                      aria-label="Save"
                      className="nav-btn nav-btn-monospaced"
                      onClick={() => handleSave()}
                      spritemap={spritemap}
                      symbol="disk"
                    />
                  }

                  {
                    (items.status === 'list') &&
                    <ClayButtonWithIcon
                      aria-label="Add"
                      className="nav-btn nav-btn-monospaced"
                      onClick={() => { itemsHandle({ type: ITEMS_ACTIONS.NEW_ITEM }) }}
                      spritemap={spritemap}
                      symbol="plus"
                    />
                  }
                  {
                    (items.status === 'list') &&
                    <>
                      <ClayButtonWithIcon
                        aria-label="Load"
                        className="nav-btn nav-btn-monospaced"
                        onClick={() => items.fields.loadCsv()}
                        spritemap={spritemap}
                        symbol="import-list"
                      />
                      <ClayButtonWithIcon
                        aria-label="Download"
                        className="nav-btn nav-btn-monospaced"
                        onClick={() => download()}
                        spritemap={spritemap}
                        symbol="document-table"
                      />
                    </>

                  }
                </ClayButton.Group>
              </ClayToolbar.Section>
            </ClayToolbar.Item>


          </ClayToolbar.Nav>
        </ClayToolbar>
      </ClayIconSpriteContext.Provider>
      {
        (items.status == 'list' && (items.search.length > 0 || items.order.length > 0)) &&
        <MgtToolbar items={items} itemsHandle={itemsHandle} />
      }
    </>
  );
};

export default Menu;

