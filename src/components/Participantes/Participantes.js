import { useModal } from '@clayui/modal';
import React, { useEffect, useReducer, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Liferay } from '../../common/services/liferay/liferay';
import { Errors } from '../../includes/Errors';
import { getAuthToken, getLanguageId, getUserId, url_api, url_referer } from '../../includes/LiferayFunctions';
import { deleteAPI, fetchAPIData, fetchAPIRow, saveAPI } from "../../includes/apifunctions";
import Citas from '../../includes/interface/Citas';
import { FAvisos } from '../../includes/interface/FAvisos';
import { FHistoryEntity } from '../../includes/interface/FHistoryEntity';
import { FModal } from '../../includes/interface/FModal';
import { LoadFiles } from '../../includes/interface/LoadFiles';
import { Paginator } from "../../includes/interface/Paginator";
import { SimpleTable } from '../../includes/interface/SimpleTable';
import Table from '../../includes/interface/Table';
import TabsForm from '../../includes/interface/TabsForm';
import { ITEMS_ACTIONS, REDUCER_ACTIONS, TITULACIONES_ACTIONS } from '../../includes/reducers/actions';
import { CITAS_ACTIONS, initialState as iniCitas, reducerCitas } from '../../includes/reducers/citas.reducer';
import { HISTORICO_ACTIONS, initialState as iniHistorico, reducerHistorico } from '../../includes/reducers/historico.reducer';
import { initialState, red_items } from '../../includes/reducers/main.reducer';
import { SUBTABLE_ACTIONS, iniState, reducerSubtable } from '../../includes/reducers/subtable.reducer';
import { initialState as iniExperiencias, reducerItems } from '../../includes/reducers/tabItem.reducer';
import { reducerTitulacion, initialState as titsIni } from '../../includes/reducers/titulaciones.reducer';
import { formatEmails, formatPhones, formatPost, toDate, toHours, toURL } from '../../includes/utils';
import Menu from '../Menu';
import { form as citasform } from './Formularios/CitasForm';
import { form as experienciasForm } from './Formularios/Experiencias';
import { form } from "./Formularios/Form";
import { form as participacionesForm } from './Formularios/ParticipacionesForm';
import { form as titulacionesForm } from './Formularios/Titulaciones';
import { TitulacionesRender } from './TitulacionesRender';

