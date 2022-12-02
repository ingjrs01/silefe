import React, { useState, useEffect, useReducer, useRef } from 'react';
import Table from '../Table';
import DefaultForm from '../DefaultForm';
import Menu from '../Menu';
import ClayAlert from '@clayui/alert';
import ClayModal, { useModal } from '@clayui/modal';
import ClayForm, { ClayInput } from '@clayui/form';
import ClayCard from "@clayui/card";
import ClayButton from '@clayui/button';
import { getUserId } from '../../includes/LiferayFunctions';
import { ITEMS_ACTIONS, red_items } from '../../includes/reducers/items.reducer';
import {batchAPI, deleteAPI, fetchAPIData, saveAPI} from '../../includes/apifunctions.js';
import Papa from "papaparse";

const spritemap = "./icons.svg";

const Titulaciones = () => {
    const [items, itemsHandle]             = useReducer(red_items, { arr: [], item: { id: 0, checked: false }, checkall: false, showform: false,page:0, load: 0 });
    const [file,setFile]                   = useState();
    const [toastItems, setToastItems]      = useState([]);
    const { observer, onOpenChange, open } = useModal();
//    const controllerRef = useRef();
    const isInitialized = useRef();

    const columns = [
        {
            columnName: "titulacionId",
            columnTitle: "Id",
            columnType: "checkbox",
            key: "c1",
        },
        {
            columnName: "descripcion",
            columnTitle: Liferay.Language.get('Descripcion'),
            columnType: "string",
            key: "c2",
        },
    ];

    const form = {
        title: Liferay.Language.get('Titulaciones'),
        languages: ["es-ES","en-US","gl-ES"],
        rows: {
            id: { 
                key: 1, 
                type: "text",
                label: "ID", 
                name: "id", 
                value: "lalala", 
                placeholder: "Identificador", 
                conditions: ["number"] 
            },
            descripcion: { 
                key: 2, 
                type: "multilang",
                label: Liferay.Language.get('Descripcion'), 
                name: "descripcion", 
                value: "", 
                placeholder: Liferay.Language.get('Descripcion'), 
                conditions: ["text"] 
            },
        }
    };

    const referer = "http://localhost:8080/titulaciones";

    const loadCsv = () => {
        itemsHandle({type:ITEMS_ACTIONS.LOAD})
    }

    const processCsv = () => {
        if (file) {
            const reader = new FileReader();
         
            reader.onload = async ({ target }) => {
                const csv = Papa.parse(target.result, { header: true,delimiter:";",delimitersToGuess:[";"] });
                const parsedData = csv?.data;                                
                let end = '/silefe.titulacion/add-multiple';
                let ttmp = {titulaciones:parsedData,userId:getUserId()};
                let res = await batchAPI(end,ttmp,reader);
            };
            reader.readAsText(file);
        }
        else {
            console.log("fichero no cargado")
        }
    }

    const confirmDelete = async () => {
        const endpoint = "/silefe.titulacion/remove-titulaciones";
        let s = items.arr.filter(item => item.checked).map(i => { return i.id });
        let res = await deleteAPI(endpoint,s,referer);
        await setToastItems([...toastItems, { title: "Borrar", type: "error", text: "Elemento borrado correctamente" }]);
        await console.log("cargando los datos de nuevo");
        await fetchData();
    }

    const handleDelete = () => {
        if (items.arr.filter(item => item.checked).length > 0)
            onOpenChange(true);
    }

    const fetchData = async () => {
        const endpoint = "/silefe.titulacion/filter";
        const postdata = {
            page: items.page,
            descripcion: ( items.search && typeof items.search !== "undefined")?items.search:""
        };

        let {data,totalPages, page} = await fetchAPIData(endpoint, postdata,referer);
        const tmp = await data.map(i => {return ({ ...i, id: i.titulacionId,checked: false })});
        await itemsHandle({ type: ITEMS_ACTIONS.START, items: tmp,fields: form, totalPages: totalPages,page:page });
    }

    const handleSave = async () => {
        const data = {
            titulacionId: items.item.id,
            codigo: items.item.codigo,
            descripcion: items.item.descripcion,
            userId: getUserId()
        }

        let endpoint = "/silefe.titulacion/save-titulacion";
        if (items.status === 'new')
            endpoint = "/silefe.titulacion/add-titulacion";
        
        let res = await saveAPI(endpoint,data,referer);
        await fetchData();
        await setToastItems([...toastItems, { title: "Guardar", type: "info", text: "Elemento añadido correctamente" }]);
    }

    useEffect(() => {
		if (!isInitialized.current) {
            fetchData();
			isInitialized.current = true;
		} else {
			const timeoutId = setTimeout(fetchData, 350);
			return () => clearTimeout(timeoutId);
		}

    }, [items.load]);

    if (!items)
        return (<div>Cargando</div>)

    return (
        <>
            <Menu
                handleSave={handleSave}
                handleDelete={handleDelete}
                itemsHandle={itemsHandle}
                status={items.status}
                loadCsv={loadCsv}
                items={items}
            />

            { (items.status === 'load') && 
            <ClayCard>
                <ClayCard.Body>
                    <ClayCard.Description displayType="title">
                        <h2>Cargando ficheros</h2>
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
                            <ClayButton onClick={e => itemsHandle({type:ITEMS_ACTIONS.CANCEL_LOAD})} displayType="secondary">{Liferay.Language.get('Cancelar')}</ClayButton>
                        </div>
                    </div>
                </ClayCard.Body>
            </ClayCard>}
            
            {
                (items.status === 'edit' || items.status === 'new') &&
                <DefaultForm
                    form={form}
                    save={handleSave}
                    itemsHandle={itemsHandle}
                    items={items}
                />
            }
            {
                (items.status === 'list') &&
                <Table
                    columns={columns}
                    rows={items}
                    itemsHandle={itemsHandle}
                />
            }

            <ClayAlert.ToastContainer>
                {toastItems.map(value => (
                    <ClayAlert
                        autoClose={5000}
                        key={value}
                        onClose={() => {
                            setToastItems(prevItems =>
                                prevItems.filter(item => item !== value)
                            );
                        }}
                        spritemap={spritemap}
                        title={`${value.title}`}
                        displayType={value.type}
                    >{`${value.text}`}</ClayAlert>
                ))}
            </ClayAlert.ToastContainer>

            {open && (
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
            )}

        </>
    )
}

export default Titulaciones;