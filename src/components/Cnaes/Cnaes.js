import React, {useEffect, useReducer, useState} from "react";
import DefaultForm from "../DefaultForm";
import Menu from '../Menu';
import Table from '../Table';
import ClayAlert from '@clayui/alert';
import ClayModal, {useModal} from '@clayui/modal';
import ClayButton from '@clayui/button';
import ClayCard from "@clayui/card";
import ClayForm, { ClayInput } from '@clayui/form';
import {getAuthToken,getLanguageId,url_api} from '../../includes/LiferayFunctions';
import {reducer,PAGINATION_ACTIONS} from '../../includes/reducers/paginate.reducer';
import {red_items,ITEMS_ACTIONS} from '../../includes/reducers/items.reducer';

const spritemap = '../icons.svg';

const Cnaes = () => {
    const [pagination,paginate]          = useReducer(reducer,{page:0,totalPages:0,allCheck:false})
    const [items,itemsHandle]            = useReducer(red_items,{arr:[],item:{id:0}});
    const [toastItems,setToastItems]     = useState([]);    
    const {observer, onOpenChange, open} = useModal();


    const columns = [
        {
            columnName: "colectivoId",
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

    const auth = getAuthToken()
    const lang = getLanguageId();
    const referer = "http://localhost:8080/cnaes";

    const loadCsv = () => {
        console.log("Cargando un csv");
        //setShowfiles(true);
        itemsHandle({type:ITEMS_ACTIONS.LOAD});
    }

    const handleSave = async () => {
        const data = {
            id:          items.item.id,
            descripcion: items.item.descripcion,
            userId:      Liferay.ThemeDisplay.getUserId(),
            userName:    Liferay.ThemeDisplay.getUserName(),
            languageId:  lang            
        }

        let endpoint = '/silefe.cnae/save-cnae';
        if (items.status === 'new')
            endpoint = '/silefe.cnae/add-cnae';

        const res = await fetch(url_api, {
            "credentials": "include",
            "headers": {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:104.0) Gecko/20100101 Firefox/104.0",
                "Accept": "*/*",
                "Accept-Language": "es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3",
                "contenttype": "undefined",
            "x-csrf-token": auth,
            "Content-Type": "text/plain;charset=UTF-8",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-origin"
        },
        "referrer": `\"${referer}\"`,
        "body": `{\"${endpoint}\":${JSON.stringify(data)}}`,
        "method": "POST",
        "mode": "cors"
        });

//        await itemsHandle({type:ITEMS_ACTIONS.HIDE});
        await onOpenChange(false);
        await fetchData();
    }

    const handleDelete = () => {
        if (items.arr.filter(item => item.checked).length > 0)
            onOpenChange(true);        
    }

    const confirmDelete = async () => {
        const endpoint = "/silefe.cnae/remove-cnaes";
        let s = items.arr.filter(item => item.checked).map( i => {return i.id});

        const res = await fetch(url_api, {
            "credentials": "include",
            "headers": {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:104.0) Gecko/20100101 Firefox/104.0",
                "Accept": "*/*",
                "Accept-Language": "es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3",
                "contenttype": "undefined",
                "x-csrf-token": auth,
                "Content-Type": "text/plain;charset=UTF-8",
                "Sec-Fetch-Dest": "empty",
                "Sec-Fetch-Mode": "cors",
                "Sec-Fetch-Site": "same-origin"
            },
            "referrer": `\"${referer}\"`,
            "body": `{\"${endpoint}\":{\"cnaes\":[${s}]}}`,
            "method": "REMOVE",
            "mode": "cors"
        });

//        itemsHandle({type:ITEMS_ACTIONS.HIDE});
        setToastItems([...toastItems, { title: Liferay.Language.get('Borrar'), type: "error", text: Liferay.Language.get('Borrado_ok') }]);
        fetchData();
    }

    const handleSearch = () => {
        console.log("handlesearch");
    }

    const fetchData = async () => {
        const endpoint = "/silefe.cnae/filter";
        const postdata = {
            page: pagination.page,
            descripcion : '',
            languageId : lang,
        }
        let response = await fetch(url_api, {
            "credentials": "include",
            "headers": {
                "x-csrf-token": auth,
            },
            "referrer": `\"${referer}\"`,
            "body": `{\"${endpoint}\":${JSON.stringify(postdata)}}`,
            "method": "POST"
        });
        console.log("Recibidos los datos");
        console.log(response);

        let {data,totalPages} = await JSON.parse (await response.json());
        const tmp = await data.map(i => {return({...i,id:i.cnaeId,checked:false})});
        await itemsHandle({type:ITEMS_ACTIONS.START,items:tmp, fields: form});
        await paginate({type:PAGINATION_ACTIONS.TOTAL_PAGES,pages:totalPages});
    }

    useEffect(()=>{
        fetchData();
    },[pagination.page]);

    if (!items) 
        return (<div>Liferay.Language.get('Cargando')</div>)

    return (
        <>
            <Menu 
                paginate={paginate}
                handleSave={handleSave} 
                handleDelete={handleDelete} 
                handleSearch={handleSearch}
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