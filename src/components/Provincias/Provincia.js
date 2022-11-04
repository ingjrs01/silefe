import React, {useState,useEffect, useReducer} from 'react';
import DefaultForm from '../DefaultForm';
import Menu from '../Menu';
import Table from '../Table';
import ClayAlert from '@clayui/alert';
import ClayModal, {useModal} from '@clayui/modal';
import ClayButton from '@clayui/button';
import {getAuthToken,getLanguageId,url_api} from '../../includes/LiferayFunctions';
import {reducer,PAGINATION_ACTIONS} from '../../includes/reducers/paginate.reducer';
import {red_items,ITEMS_ACTIONS} from '../../includes/reducers/items.reducer';

const spritemap = '../icons.svg';

const Provincias = () => {
    const [pagination,paginate]          = useReducer(reducer,{page:0,totalPages:0,allCheck:false});
    const [items,itemsHandle]            = useReducer(red_items,{arr:[],item:{id:0},checkall:false,showform:false});
    const [toastItems,setToastItems]     = useState([]);    
    const {observer, onOpenChange, open} = useModal();

    const auth = getAuthToken();
    const lang = getLanguageId();
    const referer = 'http://localhost:8080/provincias';

    const columns = [
        {
            columnName: "id",
            columnTitle: "Id",
            columnType: "checkbox",
            key: "c1",
        },
        {
            columnName: "nombre",
            columnTitle: "Nombre",
            columnType: "string",
            key: "c2",
        },
    ];

    const form = {
        title: Liferay.Language.get('Provincias'),
        rows: {
            id: {key:1,label: "ID",     name: "id",     value:"lalala", placeholder:"Identifier",conditions:["number"]},
            nombre:{key:2,label: Liferay.Language.get('Nombre'), name: "nombre", value:"lelele", placeholder:"descripción",conditions:["text"]},
        }
    };

    const handleSave = async () => {
        const postdata = {
            id:         items.item.id,
            name:       items.item.nombre,
            userId:     Liferay.ThemeDisplay.getUserId(),
            userName:   Liferay.ThemeDisplay.getUserName(),
            languageId: lang
        }

        let endpoint = '/silefe.provincia/save-provincia'

        if (items.item.id == 0) 
            endpoint = '/silefe.provincia/add-provincia';

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
        "body": `{\"${endpoint}\":${JSON.stringify(postdata)}}`,
        "method": "POST",
        "mode": "cors"
        });

        fetchData();
        itemsHandle({type:ITEMS_ACTIONS.HIDE});
    }

    const handleDelete = () => {
        if (items.arr.filter(item => item.checked).length > 0)
            onOpenChange(true);        
    }

    const confirmDelete = async () => {
        const endpoint = '/silefe.provincia/remove-provincias';
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
            "body": `{\"${endpoint}\":{\"provincias\":[${s}]}}`,
            "method": "REMOVE",
            "mode": "cors"
        });

        setToastItems([...toastItems, { title: Liferay.Language.get('Borrar'), type: "error", text: Liferay.Language.get('Borrado_ok') }]);
        fetchData();
        itemsHandle({type:ITEMS_ACTIONS.HIDE});
    }

    const handleSearch = () => {
        console.log("handleSearch");

    }

    const fetchData = async () => {
        const endpoint   = '/silefe.provincia/filter';
        const searchtext = '';

        const postdata = {
            name: searchtext,
            page: pagination.page,
            languageId: lang
        };

        let response = await fetch(url_api, {
            "credentials": "include",
            "headers": {
                "x-csrf-token": auth,
            },
            "referrer": `\"${referer}\"`,
            "body": `{\"${endpoint}\":${JSON.stringify(postdata)}}`,
            "method": "POST"

        });
        
        let {data,totalPages} = await JSON.parse (await response.json());
        const tmp = await data.map(i => {return({...i,id:i.provinciaId,checked:false})});
        await itemsHandle({type: ITEMS_ACTIONS.START,items: tmp});
        await paginate({type:PAGINATION_ACTIONS.TOTAL_PAGES,pages:totalPages});
    }

    useEffect(()=>{
        fetchData();
    },[pagination.page])

    if (!items) 
        return (<div>Cargando</div>)

    return (
        <>
            <Menu 
                paginate={paginate} 
                handleSave={handleSave} 
                handleDelete={handleDelete} 
                handleSearch={handleSearch}
                itemsHandle={itemsHandle}
                showform={items.showform}
            />            
            {   items.showform && 
                <DefaultForm 
                    form={form} 
                    itemsHandle={itemsHandle}
                    save={ handleSave} 
                    items={items}
            />
        }

            {
                !items.showform &&
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
                                <ClayButton displayType="secondary" onClick={()=>onOpenChange(false)}>{"Cancelar"}</ClayButton>
                            </ClayButton.Group>
                        }
                        last={
                            <ClayButton onClick={() => {onOpenChange(false);confirmDelete()}}>
                                {Liferay.Language.get('Borrar')}
                            </ClayButton>
                        }
                    />
                </ClayModal>
            )}
        </>
    )
}

export default Provincias;