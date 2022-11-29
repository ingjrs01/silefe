import React from 'react';
import ClayTable from '@clayui/table';
import {ClayCheckbox} from '@clayui/form';
//import {ClayLabel} from '@clayui/label';
import {ITEMS_ACTIONS} from '../includes/reducers/items.reducer';
import { getLanguageId} from '../includes/LiferayFunctions';

const Table = ({columns,rows, itemsHandle}) => {

  let lang = getLanguageId().replace("_","-");
  
  return (
    <ClayTable>
      <ClayTable.Head>
        <ClayTable.Row>
            {
                columns.map( (column) => { 
                  if (column.columnType == "string")
                    return (<ClayTable.Cell key={column.key}>{ column.columnTitle }</ClayTable.Cell> )
                  if (column.columnType == "checkbox")
                    return (<ClayTable.Cell key={column.key} headingCell><ClayCheckbox checked={rows.checkall} onChange={() =>itemsHandle({type:ITEMS_ACTIONS.CHECKALL})} /> </ClayTable.Cell>)
                })
            }
        </ClayTable.Row>
      </ClayTable.Head>
      <ClayTable.Body>
        { 
          rows.arr.map( (row,index )=> {
            return (
              <ClayTable.Row key={row.titulacionId} >
                {
                  columns.map( (column) => { 
                    if (column.columnType == "string")
                      return (<ClayTable.Cell key={column.key+row.titulacionId}>{ row[column.columnName][lang] }</ClayTable.Cell> )
                    if (column.columnType == "checkbox")
                      return (
                        <ClayTable.Cell key={column.key+row.titulacionId}><ClayCheckbox checked={row.checked} onChange={()=>{itemsHandle({type:ITEMS_ACTIONS.CHECK,index:index});}} value={row[column.columnName]}  />
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

