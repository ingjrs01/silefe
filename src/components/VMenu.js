import ClayIcon from '@clayui/icon';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { spritemap } from '../includes/LiferayFunctions';
import MenuItems from '../menu/MenuItems';

const VMenu = () => {
    const location = useLocation(); 

    return (
        <nav className="menubar menubar-transparent menubar-vertical-expand-md">
        	<button
        		aria-controls="menubarVerticalMdButtonsCollapse01"
        		aria-expanded="false"
        		className="menubar-toggler"
        		data-toggle="collapse"
        		data-target="#menubarVerticalMdButtonsCollapse01"
        		role="button"
        	>
        		Detalles
				<ClayIcon symbol="caret-bottom" spritemap={spritemap} />
        	</button>
        	<div
        		className="collapse menubar-collapse"
        		id="menubarVerticalMdButtonsCollapse01"
        	>
        		<ul className="nav nav-nested-margins">
        			<li className="nav-item">
        				<button
        					aria-controls="menubarVerticalMdNestedCollapseButton01"
        					aria-expanded="true"
        					className="btn btn-unstyled collapse-icon nav-link"
        					data-toggle="collapse"
        					data-target="#menubarVerticalMdNestedCollapseButton01"
        					type="button"
        				>
        					Maestros
        					<span className="collapse-icon-closed">
							<ClayIcon symbol="caret-right" spritemap={spritemap} />
        					</span>
        					<span className="collapse-icon-open">
								<ClayIcon symbol="caret-bottom" spritemap={spritemap} />
        					</span>
        				</button>
        				<div
        					className="collapse show"
        					id="menubarVerticalMdNestedCollapseButton01"
        				>
        					<ul className="nav nav-stacked">
								{  MenuItems.map(i => {
									return (
										<li className="nav-item" key={"IMLAT" + i.key}>
											<Link to={i.url} className={`nav-link ${ location.pathname == i.url ? "active" : "" } `} key={"MLat-"+i.key}> {i.caption} </Link> 
										</li>											
									);
								}) }
        					</ul>
        				</div>
        			</li>
        		</ul>
        	</div>
        </nav>
    )
}

export default VMenu;