import React, {useState} from "react";
import { ITEMS_ACTIONS} from '../reducers/items.reducer';
import {ClayPaginationWithBasicItems} from '@clayui/pagination';
import ClayPaginationBar from '@clayui/pagination-bar';
import ClayButton from '@clayui/button';
import ClayIcon from '@clayui/icon';
//import {ClayPaginationBarWithBasicItems} from '@clayui/pagination-bar';

const spritemap = "./o/my-project/icons.svg";

export const Paginator = ({itemsHandle,items}) => {
  const [active, setActive] = useState(items.page+1);

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
      {
        /*
        items={ items.pagination.sizes.map( s => ({
          label: s
        }))}
        */
      }
      <ClayPaginationBar.DropDown
        items={its}
        trigger={
          <ClayButton displayType="unstyled">
            {items.pagination.pageSize + " items por página"}

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
        totalPages={items.totalPages}
        onDeltaChange={console.log("pageSize")}
      />
    </ClayPaginationBar>
  );
};

