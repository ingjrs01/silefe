import { useModal } from '@clayui/modal';
import React, { useEffect, useReducer, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Errors } from '../../includes/Errors';
import { getLanguageId, getUserId, url_referer } from '../../includes/LiferayFunctions';
import { deleteAPI, fetchAPIData, fetchAPIRow, saveAPI } from "../../includes/apifunctions";
import DoubleTable from "../../includes/interface/DoubleTable";
import { FAvisos } from '../../includes/interface/FAvisos';
import { FModal } from '../../includes/interface/FModal';
import { LoadFiles } from '../../includes/interface/LoadFiles';
import { Paginator } from "../../includes/interface/Paginator";
import Table from '../../includes/interface/Table';
import TabsForm from '../../includes/interface/TabsForm';
import { HISTORICO_ACTIONS, initialState as hisIni, reducerHistorico } from '../../includes/reducers/historico.reducer';
import { ITEMS_ACTIONS, initialState, red_items } from '../../includes/reducers/main.reducer';
import { SUBTABLE_ACTIONS, iniState, reducerSubtable } from '../../includes/reducers/subtable.reducer';
import Menu from '../Menu';
import { form as aform } from './AccionForm';
import { form as eform } from './EmpresaForm';
import { form } from './Form';
import { form as oform } from './OfertaForm';
import { form as pform } from './ParticipantesForm';
import { form as tform } from './TecnicoForm';
//import Papa from "papaparse";
import { Liferay } from '../../common/services/liferay/liferay';
import { FHistoryEntity } from '../../includes/interface/FHistoryEntity';
import { formatPost, toDate, toHours } from '../../includes/utils';

