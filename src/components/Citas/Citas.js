import { useModal } from '@clayui/modal';
import React, { useEffect, useReducer, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Liferay } from '../../common/services/liferay/liferay';
import { Errors } from '../../includes/Errors';
import { getLanguageId, url_referer } from '../../includes/LiferayFunctions';
import { deleteAPI, fetchAPIData, saveAPI } from "../../includes/apifunctions";
import DefaultForm from '../../includes/interface/DefaultForm';
import { FAvisos } from '../../includes/interface/FAvisos';
import { FModal } from '../../includes/interface/FModal';
import { LoadFiles } from '../../includes/interface/LoadFiles';
import { Paginator } from "../../includes/interface/Paginator";
import Table from '../../includes/interface/Table';
import { ITEMS_ACTIONS, initialState, red_items } from '../../includes/reducers/main.reducer';
import { formatDefaultEmail, formatDefaultPhone, formatPost, toDate, toHours } from '../../includes/utils';
import Menu from '../Menu';
import { form } from "./Form";

const Citas = () => {
    const [items, itemsHandle] = useReducer(red_items, initialState);
    const [toastItems, setToastItems] = useState([]);
    const { observer, onOpenChange, open } = useModal();
    const [file, setFile] = useState();
    const isInitialized = useRef(null);
    const { id } = useParams();
    const { state } = useLocation();
    const navigate = useNavigate();
    const referer = `${url_referer}/citas`;

    useEffect(() => {
        if (!isInitialized.current) {
            initForm();
            //itemsHandle({ type: ITEMS_ACTIONS.SET_FIELDS, form: form });  // lo estoy haciendo dentro del initForm
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
    }, [items.load]);

    const loadParticipantes = (value, field) => {
        let fieldname = 'participantInId';
        if (field == 'originOutId')
            fieldname = 'participantOutId';

        switch (value) {
            case '1':
                fetchAPIData('/silefe.participante/all', { lang: getLanguageId() }, referer).then(response => {
                    const opts = [...response.data.map(obj => { return { value: obj.participanteId, label: obj.nombre + " " + obj.apellido1 + " " + obj.apellido2 } })];
                    itemsHandle({ type: ITEMS_ACTIONS.SET_FORMOPTIONS, fieldname: fieldname, options: opts });
                });
                break;
            case '2':
                fetchAPIData('/silefe.empresa/all', { lang: getLanguageId() }, referer).then(response => {
                    const opts = [...response.data.map(obj => { return { value: obj.empresaId, label: obj.razonSocial } })];
                    itemsHandle({ type: ITEMS_ACTIONS.SET_FORMOPTIONS, fieldname: fieldname, options: opts });
                });
                break;
            case '3':
                fetchAPIData('/silefe.oferta/all', { lang: getLanguageId() }, referer).then(response => {
                    const opts = [...response.data.map(obj => {
                        const fecha = toDate(obj.fechaIncorporacion);
                        return ({
                            value: obj.ofertaId,
                            label: obj.titulo.substring(0, 12) + " " + obj.razonSocial + " " + fecha,
                        })
                    })];
                    itemsHandle({ type: ITEMS_ACTIONS.SET_FORMOPTIONS, fieldname: fieldname, options: opts });
                });
                break;
        }
    }

    const beforeEdit = (itemSel) => {
        loadParticipantes(itemSel.originInId, 'originInId');
        loadParticipantes(itemSel.originOutId, 'originOutId');
    }

    const initForm = () => {
        //const jsonS = localStorage.getItem("citasForm");
        //if (jsonS !== null) {
        //    const f = JSON.parse(jsonS);
        //    itemsHandle({ type: ITEMS_ACTIONS.SET_FIELDS, form: f });
        //    return;
        //}
        const lang = getLanguageId();
        form.beforeEdit = beforeEdit;
        const seleccionarlabel = Liferay.Language.get("Seleccionar");
        form.fields.originInId.options = [{ value: "0", label: seleccionarlabel }, { value: "1", label: "Participante" }, { value: "2", label: "Empresa" }, { value: "3", label: "Oferta" }];
        form.fields.originOutId.options = [{ value: "0", label: seleccionarlabel }, { value: "1", label: "Participante" }, { value: "2", label: "Empresa" }, { value: "3", label: "Oferta" }];
        form.fields.originInId.change = loadParticipantes;
        form.fields.originOutId.change = loadParticipantes;
        
        fetchAPIData('/silefe.acciontipo/all', {  }, referer).then(response => {
            const opts = [{ value: "0", label: seleccionarlabel }, ...response.data.map(obj => { return { value: obj.id, label: obj.descripcion[lang] } })];
            form.fields.tipoCitaId.options = opts;
        });
        
        fetchAPIData('/silefe.method/all', { }, referer).then(response => {
            const opts = [{ value: "0", label: seleccionarlabel }, ...response.data.map(obj => { return { value: obj.id, label: obj.name[lang] } })];
            form.fields.methodId.options = opts;
        });
        
        fetchAPIData('/silefe.participante/all', { }, referer).then(response => {
            const opts = [...response.data.map(obj => { return { value: obj.participanteId, label: obj.nombre + " " + obj.apellido1 + " " + obj.apellido2 } })];
            form.fields.participantInId.options = opts;
            form.fields.participantOutId.options = opts;
        });
        
        fetchAPIData('/silefe.tecnico/all', { }, referer).then(response => {
            const opts = [...response.data.map(obj => { return { value: obj.tecnicoId, label: obj.firstName + " " + obj.middleName + " " + obj.lastName } })];
            form.fields.tecnicoInId.options = opts;
            form.fields.tecnicoOutId.options = opts;
        });

        itemsHandle({ type: ITEMS_ACTIONS.SET_FIELDS, form: form });
        //localStorage.setItem("citasForm", JSON.stringify(form));
    }

    const loadParticipante = (id) => {
        console.log("loadParcipipante, esto es una fncion vacía");
    }

    const loadCsv = () => {
        itemsHandle({ type: ITEMS_ACTIONS.LOAD })
    }

    const processCsv = () => {
        console.log("lelele");
    }

    const handleSave = async () => {
        let endpoint = '/silefe.cita/save-cita';
        if (items.status === 'new')
            endpoint = '/silefe.cita/add-cita';

        let obj = { obj: items.item, id: items.item.citaId };
        let { data, status, error } = await saveAPI(endpoint, obj, referer);
        if (status) {
            fetchData();
            setToastItems([...toastItems, { title: Liferay.Language.get("Guardar"), type: "info", text: Liferay.Language.get('Guardado_correctamente') }]);
        }
        else
            setToastItems([...toastItems, { title: Liferay.Language.get("Guardar"), type: "danger", text: Errors[error] }]);

        if (state != 'undefined' && state != null && state.backUrl.length > 0)
            navigate(state.backUrl + state.ancestorId);
    }

    const confirmDelete = async () => {
        let s = items.arr.filter(item => item.checked).map(i => { return i.participanteId });

        deleteAPI('/silefe.cita/delete-citas', s, referer).then(res => {
            if (res) {
                setToastItems([...toastItems, { title: Liferay.Language.get('Borrar'), type: "info", text: Liferay.Language.get('Borrado_ok') }]);
                fetchData();
            }
            else
                setToastItems([...toastItems, { title: Liferay.Language.get('Borrar'), type: "danger", text: Liferay.Language.get('Borrado_no') }]);
        })
    }

    const downloadFile = () => {
        console.log("download");

        //const worksheet = XLSX.utils.json_to_sheet(items.arr);
        //const workbook = XLSX.utils.book_new();
        //XLSX.utils.book_append_sheet(workbook, worksheet, "Dates");
        //console.log("descarga finalizada");
    }

    //form.beforeEdit = beforeEdit;
    form.loadCsv = loadCsv;
    form.downloadFunc = downloadFile;

    const fetchData = async () => {       
        let { data, totalPages, page, totalItems } = await fetchAPIData('/silefe.cita/filter', formatPost(items), referer);
        const tmp = await data.map(i => {
            return ({
                ...i,
                appointmentDate: toDate(i.appointmentDate),
                appointmentHour: toHours(i.appointmentHour),
                telefonoIn: formatDefaultPhone(i.participantInTelefono), 
                emailIn: formatDefaultEmail(i.participantInEmail),
                checked: false
            })
        });
        await itemsHandle({ type: ITEMS_ACTIONS.LOAD_ITEMS, items: tmp, total: totalItems, totalPages: totalPages, page: page });
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

export default Citas;
