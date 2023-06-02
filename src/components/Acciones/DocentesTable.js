import React from "react";
import ClayTable from '@clayui/table';
import ClayButton, {ClayButtonWithIcon} from '@clayui/button';
import ClayForm, { ClayInput, ClayCheckbox, ClaySelect } from '@clayui/form';
import { DOCENTE_ACTIONS } from "../../includes/reducers/docentes.reducer";
import ClayUpperToolbar from '@clayui/upper-toolbar';

const spritemap = "./o/my-project/icons.svg";

const DocentesTable = ({docentes,docentesHandler}) =>  {

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
                <ClayUpperToolbar.Item className="text-left" expand>
                    <ClayButtonWithIcon
                        aria-label={Liferay.Language.get("Buscar")}
                        spritemap={spritemap}
                        symbol="search"
                        title="Search"
                    />
                </ClayUpperToolbar.Item>
            </ClayUpperToolbar>

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

			<ClayButton displayType="primary" onClick={ ()=> docentesHandler({type:DOCENTE_ACTIONS.SELECT_ITEMS})}>
				{Liferay.Language.get("Seleccionar")}
			</ClayButton>

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