import { useModal } from '@clayui/modal';
import React, { useEffect, useReducer, useRef, useState } from "react";
import { Errors } from '../../includes/Errors';
import { getLanguageId, getUserId, url_referer } from '../../includes/LiferayFunctions';
import { deleteAPI, fetchAPIData, fetchAPIRow, saveAPI } from "../../includes/apifunctions";
import { FAvisos } from '../../includes/interface/FAvisos';
import { FModal } from '../../includes/interface/FModal';
import { LoadFiles } from '../../includes/interface/LoadFiles';
import { Paginator } from "../../includes/interface/Paginator";
import Table from '../../includes/interface/Table';
import TabsForm from '../../includes/interface/TabsForm';
import { ITEMS_ACTIONS, initialState, red_items } from '../../includes/reducers/items.reducer';
import { SUBTABLE_ACTIONS, iniState, reducerSubtable } from '../../includes/reducers/subtable.reducer';
import Menu from '../Menu';
import AccionesTable from "./AccionesTable";
import { form as formulario } from './Form';
//import OfertasTable from './OfertasTable';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { form as aform } from './AccionForm';
import { form as eform } from './EmpresaForm';
import { form as oform } from './OfertaForm';
import { form as pform } from './ParticipantesForm';
//import Papa from "papaparse";

