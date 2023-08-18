import React, {useEffect, useReducer, useRef, useState} from "react";
import AccionesForm from "./AccionesForm";
import Menu from '../Menu';
import Table from '../../includes/interface/Table';
import {useModal} from '@clayui/modal';
import { getUserId, getLanguageId, url_referer} from '../../includes/LiferayFunctions';
import {red_items,ITEMS_ACTIONS, initialState} from '../../includes/reducers/items.reducer';
import { EJECUCION_ACTIONS,iniState as iniEjecucion, reducerEjecucion} from './Ejecucion.reducer';
import { deleteAPI, fetchAPIData, saveAPI, deleteAPIParams, fetchAPIRow } from "../../includes/apifunctions";
import {LoadFiles} from '../../includes/interface/LoadFiles'
import {FAvisos} from '../../includes/interface/FAvisos'
import { FModal } from '../../includes/interface/FModal';
import { Errors } from '../../includes/Errors';
import { form as formulario} from './Form';
import { Paginator } from "../../includes/interface/Paginator";
import {reducerDocentes, DOCENTE_ACTIONS, initialDocentes} from '../../includes/reducers/docentes.reducer'; 
import {reducerParticipantes, PARTICIPANTE_ACTIONS, initialParticipantes} from '../../includes/reducers/participantes.reducer';
import { useLocation, useNavigate, useParams } from "react-router-dom";
//import Papa from "papaparse";

