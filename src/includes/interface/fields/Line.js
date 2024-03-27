//import ClayForm, { ClayToggle } from '@clayui/form';
//import { ITEMS_ACTIONS } from '../../reducers/actions';

export const Line = ({itemsHandle, field, item, action, error}) => {

    //const accion = (action !== undefined)?action:ITEMS_ACTIONS.SET;
    return (
      <div className="col-12">  
        <hr class="hr-text gradient" data-content="SECCION" />
        <h3>{field.label}</h3>
      </div>
    )
}