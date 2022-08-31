import React from 'react';
import ClayButton, {ClayButtonWithIcon} from '@clayui/button';
//import ClayButton from 'clay';
import ClayIcon from '@clayui/icon';
import {ClayInput} from '@clayui/form';
import {ClayDropDownWithItems} from '@clayui/drop-down';
import ClayToolbar from '@clayui/toolbar';


const spritemap = '/icons.svg';

const Menu = ({nextPage, prevPage, handleDelete, handleSave, handleEdit,handleNew}) => {

//  const spritemap = "/icons.svg";

  return (
    <ClayToolbar>
      <ClayToolbar.Nav>
        <ClayToolbar.Item className="text-left" expand>
          <ClayToolbar.Section>
            <label className="component-title">{"Foo Bar"}</label>


            <ClayIcon  symbol="lock" />
          </ClayToolbar.Section>
        </ClayToolbar.Item>


        <ClayToolbar.Item>
          <ClayInput.Group>
            <ClayInput.GroupItem>
              <ClayInput
                className="form-control-inline"
                placeholder="Search..."
              />
            </ClayInput.GroupItem>
          </ClayInput.Group>
        </ClayToolbar.Item>


        <ClayToolbar.Item>
          <ClayToolbar.Section>
            <ClayButton.Group>
              <ClayButtonWithIcon
                displayType="secondary"
                onClick={() => { prevPage()}}
                small
                symbol="user"
              />


              <ClayButtonWithIcon
                displayType="secondary"
                onClick={() => { nextPage() }}
                spritemap={spritemap}
                small
                symbol="angle-right"
              />
            </ClayButton.Group>
          </ClayToolbar.Section>
        </ClayToolbar.Item>


        <ClayToolbar.Item>
          <ClayToolbar.Section>
            <ClayButton displayType="danger" onClick={() => { handleDelete() }}>
              {"Borrar"}
            </ClayButton>


            <ClayButton className="inline-item-after" onClick={() => { handleEdit() }}>
              {"Editar"}
            </ClayButton>

            <ClayButton className="inline-item-after" onClick={() => { handleSave() }}>
              {"Guardar"}
            </ClayButton>

            <ClayButton className="inline-item-after" onClick={() => { handleNew() }}>
              {"Nuevo"}
            </ClayButton>

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