const Proyectos = ({user}) => {
    const [items, itemsHandle] = useReducer(red_items, initialState);
    const [acciones, accionesHandle] = useReducer(reducerSubtable, iniState);
    const [ofertas, ofertasHandle] = useReducer(reducerSubtable, iniState);
    const [participantes, participantesHandle] = useReducer(reducerSubtable, iniState);
    const [empresas, empresasHandle] = useReducer(reducerSubtable, iniState);
    const [historico, historicoHandle] = useReducer(reducerHistorico, hisIni);
    const [tecnicos, tecnicosHandle] = useReducer(reducerSubtable,iniState);
    const [toastItems, setToastItems] = useState([]);
    const { observer, onOpenChange, open } = useModal();
    const [file, setFile] = useState();
    const isInitialized = useRef(null);
    const { id } = useParams();
    const { state } = useLocation();
    const navigate = useNavigate();
    const referer = `${url_referer}/proyectos`;

    const loadHistory = (proyectoId) => {
        const prequest = {
            proyectoId: proyectoId,
            pagination: {
                page: historico.pagination.page,
                pageSize: 5,
            },
            options: {}
        }
        fetchAPIData('/silefe.proyectohistory/get-proyectos-history-by-id', prequest, referer).then(response => {
            const respuesta = response.data.map(item => ({...item,
                date: toDate(item.date) + " " + toHours(item.date),
            }));
            historicoHandle({type: HISTORICO_ACTIONS.LOAD, items: respuesta, total: response.total, totalPages: response.totalPages});
        });
    }

    useEffect(() => {
        if (!isInitialized.current) {
            console.log("inicializándolo todo");
            initForm();
            itemsHandle({ type: ITEMS_ACTIONS.SET_FIELDS, form: form });
            // Cargo todas las acciones posibles: 
            loadAllAcciones();
            loadAllOfertas();
            loadAllEmpresas();
            //loadAllTecnicos();
            accionesHandle({ type: SUBTABLE_ACTIONS.SETFORM, form: aform });
            ofertasHandle({ type: SUBTABLE_ACTIONS.SETFORM, form: oform });
            participantesHandle({ type: SUBTABLE_ACTIONS.SETFORM, form: pform });
            empresasHandle({ type: SUBTABLE_ACTIONS.SETFORM, form: eform });
            tecnicosHandle({type: SUBTABLE_ACTIONS.SETFORM, form: tform});

            if (id !== 'undefined' && id > 0)
                loadProyecto(id);
            else {
                fetchData();
            }

            isInitialized.current = true;
        } else {
            if (id !== 'undefined' && id > 0)
                loadProyecto(id)
            else {
                const timeoutId = setTimeout(fetchData, 350);
                return () => clearTimeout(timeoutId);
            }
        }
    }, [items.load]);

    useEffect(() => {
        if (items.item.id !== 'undefined' && items.item.id > 0)
            loadAcciones(items.item.id);
    }, [acciones.load]);

    useEffect(() => {
        loadAllAcciones();
    }, [acciones.paginationSearch.page, acciones.search]);

    useEffect(  () => {
        loadAllOfertas();
    }, [ofertas.paginationSearch.page, ofertas.search]);

    useEffect(  () => {
        loadAllEmpresas();
    }, [empresas.paginationSearch.page, empresas.search]);

    useEffect(() => {
        if (items.item.id !== 'undefined' && items.item.id > 0)
            loadOfertas(items.item.id);
    }, [ofertas.load]);

    useEffect(() => {
        if (items.item.id !== 'undefined' && items.item.id > 0)
            loadParticipantes(items.item.id);
    }, [participantes.load]);

    useEffect(() => {
        if (items.item.id !== 'undefined' && items.item.id > 0)
            loadEmpresas(items.item.id);
    }, [empresas.load]);

    useEffect(()=>{
        if (items.item.id !== 'undefined' && items.item.id > 0) {
            loadTecnicos(items.item.id);
        }
    }, [tecnicos.pagination.page]);

    const loadProyecto = id => {
        initForm();
        beforeEdit(id);
        fetchAPIRow('/silefe.proyecto/get', { id: id }, referer).then((r) => {
            const datatmp = {
                ...r,
                data: {
                    ...r.data,
                    id: r.data.proyectoId,
                    nparticipantes: r.data.participantes,
                    inicio: toDate(r.data.inicio),
                    fin: toDate(r.data.fin), 
                }
            }
            itemsHandle({ type: ITEMS_ACTIONS.EDIT_ITEM, item: datatmp });
        }).catch(error => {
            console.error("Error: " + error);
        });
    }

    const loadCsv = () => {
        itemsHandle({ type: ITEMS_ACTIONS.LOAD })
    }

    const processCsv = () => {
        //if (file) {
        //    const reader = new FileReader();
        //
        //    reader.onload = async ({ target }) => {
        //        const csv = Papa.parse(target.result, { header: true,delimiter:";",delimitersToGuess:[";"] });
        //        const parsedData = csv?.data;
        //        let end = '/silefe.cno/add-multiple';
        //        let ttmp = {cnos:parsedData,userId:Liferay.ThemeDisplay.getUserId()};
        //
        //        batchAPI(end,ttmp,referer).then(res2 => {
        //            if (res2.ok) {
        //                setToastItems([...toastItems, { title: Liferay.Language.get("Carga_Masiva"), type: "info", text: Liferay.Language.get('Elementos_cargados') }]);
        //                fetchData();
        //            }
        //            else {
        //                setToastItems([...toastItems, { title: Liferay.Liferay.get("Carga_Masiva"), type: "danger", text: Liferay.Language.get("Elementos_no_cargados") }]);
        //            }
        //        });
        //    };
        //    reader.readAsText(file);
        //}
        //else {
        //    console.log("fichero no cargado")
        //}
    }

    const handleSave = async () => {
        const pdata = {
            id: items.item.id,
            obj: {
                ...items.item,
                userId: getUserId(),
            },
            userId: getUserId(),
        }

        let endpoint = '/silefe.proyecto/save-proyecto';
        if (items.status === 'new')
            endpoint = '/silefe.proyecto/add-proyecto';

        let { status, error, data } = await saveAPI(endpoint, pdata, referer);
        if (status) { 
            const accionestosave = acciones.items.filter(accion => accion.nuevo).map(item => item.accionId);
            const postdata = {
                acciones: accionestosave,
                projectId: data.proyectoId,
            }
            let { status2, error2 } = await saveAPI('/silefe.accion/change-project-acciones', postdata, referer);

            // borrando los que no se quieren.
            const postdatadelete = {
                acciones: acciones.deleted.map(item => item.accionId),
                projectId: 0,
            }
            let { status3, error3 } = await saveAPI('/silefe.accion/change-project-acciones', postdatadelete, referer);
            // Ofertas: 
            const postofertas = {
                ofertas: ofertas.items.filter(oferta => oferta.nuevo).map(item => item.ofertaId),
                projectId: data.proyectoId,
            }
            await saveAPI('/silefe.oferta/change-project-id', postofertas, referer);

            if (ofertas.deleted.length > 0) {
                const postofertas2 = {
                    ofertas: ofertas.deleted.map(oferta => oferta.ofertaId),
                    projectId: 0,
                }
                await saveAPI('/silefe.oferta/change-project-id', postofertas2, referer);
            }
            // vamos con las empresas
            const pempresas = {
                empresas: empresas.items.filter(empresa => empresa.nuevo).map(empresa => empresa.empresaId),
                projectId: data.proyectoId
            }
            await saveAPI('/silefe.proyecto/add-empresas',pempresas, referer);
            if (empresas.deleted.length > 0) {
                const pempresas = {
                    empresas: empresas.deleted.map(empresa => empresa.id),
                    projectId: data.proyectoId
                }
                await saveAPI('/silefe.proyecto/remove-empresas', pempresas, referer);
            }
            // vamos con los técnicos: 
            const ptecnicos = {
                tecnicos: tecnicos.items.filter(tecnico => tecnico.nuevo).map(tecnico => tecnico.id),
                projectId: data.proyectoId
            }
            await saveAPI('/silefe.proyecto/add-tecnicos', ptecnicos, referer);
            if (tecnicos.deleted.length > 0) {
                const deletePost = {
                    tecnicos: tecnicos.deleted.map(tecnico => tecnico.id),
                    projectId: data.proyectoId,
                }
                await saveAPI('/silefe.proyecto/remove-tecnicos',deletePost, referer);
            }

            fetchData();
            setToastItems([...toastItems, { title: Liferay.Language.get("Guardar"), type: "info", text: Liferay.Language.get('Guardado_correctamente') }]);
        }
        else {
            setToastItems([...toastItems, { title: Liferay.Language.get("Guardar"), type: "danger", text: Errors[error] }]);
        }
    }

    const confirmDelete = async () => {
        let s = items.arr.filter(item => item.checked).map(i => { return i.id });
        deleteAPI('/silefe.proyecto/remove-proyectos', s, referer).then(res => {
            if (res) {
                setToastItems([...toastItems, { title: Liferay.Language.get('Borrar'), type: "info", text: Liferay.Language.get('Borrado_ok') }]);
                fetchData();
            }
            else {
                setToastItems([...toastItems, { title: Liferay.Language.get('Borrar'), type: "danger", text: Liferay.Language.get('Borrado_no') }]);
            }
        })
    }

    const beforeEdit = (id) => {
        let lid = 0;
        if (id === undefined)
            lid = items.arr.filter(item => item.checked)[0].id;
        else
            lid = id.proyectoId;

        if (lid > 0) {
            loadAcciones(lid);
            loadOfertas(lid);
            loadParticipantes(lid);
            loadEmpresas(lid);
            loadHistory(lid);
            loadTecnicos(lid).then((response)=>{
                console.log("esto es lo que va despues");
                console.debug(response);
                const ee = response.map(item => item.id);
                loadAllTecnicos(ee);
                //console.debug(tecnicos);
            });
        }
    }

    const downloadFile = () => {
        console.log("descargando fichero");
    }

    form.beforeEdit = beforeEdit;
    form.loadCsv = loadCsv;

    const fetchData = () => {
        if (form.fields.entidadId.options === 'undefined') {
            initForm();
        }
        // const postdata = {
        //     pagination: { page: items.pagination.page, pageSize: items.pagination.pageSize },
        //     options: {
        //         filters: [
        //             { name: items.searchField, value: (items.search && typeof items.search !== 'undefined') ? items.search : "" },
        //         ],
        //         order: items.order
        //     }
        // }
        fetchAPIData('/silefe.proyecto/filter',formatPost(items) , referer).then(({ data, totalPages, page, totalItems }) => {
            const tmp = data.map(i => ({
                ...i,
                id: i.proyectoId,
                inicio: toDate(i.inicio),
                fin: toDate(i.fin),
                checked: false
            })
            );
            itemsHandle({ type: ITEMS_ACTIONS.LOAD_ITEMS, items: tmp, totalPages: totalPages, total: toastItems, page: page });
        });
    }

    const loadAcciones = (id) => {
        if (id !== 'undefined') {
            const postdata = {
                pagination: { page: acciones.pagination.page, pageSize: 5 },
                options: {
                    filters: [{ name: "proyectoId", value: id }],
                }
            }
            fetchAPIData('/silefe.accion/filter', postdata, referer).then(response => {
                if (response.data !== 'undefined')
                    accionesHandle({ type: SUBTABLE_ACTIONS.LOAD_ITEMS, items: response.data, pages: response.totalPages });
            });
        }
    }

    const loadAllAcciones = () => {
        const pagesearch = acciones.paginationSearch.page??1 ;
        const postdata = {
            id: items.item.id ?? 1,
            pagination: { page: (pagesearch > 0)?pagesearch:0, pageSize: acciones.paginationSearch.pageSize??4 },
            options: {
                filters: [{ name: acciones.searchField, value: (acciones.search && typeof acciones.search !== 'undefined') ? acciones.search : "" },],
                excludes: acciones.items.map(item => item.accionId)
            }
        }
        fetchAPIData('/silefe.accion/filter', postdata, referer).then(response => 
            accionesHandle({type: SUBTABLE_ACTIONS.SETSEARCHITEMS, items:response.data, totalPages: response.totalPages}));
    }

    const loadAllOfertas = () => {
        const pagesearch = ofertas.paginationSearch.page??1 ;
        const postdata = {
            id: items.item.id ?? 1,
            pagination: { page: (pagesearch > 0)?pagesearch:0, pageSize: ofertas.paginationSearch.pageSize??4 },
            options: {
                filters: [{ 
                    name: ofertas.searchField === ""?"titulo":ofertas.searchField, 
                    value: (ofertas.search && typeof ofertas.search !== 'undefined') ? ofertas.search : "" 
                },],
                excludes: ofertas.items.map(item => item.ofertaId)
            }
        }
        fetchAPIData('/silefe.oferta/filter', postdata, referer).then(response => ofertasHandle({type: SUBTABLE_ACTIONS.SETSEARCHITEMS, items:response.data, totalPages: response.totalPages}))
    }

    const loadAllEmpresas = () => {
        const pagesearch = empresas.paginationSearch.page??1 ;
        const postdata = {
            id: items.item.id ?? 1,
            pagination: { page: (pagesearch > 0)?pagesearch:0, pageSize: empresas.paginationSearch.pageSize??4 },
            options: {
                filters: [{ 
                    name: empresas.searchField === ""?"razonSocial":empresas.searchField, 
                    value: (empresas.search && typeof empresas.search !== 'undefined') ? empresas.search : "" 
                },],
                excludes: empresas.items.map(item => item.id)
            }
        }
        fetchAPIData('/silefe.empresa/filter', postdata, referer).then(response => empresasHandle({type: SUBTABLE_ACTIONS.SETSEARCHITEMS, items:response.data, totalPages: response.totalPages}))
    }

    const loadParticipantes = (id) => {
        if (id !== 'undefined') {
            const postdata = {
                id: id,
                pagination: { page: participantes.pagination.page, pageSize: 5 },
                options: {
                    filters: [{ name: "proyectoId", value: id }],
                }
            }
            fetchAPIData('/silefe.participante/filter-by-project', postdata, referer).then(response => {
                const tmp = (response.data !== undefined && response.data.length > 0)? response.data.map(item => ({
                    ...item,
                    id: item.participanteId
                })):[];
                participantesHandle({ type: SUBTABLE_ACTIONS.LOAD_ITEMS, items: tmp, pages: response.totalPages });
            });
        }
    }

    const loadEmpresas = (id) => {
        if (id !== 'undefined') {
            const postdata = {
                id: id, // TODO: esto cambiar por el projectId
                options: {
                    pagination: { page: empresas.pagination.page, pageSize: 5 },
                    filters: [{ name: "proyectoId", value: id }],
                }
            }
            fetchAPIData('/silefe.empresa/filter-by-project', postdata, referer).then(response => {
                const tmp = response.data.map(i => ({
                    ...i,
                    telefono: (i.telefono != null && i.telefono.length > 0) ? JSON.parse(i.telefono)[0].value : "",
                }));
                empresasHandle({ type: SUBTABLE_ACTIONS.LOAD_ITEMS, items: tmp, pages: response.totalPages });
            });
        }
    }

    const loadOfertas = (id) => {
        if (id != 'undefined') {
            const postdata = {
                pagination: { page: acciones.pagination.page, pageSize: 5 },
                options: {
                    filters: [{ name: "proyectoId", value: id }],
                }
            };
            fetchAPIData('/silefe.oferta/filter', postdata, referer).then(response => {
                const itms = (response.data !== undefined && response.data.length > 0) ?response.data.map(i => ({
                    ...i,
                    fechaIncorporacion: toDate(i.fechaIncorporacion),
                })):[];
                ofertasHandle({ type: SUBTABLE_ACTIONS.LOAD_ITEMS, items: itms, pages: response.totalPages });
            });
        }
    }

    const loadAllTecnicos = (excludes) => {
        console.log("loadAllTecncios");
        const pagesearch = tecnicos.paginationSearch.page??1 ;
        const postdata = {
            id: items.item.id ?? 1,
            pagination: { page: (pagesearch > 0)?pagesearch:0, pageSize: tecnicos.paginationSearch.pageSize??4 },
            options: {}
            //    excludes: excludes
            //}
        }
        console.log("peticion enviada");
        console.debug(postdata);
        fetchAPIData('/silefe.tecnico/filter', postdata, referer)
            .then(response => {
                tecnicosHandle({type: SUBTABLE_ACTIONS.SETSEARCHITEMS, items:response.data, totalPages: response.totalPages});
            });
    }

    const loadTecnicos = async (id) => {
        if (id != 'undefined') {
            const postdata = {
                projectId: 101,
                pagination: { page: tecnicos.pagination.page, pageSize: 5 },
            };
            const {data, totalPages} = await fetchAPIData('/silefe.tecnico/filter-by-project', postdata, referer);
            tecnicosHandle({type: SUBTABLE_ACTIONS.LOAD_ITEMS, items: data, pages: totalPages});
            return data;
            // fetchAPIData('/silefe.tecnico/filter-by-project', postdata, referer).then(response => {
            //     const itms = (response.data !== undefined && response.data.length > 0) ?response.data.map(i => ({
            //         ...i,
            //     })):[];
            //     console.log("tecnicos recibidos")
            //     console.debug(itms);
            //     tecnicosHandle({type: SUBTABLE_ACTIONS.LOAD_ITEMS, items: itms, pages: response.totalPages});
            // });
        }
    }

    const initForm = () => {
        const lang = getLanguageId();
        fetchAPIData('/silefe.cofinanciadas/all', { }, referer).then(response => {
            form.fields.entidadId.change = () => { };
            form.fields.entidadId.options = (response.data !== undefined && response.data.length > 0)?response.data.map(obj => { return { value: obj.id, label: obj.descripcion[lang] } }):[];
        });
        fetchAPIData('/silefe.colectivo/all', { lang: getLanguageId() }, referer).then(response => {
            const opts = [{ value: "0", label: "Seleccionar" }, ...response.data.map(obj => { return { value: obj.id, label: obj.descripcion[lang] } })];
            form.fields.colectivos.options = opts;
        });
        fetchAPIData('/silefe.convocatoria/all', { }, referer).then(response => {
            form.fields.convocatoriaId.options = response.data.map(obj => { return { value: obj.id, label: obj.descripcion[lang] } });
        });
        //fetchAPIData('/silefe.tecnico/all', {lang: getLanguageId()},referer).then(response => {
        //    form.fields.tecnicos.options = response.data.map(obj => {return {value:obj.id,label:obj.firstName}}); 
        //});

        form.fields.porcentaje_total.change = (val) => itemsHandle({ type: ITEMS_ACTIONS.SETUNCOLATERAL, fieldname: 'porcentaje_cofinanciacion', value: 100 - val });
        form.fields.porcentaje_cofinanciacion.change = (val) => itemsHandle({ type: ITEMS_ACTIONS.SETUNCOLATERAL, fieldname: 'porcentaje_total', value: 100 - val });
    }

    const plugin = () => {
        return {
            Ofertas: <DoubleTable
                data={ofertas}
                handler={ofertasHandle}
                editUrl={"/oferta/"}
                backUrl={"/proyecto/"}
                ancestorId={items.item.id}
            />,
            Acciones:
                <DoubleTable
                    data={acciones}
                    handler={accionesHandle}
                    editUrl={"/accion/"}
                    backUrl={"/proyecto/"}
                    ancestorId={items.item.id}
                />,
            OParticipantes:
                <DoubleTable
                    data={participantes}
                    handler={participantesHandle}
                    editUrl={"/participante/"}
                    backUrl={"/proyecto/"}
                    ancestorId={items.item.id}
                />,
            Empresas:
                <DoubleTable
                    data={empresas}
                    handler={empresasHandle}
                    editUrl={"/empresa/"}
                    backUrl={"/proyecto/"}
                    ancestorId={items.item.id}
                />,
            Tecnicos:
                <DoubleTable
                    data={tecnicos}
                    handler={tecnicosHandle}
                    editUrl={"/empresa/"}
                    backUrl={"/proyecto/"}
                    ancestorId={items.item.id}
                />,
            Historico: 
                <FHistoryEntity
                    data={historico}
                    handler={historicoHandle}
                />
        }
    }

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
export default Proyectos;
