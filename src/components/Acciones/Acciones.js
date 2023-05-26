import React, {useEffect, useReducer, useRef, useState} from "react";
import DefaultForm from "./AccionesForm";
import Menu from '../Menu';
import Table from '../../includes/interface/Table';
import {useModal} from '@clayui/modal';
import { getUserId, getLanguageId, url_referer} from '../../includes/LiferayFunctions';
import {red_items,ITEMS_ACTIONS, initialState} from '../../includes/reducers/items.reducer';
import { deleteAPI, fetchAPIData, saveAPI, deleteAPIParams } from "../../includes/apifunctions";
import {LoadFiles} from '../../includes/interface/LoadFiles'
import {FAvisos} from '../../includes/interface/FAvisos'
import { FModal } from '../../includes/interface/FModal';
import { Errors } from '../../includes/Errors';
import { form as formulario} from './Form';
import { Paginator } from "../../includes/interface/Paginator";
import {reducerDocentes, DOCENTE_ACTIONS} from '../../includes/reducers/docentes.reducer'; 
import {reducerParticipantes, PARTICIPANTE_ACTIONS} from '../../includes/reducers/participantes.reducer';
//import Papa from "papaparse";


const Acciones = () => {
    const [items,itemsHandle]            = useReducer(red_items,initialState);
    const [docentes,docentesHandler]     = useReducer(reducerDocentes, {items: [], status:'list', item: {id:0}});
    const [participantes,participantesHandler] = useReducer(reducerParticipantes, {items: [], status:'list', item: {id:0}});
    const [toastItems,setToastItems]     = useState([]);    
    const {observer, onOpenChange, open} = useModal();
    const [file,setFile]                 = useState();
    const isInitialized                  = useRef(null);

    let form = formulario;
    const referer = `${url_referer}/acciones`;

    const loadCsv = () => {
        itemsHandle({type:ITEMS_ACTIONS.LOAD});
    }


//    const processCsv = () => {
//        if (file) {
//            const reader = new FileReader();         
//            reader.onload = async ({ target }) => {
//                const csv = Papa.parse(target.result, { header: true,delimiter:";",delimitersToGuess:[";"] });
//                const parsedData = csv?.data;                                
//                let end = '/silefe.cnae/add-multiple';
//                let ttmp = { cnaes:parsedData,userId:getUserId()};
//                batchAPI(end,ttmp,referer).then( res2 => {
//                    if (res2.ok) {
//                        setToastItems([...toastItems, { title: Liferay.Language.get("Carga_Masiva"), type: "danger", text: Liferay.Language.get('Elementos_cargados') }]);                    
//                        fetchData();
//                    }
//                    else 
//                        setToastItems([...toastItems, { title: Liferay.Language.get("Carga_Masiva"), type: "danger", text: Liferay.Language.get("Elementos_no_cargados") }]);
//                });
//            };
//            reader.readAsText(file);
//        }
//        else {
//            console.log("fichero no cargado")
//        }
//    }

    const handleSave = async () => {
        const pdata = {
            id:  items.item.id,
            obj: items.item,
            userId:      getUserId()
        }
        
        let endpoint = '/silefe.accion/save-accion';
        if (items.status === 'new')
            endpoint = '/silefe.accion/add-accion';
        let {data, status, error} = await saveAPI(endpoint,pdata,referer);
        if (status) {
            // mando los docentes: 
            const obj2 = {id:data.accionId,docentes:docentes.items,userId: getUserId()};
            let respon = await saveAPI('/silefe.accion/save-docentes-accion',obj2,referer);            
            if (docentes.deleted.length > 0) {
                const deleteItems = docentes.deleted.map( d => {return (d.docenteId)});
                deleteAPIParams('/silefe.accion/delete-docentes-accion',{id: data.accionId, docentes: deleteItems},referer).then(res => {
                    console.log("se han borrad los docentes");
            })};

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
        const endpoint = '/silefe.accion/delete-accioneso';
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
        console.log("fetchData en Acciones");
        docentesHandler({type: DOCENTE_ACTIONS.START});
        participantesHandler({type: PARTICIPANTE_ACTIONS.START});
        // TODO: esto tiene que desaparecer:         
        const postdata = {
            pagination: {page: items.pagination.page, pageSize: items.pagination.pageSize},
            descripcion : (items.search && typeof items.search !== 'undefined')?items.search:"",
            order:        items.order,
        }

        if (form.fields.accionTipoId.options.length == 0) {
            loadForm();
        }

        let {data,totalPages, totalItems,page} = await fetchAPIData('/silefe.accion/filter',postdata,referer);
        const tmp = await data.map(i => {return({...i,acctionTipo: "lalala", checked:false})});
        await itemsHandle({type:ITEMS_ACTIONS.START,items:tmp, fields: form,totalPages:totalPages, total: totalItems,page:page});
    }

    const beforeEdit = () => {
        console.log("beforeEdit");
        // hay que cargar todos los profesores: 
        fetchAPIData('/silefe.docente/all', {lang: getLanguageId()}).then(response => {
            const tits = response.data.map( i => {                
                let tt = JSON.parse(i.email);
                return {
                    ...i, 
                    apellidos: i.apellido1 + " " + i.apellido2, 
                    nuevo: true,
                    email: tt[0].value,
                }
            });
            docentesHandler({type: DOCENTE_ACTIONS.SETSEARCHITEMS,items:tits});
        })
        // ahora cargamos los posbiles participantes
        fetchAPIData('/silefe.participante/all', {lang: getLanguageId()}).then(response => {
            console.log("recibiendo los participantes");
            console.debug(response);
            const pts = response.data.map( i => {                
                let email = "";
                console.log(i);
                if (i.email.length > 0) 
                    email = JSON.parse(i.email)[0].value;
                return {
                    ...i, 
                    apellidos: i.apellido1 + " " + i.apellido2, 
                    nuevo: true,
                    email: email
                }
            });
            participantesHandler({type: PARTICIPANTE_ACTIONS.SETSEARCHITEMS,items:pts});
        })


        
        let sel = items.arr.filter(i => i.checked);        
        if (sel.length > 0) {
            const accionId = sel[0].accionId;              
            fetchAPIData('/silefe.accion/filter-docentes-by-accion', {accionId: accionId},referer).then(response => {
                
                const tits = response.data.map( i => {
                    let email = '';
                    if (i.email.length > 0) 
                        email = JSON.parse(i.email)[0].value;
                                        
                    return {
                        ...i,
                        apellidos: i.apellido1 + " " + i.apellido2,
                        nuevo: false,
                        email: email
                    }
                });
                
                docentesHandler({type: DOCENTE_ACTIONS.SETITEMS,items:tits});
            })
        }
    }

    const loadForm = () => {
        fetchAPIData('/silefe.acciontipo/all', { lang: getLanguageId() }, referer).then(response => {
            const opts = [{value: 0, label: Liferay.Language.get("Seleccionar")}, ...response.data.map(obj => { return { value: obj.id, label: obj.descripcion } })];
            form.fields.accionTipoId.options = opts;
        });

        fetchAPIData('/silefe.acciontipoformacion/all', { lang: getLanguageId() }, referer).then(response => {
            const opts = [{value: 0, label: Liferay.Language.get("Seleccionar")}, ...response.data.map(obj => { return { value: obj.id, label: obj.descripcion } })];
            form.fields.accionTipoFormacionId.options = opts;
        });

        fetchAPIData('/silefe.tecnico/all', { lang: getLanguageId() }, referer).then(response => {
            const opts = [{value: 0, label: Liferay.Language.get("Seleccionar")}, ...response.data.map(obj => { return { value: obj.tecnicoId, label: obj.firstName } })];
            form.fields.tecnicoId.options = opts;
        });

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
                beforeEdit={beforeEdit}
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
                    docentes={docentes}
                    docentesHandler={docentesHandler}
                    participantes={participantes}
                    participantesHandler={participantesHandler}
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

export default Acciones;