const Proyectos = () => {
    const [items,itemsHandle]            = useReducer(red_items,initialState);
    const [acciones, accionesHandle]     = useReducer(reducerSubtable,iniState);
    const [ofertas, ofertasHandle]       = useReducer(reducerSubtable,iniState);
    const [participantes,participantesHandle] = useReducer(reducerSubtable,iniState);
    const [empresas, empresasHandle]     = useReducer(reducerSubtable, iniState);
    const [toastItems,setToastItems]     = useState([]);
    const {observer, onOpenChange, open} = useModal();
    const [file,setFile]                 = useState();
    const isInitialized                  = useRef(null);
    const {id}                           = useParams();
    const {state}                        = useLocation();
    const navigate                       = useNavigate();

    const referer = `${url_referer}/proyectos`;
    const form = formulario;
    
    useEffect(()=>{
        if (!isInitialized.current) {
            initForm();
            itemsHandle({type: ITEMS_ACTIONS.SET_FIELDS, form:form});
            accionesHandle({type: SUBTABLE_ACTIONS.SETFORM,form: aform});
            ofertasHandle({type: SUBTABLE_ACTIONS.SETFORM, form: oform});
            participantesHandle({type:SUBTABLE_ACTIONS.SETFORM,form: pform});
            empresasHandle({type: SUBTABLE_ACTIONS.SETFORM,form:eform});

            if (id != 'undefined' && id > 0)
                loadProyecto(id);
            else {
                fetchData();
            }

			isInitialized.current = true;
		} else {
            if (id != 'undefined' && id > 0)
                loadProyecto(id)
            else {
                const timeoutId = setTimeout(fetchData, 350);
                return () => clearTimeout(timeoutId);
            }
		}
    },[items.load]);

    useEffect ( ()=> {
        if (items.item.id != 'undefined' && items.item.id > 0)
            loadAcciones(items.item.id);
    },[acciones.load]);

    useEffect( ()=> {
        if (items.item.id != 'undefined' && items.item.id > 0)
            loadOfertas(items.item.id);
    }, [ofertas.load]);

    useEffect( () => {
        if (items.item.id != 'undefined' && items.item.id > 0)
            loadParticipantes(items.item.id);
    }, [participantes.load]);

    useEffect( ()=>{
        if (items.item.id != 'undefined' && items.item.id > 0)
            loadEmpresas(items.item.id);
    }, [empresas.load]);

    const loadProyecto = id => {
        initForm();
        beforeEdit(id);
        fetchAPIRow('/silefe.proyecto/get',{id:id},referer).then ((r) => {
            const datatmp = {
                ...r,
                data: {...r.data,
                    id            : r.data.proyectoId,
                    nparticipantes: r.data.participantes,
                    inicio        : (r.data.inicio != null)?new Date(r.data.inicio).toISOString().substring(0, 10):"",
                    fin           : (r.data.fin != null)?new Date(r.data.fin).toISOString().substring(0, 10):"",
                }
            }
            itemsHandle({type:ITEMS_ACTIONS.EDIT_ITEM,item:datatmp});
        }).catch(error => {
            console.log("error");
            console.debug(error);
        });

    }

    const loadCsv = () => {
        itemsHandle({type:ITEMS_ACTIONS.LOAD})
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
        const data = {
            id: items.item.id,
            obj: {
                ...items.item,
            },
            userId :getUserId(),
        }

        let endpoint = '/silefe.proyecto/save-proyecto';
        if (items.status === 'new')
            endpoint = '/silefe.proyecto/add-proyecto';

        let {status, error} = await saveAPI(endpoint,data,referer); 
        if (status) {
            fetchData();
            setToastItems([...toastItems, { title: Liferay.Language.get("Guardar"), type: "info", text: Liferay.Language.get('Guardado_correctamente') }]);
        }
        else {
            setToastItems([...toastItems, { title: Liferay.Language.get("Guardar"), type: "danger", text: Errors[error]}]);
        }
    }

    const confirmDelete = async () => {
        let s = items.arr.filter(item => item.checked).map( i => {return i.id});
        deleteAPI('/silefe.proyecto/remove-proyectos',s,referer).then(res => {
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
        if (id === undefined )
            lid = items.arr.filter(item=>item.checked)[0].id;
        else
            lid = id;

        if ( lid > 0) {
            loadAcciones(lid);
            loadOfertas(lid);
            loadParticipantes(lid);
            loadEmpresas(lid);
        }
    }

    const fetchData = () => {
        if (form.fields.entidadId.options == undefined) {
            initForm();
        }
        const postdata = {
            pagination:  {page: items.pagination.page, pageSize: items.pagination.pageSize},
            options: {
                filters: [
                    {name: items.searchField, value : (items.search && typeof items.search !== 'undefined')?items.search:""},
                ],
                order : items.order
            }
        }
        fetchAPIData('/silefe.proyecto/filter',postdata,referer).then(({data,totalPages,page, totalItems}) => {
            const tmp = data.map(i => ({
                ...i,
                id            : i.proyectoId,
                //nparticipantes: i.participantes,
                inicio        : (i.inicio != null)?new Date(i.inicio).toISOString().substring(0, 10):"",
                fin           : (i.fin != null)?new Date(i.fin).toISOString().substring(0, 10):"",
                checked       : false})
            );
            itemsHandle({type:ITEMS_ACTIONS.START,items:tmp, fields: form,totalPages:totalPages, total: toastItems,page:page});
        });
    }
    
    const loadAcciones =  (id) => {
        if (id != 'undefined' ) {

            const postdata = {
                pagination:  {page: acciones.pagination.page, pageSize: 5},
                options: {
                    filters: [{name: "proyectoId", value: id}],
                }
            }
            fetchAPIData('/silefe.accion/filter',postdata,referer).then(response => {
                accionesHandle({type:SUBTABLE_ACTIONS.LOAD_ITEMS, items:response.data, pages: response.totalPages});
            });
            
        }
    }

    const loadParticipantes = (id) => {
        if (id != 'undefined') {
            const postdata = {
                id: id,
                options: {
                    pagination:  {page: participantes.pagination.page, pageSize: 5},
                    filters: [{name: "proyectoId", value: id}],
                }
            }
            fetchAPIData('/silefe.participante/filter-by-project',postdata,referer).then(response => {
                const tmp = response.data.map( item => ({
                    ...item,
                    id: item.participanteId
                }));
                participantesHandle({type:SUBTABLE_ACTIONS.LOAD_ITEMS, items:tmp, pages: response.totalPages});
            });
        }
    }

    const loadEmpresas = (id) => {
        if (id != 'undefined') {
            const postdata = {
                id : id, // TODO: esto cambiar por el projectId
                options: {
                    pagination:  {page: empresas.pagination.page, pageSize: 5},
                    filters: [{name: "proyectoId", value: id}],
                }
            }
            fetchAPIData('/silefe.empresa/filter-by-project',postdata,referer).then(response => {
                const tmp = response.data.map( i => ({
                    ...i,
                    telefono: (i.telefono != null && i.telefono.length > 0)?JSON.parse(i.telefono)[0].value:"",
                }));
                empresasHandle({type:SUBTABLE_ACTIONS.LOAD_ITEMS, items:tmp, pages: response.totalPages});
            });
        }
    }

    const loadOfertas = (id) => {
        if (id != 'undefined') {
            const postdata = {
                pagination:  {page: acciones.pagination.page, pageSize: 5},
                options: {
                    filters: [{name: "proyectoId", value: id}],
                }
            };
            fetchAPIData('/silefe.oferta/filter',postdata,referer).then(response => {
                const itms = response.data.map(i => ({
                    ...i,
                    fechaIncorporacion: (i.fechaIncorporacion != null)?new Date(i.fechaIncorporacion).toISOString().substring(0, 10):"",
                }));
                ofertasHandle({type:SUBTABLE_ACTIONS.LOAD_ITEMS, items:itms, pages: response.totalPages});
            });
        }
    }

    const initForm = () => {
        fetchAPIData('/silefe.cofinanciadas/all', {lang: getLanguageId() },referer).then(response => {
            form.fields.entidadId.change = () => {};
            form.fields.entidadId.options = response.data.map(obj => {return {value:obj.id,label:obj.descripcion}}); 
        });
        fetchAPIData('/silefe.colectivo/all', {lang: getLanguageId()},referer).then(response => {
            //  [{value:"0",label:seleccionarlabel}, ...response.data.map(obj => {return {value:obj.id,label:obj.descripcion}})];
            const opts = [{value:"0",label: "Seleccionar"}, ...response.data.map(obj => {return {value:obj.id,label:obj.descripcion}})];
            form.fields.colectivos.options = opts;
        });
        fetchAPIData('/silefe.convocatoria/all', {lang: getLanguageId()},referer).then(response => {
            form.fields.convocatoriaId.options = response.data.map(obj => {return {value:obj.id,label:obj.descripcion}}); 
        });
        //fetchAPIData('/silefe.tecnico/all', {lang: getLanguageId()},referer).then(response => {
        //    form.fields.tecnicos.options = response.data.map(obj => {return {value:obj.id,label:obj.firstName}}); 
        //});
        
        form.fields.porcentaje_total.change = (val) =>  itemsHandle({type: ITEMS_ACTIONS.SETUNCOLATERAL, fieldname: 'porcentaje_cofinanciacion',  value: 100-val});
        form.fields.porcentaje_cofinanciacion.change = (val) => itemsHandle({type: ITEMS_ACTIONS.SETUNCOLATERAL, fieldname: 'porcentaje_total',  value: 100-val});
    }

    const plugin = () => {
        return {
            Ofertas: <AccionesTable
                data={ofertas}
                handler={ofertasHandle}
                editUrl={"/oferta/"}
                backUrl={"/proyecto/"}
                ancestorId={items.item.id}
                />,
            Acciones:
                <AccionesTable
                    data={acciones}
                    handler={accionesHandle}
                    editUrl={"/accion/"}
                    backUrl={"/proyecto/"}
                    ancestorId={items.item.id}
                />,
            OParticipantes:
                <AccionesTable
                    data={participantes}
                    handler={participantesHandle}
                    editUrl={"/participante/"}
                    backUrl={"/proyecto/"}
                    ancestorId={items.item.id}
                />,
            Empresas:
                <AccionesTable
                    data={empresas}
                    handler={empresasHandle}
                    editUrl={"/empresa/"}
                    backUrl={"/proyecto/"}
                    ancestorId={items.item.id}
                />
        }
    }

    return (
        <>
            <Menu
                handleSave={handleSave}
                itemsHandle={itemsHandle}
                status={items.status}
                loadCsv={loadCsv}
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
                <TabsForm
                    save={handleSave}
                    itemsHandle={itemsHandle}
                    items={items}
                    plugin={plugin}
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
            {open && <FModal  onOpenChange={onOpenChange} confirmDelete={confirmDelete} observer={observer} /> }
        </>
    )
}
export default Proyectos;
