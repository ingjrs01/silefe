import React from "react";
import ClayIcon, {ClayIconSpriteContext} from '@clayui/icon';
//import {ITEMS_ACTIONS} from '../../includes/reducers/items.reducer';
import { ITEMS_ACTIONS } from "../reducers/items.reducer";

const spritemap = "./o/my-project/icons.svg";

export const MgtToolbar = ({items, itemsHandle}) => {
    return (
        <ClayIconSpriteContext.Provider value={spritemap}>

        <nav className="tbar tbar-inline-md-down subnav-tbar subnav-tbar-primary">
            <div className="container-fluid container-fluid-max-xl">
                <ul className="tbar-nav tbar-nav-wrap">
                    <li className="tbar-item">
                        <div className="tbar-section">
                            <span className="component-text text-truncate-inline">
                                <span className="text-truncate">{items.total} { Liferay.Language.get("resultados")} "<strong>{items.search}</strong>"</span>
                            </span>
                        </div>
                    </li>

                    {
                    items.order.map( x => (
                        <li className="tbar-item tbar-item-exand">
                            <div className="tbar-section">
                                <span className="label label-dismissible component-label tbar-label">
                                    <span className="label-item label-item-expand">
                                        <div className="label-section">Orden: <strong>{x.name} {x.direction }</strong></div>
                                    </span>
                                    <span className="label-item label-item-after">
                                        <ClayIcon 
                                            symbol="times" 
                                            onClick={() => itemsHandle({type:ITEMS_ACTIONS.DELETE_ORDER,fieldname:x.name})}
                                        />
                                    </span>
                                </span>
                            </div>
                        </li>
                        ))
                    }
                    {/*

                    <li class="tbar-item">
                        <div class="tbar-section">
                            <a class=" component-link tbar-link" href="#clear">clear</a>
                        </div>
                    </li>
                    */}
                </ul>
            </div>
        </nav>
        </ClayIconSpriteContext.Provider>
    )

}