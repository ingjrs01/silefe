import React, { useEffect, useReducer, useRef, useState } from "react";
import DefaultForm from '../../includes/interface/DefaultForm';
import Menu from '../Menu';
import Table from '../../includes/interface/Table';
import { useModal } from '@clayui/modal';
import { getUserId, getLanguageId, url_referer } from '../../includes/LiferayFunctions';
import { red_items, ITEMS_ACTIONS, initialState } from '../../includes/reducers/items.reducer';
import Papa from "papaparse";
import { batchAPI, deleteAPI, fetchAPIData, saveAPI, fetchAPIRow } from "../../includes/apifunctions";
import { LoadFiles } from '../../includes/interface/LoadFiles'
import { FAvisos } from '../../includes/interface/FAvisos'
import { FModal } from '../../includes/interface/FModal';
import { Errors } from '../../includes/Errors';
import { form as formulario } from "./Form";
import { Paginator } from "../../includes/interface/Paginator";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const Lugares = () => {
    const [items, itemsHandle]             = useReducer(red_items,initialState);
    const [toastItems, setToastItems]      = useState([]);
    const { observer, onOpenChange, open } = useModal();
    const [file, setFile]                  = useState();
    const isInitialized                    = useRef(null);
    const { id }                           = useParams();
    const { state }                        = useLocation();
    const navigate                         = useNavigate();

    const referer = `${url_referer}/lugares`;
    const form = formulario;

    console.log("Estoy en lugares");

    const fetchData = async () => {
        beforeEdit();
        const postdata = {
            pagination: {page: items.pagination.page, pageSize: items.pagination.pageSize},
            options: {
                filters: [
                    {name: items.searchField, value: (items.nombre && typeof items.search !== 'undefined') ? items.nombre : ""},
                ],
                order: items.order
            },
        }
        let { data, totalPages, totalItems, page } = await fetchAPIData('/silefe.lugar/filter', postdata, referer);
        const tmp = await data.map(i => ({...i,checked: false}));
        await itemsHandle({ type: ITEMS_ACTIONS.START, items: tmp, fields: form, totalPages: totalPages, total: toastItems, page: page });
    }

    const handleSave = () => {
        let endpoint = '/silefe.lugar/save-lugar';
        if (items.status === 'new')
            endpoint = '/silefe.lugar/add-lugar';

        let obj = {id: items.item.id, obj: items.item };
        
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

    const handleDelete = () => {
        console.log("delete");
    }

    const beforeEdit = (id) => { 
        console.log("beforeEdit");


        //fetchAPIData('/silefe.colectivo/all', {lang: getLanguageId()},referer).then(response => {
            //    const opts = [{value:"0",label:seleccionarlabel}, ...response.data.map(obj => {return {value:obj.id,label:obj.descripcion}})];
            //    form.fields.situacionLaboral.options = opts;
            //});            
            
    }
        
    const initForm = () => {
        const seleccionarlabel = Liferay.Language.get('Seleccionar');
        form.fields.paisId.options = [{value:"0", label: seleccionarlabel}, {value:"1", label: "España"}];
        form.fields.provinciaId.options = [{value:"0", label: seleccionarlabel}, {value:"1", label: "Pontevedra"}];
        form.fields.municipioId.options = [{value:"0", label: seleccionarlabel}, {value:"1", label: "Pontevedra"}];
        form.fields.tipoViaId.options = [{value:"0", label: seleccionarlabel}, {value:"1", label: "Calle"}];
    }

    const loadCsv = () => {
        console.log("loadCsv");
    }

    const notify = () => {
        console.log("notify");
    }

    const loadItem = (id) => {
        beforeEdit(id);
        fetchAPIRow('/silefe.lugar/get',{id:id},referer).then (r => {
            //const tmp = {
            //    ...r,
            //    data: {
            //        ...r.data,                    
            //    }
            //}
            itemsHandle({type:ITEMS_ACTIONS.EDIT_ITEM,item:r});
        }) ;
    }

    useEffect(() => {
        //initCentrosForm();
        initForm();
        if (!isInitialized.current) {
            itemsHandle({type: ITEMS_ACTIONS.SET_FIELDS, form: form});
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

    if (!items)
        return (<div>{Liferay.Language.get('Cargando')}</div>)

    return (
        <>
            <Menu
                handleSave={handleSave}
                handleDelete={handleDelete}
                itemsHandle={itemsHandle}
                status={items.status}
                loadCsv={loadCsv}
                beforeEdit={beforeEdit}
                items={items}
                formulario={formulario}
            />
            {(items.status === 'load') &&
                <LoadFiles
                    setFile={setFile}
                    processCsv={processCsv}
                    itemsHandle={itemsHandle}
                />}
            {(items.status === 'edit' || items.status === 'new') &&
                <DefaultForm
                    save={handleSave}
                    itemsHandle={itemsHandle}
                    items={items}
                    notify={notify}
                />
            }
            {(items.status === 'list') &&
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
            {open && <FModal onOpenChange={onOpenChange} confirmDelete={confirmDelete} observer={observer} />}
        </>
    )
}

export default Lugares;
