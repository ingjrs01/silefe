import React, {useState,useEffect,useReducer, useRef} from 'react';
import DefaultForm from '../../includes/interface/DefaultForm';
import Menu from '../Menu';
import Table from '../../includes/interface/Table';
import {useModal} from '@clayui/modal';
import {getUserId, getLanguageId, url_referer} from '../../includes/LiferayFunctions';
import {batchAPI, deleteAPI, fetchAPIData, saveAPI} from '../../includes/apifunctions.js';
import {ITEMS_ACTIONS,red_items, initialState} from '../../includes/reducers/items.reducer';
import {LoadFiles} from '../../includes/interface/LoadFiles'
import {FAvisos} from '../../includes/interface/FAvisos'
import { FModal } from '../../includes/interface/FModal';
import { Errors } from '../../includes/Errors';
import { form as formulario} from './Form';
import Papa from "papaparse";
import { Paginator } from '../../includes/interface/Paginator';

const TitulacionesFam = () => {
    const [items,itemsHandle]            = useReducer(red_items,initialState);
    const [toastItems,setToastItems]     = useState([]);    
    const {observer, onOpenChange, open} = useModal();
    const [file,setFile]                 = useState();
    const isInitialized                  = useRef(null);

    const form = formulario;
    const referer = `${url_referer}/titulacionesf`;

    const loadCsv = () => {
        console.log("Cargando un csv");
        itemsHandle({type:ITEMS_ACTIONS.LOAD});
    }

    const processCsv = () => {
        if (file) {
            const reader = new FileReader();
         
            reader.onload = async ({ target }) => {
                const csv = Papa.parse(target.result, { header: true,delimiter:";",delimitersToGuess:[";"] });
                const parsedData = csv?.data;                                
                let end = '/silefe.titulacionfam/add-multiple';
                let ttmp = {titulacionesf:parsedData,userId:getUserId()};

                batchAPI(end,ttmp,referer).then(res => {
                    if (res2.ok) {
                        setToastItems([...toastItems, { title: Liferay.Language.get("Carga Masiva"), type: "danger", text: Liferay.Language.get('Elementos_cargados') }]);
                        fetchData();
                    }
                    else {
                        setToastItems([...toastItems, { title: Liferay.Language.get("Carga Masiva"), type: "danger", text: Liferay.Language.get("Elementos_no_cargados") }]);
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
            id: items.item.id,
            descripcion: items.item.descripcion,
            titulacionNivelId: items.item.titulacionNivelId,
            userId:      getUserId(),
        }

        let endpoint = '/silefe.titulacionfam/save-titulacion-fam';
        if (items.status === 'new' )
            endpoint = '/silefe.titulacionfam/add-titulacion-fam';

        let {status,error} = await saveAPI(endpoint,postdata,referer);    
        if (status) {
            setToastItems([...toastItems, { title: Liferay.Language.get("Guardar"), type: "info", text: Liferay.Language.get("Guardado_correctamente") }]);  
            fetchData();
        }
        else             
            setToastItems([...toastItems, { title: Liferay.Language.get("Error"), type: "danger", text:  Errors[error]}]);
    }

    const handleDelete = () => {
        if (items.arr.filter(item => item.checked).length > 0)
            onOpenChange(true);        
    }

    const confirmDelete = async () => {
        let s = items.arr.filter(item => item.checked).map( i => {return i.titulacionFamId});
        const endpoint = "/silefe.titulacionfam/remove-fam-titulaciones";

        let {status,error,msg} = await deleteAPI(endpoint,s,referer); 
        if (status) {
            setToastItems([...toastItems, { title: Liferay.Language.get('Borrar'), type: "info", text: Liferay.Language.get('Borrado_ok') }]);
            fetchData();
        }
        else {
            setToastItems([...toastItems, { title: Liferay.Language.get('Borrar'), type: "danger", text: Liferay.Language.get('Borrado_no') + ": " + Errors[error] }]); 
        }
    }

    const fetchData = async () => {
        const endpoint = '/silefe.titulacionfam/filter';
        const postdata = {
            pagination: { page: items.pagination.page, pageSize: items.pagination.pageSize},
            options: {
                filters: [                    
                    {name: items.searchField, value: ( items.search && typeof items.search !== "undefined")?items.search:"",}
                ],
                order: items.order,
            },
        };

        let {data,totalPages, totalItems, page} = await fetchAPIData(endpoint, postdata,referer);

        if (form.fields.titulacionNivelId.options == undefined || form.fields.titulacionNivelId.options.length == 0) {
            form.fields.titulacionNivelId.options = await getNivelesTitulaciones();
        }
        //form.fields.titulacionNivelId.options = options;
        const tmp = await data.map(i => {
            console.log(i);
            return({
                ...i,
                id:i.titulacionFamId, 
                //titulacionNivelDescripcion:form.fields.titulacionNivelId.options.filter(o => o.value == i.titulacionNivelId)[0].label,
                checked:false
            })
        });
        await itemsHandle({type: ITEMS_ACTIONS.START,items: tmp,fields: form, totalPages:totalPages, total: totalItems,page:page });
    }

    const getNivelesTitulaciones = async () => {
        let {data} = await fetchAPIData('/silefe.titulacionnivel/all', {descripcion: "",lang:getLanguageId()},referer);
        const options = await data.map(obj => {return {value:obj.id,label:obj.descripcion}});
        return options 
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
                formulario={formulario}
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
    );
}

export default TitulacionesFam;