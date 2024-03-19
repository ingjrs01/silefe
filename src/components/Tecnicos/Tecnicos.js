import { useModal } from '@clayui/modal';
import React, { useEffect, useReducer, useRef, useState } from 'react';
import { Liferay } from '../../common/services/liferay/liferay';
import { Errors } from '../../includes/Errors';
import { getUserId, url_referer } from "../../includes/LiferayFunctions";
import { deleteAPI, fetchAPIData, saveAPI } from '../../includes/apifunctions.js';
import DefaultForm from '../../includes/interface/DefaultForm';
import { FAvisos } from '../../includes/interface/FAvisos';
import { FModal } from '../../includes/interface/FModal';
import { LoadFiles } from '../../includes/interface/LoadFiles';
import { Paginator } from '../../includes/interface/Paginator';
import Table from '../../includes/interface/Table';
import { ITEMS_ACTIONS } from '../../includes/reducers/actions';
import { initialState, red_items } from '../../includes/reducers/main.reducer.js';
import { formatPost } from '../../includes/utils.js';
import Menu from '../Menu';
import { form } from './Form';


const Tecnicos = () => {
    const [items, itemsHandle] = useReducer(red_items, initialState);
    const [toastItems, setToastItems] = useState([]);
    const { observer, onOpenChange, open } = useModal();
    const [file, setFile] = useState();
    const isInitialized = useRef(null);
    const referer = `${url_referer}/tecnicos`;

    const loadCsv = () => {
        itemsHandle({ type: ITEMS_ACTIONS.LOAD });
    }

    const processCsv = () => {
        //if (file) {
        //    const reader = new FileReader();
        // 
        //    reader.onload = async ({ target }) => {
        //        const csv = Papa.parse(target.result, { header: true,delimiter:";",delimitersToGuess:[";"] });
        //        const parsedData = csv?.data;                                
        //        let end = '/silefe.colectivo/add-multiple';
        //        let ttmp = {colectivos:parsedData,userId:getUserId()};
        //
        //        batchAPI(end,ttmp,referer).then(res => {
        //            if (res2.ok) {
        //                setToastItems([...toastItems, { title: Liferay.Language.get("Carga Masiva"), type: "danger", text: Liferay.Language.get('Elementos_cargados') }]);
        //                fetchData();
        //            }
        //            else {
        //                setToastItems([...toastItems, { title: Liferay.Language.get("Carga Masiva"), type: "danger", text: Liferay.Language.get("Elementos_no_cargados") }]);
        //            }                    
        //        });
        //    };
        //    reader.readAsText(file);
        //}
        //else {
        //    console.log("fichero no cargado")
        //}
    }

    const handleSave = async () => {
        const postdata = {
            tecnicoId: items.item.id,
            obj: {
                ...items.item,
                tecnicoId: items.item.id,
                userId: getUserId(),
                status: items.status,
            },
        }

        let endpoint = '/silefe.tecnico/save-tecnico';
        if (items.status === 'new')
            endpoint = '/silefe.tecnico/add-tecnico';

        let { status, error } = await saveAPI(endpoint, postdata, referer);
        if (status) {
            setToastItems([...toastItems, { title: Liferay.Language.get("Guardar"), type: "info", text: Liferay.Language.get("Guardado_correctamente") }]);
            fetchData();
        }
        else 
            setToastItems([...toastItems, { title: Liferay.Language.get("Error"), type: "danger", text: Errors[error] }]);        
    }

    const confirmDelete = async () => {
        let s = items.arr.filter(item => item.checked).map(i => { return i.colectivoId });
        const endpoint = "/silefe.colectivo/remove-colectivos";

        deleteAPI(endpoint, s, referer).then(res => {
            if (res) {
                setToastItems([...toastItems, { title: Liferay.Language.get('Borrar'), type: "info", text: Liferay.Language.get('Borrado_ok') }]);
                fetchData();
            }
            else {
                setToastItems([...toastItems, { title: Liferay.Language.get('Borrar'), type: "danger", text: Liferay.Language.get('Borrado_no') }]);
            }
        })
    }

    const downloadFile = () => {
        console.log("descargando");
    }

    //form.downloadFunc = downloadFile;
    //form.handleSave = handleSave;
    form.loadCsv = loadCsv;

    const fetchData = async () => {
        const { data, totalPages, totalItems, page } = await fetchAPIData('/silefe.tecnico/filter', formatPost(items), referer);
        const tmp = await data.map(i => { return ({ ...i,tecnicoUserId: i.id, checked: false }) });
        await itemsHandle({ type: ITEMS_ACTIONS.LOAD_ITEMS, items: tmp,totalPages: totalPages, total: totalItems, page: page });
    }

    const initForm = () => {
        const postdata = {            
            options: {
                excludes: items.arr.map(i => i.id)
            }
        }
        const url = '/silefe.tecnico/get-users';
        fetchAPIData(url, postdata, referer).then(response => {
            const opts = [{ value: "0", label: Liferay.Language.get("Nuevo") }, ...response.data.map(obj => { return { value: obj.userId, label: obj.firstName } })];
            form.fields.tecnicoUserId.options = opts;
        });
        itemsHandle({type: ITEMS_ACTIONS.SET_FIELDS, form: form});
    }

    useEffect(()=>{
        if (items !== 'undefined')
            initForm();
    },[items.arr]);

    const loadUserData = async (userId) => {
        const {data } = await fetchAPIData('/silefe.tecnico/get-user', { userId: userId }, referer);
        await itemsHandle({type: ITEMS_ACTIONS.SETCOMPLETEITEM, item: data});
    }

    useEffect(()=>{
        if (items.status !== 'undefined' && items.status === 'new') {
            form.fields.tecnicoUserId.enabled= true;
            itemsHandle({type: ITEMS_ACTIONS.SET_FIELDS, form: form});
        }
        if (items.status !== 'undefined' && items.status === 'edit') {
            form.fields.tecnicoUserId.enabled= false;
            itemsHandle({type: ITEMS_ACTIONS.SET_FIELDS, form: form});
        }
    }, [items.status]);

    useEffect(()=>{
        if (items.item.tecnicoUserId !== undefined && items.item.tecnicoUserId > 0)
            loadUserData(items.item.tecnicoUserId);
    },[items.item.tecnicoUserId]);

    useEffect(() => {
        if (!isInitialized.current) {
            //initForm();
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
                itemsHandle={itemsHandle}
                items={items}
                handleSave={handleSave}
                download={downloadFile}
                onOpenChange={onOpenChange}
            />
            {(items.status === 'load') &&
                <LoadFiles
                    setFile={setFile}
                    processCsv={processCsv}
                    itemsHandle={itemsHandle}
                />}
            {
                (items.status === 'edit' || items.status === 'new') &&
                <DefaultForm
                    handleSave={handleSave}
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
                        onOpenChange={onOpenChange}
                    />
                    <Paginator
                        items={items}
                        itemsHandle={itemsHandle}
                    />
                </>
            }
            <FAvisos toastItems={toastItems} setToastItems={setToastItems} />
            {open && <FModal onOpenChange={onOpenChange} confirmDelete={confirmDelete} observer={observer} />}
        </>
    );
}

export default Tecnicos;
