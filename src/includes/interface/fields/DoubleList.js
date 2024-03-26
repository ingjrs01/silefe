import ClayForm, { ClayDualListBox, ClayInput } from '@clayui/form';
import ClayPanel from '@clayui/panel';
import React, { useState } from 'react';
import { Liferay } from '../../../common/services/liferay/liferay';
import { spritemap } from '../../LiferayFunctions';
import { ITEMS_ACTIONS } from '../../reducers/actions';

export const DoubleList = ({itemsHandle, field, item, action, error}) => {
  const [search, setSearch] = useState ("");
 
  const accion = (action !== undefined)?action:ITEMS_ACTIONS.SET;
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
    itemsHandle({type: accion, fieldname: field.name,  value: seleccionados});
    setItems(select);
  }
  
  const searchChange = (value) => {
    setSearch(value);
    const [a, vacio] = items;
    setItems([a, derecha.filter(i => i.label.includes(value))]);
  }

  return (

    <>
      <ClayForm.Group
        className={`${error !== undefined && error.length > 0 ? 'has-error' : 'has-success'} ${(field.hasOwnProperty('className')) ? field.className : 'col'} `}
        key={"Group-" + field.key} >
        
         <ClayPanel
          collapsable={false}
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
          {
            field.search !== undefined && field.search === true &&
            <ClayInput
              id="basicInputText"
              placeholder="Insert your name here"
              type="text"
              value={search}
              onChange={evt=>searchChange(evt.target.value)}
              className='col-3 align-items-end'
              />
          }
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
        
        {
          error !== undefined && error.length > 0 &&
          <ClayForm.FeedbackGroup key={"error" + field.name}>
            <ClayForm.FeedbackItem key={"err" + field.name}>
              <ClayForm.FeedbackIndicator key={"erfi" + field.name} spritemap={spritemap} symbol="check-circle-full" />{error[0]} </ClayForm.FeedbackItem>
          </ClayForm.FeedbackGroup>
        }
      </ClayForm.Group>
    </>
        );
 
}