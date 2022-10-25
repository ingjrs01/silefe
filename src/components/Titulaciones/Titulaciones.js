import React, {useState,useEffect,useReducer} from 'react';
import Table from '../Table';
import DefaultForm from '../DefaultForm';
import Menu from '../Menu';
import ClayAlert from '@clayui/alert';
import ClayModal, {useModal} from '@clayui/modal';
import ClayButton from '@clayui/button';
import {getAuthToken,getLanguageId, url_api} from '../../includes/LiferayFunctions';
import {PAGINATION_ACTIONS,reducer} from '../../includes/reducers/paginate.reducer';
import {ITEMS_ACTIONS,red_items} from '../../includes/reducers/items.reducer';

const spritemap = "../../icons.svg";

const Titulaciones = () => {
    const [pagination,paginate]          = useReducer(reducer,{page:0,totalPages:0,allCheck:false})
    const [items,itemsHandle]            = useReducer(red_items,{arr: [], item: {id:0,checked:false}, checkall: false, showform: false}); 
    const [toastItems,setToastItems]     = useState([]);
    const [errors,setErrors]             = useState({'id':{classname: 'has-success', messages: []},'descripcion':{classname: 'has-success', messages: []}});
    const {observer, onOpenChange, open} = useModal();

    const columns = [
        {
            columnName: "titulacionId",
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
        title: "Titulaciones",
        rows: [
            {key:1,label: "ID",          name: "id",          value:"lalala", placeholder:"Identificador", conditions: ["number"]},
            {key:2,label: Liferay.Language.get('Descripcion'), name: "descripcion", value:"", placeholder:"Descripción",   conditions: ["text"]},
        ]
    };

    const auth = getAuthToken();
    const lang = getLanguageId();
    const referer = "http://localhost:8080/titulaciones";

    const confirmDelete = async () => {
        const endpoint = "/silefe.titulacion/remove-titulaciones";
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
            "body": `{\"${endpoint}\":{\"titulaciones\":[${s}]}}`,
            "method": "REMOVE",
            "mode": "cors"
        });

        itemsHandle({type:ITEMS_ACTIONS.HIDE});
        setToastItems([...toastItems, { title: "Borrar", type: "error", text: "Elemento borrado correctamente" }]);
        fetchData();
    }

    const handleDelete = () => {
        if (items.arr.filter(item => item.checked).length > 0)
            onOpenChange(true);        
    }

    const fetchData = async () => {
        const endpoint = "/silefe.titulacion/filter";
        const searchtext = '';

        const postdata = {
            page:        pagination.page,
            descripcion: searchtext,
            languageId:  lang
        };

        const response = await fetch(url_api, {
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

        let {data,totalPages} = await JSON.parse (await response.json());
        const tmp = await data.map(i => {return({...i,id:i.titulacionId,checked:false})});
        await itemsHandle({type: ITEMS_ACTIONS.START,items: tmp});
        await paginate({type:PAGINATION_ACTIONS.TOTAL_PAGES,pages:totalPages});
        await itemsHandle({type:ITEMS_ACTIONS.HIDE});
    }

    const handleSave = async () => {
        const data = {
            titulacionId: items.item.id,
            codigo:       items.item.codigo,
            descripcion:  items.item.descripcion,
            userId:       Liferay.ThemeDisplay.getUserId(),
            userName:     Liferay.ThemeDisplay.getUserName(),
            languageId:   lang
        }
        let endpoint = "/silefe.titulacion/save-titulacion";
        if (items.item.id == 0)
            endpoint = "/silefe.titulacion/add-titulacion";
        
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
        await fetchData();
        await reset()
        await itemsHandle({type:ITEMS_ACTIONS.HIDE});
        await setToastItems([...toastItems,{title: "Guardar", type:"info", text:"Elemento añadido correctamente"}]);
    }

    const handleSearch = () => {
        console.log("handleSearch");
    }

    useEffect(()=>{
        fetchData();
    },[pagination.page]);

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
            { 
                items.showform && 
                <DefaultForm 
                    form={form} 
                    item={items.item} 
                    save={ handleSave} 
                    itemsHandle={itemsHandle}
                    errors={errors}
                    setErrors={setErrors}
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
                    <h1>{ Liferay.Language.get('Seguro_borrar')}</h1>
                </ClayModal.Body>
                <ClayModal.Footer
                    first={
                        <ClayButton.Group spaced>
                            <ClayButton displayType="secondary" onClick={()=>onOpenChange(false)}>{Liferay.Language.get('Cancelar')}</ClayButton>
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

export default Titulaciones;