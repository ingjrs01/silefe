import ClayButton, { ClayButtonWithIcon } from '@clayui/button';
import { ClayCheckbox, ClayInput, ClaySelect } from '@clayui/form';
import ClayIcon from '@clayui/icon';
import ClayTable from '@clayui/table';
import ClayUpperToolbar from '@clayui/upper-toolbar';
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { spritemap } from "../../includes/LiferayFunctions";
import { MiniPaginator } from "../../includes/interface/MiniPaginator";
import { PARTICIPANTE_ACTIONS } from "../../includes/reducers/participantes.reducer";

const ParticipantesTable = ({participantes,participantesHandler, editUrl, backUrl, ancestorId }) =>  {

    const [showSearch, setShowSearch] = useState(false);

    if (!participantes.items) 
        return (<div>{Liferay.Language.get('Cargando')}</div>)
    
    return (
        <>
        { ( participantes.status === "list" ) &&
        <>
            <ClayUpperToolbar>
                <ClayUpperToolbar.Item className="text-left">
                    <label htmlFor="basicInput">{Liferay.Language.get("Buscar")}</label>
                </ClayUpperToolbar.Item>

                <ClayUpperToolbar.Item className="text-left">
                    <ClayIcon
                        symbol="view"
                        spritemap={spritemap}
                        onClick={() => {
                            participantesHandler({type: PARTICIPANTE_ACTIONS.LOAD});
                            setShowSearch(!showSearch);
                        }}
                    />
                </ClayUpperToolbar.Item>
                { showSearch &&
                <>
                <ClayUpperToolbar.Item className="text-left">
                    <ClayInput
                        placeholder={"Buscar..."}
                        type="text"
                        name={"cif"}
                        key={"cif"}
                        value={participantes.search}
                        onChange={e => {
                            participantesHandler({ type: PARTICIPANTE_ACTIONS.SETSEARCH, value: e.target.value });
                        }}>
                    </ClayInput>
                </ClayUpperToolbar.Item>
                {/* aqui ponemos el campo por el que buscar */}
                <ClayUpperToolbar.Item className="text-left">
                    <ClaySelect aria-label="Select Label"
                        id={"campo"}
                        name={"campo"}
                        key={"campo"}
                        onChange={evt => participantesHandler({ type: PARTICIPANTE_ACTIONS.SETSEARCHFIELD, value: evt.target.value })}
                        value={ participantes.searchField} >
                            <ClaySelect.Option
                                key={"option-1"}
                                label={"Nombre"}
                                value={"nombre"}
                            />
                            <ClaySelect.Option
                                key={"option-2"}
                                label={"Apellidos"}
                                value={"apellidos"}
                            />
                            <ClaySelect.Option
                                key={"option-3"}
                                label={"Documento"}
                                value={"documento"}
                            />
                    </ClaySelect>
                </ClayUpperToolbar.Item>

                <ClayUpperToolbar.Item className="text-left" expand>
                    <ClayButtonWithIcon
                        aria-label={Liferay.Language.get("Buscar")}
                        spritemap={spritemap}
                        symbol="search"
                        title="Search"
                        onClick={() => participantesHandler({type: PARTICIPANTE_ACTIONS.LOAD})}
                    />
                </ClayUpperToolbar.Item>
                </>
                }
            </ClayUpperToolbar>
            { showSearch && 
            <>
            <ClayTable>
            <caption>{ Liferay.Language.get("Seleccionar") }</caption>
            <ClayTable.Head>
                <ClayTable.Row>
                <ClayTable.Cell headingCell><ClayCheckbox checked={participantes.checkAllSearch} onChange={() => participantesHandler({type: PARTICIPANTE_ACTIONS.CHECKALLSEARCH})} />
                </ClayTable.Cell>
                <ClayTable.Cell headingCell>{Liferay.Language.get("Nombre")}</ClayTable.Cell>
                <ClayTable.Cell headingCell>{Liferay.Language.get("Apellidos")}</ClayTable.Cell>
                <ClayTable.Cell headingCell>{Liferay.Language.get("Documento")}</ClayTable.Cell>
                <ClayTable.Cell expanded headingCell>{Liferay.Language.get("Email")}</ClayTable.Cell>
                <ClayTable.Cell headingCell>{"Acciones"}</ClayTable.Cell>
                </ClayTable.Row>
            </ClayTable.Head>
            <ClayTable.Body>
                { participantes.searchItems.map( (item,index) => { return(
                <>
                <ClayTable.Row key={"tsel-"+index}>
                <ClayTable.Cell><ClayCheckbox checked={item.checked} onChange={() => participantesHandler({type: PARTICIPANTE_ACTIONS.CHECKSEARCH, index:index})} />
                </ClayTable.Cell>
                <ClayTable.Cell key={"sr"+item.nombre+index}>{item.nombre}</ClayTable.Cell>
                <ClayTable.Cell key={"sr"+item.apellidos+index}>{item.apellidos}</ClayTable.Cell>
                <ClayTable.Cell key={"sr"+item.documento+index}>{item.documento}</ClayTable.Cell>
                <ClayTable.Cell key={"sr"+item.email+index} headingTitle>{ item.email}</ClayTable.Cell>
                <ClayTable.Cell key={"sr-accion"+index}>
                    <ClayButtonWithIcon
                        aria-label={Liferay.Language.get("Quitar")}
                        spritemap={spritemap}
                        symbol="plus"
                        title="quitar"
                        displayType="primary"
                    />

                </ClayTable.Cell>
                </ClayTable.Row>
                </>
                );})}

            </ClayTable.Body>
            </ClayTable>
            <MiniPaginator
                items={participantes}
                itemsHandle={participantesHandler}
                ITEMS_ACTIONS={PARTICIPANTE_ACTIONS}
            />

			<ClayButton displayType="primary" onClick={ ()=> participantesHandler({type:PARTICIPANTE_ACTIONS.SELECT_ITEMS})}>
				{Liferay.Language.get("Seleccionar")}
			</ClayButton>
            </>
            }

            {/*--------------------------------------------------------------------------------------------------------*/ }
            <ClayTable>
            <caption>{ Liferay.Language.get("Participantes") }</caption>
            <ClayTable.Head>
                <ClayTable.Row>
                <ClayTable.Cell headingCell><ClayCheckbox checked={participantes.checkAll} onChange={() => participantesHandler({type: PARTICIPANTE_ACTIONS.CHECKALL})} />
                </ClayTable.Cell>
                <ClayTable.Cell headingCell>{Liferay.Language.get("Nombre")}</ClayTable.Cell>
                <ClayTable.Cell headingCell>{Liferay.Language.get("Apellidos")}</ClayTable.Cell>
                <ClayTable.Cell headingCell>{Liferay.Language.get("Documento")}</ClayTable.Cell>
                <ClayTable.Cell expanded headingCell>{Liferay.Language.get("Email")}</ClayTable.Cell>
                <ClayTable.Cell headingCell>{"Acciones"}</ClayTable.Cell>
                </ClayTable.Row>
            </ClayTable.Head>
            <ClayTable.Body>
                { participantes.items.map( (item,index) => { return(
                <>
                <ClayTable.Row key={"k-"+item.id}>
                <ClayTable.Cell><ClayCheckbox checked={item.checked} onChange={() => participantesHandler({type: PARTICIPANTE_ACTIONS.CHECK, index: index})} />
                </ClayTable.Cell>
                <ClayTable.Cell key={"krow-"+ item.nombre + item.id}>{item.nombre}</ClayTable.Cell>
                <ClayTable.Cell key={"krow-"+ item.apellidos + item.id}>{item.apellidos}</ClayTable.Cell>
                <ClayTable.Cell key={"krow-"+ item.documento + item.id}>{item.documento}</ClayTable.Cell>
                <ClayTable.Cell key={"krow-"+item.email+item.id} headingTitle>{ item.email}</ClayTable.Cell>
                <ClayTable.Cell>
                    <div className="btn-toolbar pull-right">
                        <Link to={{ pathname: `${editUrl}${item.id}` }} state={{ backUrl, ancestorId }}  > {
                        <ClayButtonWithIcon
                            aria-label={Liferay.Language.get("Editar")}
                            key={"edit-" + item.id}
                            spritemap={spritemap}
                            symbol="pencil"
                            title="Edit"
                            displayType="secondary"
                        />}</Link>
                            <ClayButtonWithIcon
                                aria-label={Liferay.Language.get("Quitar")}
                                key={"bi-" + item.id}
                                className="ml-1"
                                spritemap={spritemap}
                                symbol="trash"
                                title="Delete"
                                displayType="danger"
                                onClick={() => participantesHandler({type: PARTICIPANTE_ACTIONS.DELETE_ITEM, index: index})}
                            />
                    </div>

                </ClayTable.Cell>
                </ClayTable.Row>
                </>
                );})}

            </ClayTable.Body>
            </ClayTable>
            </>
        }
        </>
    );
}

export default ParticipantesTable;