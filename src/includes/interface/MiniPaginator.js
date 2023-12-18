import { ClayPaginationWithBasicItems } from '@clayui/pagination';
import ClayPaginationBar from '@clayui/pagination-bar';
import React, { useState } from "react";
import { spritemap } from "../LiferayFunctions";

export const MiniPaginator = ( {pagination, changePage}) => {
  const [active, setActive] = useState(pagination.page+1);
  const setPage = (p) => {
    setActive(p);
    changePage(p-1);
  }

  return (
    <ClayPaginationBar>
      <ClayPaginationWithBasicItems
        active={active}
        ellipsisBuffer={2}
        ellipsisprops={{ "aria-label": "Más", title: "Más" }}
        onActiveChange={evt => setPage(evt)}
        spritemap={spritemap}
        totalPages={pagination.totalPages}
      />
    </ClayPaginationBar>
  );
};
