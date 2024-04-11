import { useModal } from '@clayui/modal';
import React, { useEffect, useReducer, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Liferay } from '../../common/services/liferay/liferay';
import { Errors } from '../../includes/Errors';
import { getLanguageId, getUserId, url_referer } from '../../includes/LiferayFunctions';
import { deleteAPI, deleteAPIParams, fetchAPIData, fetchAPIRow, saveAPI } from "../../includes/apifunctions";
import DoubleTable from '../../includes/interface/DoubleTable';
import { FAvisos } from '../../includes/interface/FAvisos';
import { FHistoryEntity } from '../../includes/interface/FHistoryEntity';
import { FModal } from '../../includes/interface/FModal';
import { LoadFiles } from '../../includes/interface/LoadFiles';
import { Paginator } from "../../includes/interface/Paginator";
import Table from '../../includes/interface/Table';
import TabsForm from '../../includes/interface/TabsForm';
import { ITEMS_ACTIONS } from '../../includes/reducers/actions';
import { HISTORICO_ACTIONS, initialState as iniHistorico, reducerHistorico } from '../../includes/reducers/historico.reducer';
import { initialState, red_items } from '../../includes/reducers/main.reducer';
import { SUBTABLE_ACTIONS, iniState, reducerSubtable } from '../../includes/reducers/subtable.reducer';
import { formatDefaultEmail, formatDefaultPhone, formatPost, toDate, toHours, toURL } from '../../includes/utils';
import Menu from '../Menu';
import { form } from './OfertaForm';
import { form as fparticipantes } from './ParticipanteForm';

