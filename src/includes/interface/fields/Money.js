import { ClayInput } from '@clayui/form';
import { ITEMS_ACTIONS } from '../../reducers/items.reducer';

export const Money = ({itemsHandle, field,item}) => {
    const formatMoney = (value) => {
        if (value == null)
          return "";
        var temp = "";
        temp = (typeof (value) === 'number') ? value.toString() : value;
    
        var input = temp.replace(/[\D\s\._\-]+/g, "");
        input = input ? parseInt(input, 10) : 0;
        return (input.toLocaleString("es-ES"));
      }
    
    return (
        <>
        <label htmlFor="basicInput" key={"label" + field.label}>{field.label}</label>
        <ClayInput.Group>
          <ClayInput.GroupItem prepend>
            <ClayInput
              type="text"
              name={field.name}
              key={field.key}
              value={formatMoney(item)}
              pattern={"^\$\d{1,3}(,\d{3})*(\.\d+)?$"}
              onChange={e => {
                //validate(e.target.name, e.target.value);
                itemsHandle({ type: ITEMS_ACTIONS.SET, fieldname: e.target.name, value: e.target.value });
              }}>
            </ClayInput>
          </ClayInput.GroupItem>
          <ClayInput.GroupItem shrink prepend>
            <ClayInput.GroupText>{"€"}</ClayInput.GroupText>
          </ClayInput.GroupItem>
        </ClayInput.Group>
        

      </>

    )

    
}