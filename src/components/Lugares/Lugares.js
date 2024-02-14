import { useModal } from '@clayui/modal';
import React, { useEffect, useReducer, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Liferay } from '../../common/services/liferay/liferay';
import { Errors } from '../../includes/Errors';
import { getLanguageId, url_referer } from '../../includes/LiferayFunctions';
import { fetchAPIData, fetchAPIRow, saveAPI } from "../../includes/apifunctions";
import DefaultForm from '../../includes/interface/DefaultForm';
import { FAvisos } from '../../includes/interface/FAvisos';
import { FModal } from '../../includes/interface/FModal';
import { LoadFiles } from '../../includes/interface/LoadFiles';
import { Paginator } from "../../includes/interface/Paginator";
import Table from '../../includes/interface/Table';
import { ITEMS_ACTIONS, initialState, red_items } from '../../includes/reducers/main.reducer';
import { formatPost } from '../../includes/utils';
import Menu from '../Menu';
import { form } from "./Form";

const Lugares = () => {
    const [items, itemsHandle] = useReducer(red_items, initialState);
    const [toastItems, setToastItems] = useState([]);
    const { observer, onOpenChange, open } = useModal();
    const [file, setFile] = useState();
    const isInitialized = useRef(null);
    const { id } = useParams();
    const { state } = useLocation();
    const navigate = useNavigate();
    const referer = `${url_referer}/lugares`;

    const handleSave = () => {
        let endpoint = '/silefe.lugar/save-lugar';
        if (items.status === 'new')
            endpoint = '/silefe.lugar/add-lugar';

        let obj = { id: items.item.id, obj: items.item };

        saveAPI(endpoint, obj, referer).then(response => {
            let { data, status, error } = response;
            if (status) {
                fetchData();
                setToastItems([...toastItems, { title: Liferay.Language.get("Guardar"), type: "info", text: Liferay.Language.get('Guardado_correctamente') }]);
            } else {
                setToastItems([...toastItems, { title: Liferay.Language.get("Guardar"), type: "danger", text: Errors[error] }]);
            }

            if (state != 'undefined' && state.backUrl.length > 0) {
                navigate(state.backUrl + state.ancestorId);
            }
        });
    }

    const loadMunicipiosProvincia = (pId) => {
        const provinciaId = pId ?? 1;
        fetchAPIData('/silefe.municipio/filter-by-province', {  page: 0, province: provinciaId }, referer).then(response => {
            const opts = [{ value: "0", label: Liferay.Language.get('Seleccionar') }, ...response.data.map(obj => { return { value: obj.id, label: obj.nombre[getLanguageId()] } })];
            itemsHandle({ type: ITEMS_ACTIONS.SET_FORMOPTIONS, fieldname: 'municipioId', options: opts });
        }).catch(error => console.error(error));
    }

    const initForm = () => {
        const seleccionarlabel = Liferay.Language.get('Seleccionar');
        form.fields.paisId.options = [{ value: "1", label: "España" }];
        fetchAPIData('/silefe.provincia/all', {  }, referer).then(response => {
            form.fields.provinciaId.options = [{ value: "0", label: seleccionarlabel }, ...response.data.map(item => ({ label: item.nombre[getLanguageId()], value: item.provinciaId }))];
        }
        ).catch(error => {
            console.log("error");
            console.error(error);
        });

        fetchAPIData('/silefe.municipio/filter-by-province', { page: 0, province: 36 }, referer).then(response => {
            const opts = [{ value: "0", label: Liferay.Language.get('Seleccionar') }, ...response.data.map(obj => { return { value: obj.id, label: obj.nombre[getLanguageId()] } })];
            form.fields.municipioId.options = opts;            
        }).catch(error => console.error(error));

        fetchAPIData('/silefe.tiposvia/all', {  }, referer).then(response => {
            form.fields.tipoViaId.options= [
                { value: "0", label: Liferay.Language.get('Seleccionar') }, 
                ...response.data.map(obj => { return { value: obj.tiposViaId, label: obj.nombre[getLanguageId()] } })];
        }).catch(error => console.error("Error"));
        itemsHandle({type: ITEMS_ACTIONS.SET_FIELDS, form: form});
    }

    const loadCsv = () => {
        console.log("loadCsv");
    }

    const loadItem = (id) => {
        fetchAPIRow('/silefe.lugar/get', { id: id }, referer).then(r => itemsHandle({ type: ITEMS_ACTIONS.EDIT_ITEM, item: r }));
    }
    const downloadFile = () => {
        console.log("downloadFile");
    }

    //form.downloadFunc = downloadFile;
    //form.handleSave = handleSave;
    form.loadCsv = loadCsv;

    useEffect(() => {
        if (items.item.provinciaId != 'undefined' && items.item.provinciaId > 0)
            loadMunicipiosProvincia(items.item.provinciaId);
    }, [items.item.provinciaId]);

    useEffect(() => {
        //initCentrosForm();
        if (!isInitialized.current) {
            initForm();
            if (id != 'undefined' && id > 0) {
                loadItem(id);
            }
            else
                fetchData();

            isInitialized.current = true;
        } else {
            if (id != 'undefined' && id > 0) {
                loadItem(id);
            }
            else {
                const timeoutId = setTimeout(fetchData, 350);
                return () => clearTimeout(timeoutId);
            }
        }
    }, [items.load]);

    const fetchData = async () => {
        const { data, totalPages, totalItems, page } = await fetchAPIData('/silefe.lugar/filter', formatPost(items), referer);
        const tmp = await data.map(i => ({ ...i, checked: false }));
        await itemsHandle({ type: ITEMS_ACTIONS.LOAD_ITEMS, items: tmp, totalPages: totalPages, total: toastItems, page: page });
    }

    const confirmDelete = async () => {
        // TODO
        //const endpoint = '/silefe.mbaja/remove-m-bajas';
        //let s = items.arr.filter(item => item.checked).map(i => { return i.id });
        //deleteAPI(endpoint, s, referer).then(res => {
        //    if (res) {
        //        setToastItems([...toastItems, { title: Liferay.Language.get('Borrar'), type: "info", text: Liferay.Language.get('Borrado_ok') }]);
        //        fetchData();
        //    }
        //    else
        //        setToastItems([...toastItems, { title: Liferay.Language.get('Borrar'), type: "dangaer", text: Liferay.Language.get('Borrado_no') }]);
        //});

    }

    const processCsv = () => {
        // TODO: este método está sin implementar
        console.log("processCSV")
    }


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
            {(items.status === 'edit' || items.status === 'new') &&
                <DefaultForm
                    handleSave={handleSave}
                    itemsHandle={itemsHandle}
                    items={items}
                />
            }
            {(items.status === 'list') &&
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

export default Lugares;
