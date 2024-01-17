import ClayButton from '@clayui/button';
import ClayCard from "@clayui/card";
import ClayTable from '@clayui/table';
import React from 'react';
import { Liferay } from '../../common/services/liferay/liferay';
import { ITEMS_ACTIONS } from '../reducers/items.reducer';

export const History = ({ data, itemsHandle, prevState }) => {
   
    return (
        <>
            <ClayCard>
                <ClayCard.Body>
                    <ClayCard.Description displayType="title">
                        {Liferay.Language.get("Histórico")}
                    </ClayCard.Description>
                    <ClayCard.Description truncate={false} displayType="text">
                        <ClayTable>
                            <ClayTable.Head>
                                <ClayTable.Row>
                                    <ClayTable.Cell headingCell>
                                        {Liferay.Language.get("Usuario")}
                                    </ClayTable.Cell>
                                    <ClayTable.Cell expanded headingCell>{Liferay.Language.get("Comentario")}</ClayTable.Cell>
                                    <ClayTable.Cell headingCell>{Liferay.Language.get("Fecha")}</ClayTable.Cell>
                                </ClayTable.Row>
                            </ClayTable.Head>
                            <ClayTable.Body>
                                {
                                    data.map(item => (
                                        <ClayTable.Row>
                                            <ClayTable.Cell headingTitle>{ item.user }</ClayTable.Cell>
                                            <ClayTable.Cell>{ item.comment }</ClayTable.Cell>
                                            <ClayTable.Cell>{ item.date }</ClayTable.Cell>
                                        </ClayTable.Row>
                                    ))
                                }
                            </ClayTable.Body>
                        </ClayTable>
                    </ClayCard.Description>

                    <div className="btn-group">
                        <div className="btn-group-item">
                            <ClayButton
                                onClick={e => itemsHandle({ type: ITEMS_ACTIONS.SET_STATUS, status: prevState })}
                                displayType="primary">{Liferay.Language.get('Cerrar')}
                            </ClayButton>
                        </div>
                    </div>
                </ClayCard.Body>
            </ClayCard>

        </>
    );
}