import React, {useEffect, useReducer, useRef, useState} from "react";
import DefaultForm from "../../includes/interface/DefaultForm";
import Menu from '../Menu';
import Table from '../../includes/interface/Table';
import {useModal} from '@clayui/modal';
import { getUserId, url_referer} from '../../includes/LiferayFunctions';
import {red_items,ITEMS_ACTIONS, initialState} from '../../includes/reducers/items.reducer';
import Papa from "papaparse";
import { batchAPI, deleteAPI, fetchAPIData, saveAPI } from "../../includes/apifunctions";
import {LoadFiles} from '../../includes/interface/LoadFiles'
import {FAvisos} from '../../includes/interface/FAvisos'
import { FModal } from '../../includes/interface/FModal';
import { Errors } from '../../includes/Errors';
import { form as formulario} from './Form';
import { Paginator } from "../../includes/interface/Paginator";

const AccionesTipoFormacion = () => {
    const [items,itemsHandle]            = useReducer(red_items,initialState);
    const [toastItems,setToastItems]     = useState([]);    
    const {observer, onOpenChange, open} = useModal();
    const [file,setFile]                 = useState();
    const isInitialized                  = useRef(null);

    const form = formulario;
    const referer = `${url_referer}/accionestipoformacion`;


    const loadCsv = () => {
        itemsHandle({type:ITEMS_ACTIONS.LOAD});
    }

    const processCsv = () => {
        if (file) {
            const reader = new FileReader();         
            reader.onload = async ({ target }) => {
                const csv = Papa.parse(target.result, { header: true,delimiter:";",delimitersToGuess:[";"] });
                const parsedData = csv?.data;                                
                let end = '/silefe.cnae/add-multiple';
                let ttmp = { cnaes:parsedData,userId:getUserId()};
                batchAPI(end,ttmp,referer).then( res2 => {
                    if (res2.ok) {
                        setToastItems([...toastItems, { title: Liferay.Language.get("Carga_Masiva"), type: "danger", text: Liferay.Language.get('Elementos_cargados') }]);                    
                        fetchData();
                    }
                    else 
                        setToastItems([...toastItems, { title: Liferay.Language.get("Carga_Masiva"), type: "danger", text: Liferay.Language.get("Elementos_no_cargados") }]);
                });
            };
            reader.readAsText(file);
        }
        else {
            console.log("fichero no cargado")
        }
    }

    const handleSave = async () => {
        const data = {
            id:  items.item.id,
            obj: items.item,
            userId:      getUserId()
        }
        let endpoint = '/silefe.acciontipoformacion/save-accion-tipo-formacion';
        if (items.status === 'new')
            endpoint = '/silefe.acciontipoformacion/add-accion-tipo-formacion';
        let {status,error} = await saveAPI(endpoint,data,referer);
        if (status) {
            fetchData();
            setToastItems([...toastItems, { title: Liferay.Language.get("Guardar"), type: "info", text: Liferay.Language.get("Guardado_correctamente") }]);            
        }
        else 
            setToastItems([...toastItems, { title: Liferay.Language.get("Guardar"), type: "danger", text: Errors[error] }]);            
    }

    const handleDelete = () => {
        if (items.arr.filter(item => item.checked).length > 0)
            onOpenChange(true);        
    }

    const confirmDelete = async () => {
        const endpoint = '/silefe.acciontipoformacion/remove-acciones-formacion-tipo';
        let s = items.arr.filter(item => item.checked).map( i => {return i.id});


        deleteAPI(endpoint,s,referer).then(res => {
            if (res) {
                setToastItems([...toastItems, { title: Liferay.Language.get('Borrar'), type: "danger", text: Liferay.Language.get('Borrado_ok') }]);
                fetchData();        
            }
            else {
                setToastItems([...toastItems, { title: Liferay.Language.get('Borrar'), type: "danger", text: Liferay.Language.get('Borrado_no') }]);
            }
        })
    }

    const fetchData = async () => {
        console.log("fetchData en AccionesTipoFormacion");
        const postdata = {
            pagination:   {page: items.pagination.page, pageSize: items.pagination.pageSize},
            descripcion : (items.search && typeof items.search !== 'undefined')?items.search:"",
            order:        items.order,
        }
        let {data,totalPages, totalItems,page} = await fetchAPIData('/silefe.acciontipoformacion/filter',postdata,referer);
        await console.log("los datos han llegado");
        await console.debug(data);
        const tmp = await data.map(i => {return({...i,checked:false})});
        await itemsHandle({type:ITEMS_ACTIONS.START,items:tmp, fields: form,totalPages:totalPages, total: totalItems,page:page});
    }

    useEffect(()=>{
		if (!isInitialized.current) {
            fetchData();
			isInitialized.current = true;
		} else {
			const timeoutId = setTimeout(fetchData, 350);
			return () => clearTimeout(timeoutId);
		}
    },[items.load]);

    if (!items) 
        return (<div>Liferay.Language.get('Cargando')</div>)

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
            { (items.status === 'edit' || items.status === 'new') && 
                <DefaultForm 
                    save={ handleSave} 
                    itemsHandle={itemsHandle}
                    items={items}
                />
            }
            {
                (items.status === 'list') &&
                <>
                    <Table 
                        items={items} 
                        itemsHandle={itemsHandle} 
                    />
                    <Paginator 
                        items={items} 
                        itemsHandle={itemsHandle} 
                    />
                </>
            }
            <FAvisos toastItems={toastItems} setToastItems={setToastItems} />
            {open && <FModal  onOpenChange={onOpenChange} confirmDelete={confirmDelete} observer={observer} /> }
        </>
    )
}

export default AccionesTipoFormacion;