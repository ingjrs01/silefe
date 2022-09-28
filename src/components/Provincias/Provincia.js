import React, {useState,useEffect, useReducer} from 'react';
import ProvinciaForm from './ProvinciaForm';
import Menu from '../Menu';
import Table from '../Table';
import ClayAlert from '@clayui/alert';
import ClayModal, {useModal} from '@clayui/modal';
import ClayButton from '@clayui/button';
import {getAuthToken,getLanguageId,url_api} from '../../includes/LiferayFunctions';
import {reducer,PAGINATION_ACTIONS} from '../../includes/reducers/paginate.reducer';

const spritemap = '../icons.svg';

const Provincias = () => {
    const [pagination,paginate]     = useReducer(reducer,{page:0,totalPages:0,allCheck:false});
    const [items,setItems] = useState([]);
    const [item,setItem]                 = useState({id:0,nombre:""});
    const [showform,setShowform]         = useState(false);
    const [toastItems,setToastItems]     = useState([]);    
    const {observer, onOpenChange, open} = useModal();

    // Inicializo las variables principales
    const auth = getAuthToken();
    const lang = getLanguageId();
    const referer = 'http://localhost:8080/provincias';

    const columns = [
        {
            columnName: "id",
            columnTitle: "Id",
            columnType: "checkbox",
        },
        {
            columnName: "nombre",
            columnTitle: "Nombre",
            columnType: "string",
        },
    ];

    const reset = () => {
        setItem({id:0, nombre: ""})
    }

    const handleSave = async () => {
        const postdata = {
            id: item.id,
            name: item.nombre,
            userId: Liferay.ThemeDisplay.getUserId(),
            userName: Liferay.ThemeDisplay.getUserName(),
            languageId: lang
        }

        let endpoint = '/silefe.provincia/save-provincia'
        if (item.id == 0) 
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

            
        reset()
        fetchData();
        setShowform(false);
    }

    const handleDelete = () => {
        if (items.filter(item => item.checked).length > 0)
            onOpenChange(true);        
    }

    const confirmDelete = async () => {
        const endpoint = '/silefe.provincia/remove-provincias';
        let s = items.filter(item => item.checked).map( i => {return i.id});

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

        setToastItems([...toastItems, { title: "Borrar", type: "error", text: "Elemento borrado correctamente" }]);
        fetchData();
        setShowform(false);
    }

    const handleEdit = () => {
        let sel = items.filter(i => i.checked);
        if (sel.length > 0) {
            setItem({id:sel[0].id,nombre:sel[0].nombre});
            setShowform(true);
        }

    }

    const handleNew = () => {
        setItem({id: 0, name: ""})
        setItems(items.map( t => {return ({...t,checked:false})}));
        setShowform(true);
    }

    const handleSearch = () => {
        console.log("handleSearch");

    }

    const fetchData = async () => {
        console.log("Provincia: solicitud hecha por fetch");
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
        await setItems(await data.map(i => {return({...i,id:i.provinciaId,checked:false})}));
        await paginate({type:PAGINATION_ACTIONS,pages:totalPages});
    }

    const handleCheck = (index) => {
        let tmp = items.slice();
        tmp[index].checked = !items[index].checked;
        setItems(tmp);
    }

    const handleAllCheck = () => {
        paginate({type:PAGINATION_ACTIONS.CHECK_ALL,allCheck:!pagination.allCheck});
        setItems(items.map( i => {return ({...i,checked:pagination.allCheck})}));
    }

    const handleCancel = () => {
        console.log("cancelar");
        reset();
        setShowform(false);
        setItems(items.map( i => { return ({...i,checked:false})}));
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
            { showform && <ProvinciaForm setItem={setItem} item={item} cancel={handleCancel} save={handleSave} />}

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
    )
}

export default Provincias;