import { useModal } from '@clayui/modal';
import React, { useEffect, useReducer, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Liferay } from '../../common/services/liferay/liferay';
import { Errors } from '../../includes/Errors';
import { getAuthToken, getLanguageId, getUserId, url_api, url_referer } from '../../includes/LiferayFunctions';
import { deleteAPI, fetchAPIData, fetchAPIRow, saveAPI } from "../../includes/apifunctions";
import Citas from '../../includes/interface/Citas';
import { FAvisos } from '../../includes/interface/FAvisos';
import { FModal } from '../../includes/interface/FModal';
import { LoadFiles } from '../../includes/interface/LoadFiles';
import { Paginator } from "../../includes/interface/Paginator";
import Table from '../../includes/interface/Table';
import TabsForm from '../../includes/interface/TabsForm';
import { CITAS_ACTIONS, initialState as iniCitas, reducerCitas } from '../../includes/reducers/citas.reducer';
import { EXPERIENCIA_ACTIONS, reducerExperiencia } from "../../includes/reducers/experiencias.reducer";
import { ITEMS_ACTIONS, initialState, red_items } from '../../includes/reducers/items.reducer';
import { SUBTABLE_ACTIONS, iniState, reducerSubtable } from '../../includes/reducers/subtable.reducer';
import { TITULACIONES_ACTIONS, reducerTitulacion, initialState as titsIni } from '../../includes/reducers/titulaciones.reducer';
import { toDate, toHours } from '../../includes/utils';
import Menu from '../Menu';
import { form as citasform } from './CitasForm';
import { ExperienciasRender } from './ExperienciasRender';
import { form } from "./Form";
import { form as participacionesForm } from './ParticipacionesForm';
import { TitulacionesRender } from './TitulacionesRender';


