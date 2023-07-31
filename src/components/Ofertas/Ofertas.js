import React,{useEffect,useReducer,useRef,useState} from "react";
import TabsForm from '../../includes/interface/TabsForm';
import Table from '../../includes/interface/Table';
import Menu from '../Menu';
import {useModal} from '@clayui/modal';
import { getUserId, getLanguageId, url_referer} from '../../includes/LiferayFunctions';
import {red_items,ITEMS_ACTIONS, initialState} from '../../includes/reducers/items.reducer';
import Papa from "papaparse";
import { batchAPI, deleteAPI, deleteAPIParams, fetchAPIData, saveAPI, fetchAPIRow } from "../../includes/apifunctions";
import {LoadFiles} from '../../includes/interface/LoadFiles'
import {FAvisos} from '../../includes/interface/FAvisos'
import { FModal } from '../../includes/interface/FModal';
import { Errors } from '../../includes/Errors';
import {form as formulario} from './OfertaForm';
import { reducerCandidatos, PARTICIPANTES_OPTIONS, initialState as iniPart } from "../../includes/reducers/candidatos.reducer";
import {ParticipantesRender} from "./ParticipantesRender";
import { Paginator } from "../../includes/interface/Paginator";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const Ofertas = () => {
    const [items,itemsHandle]               = useReducer(red_items,initialState);
    const [redParticipantes, participantesHandle] = useReducer(reducerCandidatos, iniPart);
    const [toastItems,setToastItems]        = useState([]);    
    const {observer, onOpenChange, open}    = useModal();
    const [file,setFile]                    = useState();
    const isInitialized                     = useRef(null);
    const {id}                              = useParams();
    const {state}                           = useLocation();
    const navigate                          = useNavigate();

    const referer = `${url_referer}/oferta`;
    const form = formulario;

    useEffect(()=>{
		if (!isInitialized.current) {            
            initForm();
            itemsHandle({type:ITEMS_ACTIONS.SET_FIELDS,form:form});
            if (id != 'undefined' && id > 0) {
                loadOferta(id);
            }
            else 
                fetchData();
            
            isInitialized.current = true;
		} else {
            if (id != 'undefined' && id > 0) {
                loadOferta(id);
            }
            else {
                const timeoutId = setTimeout(fetchData, 350);
                return () => clearTimeout(timeoutId);
            }
		}
    },[items.load]);

    const loadCsv = () => {
        itemsHandle({type:ITEMS_ACTIONS.LOAD})
    }

    const processCsv = () => {
        console.log("processCsv");
    }

    const handleSave = () => {
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

        saveAPI(endpoint,data,referer).then(response => {
          let {status, data, error} = response;

          if (status) {
                const participantes = redParticipantes.items.map( i => {return i.participanteId}); 
                saveAPI('/silefe.oferta/save-participantes-oferta',{ofertaId: data.ofertaId, identifiers: participantes},referer).then(res => {
              });
              // tenemos que solicitar borrar los elementos que ha quitado el usuario: 
              if (redParticipantes.deleted.length > 0) {
                console.log("Tenemso cosas a borrar con la nueva API");
                const s = redParticipantes.deleted.map( i => {return i.participanteId});
                console.debug(s);

                deleteAPIParams('/silefe.oferta/delete-participantes-oferta',{ofertaId: data.ofertaId,identifiers:s},referer).then(res => { 
                  console.log("borrado");
                });
              }

              fetchData();
              setToastItems([...toastItems, { title: Liferay.Language.get("Guardar"), type: "info", text: Liferay.Language.get('Guardado_correctamente') }]);
          }
          else 
              setToastItems([...toastItems, { title: Liferay.Language.get("Guardar"), type: "danger", text: Errors[error]}]);

          if (state != 'undefined' && state.backUrl.length > 0)
            navigate(state.backUrl);
        });
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

    const showError = (error) => {
      setToastItems([...toastItems, { title: error.title, type: (error.type === 'error')?'danger':'info', text: error.text }]);
    }

    const beforeEdit = () => {
        const s = items.arr.filter(item => item.checked).map( i => {return i.id})[0];
      
        fetchAPIData('/silefe.oferta/participantes-oferta', {ofertaId: s },referer).then(response => {
            console.log("estoy dentro de beforeEdit");
            console.debug(response);
            participantesHandle({type: PARTICIPANTES_OPTIONS.LOAD,items:response.data});
        });
    }

    const plugin2 = () => {
        return {
            Participantes: 
                <ParticipantesRender
                  redParticipantes={redParticipantes}
                  participantesHandle={participantesHandle}
                />
        }
    }

    const notify = () => {
      console.log("Accediendo a notify");
    }

    const searchCandidatos = (filters) => {
      const filters2 = [];
      Object.keys(filters).forEach(it => {
        if (filters[it].length == 0  || filters[it] == 0) {
          console.log("esta vacio " + it);
        }
        else {
          filters2.push({fieldname:it, value: filters[it]});
        }
      });
      fetchAPIData('/silefe.participante/filter-candidatos', {filters: filters2},referer).then(response => {
          participantesHandle({type:PARTICIPANTES_OPTIONS.SET_CANDIDATOS , candidatos: response.data });
      });
    }

    const loadOferta = (id) => {        
        fetchAPIRow('/silefe.oferta/get',{id:id},referer).then ((r) => {
            //console.log("recupramos los datos de la oferta");
            //console.debug(r);
            //console.debug(redParticipantes);
            //debugger;
            const datatmp = {
                ...r,
                data: {...r.data,
                    //centro       : "undefined",
                    //colectivos   : "undefined",
                    //empresa      : "undefined",
                    //estado       : "undefined",
                    //objetivos    : "undefined",
                    //participantes: "undefined",
                    puesto       : "lalala",
                    fechaIncorporacion : (r.data.fechaIncorporacion != null)?new Date(r.data.fechaIncorporacion).toISOString().substring(0, 10):"",
                    fechaUltimoEstado : (r.data.fechaUltimoEstado != null)?new Date(r.data.fechaUltimoEstado).toISOString().substring(0, 10):"",    
                }
            }
            itemsHandle({type:ITEMS_ACTIONS.EDIT_ITEM,item:datatmp});
        }).catch(error => {
            console.log("error");
            console.debug(error);
        });
    }

    const fetchData = async () => {
        //participantesHandle({type:PARTICIPANTES_OPTIONS.START,search:searchCandidatos,showError: showError });
        const postdata = {
            pagination: {page: items.pagination.page, pageSize: items.pagination.pageSize},
            options: {
                filters: [
                    { name: items.searchField, value: (items.search && typeof items.search !== 'undefined')?items.search:""},
                ],
                order: items.order,
            },
        }
        if (form.fields.edadId.options == undefined)
            initForm()

        // Inicializando todos los datos de los participantes: 
        if (redParticipantes == undefined || redParticipantes.provinciasOptions.length == 0 ) 
            initFormParticipantes();        
        else {
            console.log("los datos ya están cargados, y no vuelvo a cargarlos");
        }

        let {data,totalPages, totalItems,page} = await fetchAPIData('/silefe.oferta/filter',postdata,referer);
        const tmp = await data.map(i => {            
            return({
                ...i,
                id                 : i.ofertaId,
                fechaIncorporacion : (i.fechaIncorporacion != null)?new Date(i.fechaIncorporacion).toISOString().substring(0, 10):"",
                fechaUltimoEstado : (i.fechaUltimoEstado != null)?new Date(i.fechaUltimoEstado).toISOString().substring(0, 10):"",
                checked            : false
            });
        });
        await itemsHandle({type:ITEMS_ACTIONS.START,items:tmp, fields: form,totalPages:totalPages,total: totalItems,page:page});
    }

    const initForm = () => {
        const seleccionarlabel = Liferay.Language.get('Seleccionar');
        const opciones_requerido = [{ value: "0", label: seleccionarlabel }, { value: "1", label: "Recomendable" }, { value: "2", label: "Obligatorio" }];
        fetchAPIData('/silefe.edad/all', {lang: getLanguageId()},referer).then(response => {
            const opts = [ {value:"0",label:"Seleccionar"} ,...response.data.map(obj => {return {value:obj.id,label:obj.descripcion}})];
            form.fields.edadId.options = opts;
        });
        fetchAPIData('/silefe.empresa/all', {lang: getLanguageId()},referer).then(response => {
            const opts = [ {value:"0",label:"Seleccionar"} ,...response.data.map(obj => {return {value:obj.id,label:obj.razonSocial}})];
            form.fields.empresaId.options = opts;
        });
        fetchAPIData('/silefe.empresacentros/filter-by-empresa', {empresaId: 1},referer).then(response => {
            const opts = [ {value:"0",label:"Seleccionar"} ,...response.data.map(obj => {return {value:obj.empresaCentrosId,label:obj.nombre}})];
            form.fields.centroId.options = opts;
        });
        fetchAPIData('/silefe.proyecto/all', {lang: getLanguageId()},referer).then(response => {
            const opts = [ {value:"0",label:"Seleccionar"} ,...response.data.map(obj => {return {value:obj.id,label:obj.descripcion}})];
            form.fields.proyectoId.options = opts;
        }).catch((error)=>{
            console.log("hay errores");
            console.log(error);
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
            console.log("tipos contrato:");
            console.debug(opts);
            form.fields.tipoContratoId.options = opts;
        });
        // cargamos los candidatos: 
        fetchAPIData('/silefe.carnet/all', {lang: getLanguageId()},referer).then(response => {
            const opts = [ {value:"0",label:"Seleccionar"} ,...response.data.map(obj => {return {value:obj.id,label:obj.descripcion}})];
            form.fields.permisos.options = opts;
        });

        form.fields.titulacionRequerido.options = opciones_requerido;
        form.fields.idiomasRequerido.options = opciones_requerido;
        form.fields.informaticaRequerido.options = opciones_requerido;
        form.fields.experienciaRequerido.options = opciones_requerido;
        form.fields.generoId.options = [{value:"0",label:seleccionarlabel},{value:"1",label:"Hombre"},{value:"2",label:"Mujer"}];
        form.fields.estadoId.options = [{value:"0",label:seleccionarlabel},{value:"1",label:"Activa"},{value:"2",label:"Con Inserción"},{value:"3",label:"Cerrada"}];
        form.fields.jornadaId.options = [{value:"0",label:seleccionarlabel},{value:"1",label:Liferay.Language.get("Completa")},{value:"2",label:Liferay.Language.get("Parcial")}];
    }

    const initFormParticipantes = () => {
        // Cargamos algunos datos para las ofertas: 
        fetchAPIData('/silefe.salario/all', {lang: getLanguageId()},referer).then(response => {
            const opts = [ {value:"0",label:"Seleccionar"} ,...response.data.map(obj => {return {value:obj.id,label:obj.descripcion}})];
            participantesHandle({type: PARTICIPANTES_OPTIONS.SET_RANGOS,rangos:opts});
        });

        // Cargamos algunos datos para las provincias: 
        fetchAPIData('/silefe.provincia/all', {lang: getLanguageId()},referer).then(response => {
            const opts = [ {value:"0",label:"Seleccionar"} ,...response.data.map(obj => {return {value:obj.id,label:obj.nombre}})];
            participantesHandle({type: PARTICIPANTES_OPTIONS.SET_PROVINCIAS,provincias:opts});
        });

        // Cargamos algunos datos para las municipios: 
        fetchAPIData('/silefe.municipio/all', {lang: getLanguageId()},referer).then(response => {
            //const opts = [ {value:"0",label:"Seleccionar"} ,...response.data.map(obj => {return {value:obj.id,label:obj.nombre}})];
            participantesHandle({type: PARTICIPANTES_OPTIONS.SET_MUNICIPIOS,municipios:response.data});
        });

        // Cargamos algunos datos para las ocupaciones: 
        fetchAPIData('/silefe.cno/all', { descripcion: "", lang: getLanguageId() }, referer).then(response => {
            const opts = [ {value:"0",label:"Seleccionar"} ,...response.data.map(obj => {return {value:obj.id,label:obj.descripcion}})];
            participantesHandle({type: PARTICIPANTES_OPTIONS.SET_OCUPACIONES,ocupaciones:opts});
        });
        
        // Cargamos algunos datos para los colectivos
        fetchAPIData('/silefe.colectivo/all', { descripcion: "", lang: getLanguageId() }, referer).then(response => {
            const opts = [ {value:"0",label:"Seleccionar"} ,...response.data.map(obj => {return {value:obj.id,label:obj.descripcion}})];
            console.log("estos son los colectivos");
            console.debug(opts);
            participantesHandle({type: PARTICIPANTES_OPTIONS.SET_COLECTIVOS,colectivos:opts});
        });
        
        fetchAPIData('/silefe.horario/all', {lang: getLanguageId()},referer).then(response => {
            const opts = [ {value:"0",label:"Seleccionar"} ,...response.data.map(obj => {return {value:obj.id,label:obj.descripcion}})];
            participantesHandle({type: PARTICIPANTES_OPTIONS.SET_JORNADAS,jornadas:opts});
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
                formulario={formulario}
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
export default Ofertas;

