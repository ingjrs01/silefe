import ClayButton, { ClayButtonWithIcon } from '@clayui/button';
import { ClayCheckbox } from '@clayui/form';
import ClayTable from '@clayui/table';
import { Liferay } from '../../common/services/liferay/liferay';
import { spritemap } from '../../includes/LiferayFunctions';
import RenderFields from '../../includes/interface/RenderFields';
import { EXPERIENCIA_ACTIONS } from "../../includes/reducers/actions";

export const ExperienciasRender = ({experiencias,experienciasHandler}) =>  {

    const rows = experiencias.fields.rows;

    if (!experiencias.items) 
        return (<div>{Liferay.Language.get('Cargando')}</div>)

    const changeAll = () => {
        experienciasHandler({type: EXPERIENCIA_ACTIONS.CHECKALL});
    }

    const changeSelect = (index) => {
        experienciasHandler({type: EXPERIENCIA_ACTIONS.CHECK, index: index});
    }

    return (
        <>
        { ( experiencias.status === "list" ) &&
        <div className='col-12' key={"experiencias_div"}>
            <ClayTable key={"key_experiencias"}>
            <ClayTable.Head key={"key_experiencias_head"}>
                <ClayTable.Row key={"key_experiencias_head_row"}>
                <ClayTable.Cell key={"kexp-h-sel"} headingCell><ClayCheckbox checked={ experiencias.selectAll } onChange={changeAll} key={"kexp-h-chk"} /></ClayTable.Cell>
                <ClayTable.Cell key={"kexp-h-ini"} headingCell>{"Inicio"}</ClayTable.Cell>
                <ClayTable.Cell key={"kexp-h-fin"} headingCell>{"Fin"}</ClayTable.Cell>
                <ClayTable.Cell key={"kexp-h-pue"} expanded headingCell>{Liferay.Language.get("Puesto")}</ClayTable.Cell>
                <ClayTable.Cell key={"kexp-h-acc"} headingCell>{Liferay.Language.get("Acciones")}</ClayTable.Cell>
                </ClayTable.Row>
            </ClayTable.Head>
            <ClayTable.Body key={"key_experiencias_body"}>
                { experiencias.items.map( (item,index) => (
                <>
                <ClayTable.Row  key={"experiencia-rows-" + item.id}>
                <ClayTable.Cell key={"kexp-b-sel"+item.id}><ClayCheckbox checked={ item.selected } onChange={()=>changeSelect(index)} key={"kexp-b-chk"}  /></ClayTable.Cell>
                <ClayTable.Cell key={"kexp-b-ini"+item.id}>{item.ini}</ClayTable.Cell>
                <ClayTable.Cell key={"kexp-b-fin"+item.id}>{item.fin}</ClayTable.Cell>
                <ClayTable.Cell key={"kexp-b-pue"+item.id}headingTitle>{ item.puesto}</ClayTable.Cell>
                <ClayTable.Cell key={"kexp-b-acc"+item.id}>
                    <ClayButtonWithIcon 
                        onClick={e => experienciasHandler({type: EXPERIENCIA_ACTIONS.SELECT_ITEM , index:index})} 
                        displayType="secondary"
                        spritemap={spritemap}
                        symbol="pencil"
                        title="Edit"
                        aria-label="Edit"
                        key={"kexp-b-edt"+item.id}
                    />
                    <ClayButtonWithIcon 
                        className='ml-1'
                        onClick={e => experienciasHandler({type:EXPERIENCIA_ACTIONS.DELETE_ITEM,index:index}) }
                        displayType="danger"
                        spritemap={spritemap}
                        symbol="trash"
                        title="Close"
                        aria-label="Close"
                        key={"kexp-b-close"+item.id}
                    />
                </ClayTable.Cell>
                </ClayTable.Row>
                </> 
                ))}
            </ClayTable.Body>
            </ClayTable>
            <ClayButton onClick={e => experienciasHandler({type: EXPERIENCIA_ACTIONS.NEW_ITEM})} 
            displayType="primary" key={"exp-button-new"}>{Liferay.Language.get('Nuevo')} 
            </ClayButton>
        </div>
        }
        {
            /*
            <ExperienciaForm
            experiencias={experiencias}
            experienciasHandler={experienciasHandler}
            />           
            */
           (experiencias.status === 'edit') &&  
           <>
               <RenderFields 
                   rows={rows}
                   itemsHandle={experienciasHandler}
                   items={experiencias}
                   plugin={"lalala"}
               />

               <div className="btn-group">
               <div className="btn-group-item">
                 <ClayButton onClick={e => experienciasHandler({type: EXPERIENCIA_ACTIONS.CANCEL})} displayType="secondary">{Liferay.Language.get('Cancelar')}</ClayButton>
               </div>
               <div className="btn-group-item">
                 <ClayButton onClick={ () => experienciasHandler({type: EXPERIENCIA_ACTIONS.SAVE}) } displayType="primary">{Liferay.Language.get('Guardar')}</ClayButton>
               </div>
             </div>
           </>
   
        }
        </>
    );
}
