import { useModal } from '@clayui/modal';
import React, { useEffect, useReducer, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Liferay } from '../../common/services/liferay/liferay';
import { Errors } from '../../includes/Errors';
import { getLanguageId, getUserId, url_referer } from '../../includes/LiferayFunctions';
import { deleteAPI, fetchAPIData, fetchAPIRow, saveAPI } from "../../includes/apifunctions";
import { FAvisos } from '../../includes/interface/FAvisos';
import { FHistoryEntity } from "../../includes/interface/FHistoryEntity";
import { FModal } from '../../includes/interface/FModal';
import { LoadFiles } from '../../includes/interface/LoadFiles';
import { Paginator } from "../../includes/interface/Paginator";
import { SimpleTable } from '../../includes/interface/SimpleTable';
import Table from '../../includes/interface/Table';
import TabsForm from '../../includes/interface/TabsForm';
import { REDUCER_ACTIONS } from '../../includes/reducers/actions';
import { HISTORICO_ACTIONS, initialState as iniHis, reducerHistorico } from "../../includes/reducers/historico.reducer";
import { ITEMS_ACTIONS, initialState, red_items } from '../../includes/reducers/main.reducer';
import { initialState as iniCentros, reducerItems } from '../../includes/reducers/tabItem.reducer';
import { formatEmails, formatPhones, formatPost, toDate, toHours, toURL } from '../../includes/utils';
import Menu from '../Menu';
import { form as formCentros } from './Formularios/Centros';
import { form as formContactos } from './Formularios/Contactos';
import { form } from "./Formularios/Form";

