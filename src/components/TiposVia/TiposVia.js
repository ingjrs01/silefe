import React, {useState,useEffect, useReducer, useRef} from 'react';
import DefaultForm from '../../includes/interface/DefaultForm';
import Menu from '../Menu';
import Table from '../../includes/interface/Table';
import {useModal} from '@clayui/modal';
import {getUserId} from '../../includes/LiferayFunctions';
import {red_items,ITEMS_ACTIONS} from '../../includes/reducers/items.reducer';
import {LoadFiles} from '../../includes/interface/LoadFiles'
import {FAvisos} from '../../includes/interface/FAvisos'
import { FModal } from '../../includes/interface/FModal';
import { Errors } from '../../includes/Errors';
import Papa, { parse } from "papaparse";
import { batchAPI, deleteAPI, fetchAPIData, saveAPI } from '../../includes/apifunctions';
import {form as formulario} from './Form';
import { getLanguageId } from '../../includes/LiferayFunctions';
import {Paginator} from '../../includes/interface/Paginator';

const TiposVia = () => {
    const [items,itemsHandle]            = useReducer(red_items,{arr:[],item:{id:0},checkall:false,showform:false,page:0,load:0});
    const [toastItems,setToastItems]     = useState([]);    
    const {observer, onOpenChange, open} = useModal();
    const [file,setFile]                 = useState();
    const isInitialized = useRef;

    const referer = 'http://localhost:8080/localidades';
    const form = formulario;

    const loadCsv = () => {
        itemsHandle({type:ITEMS_ACTIONS.LOAD});
    }

    const processCsv = () => {
        console.log(file);

        if (file) {
            const reader = new FileReader();         
            reader.onload = async ({ target }) => {
                const csv = Papa.parse(target.result, { header: true,delimiter:";",delimitersToGuess:[";"] });
                const parsedData = csv?.data;                                
                let end = '/silefe.localidad/add-multiple';

                const sizelote = 1000;
                //console.log(parsedData.length);

                //console.log("procesando datos2");
                const lotes = parsedData.length / sizelote;
                //console.log("lotes: " + lotes);

                for (let i=0;i < lotes;i++) {
                    console.log("iterando");
                    let inicio = i*sizelote;
                    let ttmp = {localidades:parsedData.slice(inicio,inicio + sizelote),userId:getUserId()};
                    //console.log(ttmp);
                    batchAPI(end,ttmp,reader).then(res => {
                        if (res.status) {
                            setToastItems([...toastItems, { title: Liferay.Language.get("Carga_Masiva"), type: "info", text: Liferay.Language.get('Elementos_cargados') }]);    
                            fetchData();
                        }
                        else {
                            setToastItems([...toastItems, { title: Liferay.Language.get("Carga_Masiva"), type: "danger", text: Liferay.Language.get("Elementos_no_cargados") }]);
                        }
                    })
                //console.log("todo cargado");
                };
                // lalalala

            };
            reader.readAsText(file);
        }
        else {
            console.log("fichero no cargado")
        }
    }

    const handleSave = async () => {
        let endpoint = '/silefe.tiposvia/save-tipo-via';
        if (items.status === 'new') 
            endpoint = '/silefe.tiposvia/add-tipo-via';

        let obj = {obj: {...items.item, id:items.item.tiposViaId, userId: getUserId()},userId:getUserId()};
        let {status, error} = await saveAPI(endpoint,obj,referer); 

        if (status) {
            setToastItems([...toastItems, { title: Liferay.Language.get('Guardar'), type: "info", text: Liferay.Language.get('Guardado_correctamente') }]);
            fetchData();
        }
        else 
            setToastItems([...toastItems, { title: Liferay.Language.get('Guardar'), type: "danger", text: Errors[error] }]);
    }

    const handleDelete = () => {
        if (items.arr.filter(item => item.checked).length > 0)
            onOpenChange(true);        
    }

    const confirmDelete = async () => {
        let s = items.arr.filter(item => item.checked).map( i => {return i.id});
        deleteAPI('/silefe.tiposvia/remove-tipos-via',s,referer).then(res =>{
            if (res) {
                setToastItems([...toastItems, { title: Liferay.Language.get('Borrar'), type: "info", text: Liferay.Language.get('Borrado_ok') }]);
                fetchData();
            }
            else {
                setToastItems([...toastItems, { title: Liferay.Language.get('Borrar'), type: "danger", text: Liferay.Language.get('Borrado_no') }]);
            }
        });
    }

    const fetchData = async () => {
        const postdata = {
            nombre: (items.search && typeof items.search !== 'undefined')?items.search:"",
            page: items.page,
        };

        let {data,totalPages, page}  = await fetchAPIData('/silefe.tiposvia/filter',postdata,referer);
        const tmp = await data.map(i => {return({...i,checked:false})});
        await itemsHandle({type: ITEMS_ACTIONS.START,items: tmp, fields:form,totalPages:totalPages,page:page});
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
                    save={handleSave}
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

export default TiposVia;