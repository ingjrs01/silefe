import { useModal } from '@clayui/modal';
import React, { useEffect, useReducer, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Errors } from '../../includes/Errors';
import { getLanguageId, getUserId, url_referer } from '../../includes/LiferayFunctions';
import { deleteAPI, fetchAPIData, fetchAPIRow, saveAPI } from "../../includes/apifunctions";
import { FAvisos } from '../../includes/interface/FAvisos';
import { FModal } from '../../includes/interface/FModal';
import { LoadFiles } from '../../includes/interface/LoadFiles';
import { Paginator } from "../../includes/interface/Paginator";
import Table from '../../includes/interface/Table';
import TabsForm from '../../includes/interface/TabsForm';
import { CENTROS_ACTIONS, initialState as iniCentros, reducerCentros } from "../../includes/reducers/centros.reducer";
import { CONTACTOS_ACTIONS, initialState as iniContactos, reducerContactos } from "../../includes/reducers/contactos.reducer";
import { ITEMS_ACTIONS, initialState, red_items } from '../../includes/reducers/items.reducer';
import Menu from '../Menu';
import CentrosRender from "./CentrosRender";
import ContactosRender from "./ContactosRender";
import { form as formulario } from "./Form";

const Empresas = () => {
    const [items, itemsHandle]             = useReducer(red_items,initialState);
    const [redCentros, centrosHandle]      = useReducer(reducerCentros, iniCentros);
    const [redContactos, contactosHandle]  = useReducer(reducerContactos, iniContactos);
    const [toastItems, setToastItems]      = useState([]);
    const { observer, onOpenChange, open } = useModal();
    const [file, setFile]                  = useState();
    const isInitialized                    = useRef(null);
    const { id }                           = useParams();
    const { state }                        = useLocation();
    const navigate                         = useNavigate();

    const referer = `${url_referer}/empresas`;

    const beforeEdit = (id) => {
        let empresaId = 0;
        debugger;
        if (id === undefined) {
            empresaId = items.arr.filter(i => i.checked)[0].id;
        }
        else {
            if (typeof(id) == 'int')
                empresaId = id;
            else
                empresaId = id.id;
        }

        fetchAPIData('/silefe.empresacentros/filter-by-empresa', { lang: getLanguageId(), empresaId: empresaId }, referer).then(response => {
            let centros = response.data.map(i => {
                return {
                    ...i,
                    id: i.empresaCentrosId
                }
            });
            centrosHandle({ type: CENTROS_ACTIONS.LOAD, items: centros });
        });

        fetchAPIData('/silefe.contacto/filter-by-empresa', { empresaId: empresaId }, referer).then(response2 => {
            let contacts = response2.data.map( j => {
                return {
                    ...j,
                    id: j.contactoId,
                    email: (j.email != null && j.email.length > 0) ? JSON.parse(j.email) : [],
                    telefono: (j.telefono != null && j.telefono.length > 0) ? JSON.parse(j.telefono) : [],
                }
            });
            contactosHandle({type:CONTACTOS_ACTIONS.LOAD,items: contacts });
        });
    }

    const form = formulario;
    form.beforeEdit = beforeEdit;

    const fetchData = async () => {
        contactosHandle({type:CONTACTOS_ACTIONS.START});
        const postdata = {
            pagination: {page: items.pagination.page, pageSize: items.pagination.pageSize},
            options: {
                filters: [
                    {name: items.searchField, value: (items.nombre && typeof items.search !== 'undefined') ? items.nombre : ""},
                ],
                order: items.order
            },
        }

        if (redCentros == undefined || redCentros.provincias.length == 0)
            initCentrosForm();

        let { data, totalPages, totalItems, page } = await fetchAPIData('/silefe.empresa/filter', postdata, referer);

        const tmp = await data.map(i => {
            if (i.email != null && i.email.length > 0) {
                console.log("el email");
                //console.log(JSON.parse(i.email)[0].value);
            }
            return ({
                ...i,
                id: i.empresaId,
                email: (i.email != null && i.email.length > 0) ? JSON.parse(i.email) : [],
                telefono: (i.telefono != null && i.telefono.length > 0) ? JSON.parse(i.telefono) : [],
                checked: false
            })
        });
        await itemsHandle({ type: ITEMS_ACTIONS.START, items: tmp, fields: form, totalPages: totalPages, total: toastItems, page: page });
    }

    const initCentrosForm = () => {
        const seleccionarlabel = Liferay.Language.get('Seleccionar');
        form.fields.tipoDoc.options = [{ value: "0", label: seleccionarlabel }, { value: "1", label: "DNI" }, { value: "2", label: "NIE" }, { value: "3", label: "CIF" }];

        fetchAPIData('/silefe.cnae/all', { lang: getLanguageId() }, referer).then(response => {
            const opts = [{ value: "0", label: "Seleccionar" }, ...response.data.map(obj => { return { value: obj.id, label: obj.descripcion } })];
            form.fields.cnaeId.options = opts;
        });

        fetchAPIData('/silefe.provincia/all', { lang: getLanguageId() }, referer).then(response => {
            const opts = [{ value: "0", label: seleccionarlabel }, ...response.data.map(obj => { return { value: obj.id, label: obj.nombre } })];
            centrosHandle({ type: CENTROS_ACTIONS.PROVINCIAS, provincias: opts })
        });

        fetchAPIData('/silefe.municipio/all', { lang: getLanguageId() }, referer).then(response => {
            if (response.data.length > 0)
                centrosHandle({ type: CENTROS_ACTIONS.MUNICIPIOS, municipios: [...response.data] })
        });

        fetchAPIData('/silefe.tiposvia/all', { lang: getLanguageId() }, referer).then(response => {
            const opts = [{ value: "0", label: seleccionarlabel }, ...response.data.map(obj => { return { value: obj.id, label: obj.nombre } })];
            centrosHandle({ type: CENTROS_ACTIONS.TIPOS_VIA, tipos: opts })
        });


    }

    const handleSave = () => {
        let endpoint = '/silefe.empresa/save-empresa';
        if (items.status === 'new')
            endpoint = '/silefe.empresa/add-empresa';

        let obj = { 
            id: items.item.empresaId,
            obj: {
                ...items.item,
                userId: getUserId(),
            }, 
        };
        saveAPI(endpoint, obj, referer).then(response => {
            let { data, status, error } = response;
            if (status) {
                if (redCentros.modified.length > 0) {
                    const oo = redCentros.items.filter( i => redCentros.modified.includes( i.id )  );
                    saveAPI('/silefe.empresacentros/save-centros-by-empresa', {id: data.empresaId, centros: oo,userId: getUserId()} , referer).then(respon => {
                        console.log("lalala")
                    });
                }
                // ahora tenemos que borrar los items que hallan sido borrados
                if (redCentros.deleted.length > 0) {
                    const delCentros = redCentros.deleted.map(d => { return (d.empresaCentrosId) });
                    deleteAPI('/silefe.empresacentros/delete-empresa-centros', delCentros, referer).then(res => {
                        console.log("delete experiencias");
                    });
                }

                // vamos a sincronizar los contactos, sólo si se han modificado
                // ponemos el origenId aquí,porque es donde lo sabemos cuando la empresa es nueva
                if (redContactos.modified.length > 0 ) {
                    const contacts = redContactos.items.filter(i=>redContactos.modified.includes(i.id)).map((item)=>({...item,origenId: data.empresaId, userId: getUserId()}));
                    saveAPI('/silefe.contacto/save-by-empresa',{id: data.empresaId, contactos: contacts  },referer).then( response => {
                        console.log("a la vuelta de guardar los contactos");
                        console.debug(response.data);
                });
                }

                if (redContactos.deleted.length > 0) {
                    deleteAPI('/silefe.contacto/delete-contactos', redContactos.deleted, referer).then(res => {
                        console.log("delete Contactos");
                    });
                }

                fetchData();
                setToastItems([...toastItems, { title: Liferay.Language.get("Guardar"), type: "info", text: Liferay.Language.get('Guardado_correctamente') }]);
            } else {
                setToastItems([...toastItems, { title: Liferay.Language.get("Guardar"), type: "danger", text: Errors[error] }]);
            }
            
            if (state != null && state.backUrl.length > 0) {
                navigate(state.backUrl + state.ancestorId);
            }
        });
    }

    const confirmDelete = async () => {
        const endpoint = "/silefe.empresa/delete-empresas";
        let s = items.arr.filter(item => item.checked).map( i => {return i.id});
        deleteAPI(endpoint,s,referer).then(res => {
            if (res) {
                setToastItems([...toastItems, { title: Liferay.Language.get('Borrar'), type: "info", text: Liferay.Language.get('Borrado_ok') }]);
                fetchData();        
            }
            else 
                setToastItems([...toastItems, { title: Liferay.Language.get('Borrar'), type: "danger", text: Liferay.Language.get('Borrado_no') }]);
        });
    }

    const loadCsv = () => {
        console.log("loadCsv");
    }

    const plugin2 = () => {
        return {
            Centros:
                <CentrosRender
                    reducer={redCentros}
                    centrosHandle={centrosHandle}
                />,
            Contactos:
                <ContactosRender
                    redContactos={redContactos}
                    contactosHandle={contactosHandle}
                />
        }
    }

    const loadItem = (id) => {
        beforeEdit(id);
        fetchAPIRow('/silefe.empresa/get',{id:id},referer).then (r => {
            const tmp = {
                ...r,
                data: {
                    ...r.data,
                    email: (r.data.email != null && r.data.email.length > 0)?JSON.parse(r.data.email):[],
                    telefono: (r.data.telefono != null && r.data.telefono.length > 0)?JSON.parse(r.data.telefono):[],
                }
            }
            itemsHandle({type:ITEMS_ACTIONS.EDIT_ITEM,item:tmp});
        }) ;
    }

    useEffect(() => {
        initCentrosForm();
        if (!isInitialized.current) {
            itemsHandle({type: ITEMS_ACTIONS.SET_FIELDS, form: form});
            if (id != 'undefined' && id > 0) {
                loadItem(id);
            }
            else
                fetchData();

            isInitialized.current = true;
        } else {
            if (id != 'undefined' && id > 0) {
                loadItem(id);
            }
            else {
                const timeoutId = setTimeout(fetchData, 350);
                return () => clearTimeout(timeoutId);
            }
        }
    }, [items.load]);

    if (!items)
        return (<div>{Liferay.Language.get('Cargando')}</div>)

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
                    plugin={plugin2}
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
            {open && <FModal onOpenChange={onOpenChange} confirmDelete={confirmDelete} observer={observer} />}
        </>
    )
}

export default Empresas;
