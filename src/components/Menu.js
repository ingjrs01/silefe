import ClayButton, { ClayButtonWithIcon } from '@clayui/button';
import ClayDatePicker from '@clayui/date-picker';
import { ClayInput, ClaySelect } from '@clayui/form';
import { ClayIconSpriteContext } from '@clayui/icon';
import ClayToolbar from '@clayui/toolbar';
import React from 'react';
import { Liferay } from '../common/services/liferay/liferay';
import { spritemap } from '../includes/LiferayFunctions';
import { MgtToolbar } from '../includes/interface/MgtToolbar';
import { ITEMS_ACTIONS } from '../includes/reducers/actions';
import { handleDelete } from '../includes/utils';

import { getLanguageId } from '../includes/LiferayFunctions'; //   '../../LiferayFunctions';
//import { ITEMS_ACTIONS } from '../../reducers/actions';
import { getDays, getMonths } from '../includes/interface/DatesLang';


const Menu = ({ itemsHandle, items, handleSave, download, onOpenChange }) => {

  const createElement = () => {
    itemsHandle({ type: ITEMS_ACTIONS.NEW_ITEM });

    if (items.fields.hasOwnProperty("handleNew"))
      items.fields.handleNew();
  }

  const onChange = (val) => {
    console.log(val);
  }

  return (
    <>
      <ClayIconSpriteContext.Provider value={spritemap}>
        <ClayToolbar>
          <ClayToolbar.Nav>
            <ClayToolbar.Item className="text-left" expand>
              <ClayToolbar.Section>
                <h2 className='h1'>{items.fields.title}</h2>
              </ClayToolbar.Section>
            </ClayToolbar.Item>

            {
              items.status === "list" && items.fields.searchFields !== undefined && items.fields.searchFields.length > 1 &&
              <>
              <ClayToolbar.Item>
                <ClaySelect aria-label="Select Label"
                  id={"fieldMenu"}
                  name={"fieldMenu"}
                  key={"fieldMenu"}
                  onChange={evt => {
                    itemsHandle({ type: ITEMS_ACTIONS.SET_SEARCHFIELD, value: evt.target.value });
                  }}
                  value={items.fields.searchField} >
                  <ClaySelect.Option
                    key={"Aon-0"}
                    label={Liferay.Language.get("Seleccionar")}
                    value={-1}
                  />
                  {items.fields.searchFields.map(field => (
                    <ClaySelect.Option
                      key={"Aon-" + items.fields.fields[field].key}
                      label={items.fields.fields[field].label}
                      value={items.fields.fields[field].name}
                    />
                  ))}
                </ClaySelect>
                </ClayToolbar.Item>
                <ClayToolbar.Item>

                <ClaySelect aria-label="Select Label"
                  id={"fieldMenu2"}
                  name={"fieldMenu2"}
                  key={"fieldMenu2"}
                  onChange={evt => itemsHandle({ type: ITEMS_ACTIONS.SET_SEARCHOP, value: evt.target.value })}
                  value={items.fields.searchOperator} >
                  <ClaySelect.Option
                    key={"CAon-0"}
                    label={Liferay.Language.get("=")}
                    value={"="}
                  />
                  <ClaySelect.Option
                    key={"CAon-1"}
                    label={Liferay.Language.get(">")}
                    value={">"}
                  />
                  <ClaySelect.Option
                    key={"CAon-3"}
                    label={Liferay.Language.get("<")}
                    value={"<"}
                  />
                  <ClaySelect.Option
                    key={"CAon-4"}
                    label={Liferay.Language.get(">=")}
                    value={">="}
                  />
                  <ClaySelect.Option
                    key={"CAon-5"}
                    label={Liferay.Language.get("<=")}
                    value={"<="}
                  />
                  <ClaySelect.Option
                    key={"CAon-6"}
                    label={Liferay.Language.get("Contiene")}
                    value={"like"}
                  />
              </ClaySelect>
              </ClayToolbar.Item>
              </>
            }
            {             
              (items.status === "list") && (items.fields.hasOwnProperty("fields")) && 
              <ClayToolbar.Item>
                <ClayInput.Group>
                  <ClayInput.GroupItem >
                    { ["select"].includes(items.fields.fields[items.fields.searchField].type) &&
                      <>
                        {
                          <ClaySelect aria-label="Select Label"
                            id={"searchBottonField"}
                            name={"searchBottonField"}
                            key={"searchBottonField"}
                            value={items.fields.search}                           
                            onChange={e => itemsHandle({ type: ITEMS_ACTIONS.SEARCH, value: e.target.value })}>
                            {items.fields.fields[items.fields.searchField].options.map(field => (
                              <ClaySelect.Option
                                key={field.key}
                                label={field.label}
                                value={field.value}
                              />
                            ))}
                          </ClaySelect>
                        }
                      </>
                    }
                    { ["toggle"].includes(items.fields.fields[items.fields.searchField].type) &&
                      <>
                        {
                          <ClaySelect aria-label="Select Label"
                            id={"searchBottonField"}
                            name={"searchBottonField"}
                            key={"searchBottonField"}
                            value={items.fields.search}                           
                            onChange={e => itemsHandle({ type: ITEMS_ACTIONS.SEARCH, value: e.target.value })}
                          >
                              <ClaySelect.Option
                                key={"searchBottonFieldsi"}
                                label={Liferay.Language.get("Si")}
                                value={true}
                              />
                              <ClaySelect.Option
                                key={"searchBottonFieldni"}
                                label={Liferay.Language.get("No")}
                                value={false}
                              />
                          </ClaySelect>
                        }
                      </>
                    }
                    {
                      ["text", "multilang", "dni"].includes( items.fields.fields[items.fields.searchField].type) &&
                      <ClayInput
                        placeholder={"Buscar..."}
                        type="text"
                        name={"searchBottonValue"}
                        key={"searchBottonValue"}
                        value={items.fields.search}
                        onChange={e => itemsHandle({ type: ITEMS_ACTIONS.SEARCH, value: e.target.value}) }>
                      </ClayInput>
                    }
                    {
                      ["date"].includes( items.fields.fields[items.fields.searchField].type) &&
                      <ClayDatePicker
                        onChange={val => itemsHandle({ type: ITEMS_ACTIONS.SEARCH, value: val}) }
                        id={"searchDateMenu"}
                        firstDayOfWeek={1}
                        months={getMonths(getLanguageId())}
                        spritemap={spritemap}
                        timezone="GMT+01:00"
                        value={items.fields.search}
                        weekdaysShort={getDays(getLanguageId())}
                        key={"dtpkrsearch"}
                        years={{
                          end: (((new Date().getFullYear()) + 10)),
                          start: ((new Date().getFullYear() - 10))
                        }}
                      />
                    }

                  </ClayInput.GroupItem>
                    <ClayInput.GroupItem>
                        <ClayButtonWithIcon
                            aria-label={Liferay.Language.get("Buscar")}
                            spritemap={spritemap}
                            symbol="search-plus"
                            title="Añadir filtro"
                            onClick={() => itemsHandle({ type: ITEMS_ACTIONS.ADD_FILTER })}
                        />
                    </ClayInput.GroupItem>
                </ClayInput.Group>
              </ClayToolbar.Item>
              }

            <ClayToolbar.Item>
              <ClayToolbar.Section>
                <ClayButton.Group>
                  <ClayButtonWithIcon
                    displayType="danger"
                    aria-label="Delete"
                    className="nav-btn nav-btn-monospaced"
                    onClick={() => handleDelete(-1, items, itemsHandle, onOpenChange)}
                    spritemap={spritemap}
                    title={Liferay.Language.get("Eliminar elemento")}
                    symbol="trash"
                  />
                  {
                    (items.status === 'list') &&
                    <ClayButtonWithIcon
                      aria-label="Edit"
                      className="nav-btn nav-btn-monospaced"
                      onClick={() => itemsHandle({ type: ITEMS_ACTIONS.SELECT_ITEM })}
                      spritemap={spritemap}
                      title={Liferay.Language.get("Editar elemento")}
                      symbol="pencil"
                    />
                  }
                  {
                    (items.status === 'new' || items.status === 'edit') &&
                    <ClayButtonWithIcon
                      aria-label="Save"
                      className="nav-btn nav-btn-monospaced"
                      onClick={() => handleSave()}
                      title={Liferay.Language.get("Guardar")}
                      spritemap={spritemap}
                      symbol="disk"
                    />
                  }

                  {
                    (items.status === 'list') &&
                    <ClayButtonWithIcon
                      aria-label="Add"
                      className="nav-btn nav-btn-monospaced"
                      onClick={createElement}
                      spritemap={spritemap}
                      title={Liferay.Language.get("Crear elemento")}
                      symbol="plus"
                    />
                  }
                  {
                    (items.status === 'list') &&
                    <>
                      <ClayButtonWithIcon
                        aria-label="Load"
                        className="nav-btn nav-btn-monospaced"
                        onClick={() => items.fields.loadCsv()}
                        spritemap={spritemap}
                        title={Liferay.Language.get("Cargar desde fichero")}
                        symbol="import-list"
                      />
                      <ClayButtonWithIcon
                        aria-label="Download"
                        className="nav-btn nav-btn-monospaced"
                        onClick={() => download()}
                        spritemap={spritemap}
                        title={Liferay.Language.get("Descargar")}
                        symbol="document-table"
                      />
                    </>

                  }
                </ClayButton.Group>
              </ClayToolbar.Section>
            </ClayToolbar.Item>


          </ClayToolbar.Nav>
        </ClayToolbar>
      </ClayIconSpriteContext.Provider>
      {
        (items.status === 'list' && (items.search.length > 0 || items.filters.length > 0  || items.order.length > 0)) &&
        <MgtToolbar items={items} itemsHandle={itemsHandle} />
      }
    </>
  );
};

export default Menu;

