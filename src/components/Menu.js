import React from 'react';
import ClayButton, {ClayButtonWithIcon} from '@clayui/button';
//import ClayButton from 'clay';
import ClayIcon from '@clayui/icon';
import {ClayInput} from '@clayui/form';
import {ClayDropDownWithItems} from '@clayui/drop-down';
import ClayToolbar from '@clayui/toolbar';
import {PAGINATION_ACTIONS} from '../includes/reducers/paginate.reducer';
import {ITEMS_ACTIONS} from '../includes/reducers/items.reducer';

//import "@clayui/css/lib/css/atlas.css";

//const spritemap = "../icons.svg";
const spritemap = '/images/icons/icons.svg';
//const spritemap = '../icons.svg';

const Menu = ({paginate, handleDelete, handleSave, handleSearch,itemsHandle, showform}) => {

  return (
    <ClayToolbar>
      <ClayToolbar.Nav>
        <ClayToolbar.Item className="text-left" expand>
          <ClayToolbar.Section>
            <label className="component-title">{"SiLeFe "}</label>

            <ClayIcon  symbol="lock" />
          </ClayToolbar.Section>
        </ClayToolbar.Item>


        <ClayToolbar.Item>
          <ClayInput.Group>
            <ClayInput.GroupItem>
              <ClayInput
                className="form-control-inline"
                placeholder="Buscar..."
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </ClayInput.GroupItem>
          </ClayInput.Group>
        </ClayToolbar.Item>


        <ClayToolbar.Item>
          <ClayToolbar.Section>
            <ClayButton.Group>
              <ClayButtonWithIcon
                displayType="secondary"
                onClick={() => { paginate({type:PAGINATION_ACTIONS.PREV_PAGE})}}
                small
                symbol="user"
              />


              <ClayButtonWithIcon
                displayType="secondary"
                onClick={() => { paginate({type:PAGINATION_ACTIONS.NEXT_PAGE}) }}
                spritemap={spritemap}
                small
                symbol="angle-right"
              />
              	<svg
                  className="lexicon-icon lexicon-icon-blogs"
                  focusable="false"
                  role="presentation"
		            ></svg>
            </ClayButton.Group>
          </ClayToolbar.Section>
        </ClayToolbar.Item>


        <ClayToolbar.Item>
          <ClayToolbar.Section>
            <ClayButton displayType="danger" onClick={() => { handleDelete() }}>
              {"Borrar"}
              <ClayIcon spritemap={spritemap} symbol="plus" />
            </ClayButton>

            {
              !showform &&
            <ClayButton className="inline-item-after" onClick={() => { itemsHandle({type:ITEMS_ACTIONS.SELECT_ITEM}) }}>
              {"Editar"}
            </ClayButton>
            }

            {
              showform &&
            <ClayButton className="inline-item-after" onClick={() => { handleSave() }}>
              {"Guardar"}
            </ClayButton>

            }

            {
              !showform &&
            <ClayButton className="inline-item-after" onClick={() => { itemsHandle({type:ITEMS_ACTIONS.NEW_ITEM}) }}>
              {"Nuevo"}
            </ClayButton>
            }

          </ClayToolbar.Section>
        </ClayToolbar.Item>


        <ClayToolbar.Item>
          <ClayDropDownWithItems
            items={[
              { href: "#one", label: "one" },
              { href: "#two", label: "two" },
              { disabled: true, href: "#three", label: "three" },
              { href: "#four", label: "four" }
            ]}
            trigger={
              <ClayButtonWithIcon
                displayType="unstyled"
                small
                symbol="ellipsis-v"
              />
            }
          />
        </ClayToolbar.Item>
      </ClayToolbar.Nav>
    </ClayToolbar>
  );
};

export default Menu;

