import React, {useState,useEffect,useReducer, useRef} from 'react';
import DefaultForm from '../DefaultForm';
import Menu from '../Menu';
import Table from '../Table';
import {useModal} from '@clayui/modal';
import {getUserId} from '../../includes/LiferayFunctions';
import {batchAPI, deleteAPI, fetchAPIData, saveAPI} from '../../includes/apifunctions.js';
import {ITEMS_ACTIONS,red_items} from '../../includes/reducers/items.reducer';
import {LoadFiles} from '../../includes/interface/LoadFiles'
import {FAvisos} from '../../includes/interface/FAvisos'
import { FModal } from '../../includes/interface/FModal';
import { Errors } from '../../includes/Errors';
import Papa from "papaparse";

const TitulacionesTipo = () => {
    const [items,itemsHandle]            = useReducer(red_items,{arr: [], item: {id:0,checked:false}, checkall: false, showform: false, page:0,load:0}); 
    const [toastItems,setToastItems]     = useState([]);    
    const {observer, onOpenChange, open} = useModal();
    const [file,setFile]                 = useState();
    const isInitialized                  = useRef;

    const columns = [
        {
            columnName: "titulacionTipoId",
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
    ];

    const form = {
        title: Liferay.Language.get('Titulaciones_tipo'),
        languages: ["es-ES","en-US","gl-ES"],
        rows: [
            {
                key:9,
                type: "row",
                classname: "", 
                cols: {
                    id: {
                        key:1,
                        type: "text",
                        label: "ID", 
                        name: "id", 
                        value:"lalala", 
                        placeholder:"Identifier", 
                        conditions: ["number"]
                    },
                }
            },
            {
                key:7,
                type: "row",
                classname: "", 
                cols: {
                    descripcion: {
                        key:3,
                        type: "multilang",
                        label: Liferay.Language.get('Descripcion'), 
                        name: "descripcion", 
                        value:"lelele", 
                        placeholder: Liferay.Language.get('Descripcion'), 
                        conditions: ["text"]
                    }
                }
            },
        ]
    };

    const referer = 'http://localhost:8080/tittipo';

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
                let end = '/silefe.titulaciontipo/add-multiple';
                let ttmp = {titulacionestipo:parsedData,userId:getUserId()};

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
            userId:      getUserId(),
        }

        let endpoint = '/silefe.titulaciontipo/save-titulaciones-tipo';
        if (items.status === 'new' )
            endpoint = '/silefe.titulaciontipo/add-titulaciones-tipo';

        let {status,error} = await saveAPI(endpoint,postdata,referer);    
        if (status) {
            setToastItems([...toastItems, { title: Liferay.Language.get("Guardar"), type: "info", text: Liferay.Language.get("Guardado_correctamente") }]);  
            fetchData();
        }
        else {
            setToastItems([...toastItems, { title: Liferay.Language.get("Error"), type: "danger", text:  Errors[error]}]);
        }
    }

    const handleDelete = () => {
        if (items.arr.filter(item => item.checked).length > 0)
            onOpenChange(true);        
    }

    const confirmDelete = async () => {
        let s = items.arr.filter(item => item.checked).map( i => {return i.titulacionTipoId});
        const endpoint = "/silefe.titulaciontipo/remove-titulaciones-tipo";

        deleteAPI(endpoint,s,referer).then(res => {
            if (res) {
                setToastItems([...toastItems, { title: Liferay.Language.get('Borrar'), type: "info", text: Liferay.Language.get('Borrado_ok') }]);
                fetchData();
            }
            else {
                setToastItems([...toastItems, { title: Liferay.Language.get('Borrar'), type: "danger", text: Liferay.Language.get('Borrado_no') }]);                            
            }
        })
    }

    const fetchData = async () => {
        const endpoint = '/silefe.titulaciontipo/filter';
        const postdata = {
            page: items.page,
            descripcion: ( items.search && typeof items.search !== "undefined")?items.search:""
        };
        let {data,totalPages, page} = await fetchAPIData(endpoint, postdata,referer);
        const tmp = await data.map(i => {return({...i,id:i.titulacionTipoId,checked:false})});
        await itemsHandle({type: ITEMS_ACTIONS.START,items: tmp,fields: form, totalPages:totalPages,page:page });
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
    );
}

export default TitulacionesTipo;