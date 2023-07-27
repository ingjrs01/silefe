import React, { useEffect, useReducer, useRef, useState } from "react";
import TabsForm from '../../includes/interface/TabsForm';
import Menu from '../Menu';
import Table from '../../includes/interface/Table';
import { useModal } from '@clayui/modal';
import { getUserId, getLanguageId, url_referer } from '../../includes/LiferayFunctions';
import { red_items, ITEMS_ACTIONS, initialState } from '../../includes/reducers/items.reducer';
import Papa from "papaparse";
import { batchAPI, deleteAPI, fetchAPIData, saveAPI, fetchAPIRow } from "../../includes/apifunctions";
import { LoadFiles } from '../../includes/interface/LoadFiles'
import { FAvisos } from '../../includes/interface/FAvisos'
import { FModal } from '../../includes/interface/FModal';
import { Errors } from '../../includes/Errors';
import { form as formulario } from "./Form";
import CentrosRender from "./CentrosRender";
import { reducerCentros, CENTROS_ACTIONS } from "../../includes/reducers/centros.reducer";
import { reducerContactos, CONTACTOS_ACTIONS } from "../../includes/reducers/contactos.reducer";
import ContactosRender from "./ContactosRender";
import { Paginator } from "../../includes/interface/Paginator";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const Empresas = () => {
    const [items, itemsHandle] = useReducer(red_items,initialState);
    const [redCentros, centrosHandle] = useReducer(reducerCentros);
    const [redContactos, contactosHandle] = useReducer(reducerContactos);
    const [toastItems, setToastItems] = useState([]);
    const { observer, onOpenChange, open } = useModal();
    const [file, setFile] = useState();
    const isInitialized = useRef(null);
    const { id } = useParams();
    const { state } = useLocation();
    const navigate = useNavigate();

    const referer = `${url_referer}/empresas`;
    const form = formulario;

    console.log("Estoy en empresas");

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
                emailDefault :  (i.email != null && i.email.length > 0) ? JSON.parse(i.email)[0].value : "",
                telefono: (i.telefono != null && i.telefono.length > 0) ? JSON.parse(i.telefono) : [],
                telefonoDefault: (i.telefono != null && i.telefono.length > 0) ? JSON.parse(i.telefono)[0].value : "",
                checked: false
            })
        });
        await console.log("voy a ver los items");
        await console.debug(tmp);
        await itemsHandle({ type: ITEMS_ACTIONS.START, items: tmp, fields: form, totalPages: totalPages, total: toastItems, page: page });
    }

    const initCentrosForm = () => {
        const seleccionarlabel = Liferay.Language.get('Seleccionar');
        form.fields.tipoDoc.options = [{ value: "0", label: seleccionarlabel }, { value: "1", label: "DNI" }, { value: "2", label: "NIE" }, { value: "3", label: "CIF" }];

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

        let obj = { obj: items.item, id: items.item.empresaId };
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
                if (redContactos.modified.length > 0 ) {
                  const contacts = redContactos.items.filter( i => redContactos.modified.includes( i.id )  );
                  saveAPI('/silefe.contacto/save-by-empresa',{id: data.empresaId, contactos: contacts ,userId:getUserId() },referer).then( response => {
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
            // Ver a donde hay que navegar ahora
            if (state != 'undefined' && state.backUrl.length > 0) {
                //debugger;
                navigate(state.backUrl);
            }            
        });
    }

    const handleDelete = () => {
        console.log("delete");
    }

    const beforeEdit = () => {        
        let sel = items.arr.filter(i => i.checked);
        if (sel.length > 0) {
            const empresaId = sel[0].id;
            fetchAPIData('/silefe.empresacentros/filter-by-empresa', { lang: getLanguageId(), empresaId: empresaId }, referer).then(response => {
                console.log("Consultados los centors");
                console.debug(response);
                let centros = response.data.map(i => {
                    return {
                        ...i,
                        id: i.empresaCentrosId
                    }
                });
                centrosHandle({ type: CENTROS_ACTIONS.LOAD, items: centros });
            });

            fetchAPIData('/silefe.contacto/filter-by-empresa', { empresaId: empresaId }, referer).then(response2 => {
                console.log("Consultados los contactos");
                console.debug(response2);
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
                />,
            Contactos: 
                <ContactosRender
                    redContactos={redContactos}
                    contactosHandle={contactosHandle}
                />
        }
    }


    const loadItem = () => {
        fetchAPIRow('/silefe.empresa/get',{id:id},referer).then (r => itemsHandle({type:ITEMS_ACTIONS.EDIT_ITEM,item:r})) ;
    }

    useEffect(() => {
        debugger;
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
                handleDelete={handleDelete}
                itemsHandle={itemsHandle}
                status={items.status}
                loadCsv={loadCsv}
                beforeEdit={beforeEdit}
                items={items}
                formulario={formulario}
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
            {open && <FModal onOpenChange={onOpenChange} confirmDelete={confirmDelete} observer={observer} />}
        </>
    )
}

export default Empresas;
