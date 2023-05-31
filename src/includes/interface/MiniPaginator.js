import React, {useState} from "react";
import {ClayPaginationWithBasicItems} from '@clayui/pagination';
import ClayPaginationBar from '@clayui/pagination-bar';

const spritemap = "./o/my-project/icons.svg";

export const MiniPaginator = ({itemsHandle,items, ITEMS_ACTIONS}) => {
  const [active, setActive] = useState(items.pagination.page+1);
  const setPage = (p) => {
    setActive(p);
    itemsHandle({type: ITEMS_ACTIONS.SETPAGE,page:p-1});
  }

  return (
    <ClayPaginationBar>
      <ClayPaginationWithBasicItems
        active={active}
        ellipsisBuffer={2}
        ellipsisprops={{ "aria-label": "Más", title: "Más" }}
        onActiveChange={evt => setPage(evt)}
        spritemap={spritemap}
        totalPages={items.pagination.totalPages}
      />
    </ClayPaginationBar>
  );
};
