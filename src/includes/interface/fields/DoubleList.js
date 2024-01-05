import { ClayDualListBox } from '@clayui/form';
import ClayPanel from '@clayui/panel';
import React, { useState } from 'react';
import { Liferay } from '../../../common/services/liferay/liferay';
import { spritemap } from '../../LiferayFunctions';
import { ITEMS_ACTIONS } from '../../reducers/items.reducer';

export const DoubleList = ({itemsHandle, field, item}) => {
  let izquierda = [];
  let derecha = []; 

  field.options.forEach(element => {
    if (item.includes(element.value)) {
      izquierda.push(element);
    }
    else {
      derecha.push(element);
    }
  });
  const moveBoxesOptions = [izquierda, derecha ];

  const [items, setItems] = useState(moveBoxesOptions);
  const [leftSelected, setLeftSelected] = useState([]);
  const [rightSelected, setRightSelected] = useState([]);

  const change = (select) => {
    const seleccionados = select[0].map(item => item.value);
    itemsHandle({type: ITEMS_ACTIONS.SET, fieldname: field.name,  value: seleccionados});
    setItems(select);
  }

  return (
    <>


<ClayPanel
    collapsble
    displayTitle={
      <ClayPanel.Title>
        <h3>{field.label}</h3>
      </ClayPanel.Title>
    }
    displayType="secondary"
    showCollapseIcon={false}
    spritemap={spritemap}
  >
    <ClayPanel.Body>
      <ClayDualListBox
        items={items}
        left={{
          label: Liferay.Language.get("En Uso"),
          onSelectChange: setLeftSelected,
          selected: leftSelected
        }}
        onItemsChange={change}
        right={{
          label: Liferay.Language.get("Disponibles"),
          onSelectChange: setRightSelected,
          selected: rightSelected
        }}
        size={5}
        spritemap={spritemap}
      />
    </ClayPanel.Body>
  </ClayPanel>

    </>
  );
}