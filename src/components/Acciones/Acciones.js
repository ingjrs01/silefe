import { useModal } from '@clayui/modal';
import React, { useEffect, useReducer, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Liferay } from '../../common/services/liferay/liferay';
import { Errors } from '../../includes/Errors';
import { getLanguageId, getUserId, url_referer } from '../../includes/LiferayFunctions';
import { deleteAPI, deleteAPIParams, fetchAPIData, fetchAPIRow, saveAPI } from "../../includes/apifunctions";
import { FAvisos } from '../../includes/interface/FAvisos';
import { FModal } from '../../includes/interface/FModal';
import { History } from '../../includes/interface/History';
import { LoadFiles } from '../../includes/interface/LoadFiles';
import { Paginator } from "../../includes/interface/Paginator";
import Table from '../../includes/interface/Table';
import { ITEMS_ACTIONS, initialState, red_items } from '../../includes/reducers/items.reducer';
import { SUBTABLE_ACTIONS, iniState, reducerSubtable } from '../../includes/reducers/subtable.reducer';
import { formatDefaultEmail, formatDefaultPhone, toHours } from '../../includes/utils';
import Menu from '../Menu';
import AccionesForm from "./AccionesForm";
import { form as DocentesForm } from './DocentesForm';
import { EJECUCION_ACTIONS, iniState as iniEjecucion, reducerEjecucion } from './Ejecucion.reducer';
import { form as eform } from './EjecucionForm';
import { form } from './Form';
import { form as ParticipantesForm } from './ParticipantesForm';
//import Papa from "papaparse";

