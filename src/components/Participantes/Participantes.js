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


const Participantes = () => {
    const [items,itemsHandle]            = useReducer(red_items,{arr:[],item:{id:0},totalPages:0,page:0,load:0});
    const [toastItems,setToastItems]     = useState([]);    
    const {observer, onOpenChange, open} = useModal();
    const [file,setFile]                 = useState();
    const isInitialized                  = useRef;

    const referer = "http://localhost:8080/ambitos";
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
        if (file) {
            const reader = new FileReader();
         
            reader.onload = async ({ target }) => {
                const csv = Papa.parse(target.result, { header: true,delimiter:";",delimitersToGuess:[";"] });
                const parsedData = csv?.data;                                
                let end = '/silefe.cno/add-multiple';
                let ttmp = {cnos:parsedData,userId:Liferay.ThemeDisplay.getUserId()};

                batchAPI(end,ttmp,referer).then(res2 => {
                    if (res2.ok) {
                        setToastItems([...toastItems, { title: Liferay.Language.get("Carga_Masiva"), type: "info", text: Liferay.Language.get('Elementos_cargados') }]);                        
                        fetchData();
                    }
                    else {
                        setToastItems([...toastItems, { title: Liferay.Liferay.get("Carga_Masiva"), type: "danger", text: Liferay.Language.get("Elementos_no_cargados") }]);
                    }                    
                });
            };
            reader.readAsText(file);
        }
        else {
            console.log("fichero no cargado")
        }
    }

    const handleSave = async () => {
        const data = {
            ambitoId:       items.item.id,
            descripcion: items.item.descripcion,
            userId:      getUserId(),
        }
        let endpoint = '/silefe.participante/save-participante';
        if (items.status === 'new')
            endpoint = '/silefe.participante/new-participante';

        let obj = {obj: items.item, id:items.item.participanteId};
        let {status, error} = await saveAPI(endpoint,obj,referer); 
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
        let s = items.arr.filter(item => item.checked).map( i => {return i.convocatoriaId});
        deleteAPI('/silefe.ambito/remove-ambitos',s,referer).then(res => {
            if (res) {
                setToastItems([...toastItems, { title: Liferay.Language.get('Borrar'), type: "info", text: Liferay.Language.get('Borrado_ok') }]);
                fetchData();        
            }
            else {
                setToastItems([...toastItems, { title: Liferay.Language.get('Borrar'), type: "danger", text: Liferay.Language.get('Borrado_no') }]);
            }
        })
    }

    const fetchData = async () => {
        const seleccionarlabel = Liferay.Language.get('Seleccionar');
        fetchAPIData('/silefe.colectivo/all', {lang: getLanguageId()},referer).then(response => {
            const opts = [{value:"0",label:seleccionarlabel}, ...response.data.map(obj => {return {value:obj.id,label:obj.descripcion}})];
            form.fields.situacionLaboral.options = opts;
        });

        fetchAPIData('/silefe.salario/all', {lang: getLanguageId()},referer).then(response => {
            const opts = [{value:"0",label:seleccionarlabel}, ...response.data.map(obj => {return {value:obj.id,label:obj.descripcion}})];
            form.fields.rangoSalarialId.options = opts;
        });

        fetchAPIData('/silefe.horario/all', {lang: getLanguageId()},referer).then(response => {
            const opts = [{value:"0",label:seleccionarlabel}, ...response.data.map(obj => {return {value:obj.id,label:obj.descripcion}})];
            form.fields.jornadaId.options = opts;
        });

        fetchAPIData('/silefe.provincia/all', {lang: getLanguageId()},referer).then(response => {
            const opts = [{value:"0",label:seleccionarlabel}, ...response.data.map(obj => {return {value:obj.id,label:obj.nombre}})];
            form.fields.provinciaId.options = opts;            
        });
        
        fetchAPIData('/silefe.localidad/filter-by-province', {lang: getLanguageId(), page:0,province: 1},referer).then(response => {
            const opts = [{value:"0",label:seleccionarlabel}, ...response.data.map(obj => {return {value:obj.id,label:obj.localidad}})];
            form.fields.localidadId.options = opts;            
            form.fields.localidadId.change = change2;
        });

        form.fields.tipoDoc.options = [{value:"0",label:seleccionarlabel},{value:"1",label:"DNI"},{value:"2",label:"NIE"},{value:"3",label:"Pasaporte"}];        
        form.fields.sexo.options = [{key: 0, value:"H",label:Liferay.Language.get('Hombre')},{key:1, value:"M",label: Liferay.Language.get('Mujer')}];

        const postdata = {
            page:    items.page,
            nombre : (items.nombre && typeof items.search !== 'undefined')?items.nombre:""
        }
        let {data,totalPages,page} = await fetchAPIData('/silefe.participante/filter',postdata,referer);
        const tmp = await data.map(i => {return({...i,id:i.participanteId,checked:false})});

        await itemsHandle({type:ITEMS_ACTIONS.START,items:tmp, fields: form,totalPages:totalPages,page:page});
    }

    const change2 = () => {
        console.log("change propio");
    }

    const loadSelects = () => {
        console.log("loadSelects");
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
                loadSelects={loadSelects}
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
export default Participantes;