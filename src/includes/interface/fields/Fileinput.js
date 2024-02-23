import Button from '@clayui/button';
import { ClayInput } from '@clayui/form';
import React, { useState } from 'react';
import { ITEMS_ACTIONS } from '../../reducers/main.reducer';
import ClayPanel from '@clayui/panel';
import { getLanguageId, spritemap } from '../../LiferayFunctions';
import { Liferay } from '../../../common/services/liferay/liferay';

export const Fileinput = ({ itemsHandle, field, item }) => {

    const [title, setTitle] = useState();

    console.log("Esto es la entrada de un fichero");

    const titleInputId = field.name + "title";
    const changeFile = (evt) => {
        const file = evt.target.files[0];
        console.log("changeFile con el nuevo evento");
        console.debug(file);
        const titulo = file.name.split(".")[0];
        setTitle(titulo);

        const reader = new FileReader();
        reader.onload = async ({ target }) => {
            const ficheroEnvio = target.result;
            //const data = {
            //    convocatoriaId: items.item.id,
            //    obj: {
            //        ...items.item,
            //        userId: getUserId(),
            //        fichero: ficheroEnvio,
            //        filename: items.item.adjuntos.fichero.name ?? "probando1.jpg",
            //    },
            //}
            //console.log("justo antes de enviar");
            //console.debug(data);
            //let { status, error } = await saveAPI('/silefe.convocatoria/save-convocatoria', data, referer);
            //if (status) {
            //    fetchData();
            //    setToastItems([...toastItems, { title: Liferay.Language.get("Guardar"), type: "info", text: Liferay.Language.get('Guardado_correctamente') }]);
            //}
            console.log(ficheroEnvio);

            itemsHandle({ type: ITEMS_ACTIONS.SET, fieldname: "adjuntos", value: ficheroEnvio, titulo: titulo });
        }
        reader.readAsDataURL(file);

    }

    return (
        <>
            <ClayPanel
                collapsble
                displayTitle={Liferay.Language.get("Adjunto")}
                displayType="secondary"
                showCollapseIcon={false}
                spritemap={spritemap}
            >
                <div className="form-group" key={"gf" + field.key} >
                    <label for="inputFile" key={"fi" + field.key}>FILE UPLOAD</label>
                    <input
                        id="inputFile"
                        key={"inf" + field.key}
                        type="file"
                        onChange={changeFile}
                    />
                </div>
                <div className="form-group" key={"gf2" + field.key} >
                    <label for="titleInputId" key={"fia" + field.key}>{Liferay.Language.get("Título")}</label>
                    <ClayInput
                        placeholder={field.placeholder}
                        type="text"
                        name={titleInputId}
                        id={titleInputId}
                        key={field.key}
                        value={title}
                        onChange={e => { setTitle(e.target.value) }}>
                    </ClayInput>

                </div>
            </ClayPanel>
            <Button>{Liferay.Language.get("Añadir")}</Button>
        </>
    )

}

