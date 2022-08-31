import React,{ useState } from 'react';
import ClayTable from '@clayui/table';
import {ClayCheckbox} from '@clayui/form';
import {ClayLabel} from '@clayui/label';


const Table = ({columns,rows,handleCheck,handleAllCheck,allCheck}) => {

  return (
    <ClayTable>
      <ClayTable.Head>
        <ClayTable.Row>
            {
                columns.map( (column) => { 
                  if (column.columnType == "string")
                    return (<ClayTable.Cell>{ column.columnTitle }</ClayTable.Cell> )
                  if (column.columnType == "checkbox")
                    return (<ClayTable.Cell headingCell><ClayCheckbox checked={allCheck} onChange={() => handleAllCheck()} /> </ClayTable.Cell>)
                })
            }
          {/*
            <ClayTable.Cell expanded headingCell> {"Teams"} </ClayTable.Cell>
            <ClayTable.Cell headingCell>{"Region"}</ClayTable.Cell>
          */}
        </ClayTable.Row>
      </ClayTable.Head>
      <ClayTable.Body>
        { 
          rows.map( (row,index )=> {
            return (
              <ClayTable.Row key={row.titulacionId} >
                {
                  columns.map( (column) => { 
                    if (column.columnType == "string")
                      return (<ClayTable.Cell>{ row[column.columnName] }</ClayTable.Cell> )
                    if (column.columnType == "checkbox")
                      return (
                        <ClayTable.Cell><ClayCheckbox checked={row.checked} onChange={()=>{handleCheck(index)}} value={row[column.columnName]}  />
                         <span>{row[column.columnName]}</span> 
                        </ClayTable.Cell>
                      )
                  })
                }
                {/*
                  <ClayTable.Cell headingTitle><ClayCheckbox checked={row.checked} onChange={()=>{handleCheck(index)}} value={row.titulacionId} name={"lalala"} /></ClayTable.Cell>
                  <ClayTable.Cell headingTitle>{ row.codigo }</ClayTable.Cell>
                  <ClayTable.Cell>{ row.descripcion }</ClayTable.Cell>
                */}
              </ClayTable.Row>
            )
            }) 
        }
      </ClayTable.Body>
    </ClayTable>
  );
};

export default Table;

