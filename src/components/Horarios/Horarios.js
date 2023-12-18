import { useModal } from '@clayui/modal';
import React, { useEffect, useReducer, useRef, useState } from "react";
import { Liferay } from '../../common/services/liferay/liferay';
import { Errors } from '../../includes/Errors';
import { getUserId, url_referer } from '../../includes/LiferayFunctions';
import { deleteAPI, fetchAPIData, saveAPI } from "../../includes/apifunctions";
import DefaultForm from '../../includes/interface/DefaultForm';
import { FAvisos } from '../../includes/interface/FAvisos';
import { FModal } from '../../includes/interface/FModal';
import { LoadFiles } from '../../includes/interface/LoadFiles';
import { Paginator } from "../../includes/interface/Paginator";
import Table from '../../includes/interface/Table';
import { ITEMS_ACTIONS, initialState, red_items } from '../../includes/reducers/items.reducer';
import Menu from '../Menu';
import { form } from './Form';

const Horarios = () => {
    const [items, itemsHandle] = useReducer(red_items, initialState);
    const [toastItems, setToastItems] = useState([]);
    const { observer, onOpenChange, open } = useModal();
    const [file, setFile] = useState();
    const isInitialized = useRef(null);
    const referrer = `${url_referer}/horarios`;

    useEffect(() => {
        if (!isInitialized.current) {
            fetchData();
            isInitialized.current = true;
        } else {
            const timeoutId = setTimeout(fetchData, 350);
            return () => clearTimeout(timeoutId);
        }
    }, [items.load]);

    const loadCsv = () => {
        itemsHandle({ type: ITEMS_ACTIONS.LOAD })
    }

    const processCsv = () => {
        //if (file) {
        //    const reader = new FileReader();         
        //    reader.onload = async ({ target }) => {
        //        const csv = Papa.parse(target.result, { header: true,delimiter:";",delimitersToGuess:[";"] });
        //        const parsedData = csv?.data;                                
        //        let end = '/silefe.horario/add-multiple';
        //        let ttmp = {horarios:parsedData,userId:Liferay.ThemeDisplay.getUserId()};
        //        batchAPI(end,ttmp,referrer).then(res => {
        //            if (res2.ok) {
        //                setToastItems([...toastItems, { title: Liferay.Language.get("Carga_Masiva"), type: "info", text: Liferay.Language.get('Elementos_cargados') }]);
        //                fetchData();
        //            }
        //            else 
        //                setToastItems([...toastItems, { title: Liferay.Language.get("Carga_Masiva"), type: "danger", text: Liferay.Language.get("Elementos_no_cargados") }]);
        //        });
        //    };
        //    reader.readAsText(file);
        //}
        //else {
        //    console.log("fichero no cargado")
        //}
        console.log("procesSave de Horarios");
    }

    const handleSave = async () => {
        const postdata = {
            horarioId: items.item.id,
            obj: {
                ...items.item,
                userId: getUserId(),
            },
        }

        let endpoint = '/silefe.horario/save-horario';
        if (items.status === 'new')
            endpoint = '/silefe.horario/add-horario';

        let { status, error } = await saveAPI(endpoint, postdata, referrer);
        if (status) {
            setToastItems([...toastItems, { title: Liferay.Language.get("Guardar"), type: "info", text: Liferay.Language.get('Guardado_correctamente') }]);
            fetchData();
        }
        else
            setToastItems([...toastItems, { title: Liferay.Language.get("Guardar"), type: "danger", text: Errors[error] }]);
    }

    const confirmDelete = async () => {
        const endpoint = '/silefe.horario/remove-horarios';
        let s = items.arr.filter(item => item.checked).map(i => { return i.id });

        deleteAPI(endpoint, s, referrer).then(res => {
            if (res) {
                setToastItems([...toastItems, { title: Liferay.Language.get("Borrar"), type: "info", text: Liferay.Language.get('Borrado_ok') }]);
                fetchData();
            }
            else
                setToastItems([...toastItems, { title: Liferay.Language.get("Borrar"), type: "danger", text: Liferay.Language.get('Borrado_no') }]);
        });
    }

    const downloadFile = () => {
        console.log("lalala");
    }

    //form.downloadFunc = downloadFile;
    //form.handleSave = handleSave;
    form.loadCsv = loadCsv;

    const fetchData = async () => {
        const postdata = {
            pagination: { page: items.pagination.page, pageSize: items.pagination.pageSize },
            options: {
                filters: [
                    { name: "descripcion", value: (items.search && typeof items.search !== 'undefined') ? items.search : "" },
                ],
                order: items.order,
            }
        }
        let { data, totalPages, totalItems, page } = await fetchAPIData('/silefe.horario/filter', postdata, referrer);
        let tmp = await data.map(i => { return ({ ...i, id: i.horarioId, checked: false }) });
        await itemsHandle({ type: ITEMS_ACTIONS.START, items: tmp, fields: form, totalPages: totalPages, total: totalItems, page: page });
    }

    if (!items)
        return (<div>{Liferay.Language.get("Cargando")}</div>)

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
                items.status === 'list' &&
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

export default Horarios;