import React from 'react';
import ClayButton, {ClayButtonWithIcon} from '@clayui/button';
import ClayIcon from '@clayui/icon';
import {ClayInput} from '@clayui/form';
import {ClayDropDownWithItems} from '@clayui/drop-down';
import ClayToolbar from '@clayui/toolbar';
import {ITEMS_ACTIONS} from '../includes/reducers/items.reducer';

//import "@clayui/css/lib/css/atlas.css";

const spritemap = './icons.svg';

const Menu = ({handleDelete, handleSave, itemsHandle, status,loadCsv,items, beforeEdit}) => {

  return (
    <ClayToolbar>
      <ClayToolbar.Nav>
        <ClayToolbar.Item className="text-left" expand>
          <ClayToolbar.Section>
            <label className="component-title">{"SiLeFe "}</label>

            <ClayIcon symbol="lock" />
          </ClayToolbar.Section>
        </ClayToolbar.Item>

        <ClayToolbar.Item>
          <ClayInput.Group>
            <ClayInput.GroupItem>
              <ClayInput
                className="form-control-inline"
                placeholder="Buscar..."
                onChange={e => itemsHandle({type:ITEMS_ACTIONS.SEARCH,value:e.target.value})}
              />
            </ClayInput.GroupItem>
          </ClayInput.Group>
        </ClayToolbar.Item>
        {/*
        <ClayToolbar.Item>
          <ClayToolbar.Section>
            <ClayButton.Group>
              <ClayButtonWithIcon
                displayType="secondary"
                aria-label="Previous"
                onClick={() => {   itemsHandle({type:ITEMS_ACTIONS.PREVPAG})}}
                small
                symbol="user"
              />

              <ClayButtonWithIcon
                displayType="secondary"
                aria-label="Next"
                onClick={() => { itemsHandle({type:ITEMS_ACTIONS.NEXTPAG}) }}
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
        */ }

        <ClayToolbar.Item>
          <ClayToolbar.Section>
            <ClayButton aria-label="Delete" displayType="danger" onClick={() => { handleDelete() }}>
              {Liferay.Language.get('Borrar')}
              <ClayIcon spritemap={spritemap} symbol="plus" />
            </ClayButton>

            {
              (status === 'list') &&
            <ClayButton aria-label="Edit" className="inline-item-after" onClick={() => { 
              itemsHandle({type:ITEMS_ACTIONS.SELECT_ITEM});
              beforeEdit();
            }}>
              {Liferay.Language.get('Editar')}
            </ClayButton>
            }

            {
              (status === 'new' || status === 'edit') &&
            <ClayButton aria-label="Save" className="inline-item-after" onClick={() => { handleSave() }}>
              {Liferay.Language.get('Guardar')}
            </ClayButton>
            }

            {
              (status === 'list') &&
            <ClayButton aria-label="New" className="inline-item-after" onClick={() => { itemsHandle({type:ITEMS_ACTIONS.NEW_ITEM}) }}>
              {Liferay.Language.get('Nuevo')}
            </ClayButton>
            }
            {
              (status === 'list') &&
            <ClayButton aria-label="Load" className="inline-item-after" onClick={() => { loadCsv(); }}>
              {Liferay.Language.get('Carga')}
            </ClayButton>
            }

          </ClayToolbar.Section>
        </ClayToolbar.Item>


      </ClayToolbar.Nav>
    </ClayToolbar>
  );
};

export default Menu;

