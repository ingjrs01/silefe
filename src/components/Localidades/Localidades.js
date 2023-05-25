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
import { Paginator } from '../../includes/interface/Paginator';

const Localidades = () => {
    const [items,itemsHandle]            = useReducer(red_items,{arr:[],item:{id:0},totalPages: 1,pagination: {page:0,pageSize:10, sizes: [10,20,30]}, page:0,load:0, search: "", order: []});
    const [toastItems,setToastItems]     = useState([]);    
    const {observer, onOpenChange, open} = useModal();
    const [file,setFile]                 = useState();
    const isInitialized                  = useRef(null);

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
        //const postdata = {
        //    id:         items.item.id,
        //    name:       items.item.nombre,
        //    userId:     getUserId(),
        //}
        let endpoint = '/silefe.municipio/save-municipio'
        if (items.status === 'new') 
            endpoint = '/silefe.municipio/add-municipio';

        let obj = {obj: {...items.item, id:items.item.participanteId, userId: getUserId()}};
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
        const endpoint = '/silefe.municipio/remove-municipios';
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
            nombre: (items.search && typeof items.search !== 'undefined')?items.search:"",
            pagination: {page: items.pagination.page, pageSize: items.pagination.pageSize},
            order: items.order,
        };
        console.log("hecho del fetchData");

        // TODO: Revisar si necesitamos cargar de todas las veces
        fetchAPIData('/silefe.provincia/all', {lang: getLanguageId()},referer).then(response => {
            const opts = [{value:"0",label:Liferay.Language.get('Seleccionar')}, ...response.data.map(obj => {return {value:obj.id,label:obj.nombre}})];
            form.fields.provinciaId.options = opts;
        });

        let {data,totalPages, totalItems, page}  = await fetchAPIData('/silefe.ayuntamiento/filter',postdata,referer);
        const tmp = await data.map(i => {return({...i,checked:false})});
        await itemsHandle({type: ITEMS_ACTIONS.START,items: tmp, fields:form,totalPages:totalPages, total:totalItems,page:page});
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

export default Localidades;