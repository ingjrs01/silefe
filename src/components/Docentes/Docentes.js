import { useModal } from '@clayui/modal';
import React, { useEffect, useReducer, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Liferay } from '../../common/services/liferay/liferay';
import { Errors } from '../../includes/Errors';
import { getLanguageId, getUserId, url_referer } from '../../includes/LiferayFunctions';
import { deleteAPI, fetchAPIData, fetchAPIRow, saveAPI } from "../../includes/apifunctions";
import { FAvisos } from '../../includes/interface/FAvisos';
import { FHistoryEntity } from '../../includes/interface/FHistoryEntity';
import { FModal } from '../../includes/interface/FModal';
import { LoadFiles } from '../../includes/interface/LoadFiles';
import { Paginator } from "../../includes/interface/Paginator";
import Table from '../../includes/interface/Table';
import TabsForm from "../../includes/interface/TabsForm";
import { HISTORICO_ACTIONS, initialState as iniHis, reducerHistorico } from '../../includes/reducers/historico.reducer';
import { ITEMS_ACTIONS, initialState, red_items } from '../../includes/reducers/main.reducer';
import { formatEmails, formatPhones, formatPost, toDate, toHours } from '../../includes/utils';
import Menu from '../Menu';
import { form } from './Form';

const Docentes = ({user}) => {
    const [items, itemsHandle] = useReducer(red_items, initialState);
    const [historico, historicoHandle] = useReducer (reducerHistorico, iniHis);
    const [toastItems, setToastItems] = useState([]);
    const { observer, onOpenChange, open } = useModal();
    const [file, setFile] = useState();
    const isInitialized = useRef(null);
    const { id } = useParams();
    const { state } = useLocation();
    const navigate = useNavigate();
    const referer = `${url_referer}/docentes`;

    const loadCsv = () => {
        itemsHandle({ type: ITEMS_ACTIONS.LOAD });
    }

    const loadHistory = (docenteId) => {
        const prequest = {
            docenteId: docenteId,
            pagination: {
                page: historico.pagination.page,
                pageSize: historico.pagination.pageSize,
            },
            options: {}
        }
        fetchAPIData('/silefe.docentehistory/get-docente-history-by-docente-id', prequest, referer).then(response => {
            const respuesta = response.data.map(item => ({...item,
                date: toDate(item.date) + " " + toHours(item.date),
            }));
            historicoHandle({type: HISTORICO_ACTIONS.LOAD, items: respuesta, total: response.total, totalPages: response.totalPages});
        });
    }

    const beforeEdit = (id) => {
        let docenteId = 0;
        if (typeof (id) == 'int')
            docenteId = id;
        else
            docenteId = id.id;

        loadHistory(docenteId);
    }


    const processCsv = () => {
        //if (file) {
        //    const reader = new FileReader();
        //    reader.onload = async ({ target }) => {
        //        const csv = Papa.parse(target.result, { header: true, delimiter: ";", delimitersToGuess: [";"] });
        //        const parsedData = csv?.data;
        //        let end = '/silefe.cnae/add-multiple';
        //        let ttmp = { cnaes: parsedData, userId: getUserId() };
        //        batchAPI(end, ttmp, referer).then(res2 => {
        //            if (res2.ok) {
        //                setToastItems([...toastItems, { title: Liferay.Language.get("Carga_Masiva"), type: "danger", text: Liferay.Language.get('Elementos_cargados') }]);
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
        console.log("fichero no cargado")
    }

    const handleSave = async () => {
        const data = {
            id: items.item.id,
            obj: {
                ...items.item,
                userId: getUserId()
            },
        }
        
        let endpoint = '/silefe.docente/save-docente';
        if (items.status === 'new')
            endpoint = '/silefe.docente/add-docente';
        let { status, error } = await saveAPI(endpoint, data, referer);
        if (status) {
            fetchData();
            setToastItems([...toastItems, { title: Liferay.Language.get("Guardar"), type: "info", text: Liferay.Language.get("Guardado_correctamente") }]);
        }
        else
            setToastItems([...toastItems, { title: Liferay.Language.get("Guardar"), type: "danger", text: Errors[error] }]);

        if (state != 'undefined' && state.backUrl.length > 0)
            navigate(state.backUrl + state.ancestorId);
    }

    const confirmDelete = async () => {
        const endpoint = '/silefe.docente/delete-docentes';
        let s = items.arr.filter(item => item.checked).map(i => { return i.id });

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
        console.log("downloadFile");
    }

    //form.downloadFunc = downloadFile;
    //form.handleSave = handleSave;
    form.loadCsv = loadCsv;
    form.beforeEdit = beforeEdit;
    form.loadCsv = loadCsv;

    const fetchData = async () => {
        if (form.fields.provinciaId.options == undefined) {
            await initForm();
        }

        let { data, totalPages, totalItems, page } = await fetchAPIData('/silefe.docente/filter', formatPost(items), referer);
        const tmp = await data.map(i => {
            return (
                {
                    ...i,
                    fechaNacimiento:  toDate(i.fechaNacimiento),
                    email: formatEmails(i.email),
                    telefono: formatPhones(i.telefono),
                    checked: false,
                })
        });
        await itemsHandle({ type: ITEMS_ACTIONS.LOAD_ITEMS, items: tmp, totalPages: totalPages, total: totalItems, page: page });
    }

    const initForm = async () => {
        const seleccionarlabel = Liferay.Language.get('Seleccionar');

        fetchAPIData('/silefe.provincia/all', { lang: getLanguageId() }, referer).then(response => {
            const opts = [{ value: "0", label: seleccionarlabel }, ...response.data.map(obj => { return { value: obj.id, label: obj.nombre } })];
            form.fields.provinciaId.options = opts;
            form.fields.provinciaId.change = () => console.log("cambiando provincia");//changeProvince;
        });

        //fetchAPIData('/silefe.municipio/filter-by-province', {lang: getLanguageId(), page:0,province: 1},referer).then(response => {
        //    const opts = [{value:"0",label:seleccionarlabel}, ...response.data.map(obj => {return {value:obj.id,label:obj.nombre}})];
        //    form.fields.municipioId.options = opts;
        //    form.fields.municipioId.change = () => console.log("cambiando el municipio");
        //});

        fetchAPIData('/silefe.tiposvia/all', { lang: getLanguageId(), page: 0, province: 1 }, referer).then(response => {
            const opts = [{ value: "0", label: seleccionarlabel }, ...response.data.map(obj => { return { value: obj.id, label: obj.nombre } })];
            form.fields.tipoviaId.options = opts;
            form.fields.tipoviaId.change = () => { console.log("cambiando el tipo de via") };
        });
        form.fields.tipoDoc.options = [{ value: "0", label: seleccionarlabel }, { value: "1", label: "DNI" }, { value: "2", label: "NIE" }, { value: "3", label: "Pasaporte" }];
        form.fields.sexo.options = [{ key: 0, value: "H", label: Liferay.Language.get('Hombre') }, { key: 1, value: "M", label: Liferay.Language.get('Mujer') }];

        itemsHandle({ type: ITEMS_ACTIONS.SET_FIELDS, form });
    }

    const changeProvince = (id) => {
        fetchAPIData('/silefe.municipio/filter-by-province', { lang: getLanguageId(), page: 0, province: id }, referer).then(response => {
            const opts = [{ value: "0", label: Liferay.Language.get('Seleccionar') }, ...response.data.map(obj => { return { value: obj.id, label: obj.nombre } })];
            itemsHandle({ type: ITEMS_ACTIONS.SET_FORMOPTIONS, fieldname: 'municipioId', options: opts });
        });
    }

    const plugin = () => {
        return {
            Historico: 
                <FHistoryEntity
                    data={historico}
                    handler={historicoHandle}
                />
        }
    }

    useEffect(() => {
        if (!isInitialized.current) {
            initForm();
            
            if (id != 'undefined' && id > 0) {
                loadDocente(id);
            }
            else
                fetchData();

            isInitialized.current = true;
        } else {
            if (id != 'undefined' && id > 0)
                loadDocente(id)
            else {
                const timeoutId = setTimeout(fetchData, 350);
                return () => clearTimeout(timeoutId);
            }
        }
    }, [items.load]);

    useEffect(() => {
        if (items.item.provinciaId != 'undefined' && items.item.provinciaId > 0) {
            changeProvince(items.item.provinciaId);
        }

    }, [items.item.provinciaId]);

    const loadDocente = (id) => {
        fetchAPIRow('/silefe.docente/get', { id: id }, referer).then(i => {
            const data = {
                ...i,
                data: {
                    ...i.data,
                    fechaNacimiento: (i.data.fechaNacimiento != null) ? new Date(i.data.fechaNacimiento).toISOString().substring(0, 10) : "",
                    email: (i.data.email != null && i.data.email.length > 0) ? JSON.parse(i.data.email) : [],
                    telefono: (i.data.telefono != null && i.data.telefono.length > 0) ? JSON.parse(i.data.telefono) : [],
                }
            };
            itemsHandle({ type: ITEMS_ACTIONS.EDIT_ITEM, item: data });
        }).catch(error => {
            console.error("Error cargando docente");
            console.error(error);
        })
    }

    if (!items)
        return (<div>Liferay.Language.get('Cargando')</div>)

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
                <TabsForm
                    save={handleSave}
                    itemsHandle={itemsHandle}
                    items={items}
                    plugin={plugin}
                    user={user}
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

export default Docentes;
