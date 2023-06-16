import React, {useState} from "react";
import ClayTable from '@clayui/table';
import ClayButton, {ClayButtonWithIcon} from '@clayui/button';
import  { ClayInput, ClayCheckbox, ClaySelect } from '@clayui/form';
import { DOCENTE_ACTIONS } from "../../includes/reducers/docentes.reducer";
import ClayUpperToolbar from '@clayui/upper-toolbar';
import { MiniPaginator } from "../../includes/interface/MiniPaginator";
import ClayIcon from '@clayui/icon';

const spritemap = "./o/my-project/icons.svg";

const DocentesTable = ({docentes,docentesHandler}) =>  {
    const [showSearch, setShowSearch] = useState(false);

    if (!docentes.items) 
        return (<div>{Liferay.Language.get('Cargando')}</div>)

    return (
        <>
        { ( docentes.status === "list" ) &&
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
                            docentesHandler({type: DOCENTE_ACTIONS.LOAD});
                            setShowSearch(!showSearch);
                        }} 
                    />
                </ClayUpperToolbar.Item>
                {
                    showSearch &&
                    <>
                        <ClayUpperToolbar.Item className="text-left">
                            <ClayInput
                                placeholder={"Buscar..."}
                                type="text"
                                name={"cif"}
                                key={"cif"}
                                value={docentes.search}
                                onChange={e => {
                                    docentesHandler({ type: DOCENTE_ACTIONS.SETSEARCH, value: e.target.value });
                                }}>
                            </ClayInput>
                        </ClayUpperToolbar.Item>
                        <ClayUpperToolbar.Item className="text-left">
                    <ClaySelect aria-label="Select Label"
                        id={"campo"}
                        name={"campo"}
                        key={"campo"}
                        onChange={evt => docentesHandler({ type: DOCENTE_ACTIONS.SETSEARCHFIELD, value: evt.target.value })}
                        value={ docentes.searchField} > 
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
                        onClick={() => docentesHandler({type: DOCENTE_ACTIONS.LOAD})}
                    />
                </ClayUpperToolbar.Item>
                    </>
                }

            </ClayUpperToolbar>
            {
                showSearch && 
                <>
                    <ClayTable>
                    <caption>{ Liferay.Language.get("Seleccionar") }</caption>
                    <ClayTable.Head>
                        <ClayTable.Row>
                        <ClayTable.Cell headingCell><ClayCheckbox checked={docentes.checkAllSearch} onChange={() => docentesHandler({type: DOCENTE_ACTIONS.CHECKALLSEARCH})} />
                        </ClayTable.Cell>
                        <ClayTable.Cell headingCell>{Liferay.Language.get("Nombre")}</ClayTable.Cell>
                        <ClayTable.Cell headingCell>{Liferay.Language.get("Apellidos")}</ClayTable.Cell>
                        <ClayTable.Cell headingCell>{Liferay.Language.get("Documento")}</ClayTable.Cell>
                        <ClayTable.Cell expanded headingCell>{Liferay.Language.get("Email")}</ClayTable.Cell>
                        <ClayTable.Cell headingCell>{"Acciones"}</ClayTable.Cell>
                        </ClayTable.Row>
                    </ClayTable.Head>
                    <ClayTable.Body>
                        { docentes.searchItems.map( (item,index) => { return(
                        <>
                        <ClayTable.Row key={"tsel-"+index}>
                        <ClayTable.Cell><ClayCheckbox checked={item.checked} onChange={() => docentesHandler({type: DOCENTE_ACTIONS.CHECKSEARCH, index:index})} />
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
                        items={docentes} 
                        itemsHandle={docentesHandler} 
                        ITEMS_ACTIONS={DOCENTE_ACTIONS}
                    />

                    <ClayButton displayType="primary" onClick={ ()=> docentesHandler({type:DOCENTE_ACTIONS.SELECT_ITEMS})}>
                        {Liferay.Language.get("Seleccionar")}
                    </ClayButton>
                </>
            }

            {/*--------------------------------------------------------------------------------------------------------*/ }
            <ClayTable>
            <caption>{ Liferay.Language.get("Docentes") }</caption>
            <ClayTable.Head>
                <ClayTable.Row>
                <ClayTable.Cell headingCell><ClayCheckbox checked={docentes.checkAll} onChange={() => docentesHandler({type: DOCENTE_ACTIONS.CHECKALL})} />
                </ClayTable.Cell>
                <ClayTable.Cell headingCell>{Liferay.Language.get("Nombre")}</ClayTable.Cell>
                <ClayTable.Cell headingCell>{Liferay.Language.get("Apellidos")}</ClayTable.Cell>
                <ClayTable.Cell headingCell>{Liferay.Language.get("Documento")}</ClayTable.Cell>
                <ClayTable.Cell expanded headingCell>{Liferay.Language.get("Email")}</ClayTable.Cell>
                <ClayTable.Cell headingCell>{"Acciones"}</ClayTable.Cell>
                </ClayTable.Row>
            </ClayTable.Head>
            <ClayTable.Body>
                { docentes.items.map( (item,index) => { return(
                <>
                <ClayTable.Row key={"k-"+item.id}>
                <ClayTable.Cell><ClayCheckbox checked={item.checked} onChange={() => docentesHandler({type: DOCENTE_ACTIONS.CHECK, index: index})} />
                </ClayTable.Cell>
                <ClayTable.Cell key={"krow-"+ item.nombre + item.id}>{item.nombre}</ClayTable.Cell>
                <ClayTable.Cell key={"krow-"+ item.apellidos + item.id}>{item.apellidos}</ClayTable.Cell>
                <ClayTable.Cell key={"krow-"+ item.documento + item.id}>{item.documento}</ClayTable.Cell>
                <ClayTable.Cell key={"krow-"+item.email+item.id} headingTitle>{ item.email}</ClayTable.Cell>
                <ClayTable.Cell>
                    <ClayButtonWithIcon
                        aria-label={Liferay.Language.get("Quitar")}
                        key={"bi-"+item.id}
                        spritemap={spritemap}
                        symbol="minus-circle"
                        title="quitar"
                        displayType="danger"
                        onClick={ () => docentesHandler({type: DOCENTE_ACTIONS.DELETE_ITEM, index: index}) }
                    />                    
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

export default DocentesTable;