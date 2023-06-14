import React,{useEffect,useReducer,useRef,useState} from "react";
import DefaultForm from '../../includes/interface/DefaultForm';
import Table from '../../includes/interface/Table';
import Menu from '../Menu';
import {useModal} from '@clayui/modal';
import { getUserId, getLanguageId, url_referer} from '../../includes/LiferayFunctions';
import {red_items,ITEMS_ACTIONS, initialState} from '../../includes/reducers/items.reducer';
import { deleteAPI, fetchAPIData, saveAPI } from "../../includes/apifunctions";
import {LoadFiles} from '../../includes/interface/LoadFiles'
import {FAvisos} from '../../includes/interface/FAvisos'
import { FModal } from '../../includes/interface/FModal';
import { Errors } from '../../includes/Errors';
import {form as formulario} from './ProyectoForm2';
import { Paginator } from "../../includes/interface/Paginator";
//import Papa from "papaparse";

const Proyectos = () => {
    const [items,itemsHandle]            = useReducer(red_items,initialState);
    const [toastItems,setToastItems]     = useState([]);    
    const {observer, onOpenChange, open} = useModal();
    const [file,setFile]                 = useState();
    const isInitialized                  = useRef(null);

    const referer = `${url_referer}/proyectos`;
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
        console.log("loadSelects");
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
        const tmp = await data.map(i => {            
            return({
                ...i,
                id                       : i.proyectoId,
                inicio                   : (i.inicio != null)?new Date(i.inicio).toISOString().substring(0, 10):"",
                fin                      : (i.fin != null)?new Date(i.fin).toISOString().substring(0, 10):"",
                //colectivos               : i.colectivos.map(colectivo => {return colectivo.toString()} ),
                //tecnicos                 : i.tecnicos.map(tecnico=> {return tecnico.toString()} ),
                checked                  : false
            });
        });
        await itemsHandle({type:ITEMS_ACTIONS.START,items:tmp, fields: form,totalPages:totalPages, total: toastItems,page:page});
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
        fetchAPIData('/silefe.tecnico/all', {lang: getLanguageId()},referer).then(response => {
            form.fields.tecnicos.options = response.data.map(obj => {return {value:obj.id,label:obj.firstName}}); 
        });
        form.fields.cofinanciacion.change = cofinanciacionChange;
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
                <DefaultForm
                    save={handleSave}
                    itemsHandle={itemsHandle}
                    items={items}
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
