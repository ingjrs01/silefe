import React,{useEffect,useReducer,useRef,useState} from "react";
import TabsForm from '../../includes/interface/TabsForm';
import Table from '../../includes/interface/Table';
import Menu from '../Menu';
import {useModal} from '@clayui/modal';
import { getUserId, getLanguageId, url_referer} from '../../includes/LiferayFunctions';
import {red_items,ITEMS_ACTIONS, initialState} from '../../includes/reducers/items.reducer';
import {SUBTABLE_ACTIONS,iniState,reducerSubtable} from '../../includes/reducers/subtable.reducer';
import { deleteAPI, fetchAPIData, saveAPI } from "../../includes/apifunctions";
import {LoadFiles} from '../../includes/interface/LoadFiles'
import {FAvisos} from '../../includes/interface/FAvisos'
import { FModal } from '../../includes/interface/FModal';
import { Errors } from '../../includes/Errors';
import {form as formulario} from './Form';
import { Paginator } from "../../includes/interface/Paginator";
import AccionesTable from "./AccionesTable";
//import OfertasTable from './OfertasTable';
import {form as aform} from './AccionForm';
import {form as oform} from './OfertaForm';
import {form as pform} from './ParticipantesForm';
import {form as eform} from './EmpresaForm';
//import {form as formulario} from './ProyectoForm2';
//import OfertasRender from './OfertasRender';
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

    const referer = `${url_referer}/proyectos`;
    const form = formulario;

    
    useEffect(()=>{
        if (!isInitialized.current) {
            accionesHandle({type: SUBTABLE_ACTIONS.SETFORM,form: aform});
            ofertasHandle({type: SUBTABLE_ACTIONS.SETFORM, form: oform});
            participantesHandle({type:SUBTABLE_ACTIONS.SETFORM,form: pform});
            empresasHandle({type: SUBTABLE_ACTIONS.SETFORM,form:eform});
            fetchData();
			isInitialized.current = true;
		} else {
			const timeoutId = setTimeout(fetchData, 350);
			return () => clearTimeout(timeoutId);
		}
    },[items.load]);

    useEffect ( ()=> {
        loadAcciones();
    },[acciones.load]);

    useEffect( ()=> {
        loadOfertas();
    }, [ofertas.load]);

    useEffect( () => {
        loadParticipantes();
    }, [participantes.load]);

    useEffect( ()=>{
        loadEmpresas();
    },empresas.load);

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

    const handleDelete = () => {
        if (items.arr.filter(item => item.checked).length > 0)
            onOpenChange(true);        
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

    const beforeEdit = () => {
        loadAcciones();
        loadOfertas();
        loadParticipantes();
        loadEmpresas();
    }

    const miEvento = () => {
        console.log("Soy una cuchara");
    }
    const cofinanciacionChange = (value) => {
        if (value == false) {
            // cambiamos el estado
        }
    }

    const fetchData = async () => {
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
        let {data,totalPages,page, totalItems} = await fetchAPIData('/silefe.proyecto/filter',postdata,referer);
        const tmp = await data.map(i => ({
                ...i,
                id            : i.proyectoId,
                nparticipantes: i.participantes,
                inicio        : (i.inicio != null)?new Date(i.inicio).toISOString().substring(0, 10):"",
                fin           : (i.fin != null)?new Date(i.fin).toISOString().substring(0, 10):"",
                checked       : false
            })
        );
        await itemsHandle({type:ITEMS_ACTIONS.START,items:tmp, fields: form,totalPages:totalPages, total: toastItems,page:page});
    }
    
    const loadAcciones =  () => {
        const selected = items.arr.filter(item => item.checked).map( i => {return i.id})
        if (selected.length > 0) {    
            const postdata = {
                pagination:  {page: acciones.pagination.page, pageSize: 5},
                options: {
                    filters: [{name: "proyectoId", value: selected[0]}],
                }
            }
            fetchAPIData('/silefe.accion/filter',postdata,referer).then(response => {
                accionesHandle({type:SUBTABLE_ACTIONS.LOAD_ITEMS, items:response.data, pages: response.totalPages});
            });
        }
    }

    const loadParticipantes = () => {
        const selected = items.arr.filter(item => item.checked).map( i => {return i.id})
        if (selected.length > 0) {    
            const postdata = {
                id: selected[0],
                options: {
                    pagination:  {page: participantes.pagination.page, pageSize: 5},
                    filters: [{name: "proyectoId", value: selected[0]}],
                }
            }
            fetchAPIData('/silefe.participante/filter-by-project',postdata,referer).then(response => {
                participantesHandle({type:SUBTABLE_ACTIONS.LOAD_ITEMS, items:response.data, pages: response.totalPages});
            });
        }
    }

    const loadEmpresas = () => {
        const selected = items.arr.filter(item => item.checked).map( i => {return i.id})
        if (selected.length > 0) {    
            const postdata = {
                id : selected[0], // TODO: esto cambiar por el projectId
                options: {
                    pagination:  {page: empresas.pagination.page, pageSize: 5},
                    filters: [{name: "proyectoId", value: selected[0]}],
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

    const loadOfertas = () => {
        const selected = items.arr.filter(item => item.checked).map( i => {return i.id})
        if (selected.length > 0) {    
            const postdata = {
                pagination:  {page: acciones.pagination.page, pageSize: 5},
                options: {
                    filters: [{name: "proyectoId", value: selected[0]}],
                }
            };            
            fetchAPIData('/silefe.oferta/filter',postdata,referer).then(response => {
                const itms = response.data.map(i => ({
                    ...i,
                    fechaIncorporacion: (i.fechaIncorporacion != null)?new Date(i.fechaIncorporacion).toISOString().substring(0, 10):"",
                    //fechaIncorporacion: (i.fechaIncorporacion != null)?new Date(i.fechaIncorporacion).toISOString().substring(0, 10):"",
                }));
                ofertasHandle({type:SUBTABLE_ACTIONS.LOAD_ITEMS, items:itms, pages: response.totalPages});
            });
        }
    }

    const initForm = () => {
        fetchAPIData('/silefe.cofinanciadas/all', {lang: getLanguageId() },referer).then(response => {
            form.fields.entidadId.change = miEvento;
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
        form.fields.cofinanciacion.change = cofinanciacionChange;
    }

    const notify = () => {
        console.log("notify");
    }

    const plugin = () => {        
        return {
            Ofertas: <AccionesTable 
                data={ofertas}
                handler={ofertasHandle}
                editUrl={"/oferta/"}
                backUrl={"/proyectos"}
            />,
            Acciones: 
                <AccionesTable 
                    data={acciones}
                    handler={accionesHandle}
                    editUrl={"/accion/"}
                    backUrl={"/proyectos"}
                />,
            Participantes: 
                <AccionesTable
                    data={participantes}
                    handler={participantesHandle}
                    editUrl={"/participante"}
                    backUrl={"/participantes"}
                />,
            Empresas: 
                <AccionesTable
                    data={empresas}
                    handler={empresasHandle}
                    editUrl={"/empresa"}
                    backUrl={"/empresas"}
                />
}
    }

    if (!items || items.arr.length == 0) 
    return (<div>{Liferay.Language.get('Cargando')}</div>)

    return (
        <>
            <Menu 
                handleSave={handleSave} 
                handleDelete={handleDelete} 
                itemsHandle={itemsHandle}
                status={items.status}
                loadCsv={loadCsv}
                beforeEdit={beforeEdit}
                items={items}
                formulario={formulario}
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
                    notify={notify}
                    plugin={plugin}
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
export default Proyectos;
