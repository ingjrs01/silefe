import React, {useEffect, useReducer, useRef, useState} from "react";
import DefaultForm from "../../includes/interface/DefaultForm";
import Menu from '../Menu';
import Table from '../../includes/interface/Table';
import {useModal} from '@clayui/modal';
import { getUserId} from '../../includes/LiferayFunctions';
import {red_items,ITEMS_ACTIONS} from '../../includes/reducers/items.reducer';
import Papa from "papaparse";
import { batchAPI, deleteAPI, fetchAPIData, saveAPI } from "../../includes/apifunctions";
import {LoadFiles} from '../../includes/interface/LoadFiles'
import {FAvisos} from '../../includes/interface/FAvisos'
import { FModal } from '../../includes/interface/FModal';
import { Errors } from '../../includes/Errors';
import { form as formulario} from './Form';
import { Paginator } from "../../includes/interface/Paginator";
import { getLanguageId } from '../../includes/LiferayFunctions';


const Docentes = () => {
    const [items,itemsHandle]            = useReducer(red_items,{arr:[],item:{id:0},page:0,totalPages:0,load:0, search: '', order: []});
    const [toastItems,setToastItems]     = useState([]);    
    const {observer, onOpenChange, open} = useModal();
    const [file,setFile]                 = useState();
    const isInitialized                  = useRef(null);

    const form = formulario;
    const referer = "http://localhost:8080/docentes";

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
        const data = {
            id:  items.item.id,
            obj: items.item,
            userId:      getUserId()
        }
        let endpoint = '/silefe.docente/save-docente';
        if (items.status === 'new')
            endpoint = '/silefe.docente/add-docente';
        let {status,error} = await saveAPI(endpoint,data,referer);
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
        const endpoint = '/silefe.docente/delete-docentes';
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
        if (form.fields.provinciaId.options == undefined)  {
            console.log("visto que estoy dentro");
            await initForm();
        }

        const postdata = {
            page:         (items.page>0)?items.page:0,
            descripcion : (items.search && typeof items.search !== 'undefined')?items.search:"",
            order:        items.order,
        }
        let {data,totalPages, totalItems,page} = await fetchAPIData('/silefe.docente/filter',postdata,referer);
        //await console.debug(data);

        const tmp = await data.map(i => {
            console.log("iterando");
            console.log(i);
            return(
                {...i,
                fechaNacimiento: (i.fechaNacimiento != null)?new Date(i.fechaNacimiento).toISOString().substring(0, 10):"",
                email: (i.email != null && i.email.length > 0)?JSON.parse(i.email):[],
                telefono: (i.telefono != null && i.telefono.length > 0)?JSON.parse(i.telefono):[],
                checked:false
            })});

        await itemsHandle({type:ITEMS_ACTIONS.START,items:tmp, fields: form,totalPages:totalPages, total: totalItems,page:page});
    }

    const initForm = async () => {
        const seleccionarlabel = Liferay.Language.get('Seleccionar');

        fetchAPIData('/silefe.provincia/all', {lang: getLanguageId()},referer).then(response => {
            const opts = [{value:"0",label:seleccionarlabel}, ...response.data.map(obj => {return {value:obj.id,label:obj.nombre}})];
            form.fields.provinciaId.options = opts;            
            form.fields.provinciaId.change = changeProvince;
        });
        fetchAPIData('/silefe.municipio/filter-by-province', {lang: getLanguageId(), page:0,province: 1},referer).then(response => {
            const opts = [{value:"0",label:seleccionarlabel}, ...response.data.map(obj => {return {value:obj.id,label:obj.nombre}})];
            form.fields.municipioId.options = opts;            
            form.fields.municipioId.change = change2;
        });
        fetchAPIData('/silefe.tiposvia/all', {lang: getLanguageId(), page:0,province: 1},referer).then(response => {
            const opts = [{value:"0",label:seleccionarlabel}, ...response.data.map(obj => {return {value:obj.id,label:obj.nombre}})];
            form.fields.tipoviaId.options = opts;            
            form.fields.tipoviaId.change = () => {console.log("cambiando el tipo de via")};
        });
        form.fields.tipoDoc.options = [{value:"0",label:seleccionarlabel},{value:"1",label:"DNI"},{value:"2",label:"NIE"},{value:"3",label:"Pasaporte"}];        
        form.fields.sexo.options = [{key: 0, value:"H",label:Liferay.Language.get('Hombre')},{key:1, value:"M",label: Liferay.Language.get('Mujer')}];

    }

    const changeProvince = (id) => {
        fetchAPIData('/silefe.municipio/filter-by-province', {lang: getLanguageId(), page:0,province: id},referer).then(response => {
            const opts = [{value:"0",label:Liferay.Language.get('Seleccionar')}, ...response.data.map(obj => {return {value:obj.id,label:obj.nombre}})];
            itemsHandle({ type: ITEMS_ACTIONS.SET_FORMOPTIONS,fieldname: 'municipioId', options: opts});
        });
    }

    const change2 = () => {
        console.log("cambiando las otroas opcioens")
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

export default Docentes;