const Participantes = ({ user }) => {
    const [items, itemsHandle] = useReducer(red_items, initialState);
    const [redTitulaciones, titulacionHandler] = useReducer(reducerTitulacion, titsIni);
    const [redExperiencias, experienciasHandler] = useReducer(reducerItems, iniExperiencias);
    const [citas, citasHandler] = useReducer(reducerCitas, iniCitas);
    const [participaciones, participacionesHandler] = useReducer(reducerSubtable, iniState);
    const [historico, handleHistorico] = useReducer(reducerHistorico, iniHistorico);
    const [toastItems, setToastItems] = useState([]);
    const { observer, onOpenChange, open } = useModal();
    const [file, setFile] = useState();
    const isInitialized = useRef(null);
    const { id } = useParams();
    const { state } = useLocation();
    const navigate = useNavigate();

    const referer = `${url_referer}/participantes`;

    const newElement = () => {
        handleHistorico({type: HISTORICO_ACTIONS.START});
        titulacionHandler({ type: TITULACIONES_ACTIONS.START, form: titulacionesForm }); // Ver de poner una accion empty también
        experienciasHandler({type: REDUCER_ACTIONS.EMPTY});
        citasHandler({type: CITAS_ACTIONS.EMPTY});
        participacionesHandler({type: SUBTABLE_ACTIONS.START });
    }

    const loadHistory = (id) => {
        const post = {
            participanteId: id,
            pagination: {
                page: historico.pagination.page,
                pageSize: historico.pagination.pageSize ?? 4,
            },
            options: {}
        }
        fetchAPIData('/silefe.participantehistory/get-participante-history-by-participante-id', post, referer).then(response => {
            const respuesta = response.data.map(item => ({
                ...item,
                date: toDate(item.date) + " " + toHours(item.date),
            }));
            handleHistorico({ type: HISTORICO_ACTIONS.LOAD, items: respuesta, total: response.total, totalPages: response.totalPages });
        });
    }

    const loadCitas = (participanteId) => {
        const postcitas = {
            participanteId: participanteId,
            pagination: {
                page: citas.pagination.page,
                pageSize: citas.pagination.pageSize ?? 4,
            },
            options: {
                filters: [
                ],
            },
        }

        fetchAPIData('/silefe.cita/get-citas-participante', postcitas, referer).then(response => {
            citasHandler({
                type: CITAS_ACTIONS.LOAD, items: response.data.map(item => ({
                    ...item,
                    appointmentDate: toDate(item.appointmentDate),
                    appointmentHour: toHours(item.appointmentHour),
                    appointmentDateTime: toDate(item.appointmentDate) + " " + toHours(item.appointmentHour)
                })), totalPages: response.totalPages, total: response.totalItems
            });
        });
    }

    useEffect(() => {
        if (items.item !== 'undefined')
            loadCitas(items.item.id);
    }, [citas.pagination.page]);

    const beforeEdit = (item) => {
        const lang = getLanguageId();
        fetchAPIData('/silefe.municipio/filter-by-province', { page: 0, province: item.provinciaId }, referer).then(response => {
            const opts = [{ value: "0", label: Liferay.Language.get('Seleccionar') }, ...response.data.map(obj => { return { value: obj.id, label: obj.nombre[lang] } })];
            itemsHandle({ type: ITEMS_ACTIONS.SET_FORMOPTIONS, fieldname: 'municipioId', options: opts });
        });
        loadHistory(item.id);
        beforeFormacion(item.id);
        beforeExperiencia(item.id);
        loadCitas(item.id);

        const postparticipaciones = {
            participanteId: item.id,
            pagination: { 
                page: participaciones.pagination.page, 
                pageSize: participaciones.pagination.pageSize
            },
            options: {
                filters: [
                ],
            },
        }
        fetchAPIData('/silefe.oferta/get-ofertas-by-participante', postparticipaciones, referer).then(response => {
            const data_part = response.data.map(item => ({
                ...item,
                tipoParticipacion: "Oferta",
                participacionIni: toDate(item.fechaIncorporacion),
                nombreParticipacion: item.titulo
            }));
            participacionesHandler({ type: SUBTABLE_ACTIONS.LOAD_ITEMS, items: data_part, pages: response.totalPages });
        });
    }

    useEffect(() => {
        if (!isInitialized.current) {
            initForm();
            experienciasHandler({ type: REDUCER_ACTIONS.START, form: experienciasForm });
            itemsHandle({ type: ITEMS_ACTIONS.SET_FIELDS, form: form });
            citasHandler({ type: CITAS_ACTIONS.SETFORM, form: citasform });
            participacionesHandler({ type: SUBTABLE_ACTIONS.SETFORM, form: participacionesForm });
            if (id !== undefined && id > 0)
                loadParticipante(id);
            else
                fetchData();

            isInitialized.current = true;

        } else {
            if (id !== undefined && id > 0)
                loadParticipante(id);
            else {
                const timeoutId = setTimeout(fetchData, 350);
                return () => clearTimeout(timeoutId);
            }
        }
    }, [items.load]);

    useEffect(() => {
        if (items.item.provinciaId !== undefined && items.item.provinciaId > 0)
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
                    fechaNacimiento: toDate(r.data.fechaNacimiento),
                    email: formatEmails(r.data.email),
                    telefono: formatPhones(r.data.telefono),
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
            if (!respon.status)
                console.error("Error realizando la petición");
            
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
            console.debug(citas);
            const citasModificadas = citas.items.filter(cita => cita.modified == true);
            citasModificadas.forEach(element => {
                saveAPI('/silefe.cita/save-cita', {id:element.citaId , obj: element}, referer).then(response=> {
                    console.log("se ha enviado correctamente");
                })
            });

            fetchData();
            setToastItems([...toastItems, { title: Liferay.Language.get("Guardar"), type: "info", text: Liferay.Language.get('Guardado_correctamente') }]);
        }
        else
            setToastItems([...toastItems, { title: Liferay.Language.get("Guardar"), type: "danger", text: Errors[error] }]);

        //console.debug(state.ancestorId);
        if (state !== undefined && state !== null && state.backUrl.length > 0)
            navigate(state.backUrl + state.ancestorId);
    }

    form.beforeEdit = beforeEdit;
    form.handleSave = handleSave;
    form.loadCsv = loadCsv;
    form.handleNew = newElement;

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
        if (redTitulaciones.tipoOptions === undefined || redTitulaciones.tipoOptions.length === 0)
            queryTitulaciones();

        if (form.fields.situacionLaboral.options === undefined)
            await initForm();

        let { data, totalPages, page, totalItems } = await fetchAPIData('/silefe.participante/filter', formatPost(items), referer);
        const tmp = await data.map(i => {
            return ({
                ...i,
                id: i.participanteId,
                fechaNacimiento: toDate(i.fechaNacimiento),
                insInicio: toDate(i.insInicio), 
                insFin: toDate(i.insFin), 
                email: formatEmails(i.email),
                telefono: formatPhones(i.telefono),
                tipoDoc: i.tipoDoc.toString(),
                colectivos: i.colectivos ?? [],
                carnets: i.carnets ?? [],
                prestaciones: i.prestaciones ?? [],
                adjuntos: i.adjuntos.map(a => ({ ...a, edit: false, src: toURL(a.uuid, a.groupId) })),
                checked: false
            })
        });
        await itemsHandle({ type: ITEMS_ACTIONS.LOAD_ITEMS, items: tmp, total: totalItems, totalPages: totalPages, page: page });
    }

    const loadParticipantExternal = () => {

        fetch('https://jsonplaceholder.typicode.com/users/1')
            .then((response) => response.json())
            .then((json) => {
                const participante = {
                    nombre: json.name,
                }
                itemsHandle({ type: ITEMS_ACTIONS.SETCOMPLETEITEM, item: participante });
            })
            .catch(error => {
                console.error(error);
            })
    }

    const initForm = () => {
        const lang = getLanguageId();
        form.fields.loadCividas.onclick = loadParticipantExternal;
        const seleccionarlabel = Liferay.Language.get('Seleccionar');
        fetchAPIData('/silefe.colectivo/all', {}, referer).then(response => {
            const opts = [...response.data.map(obj => { return { value: obj.id, label: obj.descripcion[lang] } })];
            form.fields.colectivos.options = opts;
        });

        fetchAPIData('/silefe.carnet/all', {}, referer).then(response => {
            const opts = [...response.data.map(obj => { return { value: obj.id, label: obj.descripcion[lang] } })];
            form.fields.carnets.options = opts;
        });

        fetchAPIData('/silefe.prestacion/all', {}, referer).then(response => {
            const opts = [...response.data.map(obj => { return { value: obj.id, label: obj.descripcion[lang] } })];
            form.fields.prestaciones.options = opts;
        });

        fetchAPIData('/silefe.dgeografica/all', {}, referer).then(response => {
            form.fields.geograficas.options = [...response.data.map(obj => { return { value: obj.id, label: obj.descripcion[lang] } })];
        });

        fetchAPIData('/silefe.cno/all', { }, referer).then(response => {
            const opts = [{ value: "0", label: "Seleccionar" }, ...response.data.map(obj => ({ value: obj.id, label: obj.descripcion[lang] }) )];
            form.fields.puestos.options = opts;
        });

        // TODO: Ver como rellenar la situación laboral
        form.fields.situacionLaboral.options = [
            { value: "0", label: seleccionarlabel },
            { value: "1", label: "Trabajando" },
            { value: "2", label: "Desempleado" },
            //{ value: "3", label: "Estudiando" }
        ];

        fetchAPIData('/silefe.salario/all', {}, referer).then(response => {
            const opts = [{ value: "0", label: seleccionarlabel }, ...response.data.map(obj => { return { value: obj.id, label: obj.descripcion[lang] } })];
            form.fields.rangoSalarialId.options = opts;
        });
        fetchAPIData('/silefe.horario/all', {}, referer).then(response => {
            const opts = [{ value: "0", label: seleccionarlabel }, ...response.data.map(obj => { return { value: obj.id, label: obj.descripcion[lang] } })];
            form.fields.insJornadaId.options= opts;
            form.fields.jornadaId.options = opts;
        });

        fetchAPIData('/silefe.discapacidad/all', {}, referer).then(response => {
            const opts = [{ value: "0", label: seleccionarlabel }, ...response.data.map(obj => { return { value: obj.id, label: obj.descripcion[lang] } })];
            form.fields.tipoDiscapacidad.options = opts;
        });

        fetchAPIData('/silefe.porcentajediscapacidad/all', {}, referer).then(response => {
            const opts = [{ value: "0", label: seleccionarlabel }, ...response.data.map(obj => { return { value: obj.id, label: obj.descripcion[lang] } })];
            form.fields.porcentajeDiscapacidad.options = opts;
        });

        fetchAPIData('/silefe.provincia/all', {}, referer).then(response => {
            const opts = [{ value: "0", label: seleccionarlabel }, ...response.data.map(obj => ({ value: obj.id, label: obj.nombre[lang] }))];
            form.fields.provinciaId.options = opts;
            form.fields.provinciaId.change = () => console.log("cambia la provincia");//changeProvince;
        });
        //fetchAPIData('/silefe.municipio/filter-by-province', {lang: getLanguageId(), page:0,province: 1},referer).then(response => {
        //    const opts = [{value:"0",label:seleccionarlabel}, ...response.data.map(obj => {return {value:obj.id,label:obj.nombre}})];
        //    form.fields.municipioId.options = opts;
        //    form.fields.municipioId.change = change2;
        //});
        fetchAPIData('/silefe.tiposvia/all', { page: 0, province: 1 }, referer).then(response => {
            const opts = [{ value: "0", label: seleccionarlabel }, ...response.data.map(obj => { return { value: obj.id, label: obj.nombre[lang] } })];
            form.fields.tipoviaId.options = opts;
            form.fields.tipoviaId.change = () => { console.log("cambiando el tipo de via") };
        });
        form.fields.tipoDoc.options = [{ value: "0", label: seleccionarlabel }, { value: "1", label: "DNI" }, { value: "2", label: "NIE" }, { value: "3", label: "Pasaporte" }];
        form.fields.sexo.options = [{ key: 0, value: "H", label: Liferay.Language.get('Hombre') }, { key: 1, value: "M", label: Liferay.Language.get('Mujer') }];

        fetchAPIData('/silefe.tipocontrato/all', {}, referer).then(response => {
            const opts = response.data.map(item => ({ value: item.tipoContratoId, label: item.descripcion[lang] }));
            form.fields.insTipoContrato.options = opts;
            experienciasForm.fields.tipoContratoId.options = opts;
        });

        fetchAPIData('/silefe.mbaja/all', {}, referer).then(response => {
            const motivos = response.data.map(item => ({ value: item.id, label: item.descripcion[lang] }));//.unshift({ id: 0, descripcion: " " });
            experienciasForm.fields.motivoBajaId.options = motivos;
        });

        fetchAPIData('/silefe.empresa/all', {}, referer).then(response => {
            //const motivos = response.data.map(item => ({ value: item.id, label: item.descripcion[lang] }));
            const opts = response.data.map(item => ({value: item.empresaId, label: item.razonSocial}));
            form.fields.insEmpresaId.options = opts;
            //experienciasForm.fields.motivoBajaId.options = motivos;
        });

        fetchAPIData('/silefe.cno/all', { descripcion: "" }, referer).then(response => {
            const opts = response.data.map(item => ({ value: item.id, label: item.descripcion[lang] }));
            form.fields.insPuesto.options = opts;
            //experienciasHandler({ type: EXPERIENCIA_ACTIONS.OCUPACIONES, ocupaciones: opts });
        });
    }

    const changeProvince = (id) => {
        fetchAPIData('/silefe.municipio/filter-by-province', { page: 0, province: id }, referer).then(response => {
            const opts = [{ value: "0", label: Liferay.Language.get('Seleccionar') }, ...response.data.map(obj => ({ value: obj.id, label: obj.nombre[getLanguageId()] }))];
            itemsHandle({ type: ITEMS_ACTIONS.SET_FORMOPTIONS, fieldname: 'municipioId', options: opts });
        });
    }

    const beforeFormacion = (participanteId) => {
        if (participanteId !== undefined) {
            fetchAPIData('/silefe.formacionparticipante/filter-by-participante', { participante: participanteId }, referer).then(response => {
                const tits = response.data.map(i => ({
                    ...i,
                    id: i.formacionParticipanteId,
                    ini: toDate(i.inicio),
                    inicio: toDate(i.inicio),
                    fin: toDate(i.fin),
                    titulacionName: i.titulacion[getLanguageId()],
                }));
                titulacionHandler({ type: TITULACIONES_ACTIONS.LOAD_ITEMS, items: tits })
            }).catch((e) => {
                console.log("Error cargando las titulaciones de un alumno");
                console.error(e);
            })
        }
    }

    const beforeExperiencia = (participanteId) => {
        fetchAPIData('/silefe.experienciaparticipante/filter-by-participante', { participante: participanteId }, referer).then(response => {
            const experiencias = response.data.map(item => {
                return {
                    ...item,
                    id: item.experienciaParticipanteId,
                    participanteId: participanteId,
                    ini: toDate(item.inicio),
                    fin: toDate(item.fin),
                }
            });
            experienciasHandler({ type: REDUCER_ACTIONS.LOAD_ITEMS, items: experiencias, participanteId: participanteId });
        });
    }

    const queryTitulaciones = () => {
        const lang = getLanguageId();
        fetchAPIData('/silefe.titulaciontipo/all', { descripcion: "" }, referer).then(response => {
            const opts = response.data.map(item => ({
                ...item,
                value: item.titulacionTipoId,
                label: item.descripcion[lang]
            }));
            titulacionesForm.fields.titulacionTipoId.options = opts;
        });
        
        fetchAPIData('/silefe.titulacionnivel/all', { descripcion: "" }, referer).then(response => {
            const opts = response.data.map(item => ({ ...item, descripcion: item.descripcion[lang], tipo: item.tipo[lang] }));
            titulacionesForm.fields.titulacionNivelId.all = opts;
        });
        
        fetchAPIData('/silefe.titulacionfam/all', { descripcion: "" }, referer).then(response => {
            const opts = response.data.map(item => ({ ...item, descripcion: item.descripcion[lang] }));
            titulacionesForm.fields.titulacionFamiliaId.all = opts;
        });
        
        fetchAPIData('/silefe.titulacion/all', {}, referer).then(response => {
            const opts = response.data.map(item => ({ ...item, descripcion: item.descripcion[lang] }));
            titulacionesForm.fields.titulacionId.all = opts;
        });
        titulacionHandler({ type: TITULACIONES_ACTIONS.START, form: titulacionesForm });
    }
    // <ExperienciasRender
    //     experiencias={redExperiencias}
    //     experienciasHandler={experienciasHandler}
    //     key={"experiencias"}
    // />,

    const plugin = () => {
        return {
            Titulaciones:
                <TitulacionesRender
                    redTitulaciones={redTitulaciones}
                    titulacionHandler={titulacionHandler}
                />,
            Experiencias:
                <SimpleTable
                    reducer={redExperiencias}
                    handler={experienciasHandler}
                />,            
            Citas:
                <Citas
                    items={citas}
                    handler={citasHandler}
                />,
            Participaciones:
                <Citas
                    reducer={participaciones}
                    handler={participacionesHandler}
                />,
            Historico:
                <FHistoryEntity
                    data={historico}
                    handler={handleHistorico}
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
                    user={user}
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