const Ofertas = ({user}) => {
    const [items, itemsHandle] = useReducer(red_items, initialState);
    const [redParticipantes, participantesHandler] = useReducer(reducerSubtable, iniState);
    const [historico, historicoHandle] = useReducer(reducerHistorico, iniHistorico);
    const [toastItems, setToastItems] = useState([]);
    const { observer, onOpenChange, open } = useModal();
    const [file, setFile] = useState();
    const isInitialized = useRef(null);
    const { id } = useParams();
    const { state } = useLocation();
    const navigate = useNavigate();
    const referer = `${url_referer}/oferta`;

    const loadHistory = (ofertaId) => {
        const prequest = {
            ofertaId: ofertaId,
            pagination: {
                page: historico.pagination.page,
                pageSize: 5,
            },
            options: {}
        }
        fetchAPIData('/silefe.ofertahistory/get-oferta-history-by-oferta-id', prequest, referer).then(response => {
            const respuesta = response.data.map(item => ({...item,
                date: toDate(item.date) + " " + toHours(item.date),
            }));
            historicoHandle({type: HISTORICO_ACTIONS.LOAD, items: respuesta, total: response.total, totalPages: response.totalPages});
        });
    }

    const newElement = () => {
        participantesHandler({type: SUBTABLE_ACTIONS.START });
        historicoHandle({type: HISTORICO_ACTIONS.START});
        }

    const beforeEdit = (item) => {
        const s = (item === undefined || item === null) ? items.arr.filter(item => item.checked).map(i => { return i.id })[0] : item.ofertaId;
        loadCandidatosOferta(s);
        loadHistory(item.id);
    }

    const loadCandidatosOferta = (ofertaId) => {
        let filters = [];

        if (redParticipantes.search2.length > 0)
            filters = [{ name: redParticipantes.form.searchFieldMain, value: redParticipantes.search2 }];

        if (redParticipantes.filters.length > 0) {            
            filters = [...filters, ...redParticipantes.filters.map (filter => ({name: filter.name,value: filter.value }))];
        }

        const postdata = {
            ofertaId: ofertaId, 
            pagination: {
                page: redParticipantes.pagination.page,
                pageSize: redParticipantes.pagination.pageSize??4,
            },
            options: {
                filters: filters,
                order: [{ name: 'apellido1', direction: 'asc' }],
            }
        }

        fetchAPIData('/silefe.oferta/participantes-oferta', postdata, referer).then(response => {
            const pts = response.data.map(i => ({
                    ...i,
                    apellidos: i.apellido1 + " " + i.apellido2,
                    email: formatDefaultEmail(i.email),
                    telefono: formatDefaultPhone(i.telefono),
                }
            ));
            participantesHandler({ type: SUBTABLE_ACTIONS.LOAD_ITEMS, items: pts,pages: response.totalPages });
        });
    }

    useEffect( ()=> {
        if (items.item.ofertaId !== undefined )
            loadCandidatosOferta(items.item.ofertaId);
    }, [redParticipantes.pagination.page, redParticipantes.search2, redParticipantes.filters]);
        
    const loadCsv = () => {
        itemsHandle({ type: ITEMS_ACTIONS.LOAD })
    }

    const processCsv = () => {
        console.log("processCsv");
    }

    const handleSave = () => {
        const data = {
            id: items.item.id,
            obj: {
                ...items.item,
                userId: getUserId(),
            },
        }
        let endpoint = '/silefe.oferta/save-oferta';
        if (items.status === 'new')
            endpoint = '/silefe.oferta/add-oferta';
        saveAPI(endpoint, data, referer).then(response => {
            let { status, data, error } = response;
            if (status) {
                
                saveAPI('/silefe.oferta/save-participantes-oferta', { ofertaId: data.ofertaId, participantes: redParticipantes.items }, referer).then(res => {
                    if (res.status === false ) {
                        setToastItems([...toastItems, { title: Liferay.Language.get("Guardar"), type: "danger", text: Errors[res.error] }]);
                    }
                });
                if (redParticipantes.deleted.length > 0) {
                    const s = redParticipantes.deleted.map(i => { return i.participanteId });
                    deleteAPIParams('/silefe.oferta/delete-participantes-oferta', { ofertaId: data.ofertaId, identifiers: s }, referer).then(res => {
                        console.error("Borrando: " + res);
                    });
                }
                fetchData();
                setToastItems([...toastItems, { title: Liferay.Language.get("Guardar"), type: "info", text: Liferay.Language.get('Guardado_correctamente') }]);
            }
            else
                setToastItems([...toastItems, { title: Liferay.Language.get("Guardar"), type: "danger", text: Errors[error] }]);
            if (state !== undefined && state !== null && state.backUrl.length > 0)
                navigate(state.backUrl);
        });
    }

    const downloadFile = () => {
        console.log("downloadFile");
    }

    form.beforeEdit = beforeEdit;
    form.loadCsv = loadCsv;
    form.handleNew = newElement;

    useEffect(() => {
        const lang = getLanguageId();
        if (!isInitialized.current) {
            initForm();

            fetchAPIData('/silefe.estado/get-estados-from-origin', { origin: "offerparticipation" }, referer).then(response => {
                const opts = [{ value: "0", label: Liferay.Language.get("Seleccionar") }, ...response.data.map(obj => { return { value: obj.id, label: obj.nombre[lang] } })];
                fparticipantes.fields.estadoParticipacionId.options = opts;
                participantesHandler({type: SUBTABLE_ACTIONS.SETFORM, form: fparticipantes });
            });
               
            itemsHandle({ type: ITEMS_ACTIONS.SET_FIELDS, form: form });
            if (id !== undefined && id > 0) 
                loadOferta(id);
            else
                fetchData();

            isInitialized.current = true;
        } else {
            if (id !== undefined && id > 0) {
                loadOferta(id);
            }
            else {
                const timeoutId = setTimeout(fetchData, 350);
                return () => clearTimeout(timeoutId);
            }
        }
    }, [items.load]);

    useEffect(() => {
        loadParticipantesAll();
    }, [redParticipantes.paginationSearch.page, redParticipantes.search]);

    const loadParticipantesAll = () => {
        const pagesearch = redParticipantes.paginationSearch.page??1;
        let filters = [];
        if (redParticipantes.search.length > 0)
            filters = [{ name: redParticipantes.form.searchField, value: redParticipantes.search }];

        const postdata = {
            pagination: {
                page: pagesearch>0?pagesearch:0,
                pageSize: redParticipantes.paginationSearch.pageSize??4,
            },
            options: {
                filters: filters,
                order: [{ name: 'apellido1', direction: 'asc' }],
                excludes: (redParticipantes.items.length > 0) ? redParticipantes.items.map(i => (i.participanteId)) : [],
            },
        }

        fetchAPIData('/silefe.participante/filter', postdata, referer).then(response => {
            const pts = response.data.map(i => {
                return {
                    ...i,
                    id: i.participanteId,
                    apellidos: i.apellido1 + " " + i.apellido2,
                    nuevo: true,
                    estadoParticipacionId: 0,
                    email: formatDefaultEmail(i.email),
                    telefono: formatDefaultPhone(i.telefono),
                }
            });
            participantesHandler({ type: SUBTABLE_ACTIONS.SETSEARCHITEMS, items: pts, totalPages: response.totalPages });
        });
    }

    const confirmDelete = async () => {
        let s = items.arr.filter(item => item.checked).map(i => { return i.id });
        deleteAPI('/silefe.oferta/delete-ofertas', s, referer).then(res => {
            if (res) {
                setToastItems([...toastItems, { title: Liferay.Language.get('Borrar'), type: "info", text: Liferay.Language.get('Borrado_ok') }]);
                fetchData();
            }
            else 
                setToastItems([...toastItems, { title: Liferay.Language.get('Borrar'), type: "danger", text: Liferay.Language.get('Borrado_no') }]);            
        })
    }

    const showError = (error) => {
        setToastItems([...toastItems, { title: error.title, type: (error.type === 'error') ? 'danger' : 'info', text: error.text }]);
    }

    const plugin = () => {
        return {
            DoubleTable:
                <DoubleTable
                    data={redParticipantes}
                    handler={participantesHandler}
                />,
            Historico: 
                <FHistoryEntity 
                    data={historico}
                    handler={historicoHandle}
                />
        }
    }

    const loadOferta = (id) => {
        fetchAPIRow('/silefe.oferta/get', { id: id }, referer).then((r) => {
            const datatmp = {
                ...r,
                data: {
                    ...r.data,
                    puesto: "lalala",
                    fechaIncorporacion: toDate(r.data.fechaIncorporacion), 
                    fechaUltimoEstado: toDate(r.data.fechaUltimoEstado), 
                }
            }
            itemsHandle({ type: ITEMS_ACTIONS.EDIT_ITEM, item: datatmp });
        }).catch(error => {
            console.error("error");
            console.debug(error);
        });
    }

    const fetchData = async () => {
        let { data, totalPages, totalItems, page } = await fetchAPIData('/silefe.oferta/filter', formatPost(items), referer);
        const tmp = await data.map(i => ({
            ...i,
            id: i.ofertaId,
            fechaIncorporacion:  toDate(i.fechaIncorporacion),
            fechaUltimoEstado: toDate(i.fechaUltimoEstado), 
            colectivos: i.colectivos ?? [],
            adjuntos: i.adjuntos.map(a => ({ ...a, edit: false, src : toURL(a.uuid, a.groupId) })),
            idiomas: i.idiomas.map(a => a.titulacionId),
            informatica: i.informatica.map(b => b.titulacionId),
            checked: false
        }));
        await itemsHandle({ type: ITEMS_ACTIONS.LOAD_ITEMS, items: tmp, totalPages: totalPages, total: totalItems, page: page });
    }

    const loadCentros = (empresaId) => {
        fetchAPIData('/silefe.empresacentros/filter-by-empresa', { empresaId: empresaId }, referer).then(response => {
            const opts = [{ value: "0", label: Liferay.Language.get('Seleccionar') }, ...response.data.map(obj => { return { value: obj.empresaCentrosId, label: obj.nombre } })];
            itemsHandle({type: ITEMS_ACTIONS.SET_FORMOPTIONS,fieldname: "centroId", options: opts });
        });
    }    

    const initForm = () => {
        const lang = getLanguageId();
        const labelSel = Liferay.Language.get("Seleccionar");
        const opciones_requerido = [{ value: "0", label: labelSel }, { value: "1", label: "Recomendable" }, { value: "2", label: "Obligatorio" }];
        fetchAPIData('/silefe.edad/all', { lang: getLanguageId() }, referer).then(response => {
            const opts = [{ value: "0", label: labelSel }, ...response.data.map(obj => { return { value: obj.id, label: obj.descripcion } })];
            form.fields.edadId.options = opts;
        });
        fetchAPIData('/silefe.empresa/all', { }, referer).then(response => {
            const opts = [{ value: "0", label: labelSel }, ...response.data.map(obj => { return { value: obj.id, label: obj.razonSocial } })];
            form.fields.empresaId.options = opts;
        });
        // TODO: ver si cargarlo aqui, o sacarlo directamente: 
        //loadCentros(); 
        fetchAPIData('/silefe.proyecto/all', { }, referer).then(response => {
            const opts = [{ value: "0", label: labelSel }, ...response.data.map(obj => { return { value: obj.id, label: obj.descripcion[lang] } })];
            form.fields.proyectoId.options = opts;
        }).catch((error) => {
            console.error("hay errores");
            console.error(error);
        });
        // consulto los cno's
        fetchAPIData('/silefe.cno/all', { }, referer).then(response => {
            const opts = [{ value: "0", label: labelSel }, ...response.data.map(obj => ({ value: obj.id, label: obj.descripcion[lang] }) )];
            form.fields.puestoId.options = opts;
        });
        // cargamos las cna's
        fetchAPIData('/silefe.cnae/all', { }, referer).then(response => {
            const opts = [{ value: "0", label: labelSel }, ...response.data.map(obj=>({ value: obj.id, label: obj.descripcion[lang] }) )];
            form.fields.cnaeId.options = opts;
        });
        // cargamos los tipos de contrato
        fetchAPIData('/silefe.tipocontrato/all', {  }, referer).then(response => {
            const opts = [{ value: "0", label: labelSel }, ...response.data.map(obj =>({ value: obj.id, label: obj.descripcion[lang]}))];
            form.fields.tipoContratoId.options = opts;
        });
        // cargamos los candidatos: 
        fetchAPIData('/silefe.carnet/all', {  }, referer).then(response => {
            const opts = [{ value: "0", label: labelSel }, ...response.data.map(obj =>({value: obj.id, label: obj.descripcion[lang] }) )];
            form.fields.permisos.options = opts;
        });

        fetchAPIData('/silefe.titulacion/all', {  }, referer).then(response => {
            const opts = [...response.data.map(obj =>({value: obj.titulacionId, label: obj.descripcion[lang] }) )];
            form.fields.titulacionId.options = opts;
        });

        form.fields.titulacionRequerido.options = opciones_requerido;
        form.fields.idiomasRequerido.options = opciones_requerido;
        form.fields.informaticaRequerido.options = opciones_requerido;
        form.fields.experienciaRequerido.options = opciones_requerido;
        form.fields.idiomas.options = [{value: 1, label: "Inglés"}, {value: 2, label: "Frances"}]
        form.fields.informatica.options = [{value: 1, label: "Ofimática"}, {value: 2, label: "Photoshop"}, {value: 3, label: "Autocad"}]

        const postdata = { origin: "offer"}
        fetchAPIData('/silefe.estado/get-estados-from-origin', postdata, referer).then(response => {
            const opts = [{ value: "0", label: labelSel }, ...response.data.map(obj =>({ value: obj.id, label: obj.nombre[lang] }) )];
            form.fields.estadoId.options = opts;
        });

        form.fields.jornadaId.options = [{ value: "0", label: labelSel }, { value: "1", label: Liferay.Language.get("Completa") }, { value: "2", label: Liferay.Language.get("Parcial") }];

        fetchAPIData('/silefe.salario/all', { }, referer).then(response => {
            const opts = [{ value: "0", label: labelSel }, ...response.data.map(obj => ({ value: obj.id, label: obj.descripcion[lang]}))];
            form.fields.salarioId.options = opts;
        });

        fetchAPIData('/silefe.colectivo/all', { }, referer).then(response => {
            const opts = [...response.data.map(obj =>({ value: obj.id, label: obj.descripcion[lang]}))];
            form.fields.colectivos.options = opts;
        });
    }

//    const initFormParticipantes = () => {
//        // Cargamos algunos datos para las ofertas:
//        fetchAPIData('/silefe.salario/all', { lang: getLanguageId() }, referer).then(response => {
//            const opts = [{ value: "0", label: "Seleccionar" }, ...response.data.map(obj => { return { value: obj.id, label: obj.descripcion } })];
//            participantesHandler({ type: PARTICIPANTE_ACTIONS.SET_RANGOS, rangos: opts });
//        });
//
//        // Cargamos algunos datos para las provincias:
//        fetchAPIData('/silefe.provincia/all', { lang: getLanguageId() }, referer).then(response => {
//            const opts = [{ value: "0", label: "Seleccionar" }, ...response.data.map(obj => { return { value: obj.id, label: obj.nombre } })];
//            participantesHandler({ type: PARTICIPANTE_ACTIONS.SET_PROVINCIAS, provincias: opts });
//        });
//
//        // Cargamos algunos datos para las municipios:
//        fetchAPIData('/silefe.municipio/all', { lang: getLanguageId() }, referer).then(response => {
//            //const opts = [ {value:"0",label:"Seleccionar"} ,...response.data.map(obj => {return {value:obj.id,label:obj.nombre}})];
//            participantesHandler({ type: PARTICIPANTE_ACTIONS.SET_MUNICIPIOS, municipios: response.data });
//        });
//
//        // Cargamos algunos datos para las ocupaciones:
//        fetchAPIData('/silefe.cno/all', { descripcion: "", lang: getLanguageId() }, referer).then(response => {
//            const opts = [{ value: "0", label: "Seleccionar" }, ...response.data.map(obj => { return { value: obj.id, label: obj.descripcion } })];
//            participantesHandler({ type: PARTICIPANTE_ACTIONS.SET_OCUPACIONES, ocupaciones: opts });
//        });
//
//        // Cargamos algunos datos para los colectivos
//        fetchAPIData('/silefe.colectivo/all', { descripcion: "", lang: getLanguageId() }, referer).then(response => {
//            const opts = [{ value: "0", label: "Seleccionar" }, ...response.data.map(obj => { return { value: obj.id, label: obj.descripcion } })];
//            console.log("estos son los colectivos");
//            console.debug(opts);
//            participantesHandler({ type: PARTICIPANTE_ACTIONS.SET_COLECTIVOS, colectivos: opts });
//        });
//
//        fetchAPIData('/silefe.horario/all', { lang: getLanguageId() }, referer).then(response => {
//            const opts = [{ value: "0", label: "Seleccionar" }, ...response.data.map(obj => { return { value: obj.id, label: obj.descripcion } })];
//            participantesHandler({ type: PARTICIPANTE_ACTIONS.SET_JORNADAS, jornadas: opts });
//        });
//    }

    useEffect(()=> {
        if (items !== undefined) {
            loadHistory(items.item.id);
        }
    }, [historico.pagination.page]);

    useEffect(()=>{
        if (items !== undefined && items.item.empresaId > 0) {
            loadCentros(items.item.empresaId);
        }
    },[items.item.empresaId]);

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
export default Ofertas;

