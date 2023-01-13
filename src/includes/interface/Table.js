import React from 'react';
import ClayTable from '@clayui/table';
import {ClayCheckbox} from '@clayui/form';

import { ITEMS_ACTIONS } from '../reducers/items.reducer'
import {getLanguageId } from '../LiferayFunctions';

const Table = ({ items, itemsHandle}) => {

  let lang = getLanguageId().replace("_","-");
  
  return (
    <ClayTable>
      <ClayTable.Head>
        <ClayTable.Row>
            {
              Object.keys(items.table).map(tableCol => {
                if (items.table[tableCol].columnType == "string" || items.table[tableCol].columnType == "multilang")
                  return (<ClayTable.Cell key={items.table[tableCol].key}><strong>{ tableCol }</strong></ClayTable.Cell> )
                if (items.table[tableCol].columnType == "string")
                  return (<ClayTable.Cell key={items.table[tableCol].key} headingCell><ClayCheckbox checked={items.checkall} onChange={() =>itemsHandle({type:ITEMS_ACTIONS.CHECKALL})} /> </ClayTable.Cell>)
              })
            }
        </ClayTable.Row>
      </ClayTable.Head>

            ESTAMOS AQUI: Hay que cambiar para abajo <----------------------------------------------


      <ClayTable.Body>
        { 
          rows.arr.map( (row,index )=> {
            return (
              <ClayTable.Row key={row.id} >
                {
                  columns.map( (column) => { 
                    if (column.columnType == "multilang")
                      return (<ClayTable.Cell key={column.key+row.id}>{ row[column.columnName][lang] }</ClayTable.Cell> )
                    if (column.columnType == "string")
                      return (<ClayTable.Cell key={column.key+row.id}>{ row[column.columnName] }</ClayTable.Cell> )
                    if (column.columnType == "checkbox")
                      return (
                        <ClayTable.Cell key={column.key+row.id}><ClayCheckbox checked={row.checked} onChange={()=>{itemsHandle({type:ITEMS_ACTIONS.CHECK,index:index});}} value={row[column.columnName]}  />
                         <span>{row[column.columnName]}</span> 
                        </ClayTable.Cell>
                      )
                    if (column.columnType == "localized")
                        return (
                          <ClayTable.Cell><ClayCheckbox checked={row.checked} onChange={()=>{itemsHandle({type:ITEMS_ACTIONS.CHECK,index:index})}} value={row[column.columnName]}  />
                          <span>{ row[column.columnName].children[0].value  }</span> 
                         </ClayTable.Cell> 
                        )
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

