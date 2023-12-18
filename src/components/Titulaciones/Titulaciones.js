import { useModal } from '@clayui/modal';
import React, { useEffect, useReducer, useRef, useState } from 'react';
import { Liferay } from '../../common/services/liferay/liferay';
import { Errors } from '../../includes/Errors';
import { getLanguageId, getUserId, url_referer } from '../../includes/LiferayFunctions';
import { deleteAPI, fetchAPIData, saveAPI } from '../../includes/apifunctions.js';
import { FAvisos } from '../../includes/interface/FAvisos';
import { FModal } from '../../includes/interface/FModal';
import { LoadFiles } from '../../includes/interface/LoadFiles';
import { Paginator } from "../../includes/interface/Paginator";
import Table from '../../includes/interface/Table';
import { ITEMS_ACTIONS, initialState, red_items } from '../../includes/reducers/items.reducer';
import { TITULACIONES_ACTIONS, reducerTitulacion } from '../../includes/reducers/titulaciones.reducer';
import Menu from '../Menu';
import { form } from './Form';
import { TitulacionForm } from './TitulacionForm';

const Titulaciones = () => {
    const [items, itemsHandle] = useReducer(red_items, initialState);
    const [file, setFile] = useState();
    const [toastItems, setToastItems] = useState([]);
    const { observer, onOpenChange, open } = useModal();
    const isInitialized = useRef(null);
    let opciones_nivel = [];
    let titulacionesFamiliaOptions = [];
    const [redTitulaciones, titulacionHandler] = useReducer(reducerTitulacion, {});

    const beforeEdit = (val) => {
        let seleccionado = (val == undefined) ? items.arr.filter(item => item.checked)[0] : val;
        //console.debug(items);        
        //const opt_nivel = opciones_nivel.filter(i => i.titulacionTipoId == seleccionado.titulacionTipoId).map(l => {return {value:l.titulacionNivelId,label:l.descripcion}});
        //const opt_fam   = titulacionesFamiliaOptions.filter(i => i.titulacionNivelId == seleccionado.titulacionNivelId).map(l => {return {value:l.titulacionFamiliaId,label:l.descripcion}});
        //itemsHandle({ type: ITEMS_ACTIONS.SET_FORMOPTIONS,fieldname: 'titulacionNivelId', options: opt_nivel});
        //itemsHandle({ type: ITEMS_ACTIONS.SET_FORMOPTIONS,fieldname: 'titulacionFamiliaId', options: opt_fam});

        titulacionHandler({ type: TITULACIONES_ACTIONS.SET_TITULACIONTIPO, value: seleccionado.titulacionTipoId });
        titulacionHandler({ type: TITULACIONES_ACTIONS.SET_TITULACIONNIVEL, value: seleccionado.titulacionNivelId });
        titulacionHandler({ type: TITULACIONES_ACTIONS.SET_TITULACIONFAMILIA, value: seleccionado.titulacionFamiliaId });
    }

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

    form.beforeEdit = beforeEdit;
    form.handleSave = handleSave;
    form.loadCsv = loadCsv
    form.beforeEdit = downloadFile;

    const fetchData = async () => {
        if (redTitulaciones.tipos == undefined || redTitulaciones.tipos.length == 0)
            queryTitulaciones();

        if (form.fields.titulacionTipoId.options == undefined || form.fields.titulacionTipoId.options.length == 0)
            initForm();

        const postdata = {
            pagination: { page: items.pagination.page, pageSize: items.pagination.pageSize },
            options: {
                filters: [
                    { name: items.searchField, value: (items.search && typeof items.search !== "undefined") ? items.search : "" },
                ],
                order: items.order
            },
        };

        let { data, error, totalPages, totalItems, page } = await fetchAPIData('/silefe.titulacion/filter', postdata, referer);

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
        await itemsHandle({ type: ITEMS_ACTIONS.START, items: tmp, fields: form, totalPages: totalPages, total: totalItems, page: page });
    }

    const initForm = () => {
        let postdata = {
            descripcion: "",
            lang: getLanguageId()
        };

        fetchAPIData('/silefe.titulaciontipo/all', postdata, referer).then(response => {
            const l = response.data.map(obj => { return { value: obj.id, label: obj.descripcion } })
            form.fields.titulacionTipoId.options = l;
            form.fields.titulacionTipoId.change = cambiaTitulacionTipo;
        });

        fetchAPIData('/silefe.titulacionnivel/all', postdata, referer).then(response => {
            opciones_nivel = [...response.data];
            form.fields.titulacionNivelId.change = cambiaTitulacionNivel;
        });

        fetchAPIData('/silefe.titulacionfam/all', postdata, referer).then(response => {
            titulacionesFamiliaOptions = response.data;
            form.fields.titulacionFamiliaId.change = cambiaTitulacionFamilia;
        });

        //queryTitulaciones();
    }

    const queryTitulaciones = () => {
        console.log("Cargando los dados de reducer desde titulaciones");
        titulacionHandler({ type: TITULACIONES_ACTIONS.START });
        const lang = getLanguageId();
        fetchAPIData('/silefe.titulaciontipo/all', { descripcion: "", lang: lang }, referer).then(response => {
            console.log("cargando los tipos");
            titulacionHandler({ type: TITULACIONES_ACTIONS.TIPOS, tipos: [...response.data] });
        });
        fetchAPIData('/silefe.titulacionnivel/all', { descripcion: "", lang: lang }, referer).then(response => {
            titulacionHandler({ type: TITULACIONES_ACTIONS.NIVEL, nivel: [...response.data] });
        });
        fetchAPIData('/silefe.titulacionfam/all', { descripcion: "", lang: lang }, referer).then(response => {
            titulacionHandler({ type: TITULACIONES_ACTIONS.FAMILIA, familias: [...response.data] });
        });
        fetchAPIData('/silefe.titulacion/all', { descripcion: "", lang: lang }, referer).then(response => {
            titulacionHandler({ type: TITULACIONES_ACTIONS.TITULACION, titulaciones: [...response.data] });
        });
    }


    const cambiaTitulacionTipo = (value) => {
        console.log("opciones nivel");
        console.log(opciones_nivel);
        let llll = opciones_nivel.filter(i => i.titulacionTipoId == value);
        const opt_nivel = llll.map(l => { return { value: l.titulacionNivelId, label: l.descripcion } })
        itemsHandle({ type: ITEMS_ACTIONS.SET_FORMOPTIONS, fieldname: 'titulacionNivelId', options: opt_nivel });

        const titnval = llll[0].titulacionNivelId;
        let lll2 = titulacionesFamiliaOptions.filter(i => i.titulacionNivelId == titnval).map(l => { return { value: l.titulacionFamId, label: l.descripcion } })
        itemsHandle({ type: ITEMS_ACTIONS.SET_FORMOPTIONS, fieldname: 'titulacionFamiliaId', options: lll2 });
    }

    const cambiaTitulacionNivel = (value) => {
        let tt = titulacionesFamiliaOptions.filter(i => i.titulacionNivelId == value).map(l => { return { value: l.titulacionFamId, label: l.descripcion } })
        itemsHandle({ type: ITEMS_ACTIONS.SET_FORMOPTIONS, fieldname: 'titulacionFamiliaId', options: tt });
    }

    const cambiaTitulacionFamilia = (value) => {
        console.log("no hago nada");
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
                <TitulacionForm
                    redTitulaciones={redTitulaciones}
                    titulacionHandler={titulacionHandler}
                    itemsHandle={itemsHandle}
                    items={items}
                    save={handleSave}
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