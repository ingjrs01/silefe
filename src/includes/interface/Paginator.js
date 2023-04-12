import React, {useState} from "react";
import { ITEMS_ACTIONS} from '../reducers/items.reducer';
import {ClayPaginationWithBasicItems} from '@clayui/pagination';

const spritemap = '/icons.svg';

export const Paginator = ({itemsHandle,items}) => {
  const [active, setActive] = useState(items.page+1);

  const setPage = (p) => {
    setActive(p);
    itemsHandle({type: ITEMS_ACTIONS.SETPAGE,page:p-1});
  }

  return (
    <ClayPaginationWithBasicItems
      active={active}
      ellipsisBuffer={2}
      ellipsisProps={{ "aria-label": "Más", title: "Más" }}
      onActiveChange={evt => setPage(evt)}
      spritemap={spritemap}
      totalPages={items.totalPages}
    />
  );
};

