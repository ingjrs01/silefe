import ClayButton from '@clayui/button';
import ClayIcon from '@clayui/icon';
import { ClayPaginationWithBasicItems } from '@clayui/pagination';
import ClayPaginationBar from '@clayui/pagination-bar';
import React, { useState } from "react";
import { Liferay } from '../../common/services/liferay/liferay';
import { spritemap } from "../LiferayFunctions";
import { ITEMS_ACTIONS } from '../reducers/items.reducer';

export const Paginator = ({itemsHandle,items}) => {
  const [active, setActive] = useState(items.pagination.page+1);
  const its  = items.pagination.sizes.map( s => ({
    label: s,
    onClick: () => { itemsHandle({type:ITEMS_ACTIONS.SET_PAGESIZE, pageSize:s})}
  }));
  const setPage = (p) => {
    setActive(p);
    itemsHandle({type: ITEMS_ACTIONS.SETPAGE,page:p-1});
  }

  return (
    <ClayPaginationBar>
      <ClayPaginationBar.DropDown
        items={its}
        trigger={
          <ClayButton displayType="unstyled">
            {items.pagination.pageSize + " " + Liferay.Language.get("items_pagina")}
            <ClayIcon spritemap={spritemap} symbol="caret-double-l" />
          </ClayButton>
        }
      />

      <ClayPaginationBar.Results>
        {"Mostrando un puñado de items..."}
      </ClayPaginationBar.Results>

      <ClayPaginationWithBasicItems
        active={active}
        ellipsisBuffer={2}
        ellipsisprops={{ "aria-label": "Más", title: "Más" }}
        onActiveChange={evt => setPage(evt)}
        spritemap={spritemap}
        totalPages={items.pagination.totalPages}
        //onDeltaChange={console.log("pageSize")}
      />
    </ClayPaginationBar>
  );
};
