import Button, { ClayButtonWithIcon } from '@clayui/button';
import { ClayInput } from '@clayui/form';
import ClayLink from '@clayui/link';
import ClayPanel from '@clayui/panel';
import React, { useState } from 'react';
import { Liferay } from '../../../common/services/liferay/liferay';
import { spritemap } from '../../LiferayFunctions';
import { ITEMS_ACTIONS } from '../../reducers/main.reducer';

export const Fileinput = ({ itemsHandle, field, item }) => {

    const [title, setTitle] = useState();

    const titleInputId = field.name + "title";
    const changeFile = (evt, index) => {
        const file = evt.target.files[0];
        const filename = file.name;
        const titulo = filename.split(".")[0];
        setTitle(titulo);

        const reader = new FileReader();
        reader.onload = async ({ target }) => {
            const ficheroEnvio = target.result;
            itemsHandle({ type: ITEMS_ACTIONS.SET_FILEFIELD, fieldname: "adjuntos", index: index, objkey: "fichero", value: ficheroEnvio, titulo: titulo, filename: filename })
        }
        reader.readAsDataURL(file);
    }

    return (
        <>
            {
                item.map((it, index) => (
                    <ClayPanel
                        collapsble
                        displayTitle={Liferay.Language.get("Adjunto")}
                        displayType="secondary"
                        showCollapseIcon={false}
                        spritemap={spritemap}
                    >
                        <div className="form-group" key={"gf" + field.key} >
                            {(it.src === undefined || it.src === "" || it.edit === true) &&
                                <>
                                    <label for="inputFile" key={"fi" + field.key}>{Liferay.Language.get("Fichero")}</label>
                                    <input
                                        id="inputFile"
                                        key={"inf" + field.key}
                                        type="file"
                                        onChange={evt => changeFile(evt,index)}
                                    />
                                </>
                            }
                            {it.src !== undefined && it.src != "" && it.edit === false &&
                                <>
                                    <label for="inputFile" key={"fi" + field.key}>{Liferay.Language.get("Fichero")}</label>
                                    <ClayInput.Group>
                                        <ClayInput.GroupItem>
                                            <ClayInput
                                                type="text"
                                                readOnly={true}
                                                name={field.name}
                                                id={field.name}
                                                key={field.key}
                                                value={it.filename}
                                            >
                                            </ClayInput>
                                        </ClayInput.GroupItem>

                                        <ClayInput.GroupItem>
                                            <ClayButtonWithIcon
                                                aria-label="Edit"
                                                spritemap={spritemap}
                                                symbol="pencil"
                                                title="Edit"
                                                displayType="secondary"
                                                onClick={evt => itemsHandle({ type: ITEMS_ACTIONS.SET_FILEFIELD, fieldname: "adjuntos", index: index, objkey: "edit", value: true })}
                                            />                                            
                                        </ClayInput.GroupItem>

                                        <ClayInput.GroupItem>
                                            <ClayLink displayType="primary" target="_blank" href={it.src} outline>
                                                {Liferay.Language.get("Descargar")}
                                            </ClayLink>
                                        </ClayInput.GroupItem>

                                        <ClayInput.GroupItem>
                                        <ClayButtonWithIcon
                                            aria-label="Delete"
                                            spritemap={spritemap}
                                            symbol="trash"
                                            title="Delete"
                                            displayType="danger"
                                            onClick={evt => itemsHandle({type: ITEMS_ACTIONS.DELETE_FILEFIELD, fieldname: "adjuntos", index: index})}
                                        />
                                        </ClayInput.GroupItem>
                                    </ClayInput.Group>
                                </>
                            }
                        </div>
                        <div className="form-group" key={"gf2" + field.key} >
                            <label for="titleInputId" key={"fia" + field.key}>{Liferay.Language.get("Título")}</label>
                            <ClayInput
                                placeholder={field.placeholder}
                                type="text"
                                name={titleInputId}
                                id={titleInputId}
                                key={field.key}
                                value={it.title}
                                onChange={e => itemsHandle({ type: ITEMS_ACTIONS.SET_FILEFIELD, fieldname: "adjuntos", index: index, objkey: "title", value: e.target.value })}>
                            </ClayInput>
                        </div>
                    </ClayPanel>
                ))
            }
            <Button
                onClick={evt => itemsHandle({ type: ITEMS_ACTIONS.ADD_FILEFIELD, fieldname: 'adjuntos' })}
            >
                {Liferay.Language.get("Añadir")}
            </Button>
        </>
    )

}

