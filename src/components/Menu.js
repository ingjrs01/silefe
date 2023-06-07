import React from 'react';
import ClayButton, {ClayButtonWithIcon} from '@clayui/button';
import {ClayIconSpriteContext} from '@clayui/icon';
import {ClayInput, ClaySelect} from '@clayui/form';
import {ClayDropDownWithItems} from '@clayui/drop-down';
import ClayToolbar from '@clayui/toolbar';
import {ITEMS_ACTIONS} from '../includes/reducers/items.reducer';

import { MgtToolbar } from '../includes/interface/MgtToolbar';


const spritemap = "./o/my-project/icons.svg";

const Menu = ({handleDelete, handleSave, itemsHandle, status,loadCsv,items, beforeEdit,formulario}) => {

  //console.log("estoy en el menu");
  //console.debug(formulario);

  return (
    <>
    <ClayIconSpriteContext.Provider value={spritemap}>
    <ClayToolbar>
      <ClayToolbar.Nav>
        <ClayToolbar.Item className="text-left" expand>
          <ClayToolbar.Section>
            {/*<label className="component-title form-control-inline">{ formulario.title }</label> */}
            <h2 className='h1'>{ formulario.title }</h2>
          </ClayToolbar.Section>
        </ClayToolbar.Item>

        {
        formulario.searchFields.length > 1 &&
        <ClayToolbar.Item>
              <ClaySelect aria-label="Select Label"
                id={"fieldMenu"}
                name={"fieldMenu"}
                key={"fieldMenu"}
                onChange={evt => {                  
                  itemsHandle({ type: ITEMS_ACTIONS.SET_SEARCHFIELD,value:evt.target.value});
                }}
                value={ items.searchField } >
                { formulario.searchFields.map( field => (
                  <ClaySelect.Option
                    key={"Aon-" + formulario.fields[field].key }
                    label={formulario.fields[field].label}
                    value={formulario.fields[field].name}
                  />
                )) }
              </ClaySelect>
        </ClayToolbar.Item>
        }

        <ClayToolbar.Item>
          <ClayInput.Group>
            <ClayInput.GroupItem>
              <ClayInput
                className="form-contrl-inline"
                placeholder={Liferay.Language.get("Texto a buscar")}
                onChange={e => itemsHandle({type:ITEMS_ACTIONS.SEARCH,value:e.target.value})}
              />
            </ClayInput.GroupItem>
          </ClayInput.Group>
        </ClayToolbar.Item>

        <ClayToolbar.Item>
          <ClayToolbar.Section>
          <ClayButton.Group>
            <ClayButtonWithIcon
                  displayType="danger"
                  aria-label="Delete"
                  className="nav-btn nav-btn-monospaced"
                  onClick={() => handleDelete() }
                  spritemap={spritemap}
                  symbol="trash"
                />

            {
              (status === 'list') &&
              <ClayButtonWithIcon
              aria-label="Edit"
              className="nav-btn nav-btn-monospaced"
              onClick={() => {itemsHandle({type:ITEMS_ACTIONS.SELECT_ITEM});beforeEdit();} }
              spritemap={spritemap}
              symbol="pencil"
            />

            }

            {
              (status === 'new' || status === 'edit') &&
              <ClayButtonWithIcon
                aria-label="Save"
                className="nav-btn nav-btn-monospaced"
                onClick={() => { handleSave() }}
                spritemap={spritemap}
                symbol="disk"
              />
            }

            {
              (status === 'list') &&                    
              <ClayButtonWithIcon
                aria-label="Add"
                className="nav-btn nav-btn-monospaced"
                onClick={() => { itemsHandle({type:ITEMS_ACTIONS.NEW_ITEM}) }}
                spritemap={spritemap}
                symbol="plus"
              />
            }
            {
              (status === 'list') &&
              <ClayButtonWithIcon
                aria-label="Load"
                className="nav-btn nav-btn-monospaced"
                onClick={() => loadCsv()}
                spritemap={spritemap}
                symbol="import-list"
              />
            }
          </ClayButton.Group>
          </ClayToolbar.Section>
        </ClayToolbar.Item>


      </ClayToolbar.Nav>
    </ClayToolbar>
    </ClayIconSpriteContext.Provider>
    {
      (items.search.length > 0 || items.order.length > 0) &&
      <MgtToolbar items={items} itemsHandle={itemsHandle} />
    }
    </>
  );
};

export default Menu;

