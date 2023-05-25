import React, {useEffect, useReducer, useRef, useState} from "react";
import DefaultForm from '../../includes/interface/DefaultForm';
import Menu from '../Menu';
import Table from '../../includes/interface/Table';
import {useModal} from '@clayui/modal';
import {getUserId} from '../../includes/LiferayFunctions';
import {red_items,ITEMS_ACTIONS} from '../../includes/reducers/items.reducer';
import Papa from "papaparse";
import { deleteAPI, fetchAPIData, saveAPI } from "../../includes/apifunctions";
import {LoadFiles} from '../../includes/interface/LoadFiles'
import {FAvisos} from '../../includes/interface/FAvisos'
import { FModal } from '../../includes/interface/FModal';
import { Errors } from '../../includes/Errors';
import { form as formulario } from './Form';
import { Paginator } from "../../includes/interface/Paginator";

const Salarios = () => {
    const [items,itemsHandle]            = useReducer(red_items,{arr:[],item:{id:0},totalPages: 1,pagination: {page:0,pageSize:10, sizes: [10,20,30]}, page:0,load:0, search: "", order: []});
    const [toastItems,setToastItems]     = useState([]);    
    const {observer, onOpenChange, open} = useModal();
    const [file,setFile]                 = useState();
    const isInitialized                  = useRef(null);

    const form = formulario;
    const referer = "http://localhost:8080/salarios";

    const loadCsv = () => {
        itemsHandle({type:ITEMS_ACTIONS.LOAD})
    }

    const processCsv = () => {
        if (file) {
            const reader = new FileReader();        
            reader.onload = async ({ target }) => {
                const csv = Papa.parse(target.result, { header: true,delimiter:";",delimitersToGuess:[";"] });
                const parsedData = csv?.data;                                
                let end = '/silefe.salario/add-multiple';
                let ttmp = {salarios:parsedData,userId:getUserId()};
                fetchAPIData(end,ttmp,referer).then(res2 => {
                    if (res2) {
                        setToastItems([...toastItems, { title: Liferay.Language.get("Carga_Masiva"), type: "info", text: Liferay.Language.get('Elementos_cargados') }]);                    
                        fetchData();
                    }
                    else 
                        setToastItems([...toastItems, { title: Liferay.Language.get("Carga_Masiva"), type: "danger", text: Liferay.Language.get("Elementos_no_cargados") }]);
                });

            };
            reader.readAsText(file);
        }
        else 
            console.log("fichero no cargado")
    }

    const handleSave = async () => {
        const postdata = {
            id:          items.item.id,
            descripcion: items.item.descripcion,
            userId:      getUserId(),
        }
        let endpoint = '/silefe.salario/save-salario';
        if (items.status  === 'new')
            endpoint = '/silefe.salario/add-salario';
        let {status, error} = await saveAPI(endpoint,postdata,referer); 
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
        const endpoint = "/silefe.salario/remove-salarios";
        let s = items.arr.filter(item => item.checked).map( i => {return i.id});        
        deleteAPI(endpoint,s,referer).then(res => {
            if (res) {
                setToastItems([...toastItems, { title: Liferay.Language.get('Borrar'), type: "info", text: Liferay.Language.get('Borrado_ok') }]);
                fetchData();
            }
            else 
                setToastItems([...toastItems, { title: Liferay.Language.get('Borrar'), type: "error", text: Liferay.Language.get('Borrado_no') }]);
        });

    }

    const fetchData = async () => {
        const postdata = {
            descripcion : (items.search && typeof items.search !== 'undefined')?items.search:"",
            pagination:   {page: items.pagination.page, pageSize: items.pagination.pageSize},
            order:        items.order,
        }
        let {data,totalPages,totalItems,page} = await fetchAPIData('/silefe.salario/filter',postdata,referer);
        const tmp = await data.map(i => {return({...i,id:i.salarioId,checked:false})});
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
        return (<div>{Liferay.Language.get('Cargando')}</div>)

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
            {   (items.status === 'edit' || items.status ==='new') && 
                <DefaultForm 
                    form={form} 
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

export default Salarios;