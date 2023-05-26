import React, {useState,useEffect, useReducer, useRef} from 'react';
import { useQuery } from '@tanstack/react-query';
import DefaultForm from '../../includes/interface/DefaultForm';
import Menu from '../Menu';
import Table from '../../includes/interface/Table';
import {useModal} from '@clayui/modal';
import {getUserId, url_referer} from '../../includes/LiferayFunctions';
import {red_items,ITEMS_ACTIONS, initialState} from '../../includes/reducers/items.reducer';
import {LoadFiles} from '../../includes/interface/LoadFiles'
import {FAvisos} from '../../includes/interface/FAvisos'
import { FModal } from '../../includes/interface/FModal';
import { Errors } from '../../includes/Errors';
import Papa from "papaparse";
import { batchAPI, deleteAPI, fetchAPIData, saveAPI } from '../../includes/apifunctions';
import {form as formulario} from './Form';
// probando
import {PROVINCIA_ACTIONS, rProvincias} from './provincias.reducer';
import { Paginator } from '../../includes/interface/Paginator';

const Provincias = () => {
    const [items,itemsHandle]            = useReducer(red_items,initialState);
    const [toastItems,setToastItems]     = useState([]);    
    const {observer, onOpenChange, open} = useModal();
    const [file,setFile]                 = useState();
    const isInitialized                  = useRef(null);

    // Probando a ver como va esto del query: 
    const {data, status, isFetching, error, refetch} = useQuery(["users"], () => fetchAPIData('/silefe.provincia/filter',{name:"",page:1},referer) );

    const [provincias, provinciasHandle] = useReducer(rProvincias,{});
    const [jload, setJload] = useState(0);

    useEffect(()=>{
        if (data) {
            console.log("cargando datos");
            provinciasHandle({type:PROVINCIA_ACTIONS.START,items:data.data});
            itemsHandle({type: ITEMS_ACTIONS.START,items: tmp, fields:form,totalPages:totalPages,page:page});
        }
        else 
            console.log("esto habia fallado")
    },[data,isFetching, jload]);

    const referer = `${url_referer}/provincias`;
    const form = formulario;

    const loadCsv = () => {
        itemsHandle({type:ITEMS_ACTIONS.LOAD});
    }

    const beforeEdit = () => {
        console.log("solo");
    }

    const processCsv = () => {
        console.log(file);

        if (file) {
            const reader = new FileReader();         
            reader.onload = async ({ target }) => {
                const csv = Papa.parse(target.result, { header: true,delimiter:";",delimitersToGuess:[";"] });
                const parsedData = csv?.data;                                
                let end = '/silefe.provincia/add-multiple';
                let ttmp = {provincias:parsedData,userId:getUserId()};
                batchAPI(end,ttmp,reader).then(res => {
                    if (res.ok) {
                        setToastItems([...toastItems, { title: Liferay.Language.get("Carga_Masiva"), type: "info", text: Liferay.Language.get('Elementos_cargados') }]);    
                        fetchData();
                    }
                    else {
                        setToastItems([...toastItems, { title: Liferay.Language.get("Carga_Masiva"), type: "danger", text: Liferay.Language.get("Elementos_no_cargados") }]);
                    }
                });               
            };
            reader.readAsText(file);
        }
        else {
            console.log("fichero no cargado")
        }
    }

    const handleSave = async () => {
        const postdata = {
            id:         items.item.id,
            name:       items.item.nombre,
            userId:     getUserId(),
        }
        let endpoint = '/silefe.provincia/save-provincia'
        if (items.status === 'new') 
            endpoint = '/silefe.provincia/add-provincia';

        let {status, error } = await saveAPI(endpoint,postdata,referer);
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
        const endpoint = '/silefe.provincia/remove-provincias';
        let s = items.arr.filter(item => item.checked).map( i => {return i.id});

        deleteAPI(endpoint,s,referer).then(res =>{
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
            name: (items.search && typeof items.search !== 'undefined')?items.search:"",
            pagination: { page: items.pagination.page, pageSize: items.pagination.pageSize},
            order: items.order,
        };
        let {data,totalPages, totalItems, page}  = await fetchAPIData('/silefe.provincia/filter',postdata,referer);
        const tmp = await data.map(i => {return({...i,id:i.provinciaId,checked:false})});
        await itemsHandle({type: ITEMS_ACTIONS.START,items: tmp, fields:form,totalPages:totalPages, total: totalItems,page:page});
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

export default Provincias;
