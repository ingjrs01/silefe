import React from "react";
import ClayModal from '@clayui/modal';
import ClayButton from '@clayui/button';

const spritemap = "./o/my-project/icons.svg";


export const FModal = ({onOpenChange,confirmDelete, observer }) => {

    return (
        <ClayModal
            observer={observer}
            size="lg"
            spritemap={spritemap}
            status="info"
        >
            <ClayModal.Header>{Liferay.Language.get('Confirmacion')}</ClayModal.Header>
            <ClayModal.Body>
                <h1>{Liferay.Language.get('Seguro_borrar')}</h1>
            </ClayModal.Body>
            <ClayModal.Footer
                first={
                    <ClayButton.Group spaced>
                        <ClayButton displayType="secondary" onClick={() => onOpenChange(false)}>{Liferay.Language.get('Cancelar')}</ClayButton>
                    </ClayButton.Group>
                }
                last={
                    <ClayButton onClick={() => { onOpenChange(false); confirmDelete() }}>
                        {Liferay.Language.get('Borrar')}
                    </ClayButton>
                }
            />
        </ClayModal>
    )


}