const Participantes = () => {
    const [items, itemsHandle] = useReducer(red_items, initialState);
    const [redTitulaciones, titulacionHandler] = useReducer(reducerTitulacion, titsIni);
    const [redExperiencias, experienciasHandler] = useReducer(reducerExperiencia, { items: [], deleted: [], item: {}, status: "list", participanteId: 0 });
    const [citas, citasHandler]            = useReducer(reducerCitas, iniCitas);
    const [participaciones, participacionesHandler] = useReducer (reducerSubtable, iniState); 
    const [toastItems, setToastItems] = useState([]);
    const { observer, onOpenChange, open } = useModal();
    const [file, setFile] = useState();
    const isInitialized = useRef(null);
    const { id } = useParams();
    const { state } = useLocation();
    const navigate = useNavigate();

    const referer = `${url_referer}/participantes`;

    const beforeEdit = (item) => {
        //queryTitulaciones();
        fetchAPIData('/silefe.municipio/filter-by-province', { lang: getLanguageId(), page: 0, province: item.provinciaId }, referer).then(response => {
            const opts = [{ value: "0", label: Liferay.Language.get('Seleccionar') }, ...response.data.map(obj => { return { value: obj.id, label: obj.nombre } })];
            itemsHandle({ type: ITEMS_ACTIONS.SET_FORMOPTIONS, fieldname: 'municipioId', options: opts });
        });
        beforeFormacion(item.id);
        beforeExperiencia(item.id);
        // Cargamos las citas: 
        const postcitas = {
            participanteId: item.id,
            pagination: { page: 1, pageSize: 10 },
            options: {
                filters: [
                ],
            },
        }
        fetchAPIData('/silefe.cita/get-citas-participante', postcitas, referer).then(response => {
            citasHandler({ type: CITAS_ACTIONS.LOAD, items: response.data.map(item=>({
                ...item,
                appointmentDate: toDate(item.appointmentDate),
                appointmentHour: toHours(item.appointmentHour),
                appointmentDateTime: toDate(item.appointmentDate) + " " + toHours(item.appointmentHour)
            }))});
        });

        // TODO: Están buscando en que participa: 
        const postparticipaciones = {
            participanteId: item.id,
            pagination: { page: 1, pageSize: 10 },
            options: {
                filters: [
                ],
            },
        }
        fetchAPIData('/silefe.oferta/get-ofertas-by-participante', postparticipaciones, referer).then(response => {
            console.debug("tratando los datos de participaciones");
            console.debug(response);
            const data_part = response.data.map(item => ({
                ...item, 
                tipoParticipacion: "Oferta", 
                participacionIni: toDate(item.fechaIncorporacion),
                nombreParticipacion: item.titulo}));            
            console.debug(data_part);

            participacionesHandler({ type: SUBTABLE_ACTIONS.LOAD_ITEMS, items: data_part, pages: response.totalPages });
        });

    }

    useEffect(() => {
        if (!isInitialized.current) {
            initForm();
            itemsHandle({ type: ITEMS_ACTIONS.SET_FIELDS, form: form });
            citasHandler({ type: CITAS_ACTIONS.SETFORM, form: citasform});
            participacionesHandler({type: SUBTABLE_ACTIONS.SETFORM, form: participacionesForm});
            if (id != 'undefined' && id > 0)
                loadParticipante(id);
            else
                fetchData();

            isInitialized.current = true;

        } else {
            if (id != 'undefined' && id > 0)
                loadParticipante(id);
            else {
                const timeoutId = setTimeout(fetchData, 350);
                return () => clearTimeout(timeoutId);
            }
        }
    }, [items.load]);

    useEffect(() => {
        if (items.item.provinciaId != 'undefined' && items.item.provinciaId > 0)
            changeProvince(items.item.provinciaId);
    }, [items.item.provinciaId]);

    const loadParticipante = (id) => {
        beforeFormacion(id);
        beforeExperiencia(id);

        fetchAPIRow('/silefe.participante/get', { id: id }, referer).then((r) => {
            const datatmp = {
                ...r,
                data: {
                    ...r.data,
                    fechaNacimiento: (r.data.fechaNacimiento != null) ? new Date(r.data.fechaNacimiento).toISOString().substring(0, 10) : "",
                    email: (r.data.email != null && r.data.email.length > 0) ? JSON.parse(r.data.email) : [],
                    telefono: (r.data.telefono != null && r.data.telefono.length > 0) ? JSON.parse(r.data.telefono) : [],
                }
            }
            itemsHandle({ type: ITEMS_ACTIONS.EDIT_ITEM, item: datatmp });
        }).catch(error => {
            console.log("error");
            console.debug(error);
        });

    }

    const loadCsv = () => {
        itemsHandle({ type: ITEMS_ACTIONS.LOAD })
    }

    const processCsv = () => {
        if (file) {
            //const file = fileInput.files[0];
            const formData = new FormData();
            formData.append('file', file);
            console.debug(formData);

            const auth = getAuthToken();
            const endpoint = url_api + '/silefe.participante/save-file';
            fetch(endpoint, {
                "credentials": "include",
                "headers": {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:104.0) Gecko/20100101 Firefox/104.0",
                    "Accept": "*/*",
                    "Accept-Language": "es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3",
                    "Content-Type": "multipart/form-data",
                    "x-csrf-token": auth,
                    "Sec-Fetch-Dest": "empty",
                    "Sec-Fetch-Mode": "cors",
                    "Sec-Fetch-Site": "same-origin"
                },
                "referrer": `\"${referer}\"`,
                body: formData,
                method: "POST",
                mode: "cors"
            }).then((response) => {
                console.log("recibida la respusta");
                console.debug(response);
            });

            //ksdjfñlaskdjfñlaskjdflasdf

            //fetch('/silefe.participante/save-file', {
            //    method: 'POST',
            //    headers: {
            //        'X-RapidAPI-Key': 'your-rapid-key',
            //        'X-RapidAPI-Host': 'file-upload8.p.rapidapi.com'
            //    },
            //    body: formData
            //})
            //    .then(response => response.json())
            //    .then(data => {
            //    console.log(data);
            //    alert('File uploaded successfully!');
            //})
            //.catch(error => {
            //    console.error(error);
            //    alert('Error uploading file');
            //});
        } else {
            console.log("no hay file");
        }
    }

    const downloadFile = () => {
        console.log("download");
    }

    const handleSave = async () => {
        let endpoint = '/silefe.participante/save-participante';
        if (items.status === 'new')
            endpoint = '/silefe.participante/new-participante';

        let obj = { obj: items.item, id: items.item.participanteId };
        let { data, status, error } = await saveAPI(endpoint, obj, referer);
        if (status) {
            const obj2 = { id: data.participanteId, titulaciones: redTitulaciones.items, userId: getUserId() };
            let respon = await saveAPI('/silefe.formacionparticipante/save-formaciones-by-participante', obj2, referer);
            if (redTitulaciones.deleted.length > 0) {
                const delTitulaciones = redTitulaciones.deleted.map(d => { return (d.formacionParticipanteId) });
                deleteAPI('/silefe.formacionparticipante/remove-titulaciones', delTitulaciones, referer).then(res => {
                    titulacionHandler({ type: TITULACIONES_ACTIONS.EMPTY_DELETED });
                });
            }

            const obj3 = { experiencias: redExperiencias.items, userId: getUserId() };
            respon = await saveAPI('/silefe.experienciaparticipante/add-multiple', obj3, referer);
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
            setToastItems([...toastItems, { title: Liferay.Language.get("Guardar"), type: "info", text: Liferay.Language.get('Guardado_correctamente') }]);
        }
        else
            setToastItems([...toastItems, { title: Liferay.Language.get("Guardar"), type: "danger", text: Errors[error] }]);

        //console.debug(state.ancestorId);
        if (state != 'undefined' && state != null && state.backUrl.length > 0)
            navigate(state.backUrl + state.ancestorId);
    }

    form.beforeEdit = beforeEdit;
    form.handleSave = handleSave;
    form.loadCsv = loadCsv;

    const confirmDelete = async () => {
        let s = items.arr.filter(item => item.checked).map(i => { return i.participanteId });

        deleteAPI('/silefe.participante/delete-participantes', s, referer).then(res => {
            if (res) {
                setToastItems([...toastItems, { title: Liferay.Language.get('Borrar'), type: "info", text: Liferay.Language.get('Borrado_ok') }]);
                fetchData();
            }
            else
                setToastItems([...toastItems, { title: Liferay.Language.get('Borrar'), type: "danger", text: Liferay.Language.get('Borrado_no') }]);
        })
    }

    const fetchData = async () => {
        experienciasHandler({ type: EXPERIENCIA_ACTIONS.START });
        if (redTitulaciones.tipoOptions == undefined || redTitulaciones.tipoOptions.length == 0)
            queryTitulaciones();

        if (form.fields.situacionLaboral.options == undefined)
            await initForm();

        const postdata = {
            pagination: { page: items.pagination.page, pageSize: items.pagination.pageSize },
            options: {
                filters: [
                    { name: items.searchField, value: (items.search && typeof items.search !== 'undefined') ? items.search : "" },
                ],
                order: items.order,
            },
        }
        let { data, totalPages, page, totalItems } = await fetchAPIData('/silefe.participante/filter', postdata, referer);
        const tmp = await data.map(i => {
            return ({
                ...i,
                id: i.participanteId,
                fechaNacimiento: (i.fechaNacimiento != null) ? new Date(i.fechaNacimiento).toISOString().substring(0, 10) : "",
                email: (i.email != null && i.email.length > 0) ? JSON.parse(i.email) : [],
                telefono: (i.telefono != null && i.telefono.length > 0) ? JSON.parse(i.telefono) : [],
                tipoDoc: i.tipoDoc.toString(),
                colectivos: i.colectivos ?? [],
                carnets: i.carnets ?? [],
                prestaciones: i.prestaciones ?? [],
                checked: false
            })
        });

        await itemsHandle({ type: ITEMS_ACTIONS.START, items: tmp, fields: form, total: totalItems, totalPages: totalPages, page: page });
    }

    const initForm = () => {
        const seleccionarlabel = Liferay.Language.get('Seleccionar');
        fetchAPIData('/silefe.colectivo/all', { lang: getLanguageId() }, referer).then(response => {
            const opts = [...response.data.map(obj => { return { value: obj.id, label: obj.descripcion } })];
            form.fields.colectivos.options = opts;
        });

        fetchAPIData('/silefe.carnet/all', { lang: getLanguageId() }, referer).then(response => {
            const opts = [...response.data.map(obj => { return { value: obj.id, label: obj.descripcion } })];
            form.fields.carnets.options = opts;
        });

        fetchAPIData('/silefe.prestacion/all', { lang: getLanguageId() }, referer).then(response => {
            const opts = [...response.data.map(obj => { return { value: obj.id, label: obj.descripcion } })];
            form.fields.prestaciones.options = opts;
        });

        // TODO: Ver como rellenar la situación laboral
        form.fields.situacionLaboral.options = [
            { value: "0", label: seleccionarlabel }, 
            { value: "1", label: "Trabajando" }, 
            { value: "2", label: "Desempleado" },
            { value: "3", label: "Estudiando" }
        ];

        fetchAPIData('/silefe.salario/all', { lang: getLanguageId() }, referer).then(response => {
            const opts = [{ value: "0", label: seleccionarlabel }, ...response.data.map(obj => { return { value: obj.id, label: obj.descripcion } })];
            form.fields.rangoSalarialId.options = opts;
        });
        fetchAPIData('/silefe.horario/all', { lang: getLanguageId() }, referer).then(response => {
            const opts = [{ value: "0", label: seleccionarlabel }, ...response.data.map(obj => { return { value: obj.id, label: obj.descripcion } })];
            form.fields.jornadaId.options = opts;
        });
      
        fetchAPIData('/silefe.discapacidad/all', { lang: getLanguageId() }, referer).then(response => {
            const opts = [{ value: "0", label: seleccionarlabel }, ...response.data.map(obj => { return { value: obj.id, label: obj.descripcion } })];
            form.fields.tipoDiscapacidad.options = opts;
        });
        
        fetchAPIData('/silefe.porcentajediscapacidad/all', { lang: getLanguageId() }, referer).then(response => {
            const opts = [{ value: "0", label: seleccionarlabel }, ...response.data.map(obj => { return { value: obj.id, label: obj.descripcion } })];
            form.fields.porcentajeDiscapacidad.options = opts;
        });

        fetchAPIData('/silefe.provincia/all', { lang: getLanguageId() }, referer).then(response => {
            const opts = [{ value: "0", label: seleccionarlabel }, ...response.data.map(obj => { return { value: obj.id, label: obj.nombre } })];
            form.fields.provinciaId.options = opts;
            form.fields.provinciaId.change = () => console.log("cambia la provincia");//changeProvince;
        });
        //fetchAPIData('/silefe.municipio/filter-by-province', {lang: getLanguageId(), page:0,province: 1},referer).then(response => {
        //    const opts = [{value:"0",label:seleccionarlabel}, ...response.data.map(obj => {return {value:obj.id,label:obj.nombre}})];
        //    form.fields.municipioId.options = opts;
        //    form.fields.municipioId.change = change2;
        //});
        fetchAPIData('/silefe.tiposvia/all', { lang: getLanguageId(), page: 0, province: 1 }, referer).then(response => {
            const opts = [{ value: "0", label: seleccionarlabel }, ...response.data.map(obj => { return { value: obj.id, label: obj.nombre } })];
            form.fields.tipoviaId.options = opts;
            form.fields.tipoviaId.change = () => { console.log("cambiando el tipo de via") };
        });
        form.fields.tipoDoc.options = [{ value: "0", label: seleccionarlabel }, { value: "1", label: "DNI" }, { value: "2", label: "NIE" }, { value: "3", label: "Pasaporte" }];
        form.fields.sexo.options = [{ key: 0, value: "H", label: Liferay.Language.get('Hombre') }, { key: 1, value: "M", label: Liferay.Language.get('Mujer') }];
    }

    const changeProvince = (id) => {
        fetchAPIData('/silefe.municipio/filter-by-province', { lang: getLanguageId(), page: 0, province: id }, referer).then(response => {
            const opts = [{ value: "0", label: Liferay.Language.get('Seleccionar') }, ...response.data.map(obj => { return { value: obj.id, label: obj.nombre } })];
            itemsHandle({ type: ITEMS_ACTIONS.SET_FORMOPTIONS, fieldname: 'municipioId', options: opts });
        });
    }

    const beforeFormacion = (participanteId) => {
        if (participanteId != undefined) {
            fetchAPIData('/silefe.formacionparticipante/filter-by-participante', { lang: getLanguageId(), participante: participanteId }, referer).then(response => {
                const tits = response.data.map(i => ({
                    ...i,
                    id: i.formacionParticipanteId,
                    ini: (i.inicio != null) ? new Date(i.inicio).toISOString().substring(0, 10) : "",
                    inicio: (i.inicio != null) ? new Date(i.inicio).toISOString().substring(0, 10) : "",
                    fin: (i.fin != null) ? new Date(i.fin).toISOString().substring(0, 10) : "",
                    titulacionName: i.titulacion,
                }));
                titulacionHandler({ type: TITULACIONES_ACTIONS.LOAD_ITEMS, items: tits })
            }).catch((e) => {
                console.log("Error cargando las titulaciones de un alumno");
                console.error(e);
            })
        }
    }

    const beforeExperiencia = (participanteId) => {
        fetchAPIData('/silefe.experienciaparticipante/filter-by-participante', { lang: getLanguageId(), participante: participanteId }, referer).then(response => {
            const experiencias = response.data.map(item => {
                return {
                    ...item,
                    id: item.experienciaParticipanteId,
                    participanteId: participanteId,
                    ini: (item.inicio != null) ? new Date(item.inicio).toISOString().substring(0, 10) : "",
                    fin: (item.fin != null) ? new Date(item.fin).toISOString().substring(0, 10) : "",
                }
            });
            experienciasHandler({ type: EXPERIENCIA_ACTIONS.LOAD_ITEMS, experiencias: experiencias, participanteId: participanteId });
        });
    }

    const queryTitulaciones = () => {
        titulacionHandler({ type: TITULACIONES_ACTIONS.START });
        fetchAPIData('/silefe.titulaciontipo/all', { descripcion: "", lang: getLanguageId() }, referer).then(response => {
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
            experienciasHandler({ type: EXPERIENCIA_ACTIONS.CONTRATOS, contratoOptions: [...response.data] })
        });
        fetchAPIData('/silefe.mbaja/all', { descripcion: "", lang: getLanguageId() }, referer).then(response => {
            let motivos = [...response.data];
            motivos.unshift({ id: 0, descripcion: " " });
            experienciasHandler({ type: EXPERIENCIA_ACTIONS.MOTIVOS, motivos: motivos });
        });
        fetchAPIData('/silefe.cno/all', { descripcion: "", lang: getLanguageId() }, referer).then(response => {
            experienciasHandler({ type: EXPERIENCIA_ACTIONS.OCUPACIONES, ocupaciones: [...response.data] })
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
                <ExperienciasRender
                    experiencias={redExperiencias}
                    experienciasHandler={experienciasHandler}
                />,
            Citas:
                <Citas
                    items={citas}
                    handler={citasHandler}
                />,
            Participaciones:
                <Citas
                    items={participaciones}
                    handler={participacionesHandler}                     
                />
        }
    }

    if (!items)
        return (<div>{Liferay.Language.get('Cargando')}</div>)

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
                        itemsHandle={itemsHandle}
                        items={items}
                    />
                </>
            }
            <FAvisos toastItems={toastItems} setToastItems={setToastItems} />
            {open && <FModal onOpenChange={onOpenChange} confirmDelete={confirmDelete} observer={observer} />}
        </>
    )
}

export default Participantes;
