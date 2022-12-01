import React, {useState,useEffect, useReducer, useRef} from 'react';
import DefaultForm from '../DefaultForm';
import Menu from '../Menu';
import Table from '../Table';
import ClayAlert from '@clayui/alert';
import ClayModal, {useModal} from '@clayui/modal';
import ClayButton from '@clayui/button';
import {getUserId} from '../../includes/LiferayFunctions';
import {red_items,ITEMS_ACTIONS} from '../../includes/reducers/items.reducer';
import { deleteAPI, fetchAPIData, saveAPI } from '../../includes/apifunctions';

const spritemap = '../icons.svg';

const Experiencias = () => {
    const [items, itemsHandle]           = useReducer(red_items, { arr: [], item: { id: 0, checked: false }, checkall: false, showform: false,totalPages:0,page:0,load:0});
    const [toastItems,setToastItems]     = useState([]);    
    const {observer, onOpenChange, open} = useModal();
    const [file,setFile]                 = useState();
    const referer = "http://localhost:8080/experiencias";
    const isInitialized = useRef;

    const columns = [
        {
            columnName: "id",
            columnTitle: "Id",
            columnType: "checkbox",
            key: "c1",
        },
        {
            columnName: "descripcion",
            columnTitle: Liferay.Language.get('Descripcion'),
            columnType: "string",
            key: "c2",
        },
    ];

    const form = {
        title: Liferay.Language.get("Experiencias"),
        languages: ["es-ES","en-US","gl-ES"],
        rows: {
            id: {
                key:1,
                type: "text",
                label: "ID",     
                name: "id",          
                value:"lalala", 
                placeholder:"Identifier",
                conditions:["number"]
            },
            descripcion: {
                key:2,
                type: "multilang",
                label: Liferay.Language.get('Nombre'), 
                name: "descripcion", 
                value:"lelele", 
                placeholder:Liferay.Language.get('Nombre'),
                conditions:["text"]
            },
        }
        
    };

    const loadCsv = () => {
        console.log("Cargando un csv");
        itemsHandle({type:ITEMS_ACTIONS.LOAD})
    }

    const handleSave = async () => {
        const postdata = {
            id:          items.item.id,
            descripcion: items.item.descripcion,
            userId:      getUserId()
        }

        let endpoint =  "/silefe.experiencia/save-experiencia";

        if (items.status === 'new')
            endpoint = "/silefe.experiencia/add-experiencia";
        
        saveAPI(endpoint,postdata,referer).then(res => {
            if (res) {
                setToastItems([...toastItems, { title: "Guardar", type: "info", text: "Elemento añadido correctamente" }]);
                fetchData();
            }
            else {
                setToastItems([...toastItems, { title: "Guardar", type: "error", text: "Error" }]);
            }
        })
    }

    const handleDelete = () => {
        if (items.arr.filter(item => item.checked).length > 0)
            onOpenChange(true);        
    }

    const confirmDelete = async () => {
        const endpoint = "/silefe.experiencia/remove-experiencias";
        let s = items.arr.filter(item => item.checked).map( i => {return i.id});

        deleteAPI(endpoint,s,referer).then(res => {
            if (res) {
                setToastItems([...toastItems, { title: Liferay.Language.get('Borrar'), type: "info", text: Liferay.Language.get('Borrado_ok') }]);
                fetchData();
            }
            else
                setToastItems([...toastItems, { title: Liferay.Language.get('Borrar'), type: "error", text: Liferay.Language.get('Borrado_no') }]);
        })
    }

    const fetchData = async () => {
        const endpoint = "/silefe.experiencia/filter";
        const postdata = {
            page:        items.page,
            descripcion: (items.search && typeof items.search !== 'undefined')?items.search:""
        };

        let {data,totalPages,page} = await fetchAPIData(endpoint,postdata,referer);
        const tmp = await data.map(i => {return({...i,id:i.experienciaId,checked:false})});
        await itemsHandle({type:ITEMS_ACTIONS.START,items:tmp, fields: form, totalPages:totalPages,page:page});
    }

    useEffect( ()=> {
		if (!isInitialized.current) {
            fetchData();
			isInitialized.current = true;
		} else {
			const timeoutId = setTimeout(fetchData, 350);
			return () => clearTimeout(timeoutId);
		}
    },[items.load]);

    return (
        <>
            <Menu 
                handleSave={handleSave} 
                handleDelete={handleDelete} 
                itemsHandle={itemsHandle}
                status={items.status}
                loadCsv={loadCsv}
            />
            { (items.status === 'load') && 
            <ClayCard>
                <ClayCard.Body>
                    <ClayCard.Description displayType="title">
                        <h2>Cargando ficheros</h2>
                    </ClayCard.Description>

                    <ClayCard.Description truncate={false} displayType="text">
                        <ClayForm>
                            <ClayForm.Group className={'has-success'}>
                                <label htmlFor="basicInput">{Liferay.Language.get('Selecciona')}</label>
                                <ClayInput
                                    type="text"
                                    name="ficheros"
                                    onChange={e => {
                                        console.log("llamando");
                                    }}>
                                </ClayInput>

                            </ClayForm.Group>

                            <input type="file" name="files" multiple onChange={(e) => setFile(e.target.files[0])} />

                        </ClayForm>
                    </ClayCard.Description>
                    <div className="btn-group">
                        <div className="btn-group-item">
                            <ClayButton onClick={e => processCsv()} displayType="secondary">{Liferay.Language.get('Guardar')}</ClayButton>
                        </div>
                        <div className="btn-group-item">
                            <ClayButton onClick={e => itemsHandle({type:ITEMS_ACTIONS.CANCEL_LOAD})} displayType="secondary">{Liferay.Language.get('Cancelar')}</ClayButton>
                        </div>
                    </div>
                </ClayCard.Body>
            </ClayCard>}

            {   (items.status === 'edit' || items.status === 'new') && 
                <DefaultForm 
                    form={form} 
                    itemsHandle={itemsHandle}
                    save={ handleSave} 
                    items={items}
            />
        }
            
            {
                items.status === 'list' &&
                <Table 
                    columns={columns}
                    rows={items} 
                    itemsHandle={itemsHandle}
                 />
            }

            <ClayAlert.ToastContainer>
                {toastItems.map(value => (
                <ClayAlert
                    autoClose={5000}
                    key={value}
                    onClose={() => {
                        setToastItems(prevItems =>
                            prevItems.filter(item => item !== value)
                        );
                    }}
                    spritemap={spritemap}
                    title={`${value.title}`}
                    displayType={value.type}
                >{`${value.text}`}</ClayAlert>
                ))}
            </ClayAlert.ToastContainer>

            {open && (
                <ClayModal
                    observer={observer}
                    size="lg"
                    spritemap={spritemap}
                    status="info"
                >
                    <ClayModal.Header>{Liferay.Language.get('Confirmacion')}</ClayModal.Header>
                    <ClayModal.Body>
                        <h1>{Liferay.Language.get('Seguro_borrar')}</h1>
                    </ClayModal.Body>
                    <ClayModal.Footer
                        first={
                            <ClayButton.Group spaced>
                                <ClayButton displayType="secondary" onClick={()=>onOpenChange(false)}>{Liferay.Language.get('Cancelar')}</ClayButton>
                            </ClayButton.Group>
                        }
                        last={
                            <ClayButton onClick={() => {onOpenChange(false);confirmDelete()}}>
                                { Liferay.Language.get('Borrar') }
                            </ClayButton>
                        }
                    />
                </ClayModal>
            )}
        </>
    )
}

export default Experiencias;