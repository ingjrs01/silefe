import ClayButton from '@clayui/button';

export const Button = ({itemsHandle, field, item}) => {  
    return (
        <>
        <ClayButton displayType="primary"
          onClick={e => field.onclick()}
        >
				{field.label}
			</ClayButton>
      </>
    )    
}