const Acciones = () => {
    const [items, itemsHandle] = useReducer(red_items, initialState);
    const [docentes, docentesHandler] = useReducer(reducerSubtable, iniState);
    const [participantes, participantesHandler] = useReducer(reducerSubtable, iniState);
    const [ejecucionT, ejecucionHandlerT] = useReducer(reducerEjecucion, iniEjecucion);
    const [ejecucionP, ejecucionHandlerP] = useReducer(reducerEjecucion, iniEjecucion);
    const [ejecucionG, ejecucionHandlerG] = useReducer(reducerEjecucion, iniEjecucion);
    const [toastItems, setToastItems] = useState([]);
    const { observer, onOpenChange, open } = useModal();
    const [file, setFile] = useState();
    const { id } = useParams();
    const { state } = useLocation();
    const navigate = useNavigate();
    const isInitialized = useRef(null);
    const referer = `${url_referer}/acciones`;

    const downloadFile = () => {
        console.log("esto es download file");
    }

    const handleSave = async () => {
        const pdata = {
            id: items.item.id,
            obj: { ...items.item, userId: getUserId() },
            userId: getUserId()
        }

        let endpoint = '/silefe.accion/save-accion';
        if (items.status === 'new')
            endpoint = '/silefe.accion/add-accion';
        let { data, status, error } = await saveAPI(endpoint, pdata, referer);
        if (status) {
            const obj2 = { id: data.accionId, docentes: docentes.items, userId: getUserId() };
            let respon = await saveAPI('/silefe.accion/save-docentes-accion', obj2, referer);
            if (docentes.deleted.length > 0) {
                const deleteItems = docentes.deleted.map(d => { return (d.docenteId) });
                deleteAPIParams('/silefe.accion/delete-docentes-accion', { id: data.accionId, docentes: deleteItems }, referer).then(res => {
                    console.log("se han borrado los docentes");
                })
            };
            const obj3 = { id: data.accionId, participantes: participantes.items, userId: getUserId() };
            respon = await saveAPI('/silefe.accion/save-participantes-accion', obj3, referer);
            if (participantes.deleted.length > 0) {
                const deleteItems = participantes.deleted.map(d => (d.participanteId));
                deleteAPIParams('/silefe.accion/delete-participantes-accion', { id: data.accionId, participantes: deleteItems }, referer).then(res => {
                    console.log("Se han borrado los participantes");
                });
            }

            // TODO: Revisar según el tipo de formacion que sea:
            let obj4 = { id: ejecucionT.item.id, obj: ejecucionT.item };
            respon = await saveAPI('/silefe.formacionaccion/save-formacion-accion', obj4, referer);
            obj4 = { id: ejecucionP.item.id, obj: ejecucionP.item };
            respon = await saveAPI('/silefe.formacionaccion/save-formacion-accion', obj4, referer);
            obj4 = { id: ejecucionG.item.id, obj: ejecucionG.item };
            respon = await saveAPI('/silefe.formacionaccion/save-formacion-accion', obj4, referer);

            fetchData();
            setToastItems([...toastItems, { title: Liferay.Language.get("Guardar"), type: "info", text: Liferay.Language.get("Guardado_correctamente") }]);
        }
        else
            setToastItems([...toastItems, { title: Liferay.Language.get("Guardar"), type: "danger", text: Errors[error] }]);

        if (state != undefined && state.backUrl.length > 0)
            navigate(state.backUrl + state.ancestorId);
    }
    const loadCsv = () => itemsHandle({ type: ITEMS_ACTIONS.LOAD });

    form.downloadFunc = downloadFile;
    form.handleSave = handleSave;
    form.loadCsv = loadCsv;


    const processCsv = () => {
        console.log("processCsv");
        //        if (file) {
        //            const reader = new FileReader();
        //            reader.onload = async ({ target }) => {
        //                const csv = Papa.parse(target.result, { header: true,delimiter:";",delimitersToGuess:[";"] });
        //                const parsedData = csv?.data;
        //                let end = '/silefe.cnae/add-multiple';
        //                let ttmp = { cnaes:parsedData,userId:getUserId()};
        //                batchAPI(end,ttmp,referer).then( res2 => {
        //                    if (res2.ok) {
        //                        setToastItems([...toastItems, { title: Liferay.Language.get("Carga_Masiva"), type: "danger", text: Liferay.Language.get('Elementos_cargados') }]);
        //                        fetchData();
        //                    }
        //                    else
        //                        setToastItems([...toastItems, { title: Liferay.Language.get("Carga_Masiva"), type: "danger", text: Liferay.Language.get("Elementos_no_cargados") }]);
        //                });
        //            };
        //            reader.readAsText(file);
        //        }
        //        else {
        //            console.log("fichero no cargado")
        //        }
    }


    const confirmDelete = async () => {
        const endpoint = '/silefe.accion/delete-acciones';
        let s = items.arr.filter(item => item.checked).map(i => { return i.id });
        deleteAPI(endpoint, s, referer).then(res => {
            if (res) {
                setToastItems([...toastItems, { title: Liferay.Language.get('Borrar'), type: "info", text: Liferay.Language.get('Borrado_ok') }]);
                fetchData();
            }
            else
                setToastItems([...toastItems, { title: Liferay.Language.get('Borrar'), type: "danger", text: Liferay.Language.get('Borrado_no') }]);
        })
    }

    const fetchData = async () => {
        ejecucionHandlerT({ type: EJECUCION_ACTIONS.START, tipoFormacion: 1 });
        ejecucionHandlerP({ type: EJECUCION_ACTIONS.START, tipoFormacion: 2 });
        ejecucionHandlerG({ type: EJECUCION_ACTIONS.START, tipoFormacion: 3 });

        const postdata = {
            pagination: { page: items.pagination.page, pageSize: items.pagination.pageSize },
            options: {
                filters: [
                    { name: items.searchField, value: (items.search && typeof items.search !== 'undefined') ? items.search : "" },
                ],
                order: items.order,
            },
        }

        if (form.fields.accionTipoId.options.length == 0) {
            loadForm();
        }

        let { data, totalPages, totalItems, page } = await fetchAPIData('/silefe.accion/filter', postdata, referer);
        const tmp = await data.map(i => { return ({ ...i, checked: false }) });
        await itemsHandle({ type: ITEMS_ACTIONS.START, items: tmp, fields: form, totalPages: totalPages, total: totalItems, page: page });
    }

    const beforeEdit = (item) => {
        loadDocentesSearch();

        if (item.accionId != undefined && item.accionId > 0) {
            const accionId = item.accionId;
            ejecucionHandlerT({ type: EJECUCION_ACTIONS.SETFIELD, fieldname: 'accionId', value: accionId });
            ejecucionHandlerP({ type: EJECUCION_ACTIONS.SETFIELD, fieldname: 'accionId', value: accionId });
            ejecucionHandlerG({ type: EJECUCION_ACTIONS.SETFIELD, fieldname: 'accionId', value: accionId });

            loadDocentes(accionId);
            loadParticipantes(accionId);
            // Cargando los datos de las acciones: 
            fetchAPIData('/silefe.formacionaccion/get-formacion-accion', { accionId: accionId, tipoFormacion: 1 }, referer).then(response => {
                const item = {
                    ...response.data,
                    inicio: (response.data.inicio != null) ? new Date(response.data.inicio).toISOString().substring(0, 10) : "",
                    fin: (response.data.fin != null) ? new Date(response.data.fin).toISOString().substring(0, 10) : "",
                    hIni1: toHours(response.data.hIni1),
                    hIni2: toHours(response.data.hIni2),
                    hFin1: toHours(response.data.hFin1),
                    hFin2: toHours(response.data.hFin2),
                    dias: JSON.parse(response.data.dias),
                };
                ejecucionHandlerT({ type: EJECUCION_ACTIONS.SETITEM, item: item });
            });
            fetchAPIData('/silefe.formacionaccion/get-formacion-accion', { accionId: accionId, tipoFormacion: 2 }, referer).then(response => {
                const item = {
                    ...response.data,
                    inicio: (response.data.inicio != null) ? new Date(response.data.inicio).toISOString().substring(0, 10) : "",
                    fin: (response.data.fin != null) ? new Date(response.data.fin).toISOString().substring(0, 10) : "",
                    hIni1: toHours(response.data.hIni1),
                    hIni2: toHours(response.data.hIni2),
                    hFin1: toHours(response.data.hFin1),
                    hFin2: toHours(response.data.hFin2),
                    dias: JSON.parse(response.data.dias),
                };
                ejecucionHandlerP({ type: EJECUCION_ACTIONS.SETITEM, item: item });
            });
            fetchAPIData('/silefe.formacionaccion/get-formacion-accion', { accionId: accionId, tipoFormacion: 3 }, referer).then(response => {
                const item = {
                    ...response.data,
                    inicio: (response.data.inicio != null) ? new Date(response.data.inicio).toISOString().substring(0, 10) : "",
                    fin: (response.data.fin != null) ? new Date(response.data.fin).toISOString().substring(0, 10) : "",
                    hIni1: toHours(response.data.hIni1),
                    hIni2: toHours(response.data.hIni2),
                    hFin1: toHours(response.data.hFin1),
                    hFin2: toHours(response.data.hFin2),
                    dias: JSON.parse(response.data.dias),
                };
                ejecucionHandlerG({ type: EJECUCION_ACTIONS.SETITEM, item: item });
            });
        }
    }

    const loadDocentes = (id) => {
        fetchAPIData('/silefe.accion/filter-docentes-by-accion', { accionId: id }, referer).then(response => {
            const tits = (response.data !== undefined && response.data.length > 0)?response.data.map(i => {
                return {
                    ...i,
                    apellidos: i.apellido1 + " " + i.apellido2,
                    nuevo: false,
                    email: formatDefaultEmail(i.email),
                    telefono: formatDefaultPhone(i.telefono),
                    id: i.docenteId,
                }
            }):[];
            docentesHandler({ type: SUBTABLE_ACTIONS.LOAD_ITEMS, items: tits, pages: response.totalPages });
        });
    }

    const loadParticipantes = (id) =>  {
        fetchAPIData('/silefe.accion/filter-participantes-by-accion', { accionId: id }, referer).then(response => {
            const tits = (response.data !== undefined && response.data.length > 0)?response.data.map(i => {
                return {
                    ...i,
                    apellidos: i.apellido1 + " " + i.apellido2,
                    nuevo: false,
                    email: formatDefaultEmail(i.email),
                    telefono: formatDefaultPhone(i.telefono), 
                    id: i.participanteId,
                }
            }):[];
            participantesHandler({ type: SUBTABLE_ACTIONS.LOAD_ITEMS, items: tits, pages: response.totalPages });
        });
    }    

    const loadParticipantesSearch = () => {
        const pagesearch = participantes.paginationSearch.page??1;
        let filters = [];
        if (participantes.search.length > 0)
            filters = [{ name: participantes.searchField, value: participantes.search }];

        const postdata = {
            pagination: {
                page: (pagesearch>0)?pagesearch:0,
                pageSize: participantes.paginationSearch.pageSize??4
            },
            options: {
                filters: filters,
                order: [{ name: 'apellido1', direction: 'asc' }],
                excludes: (participantes.items.length > 0) ? participantes.items.map(i => (i.participanteId)) : [],
            },
        }

        fetchAPIData('/silefe.participante/filter', postdata, referer).then(response => {
            const pts = (response.data !== undefined && response.data.length > 0)?response.data.map(i => {
                return {
                    ...i,
                    apellidos: i.apellido1 + " " + i.apellido2,
                    nuevo: true,
                    email: formatDefaultEmail(i.email),
                    telefono: formatDefaultPhone(i.telefono),
                    id: i.participanteId,
                }
            }):[];
            participantesHandler({type: SUBTABLE_ACTIONS.SETSEARCHITEMS, items: pts, totalPages: response.totalPages});
        });
    }

    const loadDocentesSearch = () => {
        let filters = [];
        if (docentes.search.length > 0)
            filters = [{ name: docentes.searchField, value: docentes.search }];

        const postdata = {
            pagination: {
                page: docentes.paginationSearch.page,
                pageSize: docentes.paginationSearch.pageSize??4
            },
            options: {
                filters: filters,
                order: [{ name: 'apellido1', direction: 'asc' }],
                excludes: (docentes.items.length > 0) ? docentes.items.map(i => (i.docenteId)) : [],
            },
        }

        fetchAPIData('/silefe.docente/filter', postdata, referer).then(response => {
            const pts = (response.data !== undefined && response.data.length > 0)?response.data.map(i => {
                return {
                    ...i,
                    apellidos: i.apellido1 + " " + i.apellido2,
                    nuevo: true,
                    email: formatDefaultEmail(i.email),
                    telefono: formatDefaultPhone(i.telefono),
                }
            }):[];
            docentesHandler({ type: SUBTABLE_ACTIONS.SETSEARCHITEMS, items: pts, totalPages: response.totalPages });
        });
    }

    const loadForm = () => {
        const langSel = Liferay.Language.get("Seleccionar");
        form.beforeEdit = beforeEdit;

        fetchAPIData('/silefe.acciontipo/all', { lang: getLanguageId() }, referer).then(response => {
            const opts = [{ value: 0, label: langSel }, ...response.data.map(obj => { return { value: obj.id, label: obj.descripcion } })];
            form.fields.accionTipoId.options = opts;
        });

        fetchAPIData('/silefe.acciontipoformacion/all', { lang: getLanguageId() }, referer).then(response => {
            const opts = [{ value: 0, label: langSel }, ...response.data.map(obj => { return { value: obj.id, label: obj.descripcion } })];
            form.fields.accionTipoFormacionId.options = opts;
        });

        //fetchAPIData('/silefe.tecnico/all', { lang: getLanguageId() }, referer).then(response => {
        //    const opts = [{value: 0, label: langSel}, ...response.data.map(obj => { return { value: obj.tecnicoId, label: obj.firstName } })];
        //    form.fields.tecnicoId.options = opts;
        //});

        fetchAPIData('/silefe.plataforma/all', { options: {} }, referer).then(response => {
            const opts = [{ value: 0, label: langSel }, ...response.data.map(obj => { return { value: obj.plataformaId, label: obj.nombre } })];
            form.fields.plataformaId.options = opts;
        });

        fetchAPIData('/silefe.estado/all', { lang: getLanguageId() }, referer).then(response => {
            const opts = [{ value: 0, label: langSel }, ...response.data.map(obj => { return { value: obj.estadoId, label: obj.nombre } })];
            form.fields.estadoId.options = opts;
            form.fields.estadoId.change = () => itemsHandle({ type: ITEMS_ACTIONS.SET, fieldname: "observaciones", value: "" });
        });

        // TODO: Categoria:
        form.fields.categoriaId.options = [{ value: 0, label: langSel }, { value: 1, label: "Categoría" }, { value: 2, label: "Sin Categoría" }];
        form.fields.cursoId.options = [{ value: 0, label: langSel }, { value: 1, label: "Curso 1" }, { value: 2, label: "Curso 2" }];


        fetchAPIData('/silefe.empresa/all', { lang: getLanguageId() }, referer).then(response => {
            const opts = [{ value: 0, label: langSel }, ...response.data.map(obj => { return { value: obj.id, label: obj.razonSocial } })];
            eform.fields.empresaId.options = opts;
        });

        fetchAPIData('/silefe.lugar/all', {}, referer).then(response => {
            const opts = [{ value: 0, label: langSel }, ...response.data.map(obj => { return { value: obj.id, label: obj.nombre } })];
            eform.fields.lugarId.options = opts;
        });

        ejecucionHandlerT({ type: EJECUCION_ACTIONS.SETFORM, form: eform });
        ejecucionHandlerP({ type: EJECUCION_ACTIONS.SETFORM, form: eform });
        ejecucionHandlerG({ type: EJECUCION_ACTIONS.SETFORM, form: eform });
    }

    const loadAccion = (id) => {
        fetchAPIRow('/silefe.accion/get', { id: id }, referer).then(r => itemsHandle({ type: ITEMS_ACTIONS.EDIT_ITEM, item: r }));
    }

    const changeLugar = async (id) => {
        const tag = getLanguageId().replace("_", "-");
        const { data } = await fetchAPIRow('/silefe.lugar/get', { id: id }, referer);
        return {
            ...data,
            municipio: data.municipio[tag],
            provincia: data.provincia[tag],
        };
    }

    const changeCompany = async (id) => {
        const { data } = await fetchAPIRow('/silefe.empresa/get', { id: id }, referer);
        return { ...data };
    }

    const loadHistory = () => fetchAPIData('/silefe.accionhistory/get-history', { accionId: items.item.accionId }, referer).then(response => itemsHandle({ type: ITEMS_ACTIONS.HISTORY, data: response.data }));

    useEffect(() => {
        if (ejecucionT.item.lugarId != 'undefined' && ejecucionT.item.lugarId > 0)
            changeLugar(ejecucionT.item.lugarId).then((data) => ejecucionHandlerT({ type: EJECUCION_ACTIONS.SETLUGAR, lugar: data }));
    }, [ejecucionT.item.lugarId]);

    useEffect(() => {
        if (ejecucionP.item.lugarId != 'undefined' && ejecucionP.item.lugarId > 0)
            changeLugar(ejecucionP.item.lugarId).then((data) => ejecucionHandlerP({ type: EJECUCION_ACTIONS.SETLUGAR, lugar: data }));
    }, [ejecucionP.item.lugarId]);

    useEffect(() => {
        if (ejecucionG.item.lugarId != 'undefined' && ejecucionG.item.lugarId > 0)
            changeLugar(ejecucionG.item.lugarId).then((data) => ejecucionHandlerG({ type: EJECUCION_ACTIONS.SETLUGAR, lugar: data }));
    }, [ejecucionG.item.lugarId]);

    useEffect(() => {
        if (ejecucionT.item.empresaId != 'undefined' && ejecucionT.item.empresaId > 0)
            changeCompany(ejecucionT.item.empresaId).then((data) => ejecucionHandlerT({ type: EJECUCION_ACTIONS.SETEMPRESA, empresa: data }));
    }, [ejecucionT.item.empresaId]);

    useEffect(() => {
        if (ejecucionP.item.empresaId != 'undefined' && ejecucionP.item.empresaId > 0)
            changeCompany(ejecucionP.item.empresaId).then((data) => ejecucionHandlerP({ type: EJECUCION_ACTIONS.SETEMPRESA, empresa: data }));
    }, [ejecucionP.item.empresaId]);

    useEffect(() => {
        if (ejecucionG.item.empresaId != 'undefined' && ejecucionG.item.empresaId > 0)
            changeCompany(ejecucionG.item.empresaId).then((data) => ejecucionHandlerG({ type: EJECUCION_ACTIONS.SETEMPRESA, empresa: data }));
    }, [ejecucionG.item.empresaId]);

    useEffect( () => {
        loadParticipantes(items.item.id);
    }, [participantes.load]);

    useEffect(() => {
        if (!isInitialized.current) {
            loadForm();
            docentesHandler({type: SUBTABLE_ACTIONS.SETFORM, form: DocentesForm});
            participantesHandler({type: SUBTABLE_ACTIONS.SETFORM, form: ParticipantesForm});
            itemsHandle({ type: ITEMS_ACTIONS.SET_FIELDS, form: form });
            if (id != 'undefined' && id > 0) {
                loadAccion(id);
            }
            else
                fetchData();
            isInitialized.current = true;
        } else {
            if (id != 'undefined' && id > 0) {
                loadAccion(id);
            }
            else {
                const timeoutId = setTimeout(fetchData, 350);
                return () => clearTimeout(timeoutId);
            }
        }
    }, [items.load]);

    useEffect(() => {
        loadParticipantesSearch();
    }, [participantes.paginationSearch.page, participantes.search]);

    useEffect(() => {
        loadDocentesSearch()
    }, [docentes.paginationSearch.page, docentes.search])

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
                <AccionesForm
                    save={handleSave}
                    itemsHandle={itemsHandle}
                    items={items}
                    docentes={docentes}
                    docentesHandler={docentesHandler}
                    participantes={participantes}
                    participantesHandler={participantesHandler}
                    ejecucion={[ejecucionT, ejecucionP, ejecucionG]}
                    ejecucionHandler={[ejecucionHandlerT, ejecucionHandlerP, ejecucionHandlerG]}
                    loadHistory={loadHistory}
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
            {
                (items.status === 'history') &&
                <>
                    <History
                        data={items.history}
                        itemsHandle={itemsHandle}
                        prevState={'edit'}
                    />
                </>
            }

            <FAvisos toastItems={toastItems} setToastItems={setToastItems} />
            {open && <FModal onOpenChange={onOpenChange} confirmDelete={confirmDelete} observer={observer} />}
        </>
    )
}

export default Acciones;