const Empresas = ({user}) => {
    const [items, itemsHandle]             = useReducer(red_items, initialState);
    const [redCentros, centrosHandle]      = useReducer(reducerItems, iniCentros);
    const [redContactos, contactosHandle]  = useReducer(reducerItems, iniCentros);
    const [historico, historicoHandle]     = useReducer(reducerHistorico, iniHis);
    const [toastItems, setToastItems]      = useState([]);
    const { observer, onOpenChange, open } = useModal();
    const [file, setFile]                  = useState();
    const isInitialized                    = useRef(null);
    const { id }                           = useParams();
    const { state }                        = useLocation();
    const navigate                         = useNavigate();
    const referer                          = `${url_referer}/empresas`;

    const loadCsv = () => {
        console.log("loadCsv");
    }

    const loadHistory = (empresaId) => {
        const prequest = {
            empresaId: empresaId,
            pagination: {
                page: historico.pagination.page,
                pageSize: 5,
            },
            options: {}
        }
        fetchAPIData('/silefe.empresahistory/get-empresa-history-by-empresa-id', prequest, referer).then(response => {
            const respuesta = response.data.map(item => ({...item,
                date: toDate(item.date) + " " + toHours(item.date),
            }));
            historicoHandle({type: HISTORICO_ACTIONS.LOAD, items: respuesta, total: response.total, totalPages: response.totalPages});
        });
    }

    const beforeEdit = (id) => {
        let empresaId = (typeof (id) == 'int')?id:id.id;

        loadHistory(empresaId);
        fetchAPIData('/silefe.empresacentros/filter-by-empresa', { empresaId: empresaId }, referer).then(response => {
            const centros = response.data.map(i => ({...i, id: i.empresaCentrosId}));
            centrosHandle({ type: REDUCER_ACTIONS.LOAD_ITEMS, items: centros });
        });

        fetchAPIData('/silefe.contacto/filter-by-empresa', { empresaId: empresaId }, referer).then(response2 => {
            const contacts = response2.data.map(j => ({
                    ...j,
                    id: j.contactoId,
                    email: formatEmails(j.email),
                    telefono: formatPhones(j.telefono),
                })
            );
            contactosHandle({ type: REDUCER_ACTIONS.LOAD_ITEMS, items: contacts });
        });
    }

    const handleSave = () => {
        let endpoint = '/silefe.empresa/save-empresa';
        if (items.status === 'new')
            endpoint = '/silefe.empresa/add-empresa';

        let obj = {
            id: items.item.empresaId,
            obj: {
                ...items.item,
                userId: getUserId(),
            },
        };
        saveAPI(endpoint, obj, referer).then(response => {
            let { data, status, error } = response;
            if (status) {
                if (redCentros.items.length > 0) {
                    saveAPI('/silefe.empresacentros/save-centros-by-empresa', { id: data.empresaId, centros: redCentros.items, userId: getUserId() }, referer).then(respon => {
                        console.log("lalala");
                    });
                }
                // ahora tenemos que borrar los items que hallan sido borrados
                if (redCentros.deleted.length > 0) {
                    const delCentros = redCentros.deleted.map(d => d.empresaCentrosId);
                    deleteAPI('/silefe.empresacentros/delete-empresa-centros', delCentros, referer).then(res => {
                        console.error("delete experiencias");
                    });
                }
                // vamos a sincronizar los contactos, sólo si se han modificado
                // ponemos el origenId aquí,porque es donde lo sabemos cuando la empresa es nueva
                if (redContactos.items.length > 0) {
                    const contacts = redContactos.items.map((item) => ({ ...item, origenId: data.empresaId, userId: getUserId() }));
                    saveAPI('/silefe.contacto/save-by-empresa', { id: data.empresaId, contactos: contacts }, referer).then(response => {
                        console.log("a la vuelta de guardar los contactos");
                    });
                }

                if (redContactos.deleted.length > 0) {
                    deleteAPI('/silefe.contacto/delete-contactos', redContactos.deleted, referer).then(res => {
                        console.log("delete Contactos");
                    });
                }

                fetchData();
                setToastItems([...toastItems, { title: Liferay.Language.get("Guardar"), type: "info", text: Liferay.Language.get('Guardado_correctamente') }]);
            } else {
                setToastItems([...toastItems, { title: Liferay.Language.get("Guardar"), type: "danger", text: Errors[error] }]);
            }

            if (state != null && state.backUrl.length > 0) {
                navigate(state.backUrl + state.ancestorId);
            }
        });
    }

    const downloadfile = () => {
        console.log("descargando");
    }

    form.beforeEdit = beforeEdit;
    form.loadCsv = loadCsv;
    //form.downloadFunc = downloadfile;
    //form.handleSave = handleSave;

    const fetchData = async () => {    
        let { data, totalPages, totalItems, page } = await fetchAPIData('/silefe.empresa/filter', formatPost(items), referer);

        const tmp = await data.map(i => ({
                ...i,
                id: i.empresaId,
                email: formatEmails(i.email),
                telefono: formatPhones(i.telefono),
                adjuntos: i.adjuntos.map(a => ({ ...a, edit: false, src : toURL(a.uuid, a.groupId) })),
                checked: false
            })
        );
        await itemsHandle({ type: ITEMS_ACTIONS.LOAD_ITEMS, items: tmp, totalPages: totalPages, total: toastItems, page: page });
    }

    const initCentrosForm = () => {
        const lang = getLanguageId();
        const seleccionarlabel = Liferay.Language.get('Seleccionar');
        form.fields.tipoDoc.options = [{ value: "0", label: seleccionarlabel }, { value: "1", label: "DNI" }, { value: "2", label: "NIE" }, { value: "3", label: "CIF" }];

        fetchAPIData('/silefe.cnae/all', {  }, referer).then(response => {
            const opts = [{ value: "0", label: seleccionarlabel }, ...response.data.map(obj=>({ value: obj.id, label: obj.descripcion[lang]}))];
            form.fields.cnaeId.options = opts;
        });

        fetchAPIData('/silefe.provincia/all', { }, referer).then(response => {
            const opts = [{ value: "0", label: seleccionarlabel }, ...response.data.map(obj => ({ value: obj.id, label: obj.nombre[lang] }) )];
            formCentros.fields.provinciaId.options = opts;
        });

        fetchAPIData('/silefe.municipio/all', {  }, referer).then(response => {
            if (response.data.length > 0) {                
                const opts = response.data.map(item => ({...item, value: item.id, label: item.nombre[lang]}));
                formCentros.fields.municipioId.all= opts;
            }
        });

        fetchAPIData('/silefe.tiposvia/all', { }, referer).then(response => {
            const opts = [{ value: "0", label: seleccionarlabel }, ...response.data.map(obj => ({ value: obj.id, label: obj.nombre[lang]}))];
            formCentros.fields.tipoViaId.options = opts;
        });
        
        centrosHandle({type: REDUCER_ACTIONS.START, form: formCentros});
    }

    const confirmDelete = async () => {
        const endpoint = "/silefe.empresa/delete-empresas";
        let s = items.arr.filter(item => item.checked).map(i => { return i.id });
        deleteAPI(endpoint, s, referer).then(res => {
            if (res) {
                setToastItems([...toastItems, { title: Liferay.Language.get('Borrar'), type: "info", text: Liferay.Language.get('Borrado_ok') }]);
                fetchData();
            }
            else
                setToastItems([...toastItems, { title: Liferay.Language.get('Borrar'), type: "danger", text: Liferay.Language.get('Borrado_no') }]);
        });
    }

    const plugin2 = () => {
        return {
            Centros:
                <SimpleTable
                    reducer={redCentros}
                    handler={centrosHandle}
                />,
            Contactos:
                <SimpleTable
                    reducer={redContactos}
                    handler={contactosHandle}
                />,
            Historico: 
                <FHistoryEntity
                    data={historico}
                    handler={historicoHandle}
                />
        }
    }

    const loadItem = (id) => {
        beforeEdit(id);
        fetchAPIRow('/silefe.empresa/get', { id: id }, referer).then(r => {
            const tmp = {
                ...r,
                data: {
                    ...r.data,
                    email: formatEmails(r.data.email), 
                    telefono: formatPhones(r.data.telefono),
                }
            }
            itemsHandle({ type: ITEMS_ACTIONS.EDIT_ITEM, item: tmp });
        });
    }

    useEffect(() => {
        if (!isInitialized.current) {
            initCentrosForm();
            contactosHandle({ type: REDUCER_ACTIONS.START, form: formContactos });
            itemsHandle({ type: ITEMS_ACTIONS.SET_FIELDS, form: form });
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
                download={downloadfile}
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
                    plugin={plugin2}
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

export default Empresas;
