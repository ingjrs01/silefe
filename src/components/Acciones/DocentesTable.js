import React from "react";
import { ClayCheckbox } from '@clayui/form';
import ClayTable from '@clayui/table';
import ClayButton from '@clayui/button';
import { DOCENTE_ACTIONS } from "../../includes/reducers/docentes.reducer";
//import { ExperienciaForm } from "./ExperienciaForm";


const DocentesTable = ({docentes,docentesHandler}) =>  {
    console.log("estoy en la tabla de docentes");
    console.debug(docentes);
    debugger;

    if (!docentes.items) 
        return (<div>{Liferay.Language.get('Cargando')}</div>)

    return (
        <>
        { ( docentes.status === "list" ) &&
        <>
            <ClayTable>
            <caption>{ Liferay.Language.get("Docentes") }</caption>
            <ClayTable.Head>
                <ClayTable.Row>
                <ClayTable.Cell headingCell><ClayCheckbox checked={false} onChange={() =>console.log("lalala")} />
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
                <ClayTable.Row>
                <ClayTable.Cell><ClayCheckbox checked={false} onChange={() =>console.log("lalala")} />
                </ClayTable.Cell>
                <ClayTable.Cell>{item.nombre}</ClayTable.Cell>
                <ClayTable.Cell>{item.apellidos}</ClayTable.Cell>
                <ClayTable.Cell>{item.documento}</ClayTable.Cell>
                <ClayTable.Cell headingTitle>{ item.email}</ClayTable.Cell>
                <ClayTable.Cell>
                    <ClayButton onClick={e => {
                        docentesHandler({type: DOCENTE_ACTIONS.SELECT_ITEM , index:index});
                    }} 
                    displayType="secondary">{"E"} 
                    </ClayButton>
                    <ClayButton onClick={e => {
                        docentesHandler({type:DOCENTE_ACTIONS.DELETE_ITEM,index:index});
                    }} 
                    displayType="danger">{"B"} 
                    </ClayButton>
                </ClayTable.Cell>
                </ClayTable.Row>
                </> 
                );})}

            </ClayTable.Body>
            </ClayTable>
            <ClayButton onClick={e => { 
                //edit(-1);
                docentesHandler({type: DOCENTE_ACTIONS.NEW_ITEM})
            }} 
            displayType="primary">{Liferay.Language.get('Nuevo')} 
            </ClayButton>
            </>
        }

        { /*
            (docentes.status === 'edit') &&  
            
            <ExperienciaForm
                experiencias={experiencias}
                experienciasHandler={experienciasHandler}
            />
            */
        }

        </>
      
    );
}

export default DocentesTable;