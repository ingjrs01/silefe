import { useModal } from '@clayui/modal';
import React, { useEffect, useReducer, useRef, useState } from 'react';
import { Liferay } from '../../common/services/liferay/liferay';
import { Errors } from '../../includes/Errors';
import { getUserId, url_referer } from '../../includes/LiferayFunctions';
import { deleteAPI, fetchAPIData, saveAPI } from '../../includes/apifunctions';
import DefaultForm from '../../includes/interface/DefaultForm';
import { FAvisos } from '../../includes/interface/FAvisos';
import { FModal } from '../../includes/interface/FModal';
import { LoadFiles } from '../../includes/interface/LoadFiles';
import { Paginator } from '../../includes/interface/Paginator';
import Table from '../../includes/interface/Table';
import { ITEMS_ACTIONS } from '../../includes/reducers/actions';
import { initialState, red_items } from '../../includes/reducers/main.reducer';
import { exportToCsv, formatPost } from '../../includes/utils';
import Menu from '../Menu';
import { form } from './Form';

const TiposVia = () => {
    const [items, itemsHandle] = useReducer(red_items, initialState);
    const [toastItems, setToastItems] = useState([]);
    const { observer, onOpenChange, open } = useModal();
    const [file, setFile] = useState();
    const isInitialized = useRef(null);
    const referer = `${url_referer}/localidades`;

    const loadCsv = () => {
        itemsHandle({ type: ITEMS_ACTIONS.LOAD });
    }

    const processCsv = () => {
        console.log(file);
        //if (file) {
        //    const reader = new FileReader();         
        //    reader.onload = async ({ target }) => {
        //        const csv = Papa.parse(target.result, { header: true,delimiter:";",delimitersToGuess:[";"] });
        //        const parsedData = csv?.data;                                
        //        let end = '/silefe.localidad/add-multiple';
        //        const sizelote = 1000;
        //        const lotes = parsedData.length / sizelote;
        //        for (let i=0;i < lotes;i++) {
        //            console.log("iterando");
        //            let inicio = i*sizelote;
        //            let ttmp = {localidades:parsedData.slice(inicio,inicio + sizelote),userId:getUserId()};
        //            batchAPI(end,ttmp,reader).then(res => {
        //                if (res.status) {
        //                    setToastItems([...toastItems, { title: Liferay.Language.get("Carga_Masiva"), type: "info", text: Liferay.Language.get('Elementos_cargados') }]);    
        //                    fetchData();
        //                }
        //                else 
        //                    setToastItems([...toastItems, { title: Liferay.Language.get("Carga_Masiva"), type: "danger", text: Liferay.Language.get("Elementos_no_cargados") }]);
        //            })
        //        };
        //    };
        //    reader.readAsText(file);
        //}
        //else {
        //    console.log("fichero no cargado")
        //}
    }

    const handleSave = async () => {
        let endpoint = '/silefe.tiposvia/save-tipo-via';
        if (items.status === 'new')
            endpoint = '/silefe.tiposvia/add-tipo-via';

        let obj = {
            id: items.item.tiposViaId,
            obj: {
                ...items.item,
                userId: getUserId(),
            },
        };
        let { status, error } = await saveAPI(endpoint, obj, referer);

        if (status) {
            setToastItems([...toastItems, { title: Liferay.Language.get('Guardar'), type: "info", text: Liferay.Language.get('Guardado_correctamente') }]);
            fetchData();
        }
        else
            setToastItems([...toastItems, { title: Liferay.Language.get('Guardar'), type: "danger", text: Errors[error] }]);
    }

    const confirmDelete = async () => {
        let s = items.arr.filter(item => item.checked).map(i => { return i.id });
        deleteAPI('/silefe.tiposvia/remove-tipos-via', s, referer).then(res => {
            if (res) {
                setToastItems([...toastItems, { title: Liferay.Language.get('Borrar'), type: "info", text: Liferay.Language.get('Borrado_ok') }]);
                fetchData();
            }
            else {
                setToastItems([...toastItems, { title: Liferay.Language.get('Borrar'), type: "danger", text: Liferay.Language.get('Borrado_no') }]);
            }
        });
    }
    const downloadFile = () => {
        fetchAPIData('/silefe.tiposvia/filter', formatPost(items,false), referer).then(({data}) => { 
            exportToCsv(data,  items.fields.table, "tiposvia.csv");    
        });
    }

    //form.downloadFunc = downloadFile;
    //form.handleSave = handleSave;
    form.loadCsv = loadCsv;

    const fetchData = async () => {
        const { data, totalPages, totalItems, page } = await fetchAPIData('/silefe.tiposvia/filter', formatPost(items), referer);
        const tmp = await data.map(i => { return ({ ...i, checked: false }) });
        await itemsHandle({ type: ITEMS_ACTIONS.LOAD_ITEMS, items: tmp, totalPages: totalPages, total: totalItems, page: page });
    }

    useEffect(() => {
        if (!isInitialized.current) {
            itemsHandle({type: ITEMS_ACTIONS.SET_FIELDS, form: form});
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
    )
}

export default TiposVia;