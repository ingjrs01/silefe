import ClayButton, { ClayButtonWithIcon } from '@clayui/button';
import { ClayCheckbox } from '@clayui/form';
import ClayTable from '@clayui/table';
import React from "react";
import { Liferay } from '../../common/services/liferay/liferay';
import { spritemap } from '../../includes/LiferayFunctions';
import { TITULACIONES_ACTIONS } from '../../includes/reducers/actions';
//import { TableForm } from "./TableForm";
import RenderFields from '../../includes/interface/RenderFields';

export const TitulacionesRender = ({ redTitulaciones, titulacionHandler }) => {

  const rows = redTitulaciones.fields.rows;

  const changeSelectFile = (index) => {
    titulacionHandler({ type: TITULACIONES_ACTIONS.CHECK, index: index });
  }

  const changeSelectall = () => {
    titulacionHandler({ type: TITULACIONES_ACTIONS.CHECKALL });
  }

  return (
    <>
      {redTitulaciones.status == "list" &&
        <>
          <ClayTable>
            <ClayTable.Head>
              <ClayTable.Row>
                <ClayTable.Cell headingCell><ClayCheckbox checked={redTitulaciones.selectAll} onChange={changeSelectall} />
                </ClayTable.Cell>
                <ClayTable.Cell headingCell>{Liferay.Language.get("Inicio")}</ClayTable.Cell>
                <ClayTable.Cell headingCell>{Liferay.Language.get("Fin")}</ClayTable.Cell>
                <ClayTable.Cell expanded headingCell>{Liferay.Language.get("Titulacion")}</ClayTable.Cell>
                <ClayTable.Cell headingCell>{"Acciones"}</ClayTable.Cell>
              </ClayTable.Row>
            </ClayTable.Head>
            <ClayTable.Body>
              {redTitulaciones.items.map((item, index) => (
                <>
                  <ClayTable.Row>
                    <ClayTable.Cell><ClayCheckbox checked={item.selected} onChange={e => changeSelectFile(index)} />
                    </ClayTable.Cell>
                    <ClayTable.Cell>{item.ini}</ClayTable.Cell>
                    <ClayTable.Cell>{item.fin}</ClayTable.Cell>
                    <ClayTable.Cell headingTitle>{item.titulacionName}</ClayTable.Cell>
                    <ClayTable.Cell>
                      <ClayButtonWithIcon
                        aria-label={Liferay.Language.get("Editar")}
                        onClick={() => {
                          titulacionHandler({ type: TITULACIONES_ACTIONS.SET, fieldname: 'titulacionTipoId', value: redTitulaciones.items[index].titulacionTipoId });
                          titulacionHandler({ type: TITULACIONES_ACTIONS.SELECT_ITEM, index: index });
                        }}
                        displayType="secondary"
                        spritemap={spritemap}
                        symbol="pencil"
                        title="Edit"
                      />

                      <ClayButtonWithIcon
                        className='ml-1'
                        onClick={() => titulacionHandler({ type: TITULACIONES_ACTIONS.DELETE_ITEM, index: index })}
                        aria-label="Close"
                        displayType={"danger"}
                        spritemap={spritemap}
                        symbol="trash"
                        title="Close"
                      />

                    </ClayTable.Cell>
                  </ClayTable.Row>
                </>
              ))}
            </ClayTable.Body>
          </ClayTable>
          <ClayButton
            onClick={e => titulacionHandler({ type: TITULACIONES_ACTIONS.NEW_ITEM })}
            displayType="primary">{Liferay.Language.get('Nuevo')}
          </ClayButton>
        </>
      }
      {
        (redTitulaciones.status === 'edit') &&
        <>
          <RenderFields
            rows={rows}
            itemsHandle={titulacionHandler}
            items={redTitulaciones}
            plugin={"lalala"}
          />
          <div className="btn-group">
            <div className="btn-group-item">
              <ClayButton onClick={() => titulacionHandler({ type: TITULACIONES_ACTIONS.CANCEL })} displayType="secondary">{Liferay.Language.get('Cancelar')}</ClayButton>
            </div>
            <div className="btn-group-item">
              <ClayButton onClick={() => titulacionHandler({ type: TITULACIONES_ACTIONS.SAVE })} displayType="primary">{Liferay.Language.get('Guardar')}</ClayButton>
            </div>
          </div>
        </>
      }
    </>
  )
}