const Acciones = () => {
    const [items,itemsHandle]                  = useReducer(red_items,initialState);
    const [docentes,docentesHandler]           = useReducer(reducerDocentes, initialDocentes);
    const [participantes,participantesHandler] = useReducer(reducerParticipantes, initialParticipantes);
    const [ejecucionT, ejecucionHandlerT]      = useReducer(reducerEjecucion, iniEjecucion);
    const [ejecucionP, ejecucionHandlerP]      = useReducer(reducerEjecucion, iniEjecucion);
    const [ejecucionG, ejecucionHandlerG]      = useReducer(reducerEjecucion, iniEjecucion);
    const [toastItems,setToastItems]           = useState([]);
    const {observer, onOpenChange, open}       = useModal();
    const [file,setFile]                       = useState();
    const isInitialized                        = useRef(null);
    const { id } = useParams();
    const {state} = useLocation();
    const navigate = useNavigate();

    let form = formulario;
    const referer = `${url_referer}/acciones`;

    const loadCsv = () => {
        itemsHandle({type:ITEMS_ACTIONS.LOAD});
    }

//    const processCsv = () => {
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
//    }

    const handleSave = async () => {
        const pdata = {
            id:  items.item.id,
            obj: items.item,
            userId:      getUserId()
        }

        let endpoint = '/silefe.accion/save-accion';
        if (items.status === 'new')
            endpoint = '/silefe.accion/add-accion';
        let {data, status, error} = await saveAPI(endpoint,pdata,referer);
        if (status) {
            const obj2 = {id:data.accionId,docentes:docentes.items,userId: getUserId()};
            let respon = await saveAPI('/silefe.accion/save-docentes-accion',obj2,referer);
            if (docentes.deleted.length > 0) {
                const deleteItems = docentes.deleted.map( d => {return (d.docenteId)});
                deleteAPIParams('/silefe.accion/delete-docentes-accion',{id: data.accionId, docentes: deleteItems},referer).then(res => {
                    console.log("se han borrad los docentes");
            })};
            const obj3 = {id:data.accionId,participantes:participantes.items,userId: getUserId()};
            respon = await saveAPI('/silefe.accion/save-participantes-accion',obj3,referer);
            if (participantes.deleted.length > 0) {
                const deleteItems = participantes.deleted.map(d => (d.participanteId));
                deleteAPIParams('/silefe.accion/delete-participantes-accion', {id: data.accionId, participantes: deleteItems},referer).then(res => {
                    console.log("Se han borrado los participantes");
                });
            }
            // Vamos a guardar las formaciones:
            const obj4 = {id: data.accionId, obj: ejecucionT.item};
            respon = await saveAPI('/silefe.formacionaccion/save-formacion-accion',obj4,referer);
            //debugger;
            fetchData();
            setToastItems([...toastItems, { title: Liferay.Language.get("Guardar"), type: "info", text: Liferay.Language.get("Guardado_correctamente") }]);
        }
        else
        setToastItems([...toastItems, { title: Liferay.Language.get("Guardar"), type: "danger", text: Errors[error] }]);

        if (state != 'undefined' && state.backUrl.length > 0)
            navigate(state.backUrl+state.ancestorId);

    }

    const handleDelete = () => {
        if (items.arr.filter(item => item.checked).length > 0)
            onOpenChange(true);
    }

    const confirmDelete = async () => {
        const endpoint = '/silefe.accion/delete-accioneso';
        let s = items.arr.filter(item => item.checked).map( i => {return i.id});
        deleteAPI(endpoint,s,referer).then(res => {
            if (res) {
                setToastItems([...toastItems, { title: Liferay.Language.get('Borrar'), type: "danger", text: Liferay.Language.get('Borrado_ok') }]);
                fetchData();
            }
            else
                setToastItems([...toastItems, { title: Liferay.Language.get('Borrar'), type: "danger", text: Liferay.Language.get('Borrado_no') }]);
        })
    }

    const fetchData = async () => {
        docentesHandler({type: DOCENTE_ACTIONS.START});
        participantesHandler({type: PARTICIPANTE_ACTIONS.START});
        ejecucionHandlerT({type:EJECUCION_ACTIONS.START});
        ejecucionHandlerP({type:EJECUCION_ACTIONS.START});
        ejecucionHandlerG({type:EJECUCION_ACTIONS.START});

        const postdata = {
            pagination: { page: items.pagination.page, pageSize: items.pagination.pageSize },
            options: {
                filters: [
                    {  name: items.searchField, value : (items.search && typeof items.search !== 'undefined')?items.search:""},
                ],
                order: items.order,
            },
        }

        if (form.fields.accionTipoId.options.length == 0) {
            loadForm();
        }

        let {data,totalPages, totalItems,page} = await fetchAPIData('/silefe.accion/filter',postdata,referer);
        const tmp = await data.map(i => {return({...i, checked:false})});
        await itemsHandle({type:ITEMS_ACTIONS.START,items:tmp, fields: form,totalPages:totalPages, total: totalItems,page:page});
    }

    const beforeEdit = () => {
        //debugger;
        fetchAPIData('/silefe.docente/all', {lang: getLanguageId()}).then(response => {
            const tits = response.data.map( i => {
                let tt = JSON.parse(i.email);
                //let tt = (i.email != null && i.email.length > 0)?JSON.parse(i.email)[0].value:""  ;

                //debugger;
                return {
                    ...i,
                    apellidos: i.apellido1 + " " + i.apellido2,
                    nuevo: true,
                    email: tt[0].value,
                }
            });
            docentesHandler({type: DOCENTE_ACTIONS.SETSEARCHITEMS,items:tits});
        })

        let sel = items.arr.filter(i => i.checked);
        if (sel.length > 0) {
            const accionId = sel[0].accionId;
            fetchAPIData('/silefe.accion/filter-docentes-by-accion', {accionId: accionId},referer).then(response => {
                const tits = response.data.map( i => {
                    let email = '';
                    if (i.email.length > 0)
                        email = JSON.parse(i.email)[0].value;

                    return {
                        ...i,
                        apellidos: i.apellido1 + " " + i.apellido2,
                        nuevo: false,
                        email: email
                    }
                });
                docentesHandler({type: DOCENTE_ACTIONS.SETITEMS,items:tits});
            });

            fetchAPIData('/silefe.accion/filter-participantes-by-accion', {accionId: accionId},referer).then(response => {
                const tits = response.data.map( i => {
                    let email = '';
                    if (i.email != null && i.email.length > 0)
                        email = JSON.parse(i.email)[0].value;

                    return {
                        ...i,
                        apellidos: i.apellido1 + " " + i.apellido2,
                        nuevo: false,
                        email: email
                    }
                });
                participantesHandler({type: PARTICIPANTE_ACTIONS.SETITEMS,items:tits});
            });
        }
    }

    const loadParticipantes = () => {
        let filters = [];
        if (participantes.search.length > 0)
            filters = [{name: participantes.searchField, value: participantes.search}];

        const postdata = {
            pagination: {
                page: participantes.pagination.page,
                pageSize: 4
            },
            options : {
                filters: filters,
                order: [{ name: 'apellido1', direction: 'asc'}],
                excludes: participantes.items.map(i => (i.participanteId)),
            },
        }

        fetchAPIData('/silefe.participante/filter',postdata,referer).then(response => {
            const pts = response.data.map( i => {
                let email = "";
                if (i.email != null && i.email.length > 0)
                    email = JSON.parse(i.email)[0].value;
                return {
                    ...i,
                    apellidos: i.apellido1 + " " + i.apellido2,
                    nuevo: true,
                    email: email
                }
            });
            const totalPages = response.totalPages;
            participantesHandler({type: PARTICIPANTE_ACTIONS.SETSEARCHITEMS,items:pts, totalPages: totalPages});
        });
    }

    const loadDocentes = () => {
        let filters = [];
        if (docentes.search.length > 0)
            filters = [{name: docentes.searchField, value: docentes.search}];

        const postdata = {
            pagination: {
                page: docentes.pagination.page,
                pageSize: 4
            },
            options : {
                filters: filters,
                order: [{ name: 'apellido1', direction: 'asc'}],
                excludes: docentes.items.map(i => (i.participanteId)),
            },
        }

        fetchAPIData('/silefe.docente/filter',postdata,referer).then(response => {
            const pts = response.data.map( i => {
                let email = "";
                if (i.email != null && i.email.length > 0)
                    email = JSON.parse(i.email)[0].value;
                return {
                    ...i,
                    apellidos: i.apellido1 + " " + i.apellido2,
                    nuevo: true,
                    email: email
                }
            });
            const totalPages = response.totalPages;
            docentesHandler({type: DOCENTE_ACTIONS.SETSEARCHITEMS,items:pts, totalPages: totalPages});
        });

    }

    const loadForm = () => {
        const langSel = Liferay.Language.get("Seleccionar");

        fetchAPIData('/silefe.acciontipo/all', { lang: getLanguageId() }, referer).then(response => {
            const opts = [{value: 0, label: langSel}, ...response.data.map(obj => { return { value: obj.id, label: obj.descripcion } })];
            form.fields.accionTipoId.options = opts;
        });

        fetchAPIData('/silefe.acciontipoformacion/all', { lang: getLanguageId() }, referer).then(response => {
            const opts = [{value: 0, label: langSel}, ...response.data.map(obj => { return { value: obj.id, label: obj.descripcion } })];
            form.fields.accionTipoFormacionId.options = opts;
        });

        //fetchAPIData('/silefe.tecnico/all', { lang: getLanguageId() }, referer).then(response => {
        //    const opts = [{value: 0, label: langSel}, ...response.data.map(obj => { return { value: obj.tecnicoId, label: obj.firstName } })];
        //    form.fields.tecnicoId.options = opts;
        //});

        fetchAPIData('/silefe.plataforma/all', {options: {}}, referer).then(response => {
            const opts = [{value: 0, label: langSel}, ...response.data.map(obj => { return { value: obj.plataformaId, label: obj.nombre } })];
            form.fields.plataformaId.options = opts;
        });

        fetchAPIData('/silefe.estado/all', { lang: getLanguageId() }, referer).then(response => {
            const opts = [{value: 0, label: langSel}, ...response.data.map(obj => { return { value: obj.estadoId, label: obj.nombre } })];
            form.fields.estadoId.options = opts;
        });

        // TODO: Categoria:
        form.fields.categoriaId.options = [{value: 0, label:langSel}, {value: 1, label: "Categoría"},{value: 2, label: "Sin Categoría"}];
        form.fields.cursoId.options = [{value: 0, label:langSel}, {value: 1, label: "Curso 1"},{value: 2, label: "Curso 2"}];
    }

    const loadAccion = (id) => {
        fetchAPIRow('/silefe.accion/get',{id:id},referer).then (r => itemsHandle({type:ITEMS_ACTIONS.EDIT_ITEM,item:r})) ;
    }

    useEffect(()=>{
		if (!isInitialized.current) {
            //debugger;
            loadForm();
            itemsHandle({type: ITEMS_ACTIONS.SET_FIELDS,form:form});
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
    },[items.load]);

    useEffect( () => {
        loadParticipantes()

    }, [participantes.load]);

    useEffect( () => {
        loadDocentes()
    }, [docentes.load])

    if (!items)
        return (<div>Liferay.Language.get('Cargando')</div>)

    return (
        <>
            <Menu
                handleSave={handleSave}
                handleDelete={handleDelete}
                itemsHandle={itemsHandle}
                status={items.status}
                loadCsv={loadCsv}
                items={items}
                beforeEdit={beforeEdit}
                formulario={formulario}
            />
            { (items.status === 'load') &&
            <LoadFiles
                setFile={setFile}
                processCsv={processCsv}
                itemsHandle={itemsHandle}
            />}
            { (items.status === 'edit' || items.status === 'new') &&
                <AccionesForm
                    save={ handleSave}
                    itemsHandle={itemsHandle}
                    items={items}
                    docentes={docentes}
                    docentesHandler={docentesHandler}
                    participantes={participantes}
                    participantesHandler={participantesHandler}
                    ejecucion={[ejecucionT,ejecucionP,ejecucionG]}
                    ejecucionHandler={[ejecucionHandlerT,ejecucionHandlerP,ejecucionHandlerG]}
                />
            }
            {
                (items.status === 'list') &&
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
            {open && <FModal  onOpenChange={onOpenChange} confirmDelete={confirmDelete} observer={observer} /> }
        </>
    )
}

export default Acciones;
