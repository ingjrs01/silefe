import ClayButton from '@clayui/button';
import ClayForm from '@clayui/form';

export const Button = ({itemsHandle, field, item}) => {  
    return (
        <>
      <ClayForm.Group>
        <ClayButton displayType="primary ml-3 mt-2"
          onClick={e => field.onclick()}
        >
				{field.label}
			</ClayButton>
      </ClayForm.Group>
      </>
    )    
}