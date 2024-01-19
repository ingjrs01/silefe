import ClayTable from '@clayui/table';
import React from "react";
import { Liferay } from '../../common/services/liferay/liferay';
import { HISTORICO_ACTIONS } from '../../includes/reducers/historico.reducer';
import { MiniPaginator } from "./MiniPaginator";

export const FHistoryEntity = ({data, handler}) => {

    const changePageSearch = (page) => {
        handler({ type: HISTORICO_ACTIONS.SETPAGESEARCH, page: page });
    }

    if (data === undefined || data == null || data.length == 0 ) 
        return(<div>Cargando...</div>)

    return (
        <>
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
                data.items.map(item => (
                    <ClayTable.Row key={"rowhistory"+item.id}>
                        <ClayTable.Cell key={item.id + "hisuser"} headingTitle>{ item.user }</ClayTable.Cell>
                        <ClayTable.Cell key={item.id + "hiscomment"}>{ item.comment }</ClayTable.Cell>
                        <ClayTable.Cell key={item.id + "hisdate"}>{ item.date }</ClayTable.Cell>
                    </ClayTable.Row>
                ))
            }
        </ClayTable.Body>
    </ClayTable>

    <MiniPaginator
        pagination={data.pagination}
        changePage={changePageSearch}
    />
        </>


    )

}

