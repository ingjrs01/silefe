import React,{useEffect,useReducer,useRef,useState} from "react";
import TabsForm from '../../includes/interface/TabsForm';
import Menu from '../Menu';
import Table from '../../includes/interface/Table';
import {useModal} from '@clayui/modal';
import { getUserId} from '../../includes/LiferayFunctions';
import {red_items,ITEMS_ACTIONS} from '../../includes/reducers/items.reducer';
import Papa from "papaparse";
import { batchAPI, deleteAPI, fetchAPIData, saveAPI } from "../../includes/apifunctions";
import {LoadFiles} from '../../includes/interface/LoadFiles'
import {FAvisos} from '../../includes/interface/FAvisos'
import { FModal } from '../../includes/interface/FModal';
import { Errors } from '../../includes/Errors';
import { form as formulario } from "./Form";
import { getLanguageId } from '../../includes/LiferayFunctions';
import CentrosRender from "./CentrosRender";
import { reducerCentros, CENTROS_ACTIONS } from "../../includes/reducers/centros.reducer";


const Empresas = () => {
    const [items,itemsHandle]            = useReducer(red_items,{arr:[],item:{id:0},totalPages:0,page:0,load:0});
    const [redCentros,centrosHandle]     = useReducer(reducerCentros);
    const [toastItems,setToastItems]     = useState([]);    
    const {observer, onOpenChange, open} = useModal();
    const [file,setFile]                 = useState();
    const isInitialized                  = useRef;

    const referer = "http://localhost:8080/empresas";
    const form = formulario;

    const fetchData = async () => {
        const postdata = {
            page:    items.page,
            razonSocial : (items.nombre && typeof items.search !== 'undefined')?items.nombre:""
        }
        const seleccionarlabel = Liferay.Language.get('Seleccionar');
        form.fields.tipoDoc.options = [{value:"0",label:seleccionarlabel},{value:"1",label:"DNI"},{value:"2",label:"NIE"},{value:"3",label:"CIF"}];

        fetchAPIData('/silefe.provincia/all', {lang: getLanguageId()},referer).then(response => {
            const opts = [{value:"0",label:seleccionarlabel}, ...response.data.map(obj => {return {value:obj.id,label:obj.nombre}})];
            centrosHandle({type:CENTROS_ACTIONS.PROVINCIAS, provincias: opts})
        });

        fetchAPIData('/silefe.municipio/all', {lang: getLanguageId()},referer).then(response => {
            if (response.data.length > 0)
                centrosHandle({type:CENTROS_ACTIONS.MUNICIPIOS, municipios: [...response.data]})
        });

        fetchAPIData('/silefe.tiposvia/all', {lang: getLanguageId()},referer).then(response => {
            const opts = [{value:"0",label:seleccionarlabel}, ...response.data.map(obj => {return {value:obj.id,label:obj.nombre}})];
            centrosHandle({type:CENTROS_ACTIONS.TIPOS_VIA, tipos: opts})
        });

        let {data,totalPages,page} = await fetchAPIData('/silefe.empresa/filter',postdata,referer);

        const tmp = await data.map(i => {            
            return({
                ...i,
                id:i.empresaId,
                email: (i.email != null && i.email.length > 0)?JSON.parse(i.email):[],
                telefono: (i.telefono != null && i.telefono.length > 0)?JSON.parse(i.telefono):[],
                checked:false
            })});
        await itemsHandle({type:ITEMS_ACTIONS.START,items:tmp, fields: form,totalPages:totalPages,page:page});
    }

    const handleSave = () => {
        let endpoint = '/silefe.empresa/save-empresa';
        if (items.status === 'new')
            endpoint = '/silefe.empresa/add-empresa';

        let obj = {obj: items.item, id:items.item.empresaId};
        saveAPI(endpoint,obj,referer).then( response => {
            let {data, status, error} = response;
            if (status) {
                // ya está guardado. ahora tenemos que ver de gaurdar los otros            
                const oo = {id:data.empresaId,centros:[...redCentros.items],userId: getUserId()};
                console.debug(oo);
                debugger;
                saveAPI('/silefe.empresacentros/save-centros-by-empresa',oo,referer).then(respon => {
                    console.log(respon);
                });
    
                fetchData();
                setToastItems([...toastItems, { title: Liferay.Language.get("Guardar"), type: "info", text: Liferay.Language.get('Guardado_correctamente') }]);        
            } else {
                setToastItems([...toastItems, { title: Liferay.Language.get("Guardar"), type: "danger", text: Errors[error]}]);        
            }
        });

    }

    const handleDelete = () => {
        console.log("delete");
    }

    const beforeEdit = () => {
        console.log("beforeEdit");

        const a = [{
            id: 0,
            nombre: "aaa",
            empresaId: 0,
            cp: "",
            municipioId: 0,
            localidad: "mi localidad",
            provinciaId: 2,
            tipoViaId: 0,
            nombreVia: "",
            numero: "",
            piso: "", 
        },{
            id: 0,
            nombre: "bbbb",
            empresaId: 0,
            cp: "",
            municipioId: 0,
            localidad: "localidad 2",
            provinciaId: 2,
            tipoViaId: 0,
            nombreVia: "",
            numero: "",
            piso: "", 
        }];
        centrosHandle({type: CENTROS_ACTIONS.LOAD, items: a});
    }

    const loadCsv = () => {
        console.log("loadCsv");
    }

    const notify = () => {
        console.log("notify");
    }

    const plugin2 = () => {
        return { 
            Centros: 
            <CentrosRender 
                reducer={redCentros}
                centrosHandle={centrosHandle}
             />
        }
    }

    useEffect(()=>{
		if (!isInitialized.current) {
            fetchData();
			isInitialized.current = true;
		} else {
			const timeoutId = setTimeout(fetchData, 350);
			return () => clearTimeout(timeoutId);
		}
    },[items.load]);

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
                {   (items.status === 'edit' || items.status === 'new') && 
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

export default Empresas;