import React,{useEffect,useReducer,useRef,useState} from "react";
import DefaultForm from "../DefaultForm";
import Menu from '../Menu';
import Table from '../Table';
import ClayAlert from '@clayui/alert';
import ClayModal, {useModal} from '@clayui/modal';
import ClayForm, { ClayInput } from '@clayui/form';
import ClayCard from "@clayui/card";
import ClayButton from '@clayui/button';
import {url_api, getUserId} from '../../includes/LiferayFunctions';
import {ITEMS_ACTIONS,red_items} from '../../includes/reducers/items.reducer';
import Papa from "papaparse";
import { batchAPI, deleteAPI, fetchAPIData, saveAPI } from "../../includes/apifunctions";

const spritemap = '../icons.svg';

const Horarios = () => {
    const [items,itemsHandle]            = useReducer(red_items,{arr:[],item:{id:0},totalPages:0,page:0,load:0}); 
    const [toastItems,setToastItems]     = useState([]);    
    const {observer, onOpenChange, open} = useModal();
    const isInitialized                  = useRef;

    const referrer = "http://localhost:8080/horarios";

    const columns = [
        {
            columnName: "id",
            columnTitle: "Id",
            columnType: "checkbox",
            key: "c1",
        },
        {
            columnName: "descripcion",
            columnTitle: "Descripción",
            columnType: "string",
            key: "c2",
        },
    ];

    const form = {
        title: "Título del formulario",
        languages: ["es-ES","en-US","gl-ES"],
        rows: {
            id: {                
                key:1,
                type: "text",
                label: "ID",     
                name: "id",          
                value:"lalala", 
                placeholder:"Identifier",
                conditions: ["number"]
            },
            descripcion: {
                key:2,
                type: "multilang",
                label: "nombre", 
                name: "descripcion", 
                value:"lelele", 
                placeholder:"nombre",
                conditions: ["text"]
            }
        }
    };

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
                let end = '/silefe.horario/add-multiple';
                let ttmp = {horarios:parsedData,userId:Liferay.ThemeDisplay.getUserId()};

                batchAPI(end,ttmp,referrer).then(res => {
                    if (res2.ok) {
                        setToastItems([...toastItems, { title: "Carga Masiva", type: "info", text: Liferay.Language.get('Elementos_cargados') }]);
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
        const postdata = {
            horarioId:   items.item.id,
            descripcion: items.item.descripcion,
            userId:      getUserId(),
        }

        let endpoint = '/silefe.horario/save-horario';

        if (items.status === 'new')
            endpoint = '/silefe.horario/add-horario';

        saveAPI(endpoint,postdata,referrer).then(res => {
            console.log("saveAPI");
            if (res) {
                console.log("todo ha ido guay");
                setToastItems([...toastItems, { title: "Guardar", type: "info", text: "Datos guardados correctamente" }]);
                fetchData();
            }
            else {
                setToastItems([...toastItems, { title: "Guardar", type: "error", text: "Problemas al guardar" }]);
                console.log("Hubo problemas");
            }
        });
    }

    const handleDelete = () => {
        if (items.arr.filter(item => item.checked).length > 0) {
            let s = items.arr.filter(item => item.checked).map( i => {return i.id});
            console.log(s);

            onOpenChange(true);        
        }
    }

    const confirmDelete = async () => {
        const endpoint = '/silefe.horario/remove-horarios';
        let s = items.arr.filter(item => item.checked).map( i => {return i.id});

        deleteAPI(endpoint,s,referrer).then(res => {
            if (res ) {
                setToastItems([...toastItems, { title: "Borrar", type: "info", text: "Elemento borrado correctamente" }]);
                fetchData();
            }
            else
                setToastItems([...toastItems, { title: "Borrar", type: "error", text: "No se puede borrar" }]);
        });
    }

    const fetchData = async () => {
        const endpoint = "/silefe.horario/filter";  
        const postdata = {
            page:         items.page,
            descripcion : (items.search && typeof items.search !== 'undefined')?items.search:""
        }
        let {data, totalPages,page} = await fetchAPIData(endpoint,postdata,referrer);
        let tmp = await data.map(i => {return({...i,id:i.horarioId,checked:false})});
        await itemsHandle({type: ITEMS_ACTIONS.START,items: tmp, fields:form,totalPages:totalPages,page:page});
    }

    if (!items) 
        return (<div>Cargando</div>)

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

            {
                (items.status === 'edit' || items.status === 'new') && 
                <DefaultForm 
                    form={form} 
                    save={ handleSave} 
                    itemsHandle={itemsHandle}
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
                    <ClayModal.Header>{"Confirmación"}</ClayModal.Header>
                    <ClayModal.Body>
                        <h1>{"Seguro que desea borrar este elemento ?"}</h1>
                    </ClayModal.Body>
                    <ClayModal.Footer
                        first={
                            <ClayButton.Group spaced>
                                <ClayButton displayType="secondary" onClick={()=>onOpenChange(false)}>{"Cancelar"}</ClayButton>
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

export default Horarios;