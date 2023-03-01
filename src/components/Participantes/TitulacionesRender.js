import React from "react";
import { ClayCheckbox } from '@clayui/form';
import ClayTable from '@clayui/table';
import ClayButton from '@clayui/button';
import { TITULACIONES_ACTIONS } from "../../includes/reducers/titulaciones.reducer";
import { TableForm } from "./TableForm";

const TitulacionesRender = ({redTitulaciones, titulacionHandler}) => {

    return(
        <>     
        {redTitulaciones.status == "list" &&
        <>
        <ClayTable>
          <caption>{Liferay.Language.get("Titulaciones")}</caption>
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
            { redTitulaciones.items.map( (item,index) => { return(
             <>
            <ClayTable.Row>
              <ClayTable.Cell><ClayCheckbox checked={false} onChange={() =>console.log("lalala")} />
              </ClayTable.Cell>
              <ClayTable.Cell>{item.ini}</ClayTable.Cell>
              <ClayTable.Cell>{item.fin}</ClayTable.Cell>
              <ClayTable.Cell headingTitle>{item.titulacionName}</ClayTable.Cell>
              <ClayTable.Cell>
                <ClayButton onClick={e => {
                    titulacionHandler({type:TITULACIONES_ACTIONS.SET_TITULACIONTIPO, value: redTitulaciones.items[index].titulacionTipoId});
                    titulacionHandler({type: TITULACIONES_ACTIONS.SELECT_ITEM,index: index});
                  }} 
                  displayType="secondary">{"E"} 
                </ClayButton>
                <ClayButton onClick={e => titulacionHandler({type:TITULACIONES_ACTIONS.DELETE_ITEM, index: index}) } 
                  displayType="danger">{"B"} 
                </ClayButton>
              </ClayTable.Cell>
            </ClayTable.Row>
             </> 
            );})}

          </ClayTable.Body>
        </ClayTable>
        <ClayButton onClick={e => { 
            //editTitulacion(-1);
            titulacionHandler({type: TITULACIONES_ACTIONS.NEW_ITEM})
          }} 
          displayType="primary">{Liferay.Language.get('Nuevo')} 
        </ClayButton>
        </> 
        }                      

        {
            (redTitulaciones.status === 'edit') && 
            <TableForm 
                redTitulaciones={redTitulaciones}
                titulacionHandler={titulacionHandler}
            />
            }

      </>
    )

}

export default TitulacionesRender;