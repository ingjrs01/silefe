import React from 'react';
import ClayTable from '@clayui/table';
import {ClayCheckbox} from '@clayui/form';
import ClayIcon from '@clayui/icon';

import { ITEMS_ACTIONS } from '../reducers/items.reducer'
import {getLanguageId } from '../LiferayFunctions';

const spritemap = "./o/my-project/icons.svg";

const Table = ({ items, itemsHandle}) => {

  let lang = getLanguageId().replace("_","-");
  
  return (
    <ClayTable>
      <ClayTable.Head>
        <ClayTable.Row>
            {
              Object.keys(items.fields.table).map(tableCol => {
                if (items.fields.table[tableCol].columnType == "string" || items.fields.table[tableCol].columnType == "multilang")
                  return (
                    <ClayTable.Cell 
                      key={items.fields.table[tableCol].key}
                    >
                      <strong>{ items.fields.table[tableCol].columnTitle }</strong>
                      <span className="navbar-breakpoint-d-none">  </span>
                      <ClayIcon 
                        symbol="order-ascending" 
                        spritemap={spritemap} 
                        onClick={() =>  itemsHandle({type: ITEMS_ACTIONS.SET_ORDER, fieldname:tableCol})} 
                      />
                    </ClayTable.Cell> )
                if (items.fields.table[tableCol].columnType == "checkbox")
                  return (<ClayTable.Cell key={items.fields.table[tableCol].key} headingCell><ClayCheckbox checked={items.fields.checkall} onChange={() =>itemsHandle({type:ITEMS_ACTIONS.CHECKALL})} /> </ClayTable.Cell>)
              })
            }
        </ClayTable.Row>
      </ClayTable.Head>
      <ClayTable.Body>
        { 
          items.arr.map( (row,index )=> {
            return (
              <ClayTable.Row key={row.id} >
                {
                  Object.keys(items.fields.table).map(columName => {
                    switch (items.fields.table[columName].columnType) {
                      case "multilang":
                        return (<ClayTable.Cell key={columName+row.id}>{ row[columName][lang] }</ClayTable.Cell> )
                      case "string":
                        return (<ClayTable.Cell key={items.fields.table[columName].columnTitle+row.id}>{ row[columName] }</ClayTable.Cell> )
                      case "checkbox":
                        return (
                          <ClayTable.Cell key={items.fields.table[columName].key+row.id}><ClayCheckbox checked={row.checked} onChange={()=>{itemsHandle({type:ITEMS_ACTIONS.CHECK,index:index});}} value={row[columName]}  />
                          <span>{row[columName]}</span> 
                          </ClayTable.Cell>
                        )
                      case "localized":
                        return (
                          <ClayTable.Cell><ClayCheckbox checked={row.checked} onChange={()=>{itemsHandle({type:ITEMS_ACTIONS.CHECK,index:index})}} value={row[columName]}  />
                          <span>{ row[columName].children[0].value  }</span> 
                         </ClayTable.Cell> 
                        )
                      }
                  })
                }
              </ClayTable.Row>
            )
            }) 
        }
      </ClayTable.Body>
    </ClayTable>
  );
};

export default Table;

