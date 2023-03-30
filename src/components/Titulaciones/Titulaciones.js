import React, { useState, useEffect, useReducer, useRef } from 'react';
import Table from '../../includes/interface/Table';
import DefaultForm from '../../includes/interface/DefaultForm';
import Menu from '../Menu';
import { useModal } from '@clayui/modal';
import { getUserId } from '../../includes/LiferayFunctions';
import { ITEMS_ACTIONS, red_items } from '../../includes/reducers/items.reducer';
import {batchAPI, deleteAPI, fetchAPIData, saveAPI} from '../../includes/apifunctions.js';
import {LoadFiles} from '../../includes/interface/LoadFiles'
import {FAvisos} from '../../includes/interface/FAvisos'
import { FModal } from '../../includes/interface/FModal';
import { Errors } from '../../includes/Errors';
import { getLanguageId } from '../../includes/LiferayFunctions';
import {form as f2} from './Form';
import Papa from "papaparse";

const Titulaciones = () => {
    const [items, itemsHandle]             = useReducer(red_items, { arr: [], item: { id: 0, checked: false }, checkall: false, showform: false,page:0, load: 0 });
    const [file,setFile]                   = useState();
    const [toastItems, setToastItems]      = useState([]);
    const { observer, onOpenChange, open } = useModal();
    const isInitialized = useRef();    
    //const [titulacionesNivelOptions ,setTitulacionesNivelOptions] = useState([]);
    let opciones_nivel = [];
    let titulacionesFamiliaOptions = [];
    
    let form = f2;
    const referer = "http://localhost:8080/titulaciones";

    const loadCsv = () => {
        itemsHandle({type:ITEMS_ACTIONS.LOAD})
    }

    const processCsv = () => {
        if (file) {
            const reader = new FileReader();
         
            reader.onload = async ({ target }) => {
                const csv = Papa.parse(target.result, { header: true,delimiter:";",delimitersToGuess:[";"] });
                const parsedData = csv?.data;                                
                let end = '/silefe.titulacion/add-multiple';
                let ttmp = {titulaciones:parsedData,userId:getUserId()};
                let res = await batchAPI(end,ttmp,reader);
            };
            reader.readAsText(file);
        }
        else {
            console.log("fichero no cargado")
        }
    }

    const confirmDelete = async () => {
        const endpoint = "/silefe.titulacion/remove-titulaciones";
        let s = items.arr.filter(item => item.checked).map(i => { return i.id });
        let res = await deleteAPI(endpoint,s,referer);
        if (res) {
            await setToastItems([...toastItems, { title: Liferay.Language.get("Borrar"), type: "info", text: Liferay.Language.get("Borrado_ok") }]);
            await fetchData();
        }
        else {
            await setToastItems([...toastItems, { title: Liferay.Language.get("Borrar"), type: "danger", text: Liferay.Language.get("Borrado_no") }]);
        }
    }

    const handleDelete = () => {
        if (items.arr.filter(item => item.checked).length > 0)
            onOpenChange(true);
    }

    const fetchData = async () => {
        if (form.fields.titulacionTipoId.options == undefined || form.fields.titulacionTipoId.options.length == 0)
            initForm();

        const postdata = {
            page: items.page,
            descripcion: ( items.search && typeof items.search !== "undefined")?items.search:""
        };

        let {data, error,totalPages, page} = await fetchAPIData('/silefe.titulacion/filter', postdata,referer);
        
        if (error == 1) {
            setToastItems([...toastItems, { title: Liferay.Language.get("Cargando"), type: "danger", text: Liferay.Language.get("Pagina_no_existente") }]);
        }
        
        const tmp = await data.map(i => {
            let tFamilia = "";
            let nivelId = 0;
            let tipoId = 0;
            let filtered = titulacionesFamiliaOptions.filter(o => o.titulacionFamId == i.titulacionFamiliaId);
            if (filtered.length > 0) {
                tFamilia = filtered[0].descripcion ;
                nivelId = filtered[0].titulacionNivelId;                
            } 
            if (nivelId != 0) {
                tipoId = opciones_nivel.filter(t => t.titulacionNivelId == nivelId)[0].titulacionTipoId;
            }
            return ({ ...i, id: i.titulacionId,titulacionFamiliaDescripcion: tFamilia, titulacionNivelId: nivelId,titulacionTipoId:tipoId,checked: false })
        });

        await itemsHandle({ type: ITEMS_ACTIONS.START, items: tmp,fields: form, totalPages: totalPages,page:page });
    }

    const initForm = () => {
        let postdata = {
            descripcion: "",
            lang: getLanguageId()
        };
    
        fetchAPIData('/silefe.titulaciontipo/all', postdata,referer).then(response => {
            const l = response.data.map(obj => {return {value:obj.id,label:obj.descripcion}})
            form.fields.titulacionTipoId.options = l;    
            form.fields.titulacionTipoId.change = cambiaTitulacionTipo;    
        });

        fetchAPIData('/silefe.titulacionnivel/all', postdata,referer).then( response => {
            opciones_nivel = [...response.data];
            form.fields.titulacionNivelId.change = cambiaTitulacionNivel;
        });

        fetchAPIData('/silefe.titulacionfam/all', postdata,referer).then(response => {
            titulacionesFamiliaOptions = response.data;
            form.fields.titulacionFamiliaId.change = cambiaTitulacionFamilia;
        })

    }

    const cambiaTitulacionTipo = (value) => {
        console.log("opciones nivel");
        console.log(opciones_nivel);
        let llll = opciones_nivel.filter(i => i.titulacionTipoId == value);
        const opt_nivel = llll.map(l => {return {value:l.titulacionNivelId,label:l.descripcion}})
        itemsHandle({ type: ITEMS_ACTIONS.SET_FORMOPTIONS,fieldname: 'titulacionNivelId', options: opt_nivel});
        
        const titnval = llll[0].titulacionNivelId;
        let lll2 = titulacionesFamiliaOptions.filter(i => i.titulacionNivelId == titnval).map(l => {return {value:l.titulacionFamId,label:l.descripcion}})
        itemsHandle({ type: ITEMS_ACTIONS.SET_FORMOPTIONS,fieldname: 'titulacionFamiliaId', options: lll2});
    }

    const cambiaTitulacionNivel = (value) => {
        let tt = titulacionesFamiliaOptions.filter(i => i.titulacionNivelId == value).map(l => {return {value:l.titulacionFamId,label:l.descripcion}})
        itemsHandle({ type: ITEMS_ACTIONS.SET_FORMOPTIONS,fieldname: 'titulacionFamiliaId', options: tt});
    }

    const cambiaTitulacionFamilia = (value) => {
        console.log("no hago nada");
    }

    // Esto se llama al editar un elemento
    const beforeEdit = (val) => {
        //await console.log("loadSelects esperando");
        //await console.log(opciones_nivel);
        //await console.log(titulacionesFamiliaOptions);
        //await console.log("todo cargado");
        let seleccionado = items.arr.filter(item => item.checked)[0];
        //cambiaTitulacionTipo(seleccionado.titulacionTipoId);
        console.debug(items);        
        const opt_nivel = opciones_nivel.filter(i => i.titulacionTipoId == seleccionado.titulacionTipoId).map(l => {return {value:l.titulacionNivelId,label:l.descripcion}});
        const opt_fam   = titulacionesFamiliaOptions.filter(i => i.titulacionNivelId == seleccionado.titulacionNivelId).map(l => {return {value:l.titulacionFamiliaId,label:l.descripcion}});
        itemsHandle({ type: ITEMS_ACTIONS.SET_FORMOPTIONS,fieldname: 'titulacionNivelId', options: opt_nivel});
        itemsHandle({ type: ITEMS_ACTIONS.SET_FORMOPTIONS,fieldname: 'titulacionFamiliaId', options: opt_fam});
    }

    const handleSave = async () => {
        const postdata = {
            titulacionId: items.item.id,
            codigo: items.item.codigo,
            descripcion: items.item.descripcion,
            titulacionFamiliaId: items.item.titulacionFamiliaId,
            userId: getUserId()
        }

        let endpoint = "/silefe.titulacion/save-titulacion";
        if (items.status === 'new')
            endpoint = "/silefe.titulacion/add-titulacion";
        
        let {status,error} = await saveAPI(endpoint,postdata,referer);
        if (status) {
            await fetchData();
            await setToastItems([...toastItems, { title: Liferay.Language.get("Guardar"), type: "info", text: Liferay.Language.get("Guardado_correctamente") }]);
        }
        else {
            await setToastItems([...toastItems, { title: Liferay.Language.get("Guardar"), type: "danger", text: Errors[error] }]);
        }
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
                beforeEdit={beforeEdit}
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
                    items={items} 
                    itemsHandle={itemsHandle} 
                />
            }            
            <FAvisos toastItems={toastItems} setToastItems={setToastItems} />

            {open && <FModal  onOpenChange={onOpenChange} confirmDelete={confirmDelete} observer={observer} /> }
        </>
    )
}

export default Titulaciones;