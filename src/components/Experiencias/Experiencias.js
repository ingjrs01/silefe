import React, {useState,useEffect, useReducer, useRef} from 'react';
import DefaultForm from '../../includes/interface/DefaultForm';
import Table from '../../includes/interface/Table';
import Menu from '../Menu';
import {useModal} from '@clayui/modal';
import {getUserId} from '../../includes/LiferayFunctions';
import {red_items,ITEMS_ACTIONS} from '../../includes/reducers/items.reducer';
import { deleteAPI, fetchAPIData, saveAPI } from '../../includes/apifunctions';
import {LoadFiles} from '../../includes/interface/LoadFiles'
import {FAvisos} from '../../includes/interface/FAvisos'
import { FModal } from '../../includes/interface/FModal';
import { Errors } from '../../includes/Errors';
import { form as formulario } from './Form';
import { Paginator } from '../../includes/interface/Paginator';

const Experiencias = () => {
    const [items, itemsHandle]           = useReducer(red_items, { arr: [], item: { id: 0, checked: false }, checkall: false, showform: false,totalPages:0,page:0,load:0, search: '', order: []});
    const [toastItems,setToastItems]     = useState([]);    
    const {observer, onOpenChange, open} = useModal();
    const [file,setFile]                 = useState();
    const referer = "http://localhost:8080/experiencias";
    const isInitialized = useRef(null);

    const form = formulario;

    const loadCsv = () => {
        itemsHandle({type:ITEMS_ACTIONS.LOAD})
    }

    const handleSave = async () => {
        const postdata = {
            id:          items.item.id,
            descripcion: items.item.descripcion,
            userId:      getUserId()
        }

        let endpoint =  "/silefe.experiencia/save-experiencia";
        if (items.status === 'new')
            endpoint = "/silefe.experiencia/add-experiencia";
        
        let {status, error} = await saveAPI(endpoint,postdata,referer);
        if (status) {
            setToastItems([...toastItems, { title: Liferay.Language.get("Guardar"), type: "info", text: Liferay.Language.get("Guardado_correctamente") }]);
            fetchData();
        }
        else 
            setToastItems([...toastItems, { title: Liferay.Language.get("Guardar"), type: "danger", text: Errors[error] }]);
        
    }

    const handleDelete = () => {
        if (items.arr.filter(item => item.checked).length > 0)
            onOpenChange(true);        
    }

    const confirmDelete = async () => {
        const endpoint = "/silefe.experiencia/remove-experiencias";
        let s = items.arr.filter(item => item.checked).map( i => {return i.id});

        deleteAPI(endpoint,s,referer).then(res => {
            if (res) {
                setToastItems([...toastItems, { title: Liferay.Language.get('Borrar'), type: "info", text: Liferay.Language.get('Borrado_ok') }]);
                fetchData();
            }
            else
                setToastItems([...toastItems, { title: Liferay.Language.get('Borrar'), type: "danger", text: Liferay.Language.get('Borrado_no') }]);
        })
    }

    const fetchData = async () => {
        const endpoint = "/silefe.experiencia/filter";
        const postdata = {
            page:        items.page,
            descripcion: (items.search && typeof items.search !== 'undefined')?items.search:"", 
            order:       items.order,
        };

        let {data,totalPages, totalItems,page} = await fetchAPIData(endpoint,postdata,referer);
        const tmp = await data.map(i => {return({...i,id:i.experienciaId,checked:false})});
        await itemsHandle({type:ITEMS_ACTIONS.START,items:tmp, fields: form, totalPages:totalPages, total: totalItems,page:page});
    }

    useEffect( ()=> {
		if (!isInitialized.current) {
            fetchData();
			isInitialized.current = true;
		} else {
			const timeoutId = setTimeout(fetchData, 350);
			return () => clearTimeout(timeoutId);
		}
    },[items.load]);

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
            {   (items.status === 'edit' || items.status === 'new') && 
                <DefaultForm 
                    itemsHandle={itemsHandle}
                    save={ handleSave} 
                    items={items}
            />
             }            
            {
                items.status === 'list' &&
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

export default Experiencias;