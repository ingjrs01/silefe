import React from 'react';
import {Link, useLocation} from 'react-router-dom';
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
        		<svg
        			className="lexicon-icon lexicon-icon-caret-bottom"
        			focusable="false"
        			role="presentation"
        		>
        			{/*<use xlink:href="/images/icons/icons.svg#caret-bottom" />*/}
                    <use xlinkHref="/images/icons/icons.svg#caret-bottom" />
        		</svg>
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
        					Información Básica
        					<span className="collapse-icon-closed">
        						<svg
        							className="lexicon-icon lexicon-icon-caret-right"
        							focusable="false"
        							role="presentation"
        						>
        							<use
        								xlinkHref="/images/icons/icons.svg#caret-right"
        							/>
        						</svg>
        					</span>
        					<span className="collapse-icon-open">
        						<svg
        							className="lexicon-icon lexicon-icon-caret-bottom"
        							focusable="false"
        							role="presentation"
        						>
        							<use
        								xlinkHref="/images/icons/icons.svg#caret-bottom"
        							/>
        						</svg>
        					</span>
        				</button>
        				<div
        					className="collapse show"
        					id="menubarVerticalMdNestedCollapseButton01"
        				>
        					<ul className="nav nav-stacked">

								{/*   Vamos a pintar el menú */}
								{  MenuItems.map(i => {
									return (
										<li className="nav-item">
											<Link to={i.url} className={`nav-link ${ location.pathname == i.url ? "active" : "" } `}> {i.caption} </Link> 
										</li>											
									);
								}) }


        						<li className="nav-item">
        							<button
        								aria-controls="menubarVerticalMdNestedCollapseButton02"
        								aria-expanded="false"
        								className="btn btn-unstyled collapsed collapse-icon nav-link"
        								data-toggle="collapse"
        								data-target="#menubarVerticalMdNestedCollapseButton02"
        								type="button"
        							>
        								Documents and Media
        								<span className="collapse-icon-closed">
        									<svg
        										className="lexicon-icon lexicon-icon-caret-right"
        										focusable="false"
        										role="presentation"
        									>
        										<use
        											xlinkHref="/images/icons/icons.svg#caret-right"
        										/>
        									</svg>
        								</span>
        								<span className="collapse-icon-open">
        									<svg
        										className="lexicon-icon lexicon-icon-caret-bottom"
        										focusable="false"
        										role="presentation"
        									>
        										<use
        											xlinkHref="/images/icons/icons.svg#caret-bottom"
        										/>
        									</svg>
        								</span>
        							</button>
        							<div
        								className="collapse"
        								id="menubarVerticalMdNestedCollapseButton02"
        							>
        								<ul className="nav nav-stacked">
        									<li className="nav-item">
        										<a className="nav-link" href="#1"
        											>Details</a
        										>
        									</li>
        									<li className="nav-item">
        										<a className="nav-link" href="#1"
        											>Categorization</a
        										>
        									</li>
        									<li className="nav-item">
        										<a className="nav-link" href="#1"
        											>Documents and Media</a
        										>
        									</li>
        									<li className="nav-item">
        										<a className="nav-link" href="#1"
        											>Site Template</a
        										>
        									</li>
        								</ul>
        							</div>
        						</li>
        						<li className="nav-item">
        							<a className="nav-link" href="#1">Site Template</a>
        						</li>
        					</ul>
        				</div>
        			</li>
        			<li className="nav-item">
        				<button
        					aria-controls="menubarVerticalMdNestedCollapseButton03"
        					aria-expanded="false"
        					className="btn btn-unstyled collapsed collapse-icon nav-link"
        					data-toggle="collapse"
        					data-target="#menubarVerticalMdNestedCollapseButton03"
        					type="button"
        				>
        					SEO
        					<span className="collapse-icon-closed">
        						<svg
        							className="lexicon-icon lexicon-icon-caret-right"
        							focusable="false"
        							role="presentation"
        						>
        							<use
        								xlinkHref="/images/icons/icons.svg#caret-right"
        							/>
        						</svg>
        					</span>
        					<span className="collapse-icon-open">
        						<svg
        							className="lexicon-icon lexicon-icon-caret-bottom"
        							focusable="false"
        							role="presentation"
        						>
        							<use
        								xlinkHref="/images/icons/icons.svg#caret-bottom"
        							/>
        						</svg>
        					</span>
        				</button>
        				<div
        					className="collapse"
        					id="menubarVerticalMdNestedCollapseButton03"
        				>
        					<ul className="nav nav-stacked">
        						<li className="nav-item">
        							<a className="nav-link" href="#1">Sitemap</a>
        						</li>
        						<li className="nav-item">
        							<a className="nav-link" href="#1">Robots</a>
        						</li>
        					</ul>
        				</div>
        			</li>
        			<li className="nav-item">
        				<button
        					aria-controls="menubarVerticalMdNestedCollapseButton04"
        					aria-expanded="false"
        					className="btn btn-unstyled collapsed collapse-icon nav-link"
        					data-toggle="collapse"
        					data-target="#menubarVerticalMdNestedCollapseButton04"
        					type="button"
        				>
        					Advanced
        					<span className="collapse-icon-closed">
        						<svg
        							className="lexicon-icon lexicon-icon-caret-right"
        							focusable="false"
        							role="presentation"
        						>
        							<use
        								xlinkHref="{{rootPath}}/images/icons/icons.svg#caret-right"
        							/>
        						</svg>
        					</span>
        					<span className="collapse-icon-open">
        						<svg
        							className="lexicon-icon lexicon-icon-caret-bottom"
        							focusable="false"
        							role="presentation"
        						>
        							<use
        								xlinkHref="{{rootPath}}/images/icons/icons.svg#caret-bottom"
        							/>
        						</svg>
        					</span>
        				</button>
        				<div
        					className="collapse"
        					id="menubarVerticalMdNestedCollapseButton04"
        				>
        					<ul className="nav nav-stacked">
        						<li className="nav-item">
        							<a className="nav-link" href="#1"
        								>Default User Associations</a
        							>
        						</li>
        						<li className="nav-item">
        							<a className="nav-link" href="#1">Staging</a>
        						</li>
        						<li className="nav-item">
        							<a className="nav-link" href="#1">Analytics</a>
        						</li>
        						<li className="nav-item">
        							<a className="nav-link" href="#1">Maps</a>
        						</li>
        					</ul>
        				</div>
        			</li>
        		</ul>
        	</div>
        </nav>
    )
}


export default VMenu;