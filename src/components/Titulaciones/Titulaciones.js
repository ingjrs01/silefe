import React, { useState, useEffect, useReducer, useRef } from 'react';
import Table from '../Table';
import DefaultForm from '../DefaultForm';
import Menu from '../Menu';
import ClayAlert from '@clayui/alert';
import ClayModal, { useModal } from '@clayui/modal';
import ClayForm, { ClayInput } from '@clayui/form';
import ClayCard from "@clayui/card";
import ClayButton from '@clayui/button';
import { getAuthToken, getLanguageId, url_api } from '../../includes/LiferayFunctions';
import { PAGINATION_ACTIONS, reducer } from '../../includes/reducers/paginate.reducer';
import { ITEMS_ACTIONS, red_items } from '../../includes/reducers/items.reducer';
import Papa from "papaparse";

const spritemap = "../../icons.svg";

const Titulaciones = () => {
    const [pagination, paginate]           = useReducer(reducer, { page: 0, totalPages: 0, allCheck: false })
    const [items, itemsHandle]             = useReducer(red_items, { arr: [], item: { id: 0, checked: false }, checkall: false, showform: false });
    const [file,setFile]                   = useState();
    const [toastItems, setToastItems]      = useState([]);
    const { observer, onOpenChange, open } = useModal();
    const controllerRef = useRef();
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

    const auth = getAuthToken();
    const lang = getLanguageId();
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
                let ttmp = {titulaciones:parsedData,userId:Liferay.ThemeDisplay.getUserId()};

                const res2 = await fetch(url_api, {
                    "credentials": "include",
                    "headers": {
                        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:104.0) Gecko/20100101 Firefox/104.0",
                        "Accept": "*/*",
                        "Accept-Language": "es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3",
                        "contenttype": "undefined",
                        "x-csrf-token": auth,
                        "Content-Type": "text/plain;charset=UTF-8",
                        "Sec-Fetch-Dest": "empty",
                        "Sec-Fetch-Mode": "cors",
                        "Sec-Fetch-Site": "same-origin"
                    },
                    "referrer": `\"${referer}\"`,
                    "body": `{\"${end}\":${JSON.stringify(ttmp)}}`,
                    "method": "POST",
                    "mode": "cors"
                });
            
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

        const res = await fetch(url_api, {
            "credentials": "include",
            "headers": {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:104.0) Gecko/20100101 Firefox/104.0",
                "Accept": "*/*",
                "Accept-Language": "es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3",
                "contenttype": "undefined",
                "x-csrf-token": auth,
                "Content-Type": "text/plain;charset=UTF-8",
                "Sec-Fetch-Dest": "empty",
                "Sec-Fetch-Mode": "cors",
                "Sec-Fetch-Site": "same-origin"
            },
            "referrer": `\"${referer}\"`,
            "body": `{\"${endpoint}\":{\"titulaciones\":[${s}]}}`,
            "method": "REMOVE",
            "mode": "cors"
        });

        setToastItems([...toastItems, { title: "Borrar", type: "error", text: "Elemento borrado correctamente" }]);
        fetchData();
    }

    const handleDelete = () => {
        if (items.arr.filter(item => item.checked).length > 0)
            onOpenChange(true);
    }

    const fetchData = async () => {
        const endpoint = "/silefe.titulacion/filter";
        //const searchtext = '';

        const postdata = {
            page: pagination.page,
            descripcion: items.search
        };

        if (controllerRef.current) {
            controllerRef.current.abort();
        }

        const controller = new AbortController();
        controllerRef.current = controller;

        const response = await fetch(url_api, {
            signal: controllerRef.current?.signal,
            "credentials": "include",
            "headers": {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:104.0) Gecko/20100101 Firefox/104.0",
                "Accept": "*/*",
                "Accept-Language": "es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3",
                "contenttype": "undefined",
                "x-csrf-token": auth,
                "Content-Type": "text/plain;charset=UTF-8",
                "Sec-Fetch-Dest": "empty",
                "Sec-Fetch-Mode": "cors",
                "Sec-Fetch-Site": "same-origin"
            },
            "referrer": `\"${referer}\"`,
            "body": `{\"${endpoint}\":${JSON.stringify(postdata)}}`,
            "method": "POST",
            "mode": "cors"
        });
        //controllerRef.current.abort();

        let { data, totalPages } = await JSON.parse(await response.json());
        const tmp = await data.map(i => {return ({ ...i, id: i.titulacionId,checked: false })});
        await itemsHandle({ type: ITEMS_ACTIONS.START, items: tmp,fields: form });
        await paginate({ type: PAGINATION_ACTIONS.TOTAL_PAGES, pages: totalPages });
    }

    const handleSave = async () => {
        const data = {
            titulacionId: items.item.id,
            codigo: items.item.codigo,
            descripcion: items.item.descripcion,
            userId: Liferay.ThemeDisplay.getUserId()
        }

//        let end = '/group/get-user-group';
//        let ttmp = {companyId:20097,userId:20125}
//
//        const res2 = await fetch(url_api, {
//            "credentials": "include",
//            "headers": {
//                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:104.0) Gecko/20100101 Firefox/104.0",
//                "Accept": "*/*",
//                "Accept-Language": "es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3",
//                "contenttype": "undefined",
//                "x-csrf-token": auth,
//                "Content-Type": "text/plain;charset=UTF-8",
//                "Sec-Fetch-Dest": "empty",
//                "Sec-Fetch-Mode": "cors",
//                "Sec-Fetch-Site": "same-origin"
//            },
//            "referrer": `\"${referer}\"`,
//            "body": `{\"${end}\":${JSON.stringify(ttmp)}}`,
//            "method": "POST",
//            "mode": "cors"
//        });
//
//        console.debug(res2);
//        let { descriptiveName } = await res2.json();
//        console.log(descriptiveName);
//        
//        console.log("Y hoara lo demás");

        let endpoint = "/silefe.titulacion/save-titulacion";
        if (items.status === 'new')
            endpoint = "/silefe.titulacion/add-titulacion";

        const res = await fetch(url_api, {
            "credentials": "include",
            "headers": {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:104.0) Gecko/20100101 Firefox/104.0",
                "Accept": "*/*",
                "Accept-Language": "es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3",
                "contenttype": "undefined",
                "x-csrf-token": auth,
                "Content-Type": "text/plain;charset=UTF-8",
                "Sec-Fetch-Dest": "empty",
                "Sec-Fetch-Mode": "cors",
                "Sec-Fetch-Site": "same-origin"
            },
            "referrer": `\"${referer}\"`,
            "body": `{\"${endpoint}\":${JSON.stringify(data)}}`,
            "method": "POST",
            "mode": "cors"
        });
        await fetchData();
        await setToastItems([...toastItems, { title: "Guardar", type: "info", text: "Elemento añadido correctamente" }]);
    }

    const handleSearch = () => {
        console.log("handleSearch");
        console.log("haciendo aquí la consulta");
    }

    useEffect(() => {
        console.log("Buscando los datos por paginacion");
        fetchData();
    }, [pagination.page]);

    useEffect(() => {

        console.log("Buscando los datos por la barra de busqueda");

		if (!isInitialized.current) {
            fetchData();
			isInitialized.current = true;
		} else {
			const timeoutId = setTimeout(fetchData, 350);
			return () => clearTimeout(timeoutId);
		}

    }, [items.search]);



    if (!items)
        return (<div>Cargando</div>)

    return (
        <>
            <Menu
                paginate={paginate}
                handleSave={handleSave}
                handleDelete={handleDelete}
                handleSearch={handleSearch}
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