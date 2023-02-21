import React, { useState } from "react";
import ClayForm, { ClayInput, ClaySelect, ClayToggle, ClaySelectBox, ClayRadio, ClayRadioGroup, ClayCheckbox } from '@clayui/form';
import ClayTable from '@clayui/table';
import ClayButton, {ClayButtonWithIcon} from '@clayui/button';
import ClayDatePicker from '@clayui/date-picker';
import ClayAutocomplete from '@clayui/autocomplete';
import { ITEMS_ACTIONS } from '../../includes/reducers/items.reducer';
import ClayLocalizedInput from '@clayui/localized-input';
import { getMonths, getDays } from '../../includes/interface/DatesLang';
import { getLanguageId } from '../../includes/LiferayFunctions';


const ExperienciaRender = ({items}) =>  {


    return (
        <>                            
        <ClayTable>
          <caption>Experiencias</caption>
          <ClayTable.Head>
            <ClayTable.Row>
              <ClayTable.Cell headingCell><ClayCheckbox checked={false} onChange={() =>console.log("lalala")} />
              </ClayTable.Cell>
              <ClayTable.Cell headingCell>{"Inicio"}</ClayTable.Cell>
              <ClayTable.Cell headingCell>{"Fin"}</ClayTable.Cell>
              <ClayTable.Cell expanded headingCell>{"Titulacion"}</ClayTable.Cell>
              <ClayTable.Cell headingCell>{"Acciones"}</ClayTable.Cell>
            </ClayTable.Row>
          </ClayTable.Head>
          <ClayTable.Body>
            { items.map( (item,index) => { return(
             <>
            <ClayTable.Row>
              <ClayTable.Cell><ClayCheckbox checked={false} onChange={() =>console.log("lalala")} />
              </ClayTable.Cell>
              <ClayTable.Cell>{item.ini}</ClayTable.Cell>
              <ClayTable.Cell>{item.fin}</ClayTable.Cell>
              <ClayTable.Cell headingTitle>{item.titulacionName}</ClayTable.Cell>
              <ClayTable.Cell>
                <ClayButton onClick={e => {
                    editTitulacion(index);
                  }} 
                  displayType="secondary">{"E"} 
                </ClayButton>
                <ClayButton onClick={e => {
                  borrarTitulacion(index);
                  }} 
                  displayType="danger">{"B"} 
                </ClayButton>
              </ClayTable.Cell>
            </ClayTable.Row>
             </> 
            );})}

          </ClayTable.Body>
        </ClayTable>
        <ClayButton onClick={e => { 
            editTitulacion(-1);
          }} 
          displayType="primary">{Liferay.Language.get('Nuevo')} 
        </ClayButton>
      </>
    );
}

export default ExperienciaRender;