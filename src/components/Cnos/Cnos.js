import React,{useEffect,useReducer,useState} from "react";
import DefaultForm from "../DefaultForm";
import Menu from '../Menu';
import Table from '../Table';
import ClayAlert from '@clayui/alert';
import ClayModal, {useModal} from '@clayui/modal';
import ClayButton from '@clayui/button';
import {getAuthToken,getLanguageId,url_api} from '../../includes/LiferayFunctions';
import {reducer,PAGINATION_ACTIONS} from '../../includes/reducers/paginate.reducer';
import {red_items,ITEMS_ACTIONS} from '../../includes/reducers/items.reducer';

const spritemap = '../icons.svg';

const Cnos = () => {
    const [pagination,paginate]          = useReducer(reducer,{page:0,totalPages:0,allCheck:false});
    const [items,itemsHandle]            = useReducer(red_items,{arr:[],item:{id:0}});
    const [toastItems,setToastItems]     = useState([]);    
    const {observer, onOpenChange, open} = useModal();

    const referrer = "http://localhost:8080/cnos";
    const auth = getAuthToken();
    const lang = getLanguageId();

    const columns = [
        {
            columnName: "id",
            columnTitle: "Id",
            columnType: "checkbox",
            key: "c1",
        },
        {
            columnName: "codigo",
            columnTitle: Liferay.Language.get('Codigo'),
            columnType: "string",
            key: "c2",
        },
        {
            columnName: "descripcion",
            columnTitle: Liferay.Language.get('Descripcion'),
            columnType: "string",
            key: "c3",
        },
    ];

    const form = {
        title: Liferay.Language.get('Cnos'),
        rows: [
            {key:1,label: "ID",     name: "id",          value:"lalala",                       placeholder:"Identifier"},
            {key:2,label: Liferay.Language.get('Codigo'), name: "codigo",      value:"lalala", placeholder:Liferay.Language.get('Codigo')},
            {key:3,label: Liferay.Language.get('Nombre'), name: "descripcion", value:"lelele", placeholder:Liferay.Language.get('Nombre')},
        ]
    };

    useEffect(()=>{
        fetchData();
    },[pagination.page]);

    const handleSave = async () => {
        const data = {
            cnoId:       items.item.id,
            codigo:      items.item.codigo,
            descripcion: items.item.descripcion,
            userId:      Liferay.ThemeDisplay.getUserId(),
            userName:    Liferay.ThemeDisplay.getUserName(),
            languageId:  lang            
        }

        let endpoint = '/silefe.cno/save-cno';
        if (items.item.id == 0)
            endpoint = '/silefe.cno/add-cno';

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
        "referrer": `\"${referrer}\"`,
        "body": `{\"${endpoint}\":${JSON.stringify(data)}}`,
        "method": "POST",
        "mode": "cors"
        });

        await itemsHandle({type:ITEMS_ACTIONS.HIDE});
        await fetchData();
    }

    const handleDelete = () => {
        if (items.arr.filter(item => item.checked).length > 0)
            onOpenChange(true);        
    }

    const confirmDelete = async () => {
        const endpoint = '/silefe.cno/remove-cnos';
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
            "referrer": `\"${referrer}\"`,
            "body": `{\"${endpoint}\":{\"cnos\":[${s}]}}`,
            "method": "REMOVE",
            "mode": "cors"
        });
        setToastItems([...toastItems, { title: Liferay.Language.get('Borrar'), type: "error", text: Liferay.Language.get('Borrado_ok') }]);
        fetchData();
    }

    const handleSearch = () => { 
        console.log("search");
    }

    const fetchData = async () => {
        const endpoint = "/silefe.cno/filter";  
        
        const postdata = {
            page:         pagination.page,
            codigo :      '',
            descripcion : '',
            languageId :  lang
        }

        let response = await fetch(url_api, {
            "credentials": "include",
            "headers": {
                "x-csrf-token": auth,
            },
            "referrer": `\"${referrer}\"`,
            "body": `{\"${endpoint}\":${JSON.stringify(postdata)}}`,
            "method": "POST"
        });

        let {data,totalPages} = await JSON.parse (await response.json());
        const tmp = await data.map(i => {return({...i,id:i.cnoId,checked:false})});
        await itemsHandle({type:ITEMS_ACTIONS.START,items:tmp});
        await paginate({type:PAGINATION_ACTIONS.TOTAL_PAGES,pages:totalPages});
    }

    if (!items) 
    return (<div>{Liferay.Language.get('Cargando')}</div>)

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
                    item={items.item} 
                    save={ handleSave} 
                    itemsHandle={itemsHandle}
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

export default Cnos;