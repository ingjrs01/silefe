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
import { url_api, getAuthToken } from "../../includes/LiferayFunctions";


const Tecnicos = () => {
    const [items,itemsHandle]            = useReducer(red_items,{arr: [], item: {id:0,checked:false}, checkall: false, showform: false, page:0,load:0}); 
    const [toastItems,setToastItems]     = useState([]);    
    const {observer, onOpenChange, open} = useModal();
    const [file,setFile]                 = useState();
    const isInitialized                  = useRef;

    const columns = [
        {
            columnName: "userId",
            columnTitle: "Id",
            columnType: "checkbox",
            key: "c1",
        },
        {
            columnName: "firstName",
            columnTitle: Liferay.Language.get('Nombre'),
            columnType: "string",
            key: "c2",
        },
        {
            columnName: "lastName",
            columnTitle: Liferay.Language.get('Apellidos'),
            columnType: "string",
            key: "c2",
        },
        {
            columnName: "emailAddress",
            columnTitle: Liferay.Language.get('Nombre'),
            columnType: "string",
            key: "c2",
        },
    ];

    const form = {
        title: Liferay.Language.get('Tecnicos'),
        languages: ["es-ES","en-US","gl-ES"],
        rows: [
            {
                key: 5,
                type:"row",
                classname:"",
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
                key: 6,
                type:"row",
                classname:"",
                cols: {
                    firstName: {
                        key:2,
                        type: "text",
                        label: Liferay.Language.get('Nombre'), 
                        name: "firstName", 
                        value:"lelele", 
                        placeholder: Liferay.Language.get('Nombre'), 
                        conditions: ["text"]
                    },
                    lastName: {
                        key:3,
                        type: "text",
                        label: Liferay.Language.get('Apellido'), 
                        name: "lastName", 
                        value:"lelele", 
                        placeholder: Liferay.Language.get('Apellido'), 
                        conditions: ["text"]
                    }
                }
            },
            {
                key: 7,
                type:"row",
                classname:"",
                cols: {
                    emailAddress: {
                        key:4,
                        type: "text",
                        label: "correo", 
                        name: "emailAddress", 
                        value:"lalala", 
                        placeholder:"correo", 
                        conditions: ["text"]
                    },
                }
            },

        ]
    };

    const referer = 'http://localhost:8080/colectivos';

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
                let end = '/silefe.colectivo/add-multiple';
                let ttmp = {colectivos:parsedData,userId:getUserId()};

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
            colectivoId: items.item.id,
            descripcion: items.item.descripcion,
            userId:      getUserId(),
        }

        let endpoint = '/silefe.colectivo/save-colectivo';
        if (items.status === 'new' )
            endpoint = '/silefe.colectivo/add-colectivo';

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
        let s = items.arr.filter(item => item.checked).map( i => {return i.colectivoId});
        const endpoint = "/silefe.colectivo/remove-colectivos";

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
        //const endpoint = '/silefe.colectivo/filter';
        console.log("Probnaod mis cossas");
        const endpoint = "/user/get-user-group-users";
        const postdata = {
            userGroupId: 52272
        };

        //const url = "http://localhost:8080/api/jsonws/user/get-user-group-users/user-group-id/52272";
        const auth = getAuthToken();
        //debugger;
        const response = await fetch(url_api, {
            "credentials": "include",
            "headers": {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:104.0) Gecko/20100101 Firefox/104.0",
                "Accept": "*/*",
                "Accept-Language": "es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3",
                "contenttype": "undefined",
                "x-csrf-token": auth,
                "Content-Type": "text/plain;charset=UTF-8",
                "Sec-Fetch-Dest": "empty",
                "Sec-Fetch-Mode": "cors",
                "Sec-Fetch-Site": "same-origin"
            },
            "referrer": `\"${referer}\"`,
            "body": `{\"${endpoint}\":${JSON.stringify(postdata)}}`,
            "method": "POST",
            "mode": "cors"
        });
        console.log("Hecha la consulta");
        //console.log(response);
        let data = await response.json();
        //console.debug(data);
    
        //let { data, totalPages, page, error } = await JSON.parse(await response.json());
        let totalPages = 1;
        let page = 0;
        //return {data, error,totalPages, page}
        const tmp = await data.map(i => {return({id:i.userId,firstName:i.firstName,lastName:i.lastName,emailAddress:i.emailAddress,checked:false})});
        await console.log("los datos procesados");
        await console.log(tmp);
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

export default Tecnicos;