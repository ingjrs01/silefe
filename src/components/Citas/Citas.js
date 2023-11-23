import { useModal } from '@clayui/modal';
import React, { useEffect, useReducer, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Errors } from '../../includes/Errors';
import { getLanguageId, url_referer } from '../../includes/LiferayFunctions';
import { deleteAPI, fetchAPIData, saveAPI } from "../../includes/apifunctions";
import DefaultForm from '../../includes/interface/DefaultForm';
import { FAvisos } from '../../includes/interface/FAvisos';
import { FModal } from '../../includes/interface/FModal';
import { LoadFiles } from '../../includes/interface/LoadFiles';
import { Paginator } from "../../includes/interface/Paginator";
import Table from '../../includes/interface/Table';
import { ITEMS_ACTIONS, initialState, red_items } from '../../includes/reducers/items.reducer';
import Menu from '../Menu';
import { form as formulario } from "./Form";

const Citas = () => {
    const [items,itemsHandle]                    = useReducer(red_items,initialState );
    const [toastItems,setToastItems]             = useState([]);
    const {observer, onOpenChange, open}         = useModal();
    const [file,setFile]                         = useState();
    const isInitialized                          = useRef(null);
    const {id}                                   = useParams();
    const {state}                                = useLocation();
    const navigate                               = useNavigate();

    const referer = `${url_referer}/citas`;
    const form = formulario;

    useEffect(()=>{
		if (!isInitialized.current) {
            initForm();
            itemsHandle({type: ITEMS_ACTIONS.SET_FIELDS, form:form});
            if (id != 'undefined' && id > 0)
                loadParticipante(id);
            else
                fetchData();

			isInitialized.current = true;

		} else {
            if (id != 'undefined' && id > 0)
                loadParticipante(id);
            else {
                const timeoutId = setTimeout(fetchData, 350);
                return () => clearTimeout(timeoutId);
            }
		}
    },[items.load]);

    const initForm = () => {
        console.log("Estoy en initForm, y esto solo se carga la primera vez");
        const seleccionarlabel = Liferay.Language.get("Seleccionar");
        form.fields.originInId.options = [{value:"0",label:seleccionarlabel}, {value:"1",label:"Participante"}, {value:"2",label:"Empresa"}, {value:"3",label:"Oferta"} ];
        form.fields.originOutId.options = [{value:"0",label:seleccionarlabel}, {value:"1",label:"Participante"}, {value:"2",label:"Empresa"}, {value:"3",label:"Oferta"} ];
    
        fetchAPIData('/silefe.acciontipo/all', {lang: getLanguageId()},referer).then(response => {
            const opts = [{value:"0",label:seleccionarlabel}, ...response.data.map(obj => {return {value:obj.id,label:obj.descripcion}})];
            form.fields.tipoCitaId.options = opts;
        });

        fetchAPIData('/silefe.method/all', {lang: getLanguageId()},referer).then(response => {
            const opts = [{value:"0",label:seleccionarlabel}, ...response.data.map(obj => {return {value:obj.id,label:obj.name}})];
            form.fields.methodId.options = opts;
        });

        fetchAPIData('/silefe.participante/all', {lang: getLanguageId()},referer).then(response => {
            const opts = [ ...response.data.map(obj => {return {value:obj.participanteId,label:obj.nombre + " " + obj.apellido1 + " " + obj.apellido2}})];
            form.fields.participantInId.options = opts;
            form.fields.participantOutId.options = opts;
        });
            
     //   itemsHandle({type: ITEMS_ACTIONS.SET_FIELDS, form: form});
    }

    const loadParticipante = (id) => {
        console.log("loadParcipipante");
    }

    const loadCsv = () => {
        itemsHandle({type:ITEMS_ACTIONS.LOAD})
    }

    const processCsv = () => {
        console.log("lelele");
    }

    const handleSave = async () => {
        let endpoint = '/silefe.cita/save-cita';
        if (items.status === 'new')
            endpoint = '/silefe.cita/add-cita';

        let obj = {obj: items.item, id:items.item.citaId};
        let {data, status, error} = await saveAPI(endpoint,obj,referer);
        if (status) {
            fetchData();
            setToastItems([...toastItems, { title: Liferay.Language.get("Guardar"), type: "info", text: Liferay.Language.get('Guardado_correctamente') }]);
        }
        else
            setToastItems([...toastItems, { title: Liferay.Language.get("Guardar"), type: "danger", text: Errors[error]}]);
        
        if (state != 'undefined' && state != null && state.backUrl.length > 0)
            navigate(state.backUrl+state.ancestorId);
    }

    const confirmDelete = async () => {
        let s = items.arr.filter(item => item.checked).map( i => {return i.participanteId});

        deleteAPI('/silefe.cita/delete-citas',s,referer).then(res => {
            if (res) {
                setToastItems([...toastItems, { title: Liferay.Language.get('Borrar'), type: "info", text: Liferay.Language.get('Borrado_ok') }]);
                fetchData();
            }
            else
                setToastItems([...toastItems, { title: Liferay.Language.get('Borrar'), type: "danger", text: Liferay.Language.get('Borrado_no') }]);
        })
    }

    const fetchData = async () => {
        if (form.fields.tipoCitaId.options == 'undefined') {
            initForm();
        }

        const postdata = {
            pagination: {page: items.pagination.page, pageSize: items.pagination.pageSize},
            options: {
                filters: [
                    {  name: items.searchField, value : (items.search && typeof items.search !== 'undefined')?items.search:""},
                ],
                order : items.order,
            },
        }
        let {data,totalPages,page,totalItems} = await fetchAPIData('/silefe.cita/filter',postdata,referer);
        console.log("fetchData");
        const tmp = await data.map(i => {
            console.debug(i);
            return({
                ...i,
                //id:i.citaId,
                appointmentDate: (i.appointmentDate != null)?new Date(i.appointmentDate).toISOString().substring(0, 10):"",
                checked:false
            })});
        console.debug(tmp);
        await itemsHandle({type:ITEMS_ACTIONS.START,items:tmp, fields: form,total: totalItems, totalPages:totalPages,page:page});
    }

    const beforeEdit = () => {
        let sel = items.arr.filter(i => i.checked);
    }

    if (!items)
        return (<div>{Liferay.Language.get('Cargando')}</div>)

    return (
        <>
            <Menu
                handleSave={handleSave}
                itemsHandle={itemsHandle}
                status={items.status}
                loadCsv={loadCsv}
                beforeEdit={beforeEdit}
                items={items}
                formulario={formulario}
                onOpenChange={onOpenChange}
            />
            { (items.status === 'load') &&
            <LoadFiles
                setFile={setFile}
                processCsv={processCsv}
                itemsHandle={itemsHandle}
            />}
            {   (items.status === 'edit' || items.status === 'new') &&
                <DefaultForm
                    save={handleSave}
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
            {open && <FModal  onOpenChange={onOpenChange} confirmDelete={confirmDelete} observer={observer} /> }
        </>
    )
}

export default Citas;
