import React, { useState, useEffect, useReducer, useRef } from 'react';
import Table from '../Table';
import DefaultForm from '../DefaultForm';
import Menu from '../Menu';
import { useModal } from '@clayui/modal';
import { getUserId } from '../../includes/LiferayFunctions';
import { ITEMS_ACTIONS, red_items } from '../../includes/reducers/items.reducer';
import {batchAPI, deleteAPI, fetchAPIData, saveAPI} from '../../includes/apifunctions.js';
import {LoadFiles} from '../../includes/interface/LoadFiles'
import {FAvisos} from '../../includes/interface/FAvisos'
import { FModal } from '../../includes/interface/FModal';
import { Errors } from '../../includes/Errors';
import { getLanguageId } from '../../includes/LiferayFunctions';
import Papa from "papaparse";

const Titulaciones = () => {
    const [items, itemsHandle]             = useReducer(red_items, { arr: [], item: { id: 0, checked: false }, checkall: false, showform: false,page:0, load: 0 });
    const [file,setFile]                   = useState();
    const [toastItems, setToastItems]      = useState([]);
    const { observer, onOpenChange, open } = useModal();
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
            columnType: "multilang",
            key: "c2",
        },
        {
            columnName: "titulacionFamiliaDescripcion",
            columnTitle: Liferay.Language.get('Familia'),
            columnType: "string",
            key: "c3",
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
            titulacionFamiliaId : {
                key:2,
                type: "select",
                label: Liferay.Language.get('Familia'), 
                name: "titulacionFamiliaId", 
                value:"ta ta ta", 
                placeholder: Liferay.Language.get('Familia'), 
                conditions: [],
                options: []  
            },
            descripcion: { 
                key: 3, 
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
        if (res) {
            await setToastItems([...toastItems, { title: Liferay.Language.get("Borrar"), type: "info", text: Liferay.Language.get("Borrado_ok") }]);
            await fetchData();
        }
        else {
            await setToastItems([...toastItems, { title: Liferay.Language.get("Borrar"), type: "danger", text: Liferay.Language.get("Borrado_no") }]);
        }
    }

    const handleDelete = () => {
        if (items.arr.filter(item => item.checked).length > 0)
            onOpenChange(true);
    }

    const fetchData = async () => {
        console.log("fetchData");
        const endpoint = "/silefe.titulacion/filter";
        const postdata = {
            page: items.page,
            descripcion: ( items.search && typeof items.search !== "undefined")?items.search:""
        };

        let {data, error,totalPages, page} = await fetchAPIData(endpoint, postdata,referer);
        if (error == 1) {
            setToastItems([...toastItems, { title: Liferay.Language.get("Cargando"), type: "danger", text: Liferay.Language.get("Pagina_no_existente") }]);
        }
        const options = await getFamiliasTitulaciones();
        const tmp = await data.map(i => {
            let tFamilia = "";
            let filtered = options.filter(o => o.value == i.titulacionFamiliaId);
            if (filtered.length > 0)
                tFamilia = filtered[0].label ;
            return ({ ...i, id: i.titulacionId,titulacionFamiliaDescripcion: tFamilia,checked: false })
        });
        form.rows.titulacionFamiliaId.options = options;
        await itemsHandle({ type: ITEMS_ACTIONS.START, items: tmp,fields: form, totalPages: totalPages,page:page });
    }

    const getFamiliasTitulaciones = async () => {
        const endpoint = '/silefe.titulacionfam/all';
        const postdata = {
            descripcion: "",
            lang: getLanguageId()

        };
        let {data} = await fetchAPIData(endpoint, postdata,referer);
        const options = await data.map(obj => {return {value:obj.id,label:obj.descripcion}});
        return options 
    }



    const handleSave = async () => {
        const postdata = {
            titulacionId: items.item.id,
            codigo: items.item.codigo,
            descripcion: items.item.descripcion,
            titulacionFamiliaId: items.item.titulacionFamiliaId,
            userId: getUserId()
        }

        let endpoint = "/silefe.titulacion/save-titulacion";
        if (items.status === 'new')
            endpoint = "/silefe.titulacion/add-titulacion";
        
        let {status,error} = await saveAPI(endpoint,postdata,referer);
        if (status) {
            await fetchData();
            await setToastItems([...toastItems, { title: Liferay.Language.get("Guardar"), type: "info", text: Liferay.Language.get("Guardado_correctamente") }]);
        }
        else {
            await setToastItems([...toastItems, { title: Liferay.Language.get("Guardar"), type: "danger", text: Errors[error] }]);
        }
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
        return (<div>Liferay.Language.get("Cargando")</div>)

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
            <LoadFiles 
                setFile={setFile}
                processCsv={processCsv}
                itemsHandle={itemsHandle}
            />}
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
            <FAvisos toastItems={toastItems} setToastItems={setToastItems} />

            {open && <FModal  onOpenChange={onOpenChange} confirmDelete={confirmDelete} observer={observer} /> }
        </>
    )
}

export default Titulaciones;