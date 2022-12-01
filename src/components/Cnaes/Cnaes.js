import React, {useEffect, useReducer, useRef, useState} from "react";
import DefaultForm from "../DefaultForm";
import Menu from '../Menu';
import Table from '../Table';
import ClayAlert from '@clayui/alert';
import ClayModal, {useModal} from '@clayui/modal';
import ClayButton from '@clayui/button';
import ClayCard from "@clayui/card";
import ClayForm, { ClayInput } from '@clayui/form';
import { getUserId} from '../../includes/LiferayFunctions';
//import {reducer,PAGINATION_ACTIONS} from '../../includes/reducers/paginate.reducer';
import {red_items,ITEMS_ACTIONS} from '../../includes/reducers/items.reducer';
import Papa from "papaparse";
import { batchAPI, deleteAPI, fetchAPIData, saveAPI } from "../../includes/apifunctions";

const spritemap = '../icons.svg';

const Cnaes = () => {
    //const [pagination,paginate]          = useReducer(reducer,{page:0,totalPages:0,allCheck:false})
    const [items,itemsHandle]            = useReducer(red_items,{arr:[],item:{id:0},page:0,totalPages:0,load:0});
    const [toastItems,setToastItems]     = useState([]);    
    const {observer, onOpenChange, open} = useModal();
    const [file,setFile]                 = useState();
    const isInitialized                  = useRef;

    const columns = [
        {
            columnName: "cnaeId",
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
        title: Liferay.Language.get('Cnaes'),
        languages: ["es-ES","en-US","gl-ES"],
        rows: {
            id: {
                key:1,
                type: "text",
                label: "ID",     
                name: "id",          
                value:"", 
                placeholder: "Identifier", 
                conditions:["number"],
        },
            descripcion: {
                key:2,
                type: "multilang",
                label: Liferay.Language.get('Descricion'), 
                name: "descripcion", value:"lelele", 
                placeholder: Liferay.Language.get('Descricion'), 
                conditions:["text"]},
        }       
    };

    const referer = "http://localhost:8080/cnaes";

    const loadCsv = () => {
        itemsHandle({type:ITEMS_ACTIONS.LOAD});
    }

    const processCsv = () => {
        if (file) {
            const reader = new FileReader();         
            reader.onload = async ({ target }) => {
                const csv = Papa.parse(target.result, { header: true,delimiter:";",delimitersToGuess:[";"] });
                const parsedData = csv?.data;                                
                console.log(parsedData);

                let end = '/silefe.cnae/add-multiple';
                let ttmp = { cnaes:parsedData,userId:getUserId()};

                batchAPI(end,ttmp,referer).then( res2 => {
                    if (res2.ok) {
                        setToastItems([...toastItems, { title: "Carga Masiva", type: "error", text: Liferay.Language.get('Elementos_cargados') }]);                    
                        fetchData();
                    }
                    else {
                        setToastItems([...toastItems, { title: "Carga Masiva", type: "error", text: "No se han podido cargar los datos" }]);
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
            id:          items.item.id,
            descripcion: items.item.descripcion,
            userId:      getUserId()
        }

        let endpoint = '/silefe.cnae/save-cnae';
        if (items.status === 'new')
            endpoint = '/silefe.cnae/add-cnae';

            res = saveAPI(endpoint,data,referer).then(res => {
                if (res) {
                    fetchData();
                    setToastItems([...toastItems, { title: "Guardar", type: "info", text: "Elemento añadido correctamente" }]);            
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
        const endpoint = "/silefe.cnae/remove-cnaes";
        let s = items.arr.filter(item => item.checked).map( i => {return i.id});


        deleteAPI(endpoint,s,referer).then(res => {
            if (res) {
                setToastItems([...toastItems, { title: Liferay.Language.get('Borrar'), type: "error", text: Liferay.Language.get('Borrado_ok') }]);
                fetchData();        
            }
            else {
                setToastItems([...toastItems, { title: Liferay.Language.get('Borrar'), type: "error", text: Liferay.Language.get('Borrado_no') }]);
            }
        })

    }

    const fetchData = async () => {
        const endpoint = "/silefe.cnae/filter";
        const postdata = {
            page: (items.page>0)?items.page:0,
            descripcion : (items.search && typeof items.search !== 'undefined')?items.search:""
        }
        let {data,totalPages,page} = await fetchAPIData(endpoint,postdata,referer);

        const tmp = await data.map(i => {return({...i,id:i.cnaeId,checked:false})});
        await itemsHandle({type:ITEMS_ACTIONS.START,items:tmp, fields: form,totalPages:totalPages,page:page});
        //await paginate({type:PAGINATION_ACTIONS.TOTAL_PAGES,pages:totalPages});
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

//    useEffect(() => {
//		if (!isInitialized.current) {
//            fetchData();
//			isInitialized.current = true;
//		} else {
//			const timeoutId = setTimeout(fetchData, 350);
//			return () => clearTimeout(timeoutId);
//		}
//    }, [items.search]);


    if (!items) 
        return (<div>Liferay.Language.get('Cargando')</div>)

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
                </ClayCard>
            }
           
            { (items.status === 'edit' || items.status === 'new') && 
                <DefaultForm 
                    form={form} 
                    save={ handleSave} 
                    itemsHandle={itemsHandle}
                    items={items}
                />
            }

            {
                (items.status === 'list') &&
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
                        <h1>{ Liferay.Language.get('Seguro_borrar') }</h1>
                    </ClayModal.Body>
                    <ClayModal.Footer
                        first={
                            <ClayButton.Group spaced>
                                <ClayButton displayType="secondary" onClick={()=>onOpenChange(false)}>{Liferay.Language.get('Cancelar')}</ClayButton>
                            </ClayButton.Group>
                        }
                        last={
                            <ClayButton onClick={() => {onOpenChange(false);confirmDelete()}}>
                                {"Borrar"}
                            </ClayButton>
                        }
                    />
                </ClayModal>
            )}
        </>
    )
}

export default Cnaes;