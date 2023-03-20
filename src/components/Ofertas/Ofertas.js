import React,{useEffect,useReducer,useRef,useState} from "react";
//import DefaultForm from '../../includes/interface/DefaultForm';
import TabsForm from '../../includes/interface/TabsForm';
import Table from '../../includes/interface/Table';
import Menu from '../Menu';
import {useModal} from '@clayui/modal';
import { getUserId} from '../../includes/LiferayFunctions';
import {red_items,ITEMS_ACTIONS} from '../../includes/reducers/items.reducer';
import { getLanguageId } from '../../includes/LiferayFunctions';
import Papa from "papaparse";
import { batchAPI, deleteAPI, fetchAPIData, saveAPI } from "../../includes/apifunctions";
import {LoadFiles} from '../../includes/interface/LoadFiles'
import {FAvisos} from '../../includes/interface/FAvisos'
import { FModal } from '../../includes/interface/FModal';
import { Errors } from '../../includes/Errors';
import {form as formulario} from './OfertaForm';
import { reducerCandidatos, CANDIDATOS_ACTIONS } from "../../includes/reducers/candidatos.reducer";

const Ofertas = () => {
    const [items,itemsHandle]               = useReducer(red_items,{arr:[],item:{id:0},totalPages:0,page:0,load:0});
    const [redCandidatos, candidatosHandle] = useReducer(reducerCandidatos);
    const [toastItems,setToastItems]        = useState([]);    
    const {observer, onOpenChange, open}    = useModal();
    const [file,setFile]                    = useState();
    const isInitialized                     = useRef;

    const referer = "http://localhost:8080/oferta";
    const form = formulario;

    useEffect(()=>{
		if (!isInitialized.current) {
            fetchData();
			isInitialized.current = true;
		} else {
			const timeoutId = setTimeout(fetchData, 350);
			return () => clearTimeout(timeoutId);
		}
    },[items.load]);

    const loadCsv = () => {
        console.log("Cargando un csv");
        itemsHandle({type:ITEMS_ACTIONS.LOAD})
    }

    const processCsv = () => {
        console.log("processCsv");
    }

    const handleSave = async () => {
        console.log("handleSave");
        const data = {
            id: items.item.id,
            obj: {
              ...items.item,
            },
            userId :getUserId(),
        }

        let endpoint = '/silefe.oferta/save-oferta';
        if (items.status === 'new')
            endpoint = '/silefe.oferta/add-oferta';

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
        deleteAPI('/silefe.oferta/delete-ofertas',s,referer).then(res => {
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
        console.log("loadSelects");
    }

    const miEvento = () => {
        console.log("Soy una cuchara");
    }

    const plugin2 = () => {
      console.log("probando el plutin");
    }

    const notify = () => {
      console.log("Accediendo a notify");
    }

    const fetchData = async () => {
        const postdata = {
            page:         items.page,
            nombre: (items.search && typeof items.search !== 'undefined')?items.search:""
        }
        const seleccionarlabel = Liferay.Language.get('Seleccionar');
        const opciones_requerido = [{ value: "0", label: seleccionarlabel }, { value: "1", label: "Recomendable" }, { value: "2", label: "Obligatorio" }];
        // consultado las edades
        fetchAPIData('/silefe.edad/all', {lang: getLanguageId()},referer).then(response => {
            const opts = [ {value:"0",label:"Seleccionar"} ,...response.data.map(obj => {return {value:obj.id,label:obj.descripcion}})];
            form.fields.edadId.options = opts;
        });
        // consultando las empresas
        fetchAPIData('/silefe.empresa/all', {lang: getLanguageId()},referer).then(response => {
            const opts = [ {value:"0",label:"Seleccionar"} ,...response.data.map(obj => {return {value:obj.id,label:obj.razonSocial}})];
            form.fields.empresaId.options = opts;
        });
        // consultados los centros.
        fetchAPIData('/silefe.empresacentros/filter-by-empresa', {empresaId: 1},referer).then(response => {
            console.log("centros");
            console.debug(response);
            const opts = [ {value:"0",label:"Seleccionar"} ,...response.data.map(obj => {return {value:obj.empresaCentrosId,label:obj.nombre}})];
            form.fields.centroId.options = opts;
        });
        // consultados los proyectos
        fetchAPIData('/silefe.proyecto/all', {lang: getLanguageId()},referer).then(response => {
            const opts = [ {value:"0",label:"Seleccionar"} ,...response.data.map(obj => {return {value:obj.id,label:obj.descripcion}})];
            form.fields.proyectoId.options = opts;
        });
        // consulto los cno's
        fetchAPIData('/silefe.cno/all', {lang: getLanguageId()},referer).then(response => {
            const opts = [ {value:"0",label:"Seleccionar"} ,...response.data.map(obj => {return {value:obj.id,label:obj.descripcion}})];
            form.fields.puestoId.options = opts;
        });
        // cargamos las cna's
        fetchAPIData('/silefe.cnae/all', {lang: getLanguageId()},referer).then(response => {
            const opts = [ {value:"0",label:"Seleccionar"} ,...response.data.map(obj => {return {value:obj.id,label:obj.descripcion}})];
            form.fields.cnaeId.options = opts;
        });
        // cargamos los tipos de contrato
        fetchAPIData('/silefe.tipocontrato/all', {lang: getLanguageId()},referer).then(response => {
            const opts = [ {value:"0",label:"Seleccionar"} ,...response.data.map(obj => {return {value:obj.id,label:obj.descripcion}})];
            form.fields.tipoContratoId.options = opts;
        });
        // cargamos los candidatos: 
        fetchAPIData('/silefe.carnet/all', {lang: getLanguageId()},referer).then(response => {
            const opts = [ {value:"0",label:"Seleccionar"} ,...response.data.map(obj => {return {value:obj.id,label:obj.descripcion}})];
            form.fields.permisos.options = opts;
        });
        const ofertaId = 1;
        fetchAPIData('/silefe.oferta/participantes-oferta', {ofertaId:ofertaId},referer).then(response => {
            const opts = [ {value:"0",label:"Seleccionar"} ,...response.data.map(obj => {return {value:obj.id,label:obj.descripcion}})];
            console.log("datos");
        });
      

        form.fields.titulacionRequerido.options = opciones_requerido;
        form.fields.idiomasRequerido.options = opciones_requerido;
        form.fields.informaticaRequerido.options = opciones_requerido;
        form.fields.experienciaRequerido.options = opciones_requerido;
        form.fields.generoId.options = [{value:"0",label:seleccionarlabel},{value:"1",label:"Hombre"},{value:"2",label:"Mujer"}];
        form.fields.estado.options = [{value:"0",label:seleccionarlabel},{value:"1",label:"Activa"},{value:"2",label:"Con Inserción"},{value:"3",label:"Cerrada"}];
        form.fields.jornadaId.options = [{value:"0",label:seleccionarlabel},{value:"1",label:Liferay.Language.get("Completa")},{value:"2",label:Liferay.Language.get("Parcial")}];

        let {data,totalPages,page} = await fetchAPIData('/silefe.oferta/filter',postdata,referer);
        await console.log("datos recibidos");
        await console.debug(data);
        const tmp = await data.map(i => {            
            console.log(i);
            return({
                ...i,
                id                 : i.ofertaId,
                fechaIncorporacion : (i.fechaIncorporacion != null)?new Date(i.fechaIncorporacion).toISOString().substring(0, 10):"",
                checked            : false
            });
        });
        await itemsHandle({type:ITEMS_ACTIONS.START,items:tmp, fields: form,totalPages:totalPages,page:page});
    }

    if (!items) 
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
            />
            { (items.status === 'load') && 
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
                    notify={notify}
                    plugin={plugin2}
                />
            }
            {
                (items.status === 'list') &&
                <Table 
                    items={items} 
                    itemsHandle={itemsHandle} 
                />
            }
            <FAvisos toastItems={toastItems} setToastItems={setToastItems} />
            {open && <FModal  onOpenChange={onOpenChange} confirmDelete={confirmDelete} observer={observer} /> }
        </>
    )
}
export default Ofertas;
