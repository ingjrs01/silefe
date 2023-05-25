import React,{useEffect,useReducer,useRef,useState} from "react";
import TabsForm from './TabsForm';
import Menu from '../Menu';
import Table from '../../includes/interface/Table';
import {useModal} from '@clayui/modal';
import { getUserId} from '../../includes/LiferayFunctions';
import {red_items,ITEMS_ACTIONS, initialState} from '../../includes/reducers/items.reducer';
import Papa from "papaparse";
import { batchAPI, deleteAPI, fetchAPIData, saveAPI } from "../../includes/apifunctions";
import {LoadFiles} from '../../includes/interface/LoadFiles'
import {FAvisos} from '../../includes/interface/FAvisos'
import { FModal } from '../../includes/interface/FModal';
import { Errors } from '../../includes/Errors';
import { form as formulario } from "./Form";
import { getLanguageId } from '../../includes/LiferayFunctions';
import {TITULACIONES_ACTIONS, reducerTitulacion} from '../../includes/reducers/titulaciones.reducer';
import { EXPERIENCIA_ACTIONS, reducerExperiencia } from "../../includes/reducers/experiencias.reducer";
import { Paginator } from "../../includes/interface/Paginator";


const spritemap = "./o/my-project/icons.svg";

const Participantes = () => {
    const [items,itemsHandle]            = useReducer(red_items,{arr:[],item:{id:0},totalPages: 1,pagination: {page:0,pageSize:10, sizes: [10,20,30]}, page:0,load:0, search: "", order: []} );
    const [redTitulaciones, titulacionHandler] = useReducer(reducerTitulacion,{lele: [], deleted: [], status: "list"});
    const [redExperiencias, experienciasHandler] = useReducer(reducerExperiencia, {items: [], deleted: [], item: {}, status: "list", participanteId: 0});
    const [toastItems,setToastItems]     = useState([]);    
    const {observer, onOpenChange, open} = useModal();
    const [file,setFile]                 = useState();
    const isInitialized                  = useRef;

    const referer = "http://localhost:8080/participantes";
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
                let end = '/silefe.participante/add-multiple';
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
        let endpoint = '/silefe.participante/save-participante';
        if (items.status === 'new')
            endpoint = '/silefe.participante/new-participante';

        let obj = {obj: items.item, id:items.item.participanteId};
        let {data, status, error} = await saveAPI(endpoint,obj,referer); 
        if (status) {
            const obj2 = {id:data.participanteId,titulaciones:redTitulaciones.items,userId: getUserId()};
            let respon = await saveAPI('/silefe.formacionparticipante/save-formaciones-by-participante',obj2,referer);

            const obj3 = {experiencias:redExperiencias.items,userId: getUserId()};
            respon = await saveAPI('/silefe.experienciaparticipante/add-multiple',obj3,referer);
            // Tenemos que borrar las experiencas borradas
            if (redExperiencias.deleted.length > 0) {
                const delExperiencias = redExperiencias.deleted.map( d => {return (d.experienciaParticipanteId)});
                deleteAPI('/silefe.experienciaparticipante/remove-experiencias',delExperiencias,referer).then(res => {
                    console.log("delete experiencias");
                    //if (res) {
                    //    setToastItems([...toastItems, { title: Liferay.Language.get('Borrar'), type: "info", text: Liferay.Language.get('Borrado_ok') }]);    
                    //}
                });
            }            

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
        let s = items.arr.filter(item => item.checked).map( i => {return i.participanteId});

        deleteAPI('/silefe.participante/delete-participantes',s,referer).then(res => {
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
        experienciasHandler({type:EXPERIENCIA_ACTIONS.START});

        if (redTitulaciones.tipoOptions == undefined || redTitulaciones.tipoOptions.length == 0) {
            queryTitulaciones();
        }

        if (form.fields.situacionLaboral.options == undefined)  {
            console.log("visto que estoy dentro");
            await initForm();
        }
            
        const postdata = {
            //page:    items.page,
            pagination: {page: items.pagination.page, pageSize: items.pagination.pageSize},
            nombre : (items.search && typeof items.search !== 'undefined')?items.search:"",
            order : items.order//[{name: 'documento', direction: 'asc'}]

        }
        console.debug(form);

        let {data,totalPages,page,totalItems} = await fetchAPIData('/silefe.participante/filter',postdata,referer);        
        const tmp = await data.map(i => {
            return({
                ...i,
                id:i.participanteId,
                fechaNacimiento: (i.fechaNacimiento != null)?new Date(i.fechaNacimiento).toISOString().substring(0, 10):"",
                email: (i.email != null && i.email.length > 0)?JSON.parse(i.email):[],
                telefono: (i.telefono != null && i.telefono.length > 0)?JSON.parse(i.telefono):[],
                checked:false
            })});
        
        await itemsHandle({type:ITEMS_ACTIONS.START,items:tmp, fields: form,total: totalItems, totalPages:totalPages,page:page});
    }

    const initForm = async () => {
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
            form.fields.provinciaId.change = changeProvince;
        });
        fetchAPIData('/silefe.municipio/filter-by-province', {lang: getLanguageId(), page:0,province: 1},referer).then(response => {
            const opts = [{value:"0",label:seleccionarlabel}, ...response.data.map(obj => {return {value:obj.id,label:obj.nombre}})];
            form.fields.municipioId.options = opts;            
            form.fields.municipioId.change = change2;
        });
        fetchAPIData('/silefe.tiposvia/all', {lang: getLanguageId(), page:0,province: 1},referer).then(response => {
            const opts = [{value:"0",label:seleccionarlabel}, ...response.data.map(obj => {return {value:obj.id,label:obj.nombre}})];
            form.fields.tipoviaId.options = opts;            
            form.fields.tipoviaId.change = () => {console.log("cambiando el tipo de via")};
        });
        form.fields.tipoDoc.options = [{value:"0",label:seleccionarlabel},{value:"1",label:"DNI"},{value:"2",label:"NIE"},{value:"3",label:"Pasaporte"}];        
        form.fields.sexo.options = [{key: 0, value:"H",label:Liferay.Language.get('Hombre')},{key:1, value:"M",label: Liferay.Language.get('Mujer')}];

    }

    const changeProvince = (id) => {
        fetchAPIData('/silefe.municipio/filter-by-province', {lang: getLanguageId(), page:0,province: id},referer).then(response => {
            const opts = [{value:"0",label:Liferay.Language.get('Seleccionar')}, ...response.data.map(obj => {return {value:obj.id,label:obj.nombre}})];
            itemsHandle({ type: ITEMS_ACTIONS.SET_FORMOPTIONS,fieldname: 'municipioId', options: opts});
        });
    }

    const change2 = () => {
        console.log("change propio");
    }

    const beforeEdit = () => {
        let sel = items.arr.filter(i => i.checked)[0]['provinciaId'];
        fetchAPIData('/silefe.municipio/filter-by-province', {lang: getLanguageId(), page:0,province: sel},referer).then(response => {
            const opts = [{value:"0",label:Liferay.Language.get('Seleccionar')}, ...response.data.map(obj => {return {value:obj.id,label:obj.nombre}})];
            itemsHandle({ type: ITEMS_ACTIONS.SET_FORMOPTIONS,fieldname: 'municipioId', options: opts});
        });
        beforeFormacion();
        beforeExperiencia();
    }

    const beforeFormacion = () => {
        let sel = items.arr.filter(i => i.checked);
        if (sel.length > 0) {
            const participanteId = sel[0].id;            
            fetchAPIData('/silefe.formacionparticipante/filter-by-participante', {lang: getLanguageId(), participante: participanteId},referer).then(response => {
                const tits = response.data.map( i => {
                    const familiaId = redTitulaciones.titulaciones.filter(t => t.titulacionId == i.titulacion)[0].titulacionFamiliaId;
                    const nivelId = redTitulaciones.familias.filter(f => f.id == familiaId)[0].titulacionNivelId;
                    const tipoId = redTitulaciones.niveles.filter(n => n.id == nivelId)[0].titulacionTipoId;
                    let names = redTitulaciones.titulaciones.filter(t => t.titulacionId == i.titulacion);
                    let name = Liferay.Language.get("No_disponible");
                    if (names.length > 0)
                        name = names[0].descripcion;
                    return {
                        ...i,
                        id: i.formacionParticipanteId,
                        titulacionTipoId: tipoId,
                        titulacionNivelId: nivelId,
                        titulacionFamiliaId: familiaId,
                        titulacionId: i.titulacion,
                        ini: (i.inicio != null)?new Date(i.inicio).toISOString().substring(0, 10):"",
                        fin: (i.fin != null)?new Date(i.fin).toISOString().substring(0, 10):"",
                        titulacionName:name,
                    }
                });
                titulacionHandler({type:TITULACIONES_ACTIONS.LOAD_ITEMS,items: tits})
            })    
        }
    }

    const beforeExperiencia = () => {
        let sel = items.arr.filter(i => i.checked);
        if (sel.length > 0) {
            const participanteId = sel[0].id;            
            fetchAPIData('/silefe.experienciaparticipante/filter-by-participante', {lang: getLanguageId(), participante: participanteId},referer).then(response => {
                const experiencias = response.data.map( item => {
                    return {
                        ...item,
                        id: item.experienciaParticipanteId,
                        participanteId: participanteId,
                        ini: (item.inicio != null)?new Date(item.inicio).toISOString().substring(0, 10):"",
                        fin: (item.fin    != null)?new Date(item.fin).toISOString().substring(0, 10):"",
                    }
                });
                experienciasHandler({type: EXPERIENCIA_ACTIONS.LOAD_ITEMS, experiencias: experiencias, participanteId:participanteId});
            });
        }
    }

    const queryTitulaciones = () => {
        titulacionHandler({type:TITULACIONES_ACTIONS.START});
        
        fetchAPIData('/silefe.titulaciontipo/all', { descripcion: "", lang: getLanguageId() }, "http://localhost:8080/titulaciones").then(response => {
            titulacionHandler({ type: TITULACIONES_ACTIONS.TIPOS, tipos: [...response.data] });
        });
        fetchAPIData('/silefe.titulacionnivel/all', { descripcion: "", lang: getLanguageId() }, referer).then(response => {
            titulacionHandler({ type: TITULACIONES_ACTIONS.NIVEL, nivel: [...response.data] });
        });
        fetchAPIData('/silefe.titulacionfam/all', { descripcion: "", lang: getLanguageId() }, referer).then(response => {
            titulacionHandler({ type: TITULACIONES_ACTIONS.FAMILIA, familias: [...response.data] });
        });
        fetchAPIData('/silefe.titulacion/all', { descripcion: "", lang: getLanguageId() }, referer).then(response => {
            titulacionHandler({ type: TITULACIONES_ACTIONS.TITULACION, titulaciones: [...response.data] });
        });
        fetchAPIData('/silefe.tipocontrato/all', { descripcion: "", lang: getLanguageId() }, referer).then(response => {
            experienciasHandler({type: EXPERIENCIA_ACTIONS.CONTRATOS,contratoOptions: [...response.data]})
        });
        fetchAPIData('/silefe.mbaja/all', { descripcion: "", lang: getLanguageId() }, referer).then(response => {
            let motivos = [...response.data];            
            motivos.unshift({id:0,descripcion: " "});
            experienciasHandler({type: EXPERIENCIA_ACTIONS.MOTIVOS,motivos: motivos});
        });
        fetchAPIData('/silefe.cno/all', { descripcion: "", lang: getLanguageId() }, referer).then(response => {
            experienciasHandler({type: EXPERIENCIA_ACTIONS.OCUPACIONES,ocupaciones: [...response.data]})
        });
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
                    experiencias={redExperiencias}
                    redTitulaciones={redTitulaciones}
                    titulacionHandler={titulacionHandler}
                    experienciasHandler={experienciasHandler}
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
                    itemsHandle={itemsHandle}
                    items={items}
                />
                </>
            }
            
            <FAvisos toastItems={toastItems} setToastItems={setToastItems} />
            {open && <FModal  onOpenChange={onOpenChange} confirmDelete={confirmDelete} observer={observer} /> }
        </>
    )
}

export default Participantes;
