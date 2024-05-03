import { ClayButtonWithIcon } from '@clayui/button';
import ClayDatePicker from '@clayui/date-picker';
import { ClayInput, ClaySelect } from '@clayui/form';
import ClayToolbar from '@clayui/toolbar';
import React from 'react';
import { Liferay } from '../../common/services/liferay/liferay';
import { getLanguageId, spritemap } from '../LiferayFunctions';
import { ITEMS_ACTIONS } from '../reducers/actions';
import { getDays, getMonths } from './DatesLang';
import { Selectfilter } from './fields/Selectfilter';



export const SearchBar = ({ itemsHandle, items, handleSave, download, onOpenChange }) => {


    return (
        <ClayToolbar>
          <ClayToolbar.Nav>
            <ClayToolbar.Item className="text-left" expand>
              <ClayToolbar.Section>
                <h2 className='h1'>{"BÚSQUEDA"}</h2>
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
                  {
                    ["date", "number", "select", "selectfilter", "toggle"].includes( items.fields.fields[items.fields.searchField].type) &&
                    <>
                    <ClaySelect.Option
                      key={"CAon-0"}
                      label={Liferay.Language.get("=")}
                      value={"="}
                    />
                    </>
                  }
                  {
                    ["date", "number", "money", "percent"].includes( items.fields.fields[items.fields.searchField].type) &&
                    <>
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
                    </>
                  }
                  {
                    ["text", "multilang", "textarea"].includes( items.fields.fields[items.fields.searchField].type) &&
                    <ClaySelect.Option
                      key={"CAon-6"}
                      label={Liferay.Language.get("Contiene")}
                      value={"like"}
                    />
                  }
              </ClaySelect>
              </ClayToolbar.Item>
              </>
            }
            {             
              (items.status === "list") && (items.fields.hasOwnProperty("fields")) && 
              <ClayToolbar.Item>
                <ClayInput.Group>
                  <ClayInput.GroupItem >
                    { ["select", "multilist"].includes(items.fields.fields[items.fields.searchField].type) &&
                      <>
                        {
                          <ClaySelect aria-label="Select Label"
                            id={"searchBottonField"}
                            name={"searchBottonField"}
                            key={"searchBottonField"}
                            value={items.fields.search}
                            className={'col-2'}
                            onChange={e => itemsHandle({ type: ITEMS_ACTIONS.SEARCH, value: e.target.value })}>
                            {items.fields.fields[items.fields.searchField].options.map(field => (
                              <ClaySelect.Option
                                key={field.key}
                                label={field.label}
                                value={field.value}
                                className={'col-2'}
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
                                label={Liferay.Language.get("Seleccionar")}
                                value={-1}
                              />
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
                      ["text", "multilang", "dni", "money", "number"].includes( items.fields.fields[items.fields.searchField].type) &&
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
                      ["selectfilter"].includes( items.fields.fields[items.fields.searchField].type) &&
                      <Selectfilter itemsHandle={itemsHandle} field={items.fields.fields["titulacion"]} item={items.fields.search} action={ITEMS_ACTIONS.SEARCH} error={items.errors["titulacion"]} key={"a-f"} />
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
                          start: ((new Date().getFullYear() - 100))
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

          </ClayToolbar.Nav>
        </ClayToolbar>        
    )
}