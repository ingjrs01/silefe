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

  const setPage = (p) => {
    setActive(p);
    itemsHandle({type: ITEMS_ACTIONS.SETPAGE,page:p-1});
  }

  return (
    <ClayPaginationBar>

      <ClayPaginationBar.DropDown
        items={[
          {
            label: "10",
            onClick: () => {}
          },
          {
            label: "20",
            onClick: () => {}
          }

        ]}
        trigger={
          <ClayButton displayType="unstyled">
            {"10 items per page"}

            <ClayIcon spritemap={spritemap} symbol="caret-double-l" />
          </ClayButton>
        }
      />

      <ClayPaginationBar.Results>
        {"Showing a handful of items..."}
      </ClayPaginationBar.Results>


      <ClayPaginationWithBasicItems
        active={active}
        ellipsisBuffer={2}
        ellipsisprops={{ "aria-label": "Más", title: "Más" }}
        onActiveChange={evt => setPage(evt)}
        spritemap={spritemap}
        totalPages={items.totalPages}
      />
    </ClayPaginationBar>
  );
};

