import { useModal } from '@clayui/modal';
import React, { useEffect, useReducer, useRef, useState } from 'react';
import { Liferay } from '../../common/services/liferay/liferay';
import { Errors } from '../../includes/Errors';
import { getLanguageId, getUserId, url_referer } from '../../includes/LiferayFunctions';
import { deleteAPI, fetchAPIData, saveAPI } from '../../includes/apifunctions.js';
import DefaultForm from '../../includes/interface/DefaultForm';
import { FAvisos } from '../../includes/interface/FAvisos';
import { FModal } from '../../includes/interface/FModal';
import { LoadFiles } from '../../includes/interface/LoadFiles';
import { Paginator } from "../../includes/interface/Paginator";
import Table from '../../includes/interface/Table';
import { ITEMS_ACTIONS } from "../../includes/reducers/actions";
import { initialState, red_items } from '../../includes/reducers/main.reducer';
import { formatPost } from '../../includes/utils.js';
import Menu from '../Menu';
import { form } from './Form';

const Titulaciones = () => {
    const [items, itemsHandle] = useReducer(red_items, initialState);
    const [file, setFile] = useState();
    const [toastItems, setToastItems] = useState([]);
    const { observer, onOpenChange, open } = useModal();
    const isInitialized = useRef(null);
    const referer = `${url_referer}/titulaciones`;

    // TODO: Ver que demonios hacer aquí
    const beforeEdit = (val) => {
        let seleccionado = (val === undefined) ? items.arr.filter(item => item.checked)[0] : val;
        
        console.log("esto es beforeEdit : "); 
        console.debug(seleccionado);
        //debugger;
        itemsHandle({type: ITEMS_ACTIONS.SET, fieldname: "titulacionTipoId", value: seleccionado.titulacionTipoId});

        //console.debug(seleccionado);     
        console.log("fin de edit");
    }

    form.beforeEdit = beforeEdit;
    //form.loadCsv = loadCsv
    //form.beforeEdit = downloadFile;

    const loadCsv = () => {
        itemsHandle({ type: ITEMS_ACTIONS.LOAD })
    }

    const processCsv = () => {
        console.log("processCsv");
        //if (file) {
        //    const reader = new FileReader();
        // 
        //    reader.onload = async ({ target }) => {
        //        const csv = Papa.parse(target.result, { header: true,delimiter:";",delimitersToGuess:[";"] });
        //        const parsedData = csv?.data;                                
        //        let end = '/silefe.titulacion/add-multiple';
        //        let ttmp = {titulaciones:parsedData,userId:getUserId()};
        //        let res = await batchAPI(end,ttmp,reader);
        //    };
        //    reader.readAsText(file);
        //}
        //else {
        //    console.log("fichero no cargado")
        //}
    }

    const confirmDelete = async () => {
        const endpoint = "/silefe.titulacion/remove-titulaciones";
        let s = items.arr.filter(item => item.checked).map(i => { return i.id });
        let res = await deleteAPI(endpoint, s, referer);
        if (res) {
            await setToastItems([...toastItems, { title: Liferay.Language.get("Borrar"), type: "info", text: Liferay.Language.get("Borrado_ok") }]);
            await fetchData();
        }
        else {
            await setToastItems([...toastItems, { title: Liferay.Language.get("Borrar"), type: "danger", text: Liferay.Language.get("Borrado_no") }]);
        }
    }
    const handleSave = async () => {
        let obj = {
            titulacionId: items.item.titulacionId,
            obj: {
                ...items.item,
                //titulacionFamiliaId: redTitulaciones.titulacion.titulacionFamiliaId
            },
            userId: getUserId()
        };
        let endpoint = "/silefe.titulacion/save-titulacion";
        if (items.status === 'new')
            endpoint = "/silefe.titulacion/add-titulacion";

        let { status, error } = await saveAPI(endpoint, obj, referer);
        if (status) {
            await fetchData();
            await setToastItems([...toastItems, { title: Liferay.Language.get("Guardar"), type: "info", text: Liferay.Language.get("Guardado_correctamente") }]);
        }
        else {
            await setToastItems([...toastItems, { title: Liferay.Language.get("Guardar"), type: "danger", text: Errors[error] }]);
        }
    }
    const downloadFile = () => {
        console.log("descargando");
    }

    const fetchData = async () => {
        const { data, error, totalPages, totalItems, page } = await fetchAPIData('/silefe.titulacion/filter', formatPost(items), referer);

        if (error == 1) {
            setToastItems([...toastItems, { title: Liferay.Language.get("Cargando"), type: "danger", text: Liferay.Language.get("Pagina_no_existente") }]);
        }
        const tmp = await data.map(i => ({
            ...i,
            id: i.titulacionId,
            checked: false
        }));
        await itemsHandle({ type: ITEMS_ACTIONS.LOAD_ITEMS, items: tmp,totalPages: totalPages, total: totalItems, page: page });
    }

    const queryTitulaciones = () => {
        console.log("Cargando los dados de reducer desde titulaciones");        
        const lang = getLanguageId();
        
        fetchAPIData('/silefe.titulaciontipo/all', { descripcion: "" }, referer).then(response => {
            const opts = response.data.map(i => ({...i, value: i.id, label: i.descripcion[lang], descripcion: i.descripcion[lang]}));
            form.fields.titulacionTipoId.options = opts;
        });
        
        fetchAPIData('/silefe.titulacionnivel/all', { descripcion: ""}, referer).then(response => {
            const opts = response.data.map(i => ({...i, value: i.id, label: i.descripcion[lang], descripcion: i.descripcion[lang]}));
            form.fields.titulacionNivelId.all = opts; 
        });
        
        fetchAPIData('/silefe.titulacionfam/all', { descripcion: "" }, referer).then(response => {
            const opts = response.data.map(i => ({...i, value: i.id, label: i.descripcion[lang], descripcion: i.descripcion[lang]}));
            form.fields.titulacionFamiliaId.all = opts;
        });
        
        fetchAPIData('/silefe.titulacion/all', { descripcion: "" }, referer).then(response => {
            const opts = response.data.map(i => ({...i, value: i.id, label: i.descripcion[lang], descripcion: i.descripcion[lang]}));
            //titulacionHandler({ type: TITULACIONES_ACTIONS.TITULACION, titulaciones: opts });
        });

        itemsHandle({type: ITEMS_ACTIONS.SET_FIELDS, form: form});
    }

    useEffect(() => {
        if (!isInitialized.current) {
            queryTitulaciones();
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
                        itemsHandle={itemsHandle}
                        items={items}
                    />
                </>

            }
            <FAvisos toastItems={toastItems} setToastItems={setToastItems} />

            {open && <FModal onOpenChange={onOpenChange} confirmDelete={confirmDelete} observer={observer} />}
        </>
    )
}

export default Titulaciones;