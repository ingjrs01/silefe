import React, {useState,useEffect, useReducer, useRef} from "react";
import DefaultForm from '../../includes/interface/DefaultForm';
import Table from '../../includes/interface/Table';
import Menu from '../Menu';
import {useModal} from '@clayui/modal';
import {getUserId, url_referer} from '../../includes/LiferayFunctions';
import {initialState, ITEMS_ACTIONS,red_items} from '../../includes/reducers/items.reducer';
import { deleteAPI, fetchAPIData, saveAPI } from "../../includes/apifunctions";
import {LoadFiles} from '../../includes/interface/LoadFiles'
import {FAvisos} from '../../includes/interface/FAvisos'
import { FModal } from '../../includes/interface/FModal';
import { Errors } from '../../includes/Errors';
import { form as formulario } from "./Form";
import { Paginator } from "../../includes/interface/Paginator";
import Papa from "papaparse";

const MBaja = () => {
    const [items, itemsHandle]           = useReducer(red_items, initialState);
    const [toastItems,setToastItems]     = useState([]);    
    const {observer, onOpenChange, open} = useModal();
    const [file,setFile]                 = useState();
    const isInitialized                  = useRef(null);

    const form = formulario;
    const referer = `${url_referer}/mbaja`;

    const loadCsv = () => {
        console.log("Cargando un csv");
        itemsHandle({type:ITEMS_ACTIONS.LOAD})
    }

    const processCsv = () => {
        if (file) {
            const reader = new FileReader();         
            reader.onload = async ({ target }) => {
                const csv = Papa.parse(target.result, { header: true,delimiter:";",delimitersToGuess:[";"] });
                const parsedData = csv?.data;                                
                let end = '/silefe.mbaja/add-multiple';
                let ttmp = {motivos:parsedData,userId:Liferay.ThemeDisplay.getUserId()};
                fetchAPIData(end,ttmp,referer).then(res => {
                    if (res2.ok) {
                        setToastItems([...toastItems, { title: Liferay.Language.get("Carga_Masiva"), type: "info", text: Liferay.Language.get('Elementos_cargados') }]);                        
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

    const fetchData = async () => {
        const postdata = {
            descripcion : (items.seach && typeof items.seach !== 'undefined')?items.seach:"",
            pagination:   {page: items.pagination.page, pageSize: items.pagination.pageSize},
            order:        items.order,
        }

        let {data,totalPages, totalItems,page} = await fetchAPIData('/silefe.mbaja/filter',postdata,referer);
        const tmp = await data.map(i => {return({...i,id:i.mBajaId,checked:false})});
        await itemsHandle({type:ITEMS_ACTIONS.START,items:tmp,fields:form,totalPages:totalPages, total: totalItems,page:page});
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


    const handleSave = async () => {
        const postdata = {
            mbajaId:     items.item.id,
            descripcion: items.item.descripcion,
            userId:      getUserId(),
        }
        let endpoint = '/silefe.mbaja/save-m-baja';
        if (items.status === 'new')
            endpoint = '/silefe.mbaja/add-m-baja';        
            let {status,error} = await saveAPI(endpoint,postdata,referer);
            if (status) {
                fetchData();
                setToastItems([...toastItems, { title: Liferay.Language.get("Guardar"), type: "info", text: Liferay.Language.get('Guardado_correctamente') }]);
            }
            else
                setToastItems([...toastItems, { title: Liferay.Language.get("Guardar"), type: "danger", text: Errors[error] }]);
    }

    const handleDelete = () => {
        if (items.arr.filter(item => item.checked).length > 0)
            onOpenChange(true);        
    }

    const confirmDelete = async () => {
        const endpoint = '/silefe.mbaja/remove-m-bajas';
        let s = items.arr.filter(item => item.checked).map( i => {return i.id});
        deleteAPI(endpoint,s,referer).then(res => {
            if (res) {
                setToastItems([...toastItems, { title: Liferay.Language.get('Borrar'), type: "info", text: Liferay.Language.get('Borrado_ok')  }]);
                fetchData();
            }
            else
                setToastItems([...toastItems, { title: Liferay.Language.get('Borrar'), type: "dangaer", text: Liferay.Language.get('Borrado_no')  }]);
        });

    }

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
                    itemsHandle={itemsHandle}
                    save={ handleSave} 
                    items= {items}
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

export default MBaja;