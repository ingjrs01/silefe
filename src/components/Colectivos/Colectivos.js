import React, {useState,useEffect,useReducer} from 'react';
import ColectivoForm from './ColectivoForm';
import Menu from '../Menu';
import Table from '../Table';
import ClayAlert from '@clayui/alert';
import ClayModal, {useModal} from '@clayui/modal';
import ClayButton from '@clayui/button';
import {getAuthToken,getLanguageId,url_api} from '../../includes/LiferayFunctions';
import {PAGINATION_ACTIONS,reducer} from '../../includes/reducers/paginate.reducer';

const spritemap = '../icons.svg';

const Colectivos = () => {
    const [pagination,paginate]          = useReducer(reducer,{page:0,totalPages:0,allCheck:false});
    const [items,setItems] = useState([]);
    const [item,setItem]                 = useState({id:0,descripcion:""});
    const [showform, setShowform]        = useState(false);
    const [toastItems,setToastItems]     = useState([]);    
    const {observer, onOpenChange, open} = useModal();

    const columns = [
        {
            columnName: "colectivosId",
            columnTitle: "Id",
            columnType: "checkbox",
        },
        {
            columnName: "descripcion",
            columnTitle: "Descripción",
            columnType: "string",//"localized",
        },
    ];

    // Inicializando las variables:
    const auth    = getAuthToken()
    const lang    = getLanguageId()
    const referer = 'http://localhost:8080/colectivos';

    const reset = () => {
        setItem({id:0,descripcion:""});
    }

    const handleSave = async () => {
        const postdata = {
            colectivoId: item.colectivosId,
            descripcion: item.descripcion,
            userId: Liferay.ThemeDisplay.getUserId(),
            userName: Liferay.ThemeDisplay.getUserName(),
            languageId: lang
        }

        let endpoint = '/silefe.colectivo/save-colectivo';
        if (item.colectivosId == 0)
            endpoint = '/silefe.colectivo/add-colectivo';

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
        reset();
        setShowform(false);

    }

    const handleDelete = () => {
        if (items.filter(item => item.checked).length > 0)
            onOpenChange(true);        
    }


    const confirmDelete = async () => {
        const auth = getAuthToken()
        let s = items.filter(item => item.checked).map( i => {return i.colectivosId});

        console.log();
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
            "referrer": "http://localhost:8080/titulaciones",
            "body": `{\"/silefe.colectivo/remove-colectivos\":{\"colectivos\":[${s}]}}`,
            "method": "POST",
            "mode": "cors"
        });

        setToastItems([...toastItems, { title: "Borrar", type: "error", text: "Elemento borrado correctamente" }]);
        fetchData();

    }

    const handleEdit = () => {
        let sel = items.filter(i => i.checked);
        if (sel.length > 0) {
            setItem(sel[0]);
            setShowform(true);
        }
    }

    const handleNew = () => {
        setItem({colectivosId: 0, descripcion: ""})
        setItems(items.map( t => {return ({...t,checked:false})}));
        setShowform(true);
    }

    const handleCheck = (index) => {
        let tmp = items.slice();
        tmp[index].checked = !items[index].checked;
        setItems(tmp);
    }

    const handleAllCheck = () => {
        paginate({type:PAGINATION_ACTIONS.CHECK_ALL,allCheck:!pagination.allCheck})
        setItems(items.map( i => {return ({...i,checked:pagination.allCheck})}));

    }

    const handleSearch = () => {
        console.log("buscando");
        fetchData();
    }

    const fetchData = async () => {
        console.log("Colectivos: solicitud hecha por fetch");
        const endpoint = '/silefe.colectivo/filter';

        const postdata = {
            page: pagination.page,
            descripcion: '',
            languageId:  lang
        };

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

        let {data,totalPages} = await JSON.parse (await res.json());
        await setItems(await data.map(i => {return({...i,id:i.colectivoId,checked:false})}));
        await paginate({type:PAGINATION_ACTIONS.TOTAL_PAGES,page:totalPages});
    }

    const handleCancel = () => {
        console.log("Cancelando");
        setShowform(false);
        setItems(items.map(i => {return ({...i,checked:false})}));
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
                handleEdit={handleEdit}
                handleNew={handleNew}
                handleSearch={handleSearch}
            />

            { showform && <ColectivoForm setItem={setItem} item={item} cancel={handleCancel} save={handleSave} />}
            {
                !showform &&
                <Table 
                    columns={columns}
                    rows={items} 
                    handleCheck={handleCheck} 
                    handleAllCheck={handleAllCheck}  
                    allCheck={pagination.allCheck}
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
    );
}

export default Colectivos;