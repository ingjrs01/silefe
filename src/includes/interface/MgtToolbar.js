import React from "react";
import ClayIcon, {ClayIconSpriteContext} from '@clayui/icon';
//import {ITEMS_ACTIONS} from '../../includes/reducers/items.reducer';
import { ITEMS_ACTIONS } from "../reducers/items.reducer";

const spritemap = "./o/my-project/icons.svg";

export const MgtToolbar = ({items, itemsHandle}) => {
    return (
        <ClayIconSpriteContext.Provider value={spritemap}>

        <nav class="tbar tbar-inline-md-down subnav-tbar subnav-tbar-primary">
            <div class="container-fluid container-fluid-max-xl">
                <ul class="tbar-nav tbar-nav-wrap">
                    <li class="tbar-item">
                        <div class="tbar-section">
                            <span class="component-text text-truncate-inline">
                                <span class="text-truncate">{items.total} { Liferay.Language.get("resultados")} "<strong>{items.search}</strong>"</span>
                            </span>
                        </div>
                    </li>


                    { /*
                    <li class="tbar-item">
                        <div class="tbar-section">
                            <span class="label component-label tbar-label">
                                <span class="label-item label-item-expand">
                                    <div class="label-section">Filter 1</div>
                                </span>
                            </span>
                        </div>
                    </li>
                    */}
                    {
                        /*
                    <li class="tbar-item">
                        <div class="tbar-section">
                            <span class="label label-dismissible component-label tbar-label">
                                <span class="label-item label-item-expand">
                                    <div class="label-section">Filter 2</div>
                                </span>
                                <span class="label-item label-item-after">
                                    <button class="btn close" aria-label="close" type="button">
                                        <svg class="lexicon-icon lexicon-icon-times" focusable="false" role="presentation">
                                            <title>times</title>
                                            <use href="/images/icons/icons.svg#times"></use>
                                        </svg>
                                    </button>
                                </span>
                            </span>
                        </div>
                    </li>
                        */
                    }
                    {
                    items.order.map( x => (
                        <li class="tbar-item tbar-item-exand">
                            <div class="tbar-section">
                                <span class="label label-dismissible component-label tbar-label">
                                    <span class="label-item label-item-expand">
                                        <div class="label-section">Orden: <strong>{x.name} {x.direction }</strong></div>
                                    </span>
                                    <span class="label-item label-item-after">
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