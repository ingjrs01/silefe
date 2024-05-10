import { ClayButtonWithIcon } from '@clayui/button';
import { ClayCheckbox } from '@clayui/form';
import ClayIcon from '@clayui/icon';
import ClayTable from '@clayui/table';
import React from 'react';
import { Liferay } from '../../common/services/liferay/liferay';
import { getLanguageId, spritemap } from '../LiferayFunctions';
import { ITEMS_ACTIONS } from '../reducers/actions';
import { formatDefaultEmail, formatDefaultPhone, formatDocument, handleDelete } from '../utils';

const Table = ({ items, itemsHandle, onOpenChange}) => {
  const lang =  getLanguageId();
  
  return (
    <ClayTable>
      <ClayTable.Head>
        <ClayTable.Row>
            {
              Object.keys(items.fields.table).map(tableCol => {
                switch (items.fields.table[tableCol].columnType) {
                  case "string":
                  case "dni": 
                  case "multilang":
                  case "phone": 
                  case "email": 
                    return (
                      <ClayTable.Cell key={items.fields.table[tableCol].key}  >
                        <strong>{ items.fields.table[tableCol].columnTitle }</strong>
                        <span className="navbar-breakpoint-d-none">  </span>
                        <ClayIcon
                          symbol="order-ascending"
                          spritemap={spritemap}
                          onClick={() =>  itemsHandle({type: ITEMS_ACTIONS.SET_ORDER, fieldname:tableCol})}
                        />
                      </ClayTable.Cell> )
                    case "boolean": 
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
                        </ClayTable.Cell>
                      )
                    case "checkbox": 
                      return (<ClayTable.Cell key={items.fields.table[tableCol].key} headingCell><ClayCheckbox checked={items.fields.checkall} onChange={() =>itemsHandle({type:ITEMS_ACTIONS.CHECKALL})} /> </ClayTable.Cell>)
                    default: 
                        break;
                }
              })
            }
            <ClayTable.Cell className={"table-cell-minw-100"} key={"a"}>Acciones</ClayTable.Cell>
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
                        return (<ClayTable.Cell key={columName+row.id}>{ row[columName] }</ClayTable.Cell> )
                      case "dni":
                        return (<ClayTable.Cell key={columName+row.id}>{ formatDocument(row["tipoDoc"],row[columName]) }</ClayTable.Cell> )                          
                      case "phone":
                        return (<ClayTable.Cell key={columName+row.id}>{ formatDefaultPhone(row[columName]) }</ClayTable.Cell> )    
                      case "email":
                        return (<ClayTable.Cell key={columName+row.id}>{ formatDefaultEmail(row[columName]) }</ClayTable.Cell> )    
                      case "boolean":
                        return (<ClayTable.Cell key={columName+row.id}>{<ClayCheckbox checked={row[columName]}  disabled  />} </ClayTable.Cell>)
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
                      case "select":
                          let aa = "";
                          if (row[columName] === undefined || row[columName] === null)
                              aa = "ND";
                          else {
                              let arr = items.fields.fields[columName].options.filter(i => i.value === row[columName].toString());
                              if (arr.length > 0)
                                  aa = arr[0].label;
                              else
                                  aa = "ND";
                          }
                          return (<ClayTable.Cell key={"ttop" + row.id + columName}>{aa} </ClayTable.Cell>)
                      }
                  })
                }
                <ClayTable.Cell>
                    <ClayButtonWithIcon 
                        onClick={ () => itemsHandle({type: ITEMS_ACTIONS.SELECT_ITEM, index: index}) }
                        displayType="secondary"
                        spritemap={spritemap}
                        aria-label="Edit"
                        symbol="pencil"
                        title={Liferay.Language.get("Editar")}
                    />
                    <ClayButtonWithIcon
                        className="ml-1"
                        onClick={ () => handleDelete(index, items, itemsHandle,onOpenChange)}
                        displayType="danger"
                        spritemap={spritemap}
                        aria-label="Delete"
                        symbol="trash"
                        title={Liferay.Language.get("Borrar")}
                    />
                </ClayTable.Cell>

              </ClayTable.Row>
            )
            })
        }
      </ClayTable.Body>
    </ClayTable>
  );
};

export default Table;

