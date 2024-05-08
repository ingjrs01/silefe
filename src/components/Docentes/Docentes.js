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
import { SimpleTable } from '../../includes/interface/SimpleTable';
import Table from '../../includes/interface/Table';
import TabsForm from "../../includes/interface/TabsForm";
import { TitulacionesRender } from '../../includes/interface/TitulacionesRender';
import { ITEMS_ACTIONS, REDUCER_ACTIONS, TITULACIONES_ACTIONS } from '../../includes/reducers/actions';
import { HISTORICO_ACTIONS, initialState as iniHis, reducerHistorico } from '../../includes/reducers/historico.reducer';
import { initialState, red_items } from '../../includes/reducers/main.reducer';
import { initialState as iniExperiencias, reducerItems } from '../../includes/reducers/tabItem.reducer';
import { reducerTitulacion, initialState as titsIni } from '../../includes/reducers/titulaciones.reducer';
import { formatEmails, formatPhones, formatPost, toDate, toHours, toURL } from '../../includes/utils';
import Menu from '../Menu';
import { form as experienciasForm } from './Formularios/Experiencias';
import { form } from './Formularios/Form';
import { form as titulacionesForm } from './Formularios/Titulaciones';


const Docentes = ({user}) => {
    const [items, itemsHandle] = useReducer(red_items, initialState);
    const [redTitulaciones, titulacionHandler] = useReducer(reducerTitulacion, titsIni);
    const [redExperiencias, experienciasHandler] = useReducer(reducerItems, iniExperiencias);
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
    const newElement = () => {
        historicoHandle({type: HISTORICO_ACTIONS.START});
        titulacionHandler({type: TITULACIONES_ACTIONS.START, form: titulacionesForm});
        experienciasHandler({type: REDUCER_ACTIONS.EMPTY});
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

    const beforeExperiencia = (docenteId) => {
        fetchAPIData('/silefe.experienciaparticipante/filter-by-docente', { docente: docenteId }, referer).then(response => {
            console.log("recibidas las experiencias");
            console.debug(response);
            const experiencias = response.data.map(item => {
                return {
                    ...item,
                    id: item.experienciaParticipanteId??0,
                    participanteId: docenteId,
                    ini: toDate(item.inicio),
                    fin: toDate(item.fin),
                }
            });
            console.log("las experiencias a pasar son: ");
            console.debug(experiencias);
            experienciasHandler({ type: REDUCER_ACTIONS.LOAD_ITEMS, items: experiencias, participanteId: docenteId });
        });
    }

    const beforeEdit = (id) => {
        const docenteId = (typeof (id) === 'int')?id:id.id;        
        const lang = getLanguageId();
        
        fetchAPIData('/silefe.docente/formaciones-by-docente', { docenteId: docenteId }, referer).then(response => {
            const tits = response.data.map(i => ({
                ...i,
                //id: i.formacionParticipanteId,
                titulacionName: i.titulacion[lang],
            }));
            titulacionHandler({ type: TITULACIONES_ACTIONS.LOAD_ITEMS, items: tits })
        }).catch((e) => {
            console.log("Error cargando las titulaciones de un alumno");
            console.error(e);
        })
        beforeExperiencia(docenteId);
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
        const pdata = {
            id: items.item.id,
            obj: {
                ...items.item,
                userId: getUserId(),
                titulaciones: redTitulaciones.items.map(item => item.titulacionId),
            },
        }
        
        let endpoint = '/silefe.docente/save-docente';
        if (items.status === 'new')
            endpoint = '/silefe.docente/add-docente';
        let { data, status, error } = await saveAPI(endpoint, pdata, referer);
        if (status) {

            const obj3 = { experiencias: redExperiencias.items.map(i => ({...i,participanteId: data.docenteId , tipo: 2})), userId: getUserId() };
            const respon = await saveAPI('/silefe.experienciaparticipante/add-multiple', obj3, referer);
            if (!respon.status)
                console.error("Error realizando la petición");
            
            // Tenemos que borrar las experiencas borradas
            if (redExperiencias.deleted.length > 0) {
                const delExperiencias = redExperiencias.deleted.map(d => { return (d.experienciaParticipanteId) });
                deleteAPI('/silefe.experienciaparticipante/remove-experiencias', delExperiencias, referer).then(res => {
                    console.log("delete experiencias");
                    //if (res) {
                    //    setToastItems([...toastItems, { title: Liferay.Language.get('Borrar'), type: "info", text: Liferay.Language.get('Borrado_ok') }]);
                    //}
                });
            }

            fetchData();
            setToastItems([...toastItems, { title: Liferay.Language.get("Guardar"), type: "info", text: Liferay.Language.get("Guardado_correctamente") }]);
        }
        else
            setToastItems([...toastItems, { title: Liferay.Language.get("Guardar"), type: "danger", text: Errors[error] }]);

        if (state !== undefined && state.backUrl.length > 0)
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
    form.handleNew = newElement;

    const fetchData = async () => {
        if (form.fields.provinciaId.options === undefined) {
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
                    adjuntos: i.adjuntos.map(a => ({ ...a, edit: false, src : toURL(a.uuid, a.groupId) })),
                    checked: false,
                })
        });
        await itemsHandle({ type: ITEMS_ACTIONS.LOAD_ITEMS, items: tmp, totalPages: totalPages, total: totalItems, page: page });
    }

    const queryTitulaciones = () => {
        const lang = getLanguageId();
        fetchAPIData('/silefe.titulaciontipo/all', { descripcion: "" }, referer).then(response => {
            const opts = response.data.map(item => ({
                ...item,
                value: item.titulacionTipoId,
                label: item.descripcion[lang]
            }));
            titulacionesForm.fields.titulacionTipoId.options = opts;
        });
        
        fetchAPIData('/silefe.titulacionnivel/all', { descripcion: "" }, referer).then(response => {
            const opts = response.data.map(item => ({ ...item, descripcion: item.descripcion[lang], tipo: item.tipo[lang] }));
            titulacionesForm.fields.titulacionNivelId.all = opts;
            titulacionesForm.fields.titulacionNivelId.options = opts.filter(o => o.titulacionTipoId === titulacionesForm.fields.titulacionTipoId.options[0].id ).map(t => ({
                value: t.id, 
                label: t.descripcion
            }));
        });
        
        fetchAPIData('/silefe.titulacionfam/all', { descripcion: "" }, referer).then(response => {
            const opts = response.data.map(item => ({ ...item, descripcion: item.descripcion[lang] }));
            titulacionesForm.fields.titulacionFamiliaId.all = opts;
            titulacionesForm.fields.titulacionFamiliaId.options = opts.filter(o => 
                o.titulacionNivelId === titulacionesForm.fields.titulacionNivelId.options[0].value).map(t => ({
                    value:t.id,
                    label: t.descripcion,
                }));
        });
        fetchAPIData('/silefe.titulacion/all', {}, referer).then(response => {
            console.log("recibidas titulaciones");
            const opts = response.data.map(item => ({ ...item, descripcion: item.descripcion[lang] }));
            titulacionesForm.fields.titulacionId.all = opts;
            titulacionesForm.fields.titulacionId.options = opts.filter(o => 
                o.titulacionFamiliaId === titulacionesForm.fields.titulacionFamiliaId.options[0].value).map(t => ({value:t.id, label: t.descripcion}));

            form.fields.titulacion.options = opts.map(a => ({value:a.id, label: a.descripcion}));

        });
        titulacionHandler({ type: TITULACIONES_ACTIONS.START, form: titulacionesForm });
    }

    const initForm = async () => {
        const lang = getLanguageId();
        const seleccionarlabel = Liferay.Language.get('Seleccionar');

        fetchAPIData('/silefe.provincia/all', { }, referer).then(response => {
            const opts = [{ value: "0", label: seleccionarlabel }, ...response.data.map(obj => { return { value: obj.id, label: obj.nombre[lang] } })];
            form.fields.provinciaId.options = opts;
        });

        fetchAPIData('/silefe.tiposvia/all', { page: 0, province: 1 }, referer).then(response => {
            const opts = [{ value: "0", label: seleccionarlabel }, ...response.data.map(obj => { return { value: obj.id, label: obj.nombre[lang] } })];
            form.fields.tipoviaId.options = opts;
        });
        form.fields.tipoDoc.options = [{ value: "0", label: seleccionarlabel }, { value: "1", label: "DNI" }, { value: "2", label: "NIE" }, { value: "3", label: "Pasaporte" }];
        form.fields.sexo.options = [{ key: 0, value: "H", label: Liferay.Language.get('Hombre') }, { key: 1, value: "M", label: Liferay.Language.get('Mujer') }];

        queryTitulaciones();

        fetchAPIData('/silefe.tipocontrato/all', {}, referer).then(response => {
            const opts = response.data.map(item => ({ value: item.tipoContratoId, label: item.descripcion[lang] }));
            //form.fields.insTipoContrato.options = opts;
            experienciasForm.fields.tipoContratoId.options = opts;
        });

        fetchAPIData('/silefe.cno/all', { descripcion: "" }, referer).then(response => {
            const opts = response.data.map(item => ({ value: item.id, label: item.descripcion[lang] }));
            experienciasForm.fields.ocupacionId.options = opts;
            //form.fields.insPuesto.options = opts;
            //experienciasHandler({ type: EXPERIENCIA_ACTIONS.OCUPACIONES, ocupaciones: opts });
        });        

        fetchAPIData('/silefe.mbaja/all', {}, referer).then(response => {
            const motivos = response.data.map(item => ({ value: item.id, label: item.descripcion[lang] }));//.unshift({ id: 0, descripcion: " " });
            experienciasForm.fields.motivoBajaId.options = motivos;
        });

        itemsHandle({ type: ITEMS_ACTIONS.SET_FIELDS, form });
        experienciasHandler({ type: REDUCER_ACTIONS.START, form: experienciasForm });
    }

    const changeProvince = (id) => {
        const lang = getLanguageId();
        fetchAPIData('/silefe.municipio/filter-by-province', { page: 0, province: id }, referer).then(response => {
            const opts = [{ value: "0", label: Liferay.Language.get('Seleccionar') }, ...response.data.map(obj => { return { value: obj.id, label: obj.nombre[lang] } })];
            itemsHandle({ type: ITEMS_ACTIONS.SET_FORMOPTIONS, fieldname: 'municipioId', options: opts });
        });
    }

    const plugin = () => {
        return {
            Titulaciones:
                <TitulacionesRender
                    redTitulaciones={redTitulaciones}
                    titulacionHandler={titulacionHandler}
                />,
            Experiencias:
                <SimpleTable
                    reducer={redExperiencias}
                    handler={experienciasHandler}
                />,            
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
            
            if (id !== undefined && id > 0) 
                loadDocente(id);
            else
                fetchData();

            isInitialized.current = true;
        } else {
            if (id !== undefined && id > 0)
                loadDocente(id)
            else {
                const timeoutId = setTimeout(fetchData, 350);
                return () => clearTimeout(timeoutId);
            }
        }
    }, [items.load]);

    useEffect(() => {
        if (items.item.provinciaId !== undefined && items.item.provinciaId > 0) {
            changeProvince(items.item.provinciaId);
        }

    }, [items.item.provinciaId]);

    const loadDocente = (id) => {
        fetchAPIRow('/silefe.docente/get', { id: id }, referer).then(i => {
            const data = {
                ...i,
                data: {
                    ...i.data,
                    fechaNacimiento: toDate(i.data.fechaNacimiento),
                    email: formatEmails(i.data.email),
                    telefono: formatPhones(i.data.telefono),
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
