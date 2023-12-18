import ClayButton from '@clayui/button';
import ClayCard from "@clayui/card";
import ClayForm, { ClayInput } from '@clayui/form';
import React from 'react';
import { Liferay } from '../../common/services/liferay/liferay';
import { ITEMS_ACTIONS } from '../../includes/reducers/items.reducer';

export const LoadFiles = ({setFile, processCsv,itemsHandle}) => {

    return (
        <>
            <ClayCard>
                <ClayCard.Body>
                    <ClayCard.Description displayType="title">
                        <h2>{Liferay.Language.get("Cargando")}</h2>
                    </ClayCard.Description>
                    <ClayCard.Description truncate={false} displayType="text">
                        <ClayForm>
                            <ClayForm.Group className={'has-success'}>
                                <label htmlFor="basicInput">{Liferay.Language.get('Selecciona')}</label>
                                <ClayInput
                                    type="text"
                                    name="ficheros"
                                    onChange={e => {
                                        console.log("llamando");
                                    }}>
                                </ClayInput>
                            </ClayForm.Group>
                            <input type="file" name="files" multiple onChange={(e) => setFile(e.target.files[0])} />
                        </ClayForm>
                    </ClayCard.Description>
                    <div className="btn-group">
                        <div className="btn-group-item">
                            <ClayButton onClick={e => processCsv()} displayType="secondary">{Liferay.Language.get('Guardar')}</ClayButton>
                        </div>
                        <div className="btn-group-item">
                            <ClayButton onClick={e => itemsHandle({ type: ITEMS_ACTIONS.CANCEL_LOAD })} displayType="secondary">{Liferay.Language.get('Cancelar')}</ClayButton>
                        </div>
                    </div>
                </ClayCard.Body>
            </ClayCard>
        </>
    )


}