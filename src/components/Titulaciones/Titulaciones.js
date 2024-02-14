import { useModal } from '@clayui/modal';
import React, { useEffect, useReducer, useRef, useState } from 'react';
import { Liferay } from '../../common/services/liferay/liferay';
import { Errors } from '../../includes/Errors';
import { getLanguageId, getUserId, url_referer } from '../../includes/LiferayFunctions';
import { deleteAPI, fetchAPIData, saveAPI } from '../../includes/apifunctions.js';
//import { DefaultForm } from '../../includes/interface/DefaultForm';
import DefaultForm from '../../includes/interface/DefaultForm';
import { FAvisos } from '../../includes/interface/FAvisos';
import { FModal } from '../../includes/interface/FModal';
import { LoadFiles } from '../../includes/interface/LoadFiles';
import { Paginator } from "../../includes/interface/Paginator";
import Table from '../../includes/interface/Table';
import { ITEMS_ACTIONS, initialState, red_items } from '../../includes/reducers/main.reducer';
import { TITULACIONES_ACTIONS, reducerTitulacion } from '../../includes/reducers/titulaciones.reducer';
import { formatPost } from '../../includes/utils.js';
import Menu from '../Menu';
import { form } from './Form';

const Titulaciones = () => {
    const [items, itemsHandle] = useReducer(red_items, initialState);
    const [redTitulaciones, titulacionHandler] = useReducer(reducerTitulacion, {});
    const [file, setFile] = useState();
    const [toastItems, setToastItems] = useState([]);
    const { observer, onOpenChange, open } = useModal();
    const isInitialized = useRef(null);

    // TODO: Ver que demonios hacer aquí
    const beforeEdit = (val) => {
        let seleccionado = (val == undefined) ? items.arr.filter(item => item.checked)[0] : val;
        //console.log("esto es beforeEdit : "); 
        //console.debug(seleccionado);
      
        //titulacionHandler({ type: TITULACIONES_ACTIONS.SET_TITULACIONTIPO, value: seleccionado.titulacionTipoId });
        //titulacionHandler({ type: TITULACIONES_ACTIONS.SET_TITULACIONNIVEL, value: seleccionado.titulacionNivelId });
        //titulacionHandler({ type: TITULACIONES_ACTIONS.SET_TITULACIONFAMILIA, value: seleccionado.titulacionFamiliaId });
    }

    form.beforeEdit = beforeEdit;
    //form.loadCsv = loadCsv
    //form.beforeEdit = downloadFile;

    const referer = `${url_referer}/titulaciones`;

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
                titulacionFamiliaId: redTitulaciones.titulacion.titulacionFamiliaId
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
        //if (redTitulaciones.tipos == undefined || redTitulaciones.tipos.length == 0)
        //    queryTitulaciones();

        const { data, error, totalPages, totalItems, page } = await fetchAPIData('/silefe.titulacion/filter', formatPost(items), referer);

        if (error == 1) {
            setToastItems([...toastItems, { title: Liferay.Language.get("Cargando"), type: "danger", text: Liferay.Language.get("Pagina_no_existente") }]);
        }
        const tmp = await data.map(i => (
            {
                ...i,
                id: i.titulacionId,
                checked: false
            })
        );
        await itemsHandle({ type: ITEMS_ACTIONS.LOAD_ITEMS, items: tmp,totalPages: totalPages, total: totalItems, page: page });
    }

    const initForm = () => {
        console.log("cdargando el formulario");

        itemsHandle({type: ITEMS_ACTIONS.SET_FIELDS, form: form});
    }

    //const initForm = () => {
    //    const lang = getLanguageId();
    //    let postdata = {
    //        descripcion: ""
    //    };
    //    fetchAPIData('/silefe.titulaciontipo/all', postdata, referer).then(response => {
    //        const l = response.data.map(obj => ({ ...obj, value: obj.id, label: obj.descripcion[lang] }) );
    //        form.fields.titulacionTipoId.options = l;
    //        form.fields.titulacionTipoId.change = cambiaTitulacionTipo;
    //    });
    //    fetchAPIData('/silefe.titulacionnivel/all', postdata, referer).then(response => {
    //        form.fields.titulacionNivelId.change = cambiaTitulacionNivel;
    //    });
    //    fetchAPIData('/silefe.titulacionfam/all', postdata, referer).then(response => {
    //        form.fields.titulacionFamiliaId.change = cambiaTitulacionFamilia;
    //    });
    //    itemsHandle({type: ITEMS_ACTIONS.SET_FIELDS, form: form});
    //}

    const queryTitulaciones = () => {
        console.log("Cargando los dados de reducer desde titulaciones");
        titulacionHandler({ type: TITULACIONES_ACTIONS.START });
        const lang = getLanguageId();

        fetchAPIData('/silefe.titulaciontipo/all', { descripcion: "" }, referer).then(response => {
            const opts = response.data.map(i => ({...i, value: i.id, label: i.descripcion[lang], descripcion: i.descripcion[lang]}));
            form.fields.titulacionTipoId.options = opts;
            titulacionHandler({ type: TITULACIONES_ACTIONS.TIPOS, tipos: opts });
        });

        fetchAPIData('/silefe.titulacionnivel/all', { descripcion: ""}, referer).then(response => {
            const opts = response.data.map(i => ({...i, value: i.id, label: i.descripcion[lang], descripcion: i.descripcion[lang]}));
            form.fields.titulacionNivelId.options = opts; 
            titulacionHandler({ type: TITULACIONES_ACTIONS.NIVEL, nivel: opts });
        });

        fetchAPIData('/silefe.titulacionfam/all', { descripcion: "" }, referer).then(response => {
            const opts = response.data.map(i => ({...i, value: i.id, label: i.descripcion[lang], descripcion: i.descripcion[lang]}));
            form.fields.titulacionFamiliaId.options = opts;
            titulacionHandler({ type: TITULACIONES_ACTIONS.FAMILIA, familias: opts });
        });

        fetchAPIData('/silefe.titulacion/all', { descripcion: "" }, referer).then(response => {
            const opts = response.data.map(i => ({...i, value: i.id, label: i.descripcion[lang], descripcion: i.descripcion[lang]}));
            titulacionHandler({ type: TITULACIONES_ACTIONS.TITULACION, titulaciones: opts });
        });
    }

    useEffect(()=>{
        if (items.item.titulacionTipoId !== undefined && items.item.titulacionTipoId > 0) {
            const opts  = redTitulaciones.niveles.filter(nivel => nivel.titulacionTipoId == items.item.titulacionTipoId).map(i => ({value:i.id, label: i.label}));
            itemsHandle({type:ITEMS_ACTIONS.SET_FORMOPTIONS, fieldname: 'titulacionNivelId',  options: opts});
        }
    }, [items.item.titulacionTipoId]);

    useEffect(()=>{
        if (items.item.titulacionNivelId !== undefined && items.item.titulacionNivelId > 0) {
            const opts  = redTitulaciones.familias.filter(familia => familia.titulacionNivelId == items.item.titulacionNivelId).map(i => ({value:i.id, label: i.label}));
            itemsHandle({type:ITEMS_ACTIONS.SET_FORMOPTIONS, fieldname: 'titulacionFamiliaId',  options: opts});
        }
    }, [items.item.titulacionNivelId]);

    useEffect(() => {
        if (!isInitialized.current) {
            //initForm();
            queryTitulaciones();
            itemsHandle({type: ITEMS_ACTIONS.SET_FIELDS, form: form}); // TODO: esto seguramente lo tenemos que quitar
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