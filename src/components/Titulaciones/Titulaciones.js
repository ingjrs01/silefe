import React, {useState,useEffect,useReducer} from 'react';
import Table from '../Table';
import TitulacionForm from './TitulacionForm';
import Menu from '../Menu';
import ClayAlert from '@clayui/alert';
import ClayModal, {useModal} from '@clayui/modal';
import ClayButton from '@clayui/button';
import {getAuthToken,getLanguageId, url_api} from '../../includes/LiferayFunctions';
import {PAGINATION_ACTIONS,reducer} from '../../includes/reducers/paginate.reducer';

const spritemap = '/icons.svg';

const Titulaciones = () => {
    const [pagination,paginate]          = useReducer(reducer,{page:0,totalPages:0,allCheck:false})
    const [items, setItems] = useState([]);
    const [toastItems,setToastItems]      = useState([]);
    const [item, setItem]                 = useState({id:0,codigo:"",descripcion:""});
    const [showform,setShowform]          = useState(false);
    const {observer, onOpenChange, open}  = useModal();

    const columns = [
        {
            columnName: "titulacionId",
            columnTitle: "Id",
            columnType: "checkbox",        
        },
        {
            columnName: "codigo",
            columnTitle: "Código",
            columnType: "string",
        },
        {
            columnName: "descripcion",
            columnTitle: "Descripción",
            columnType: "string",
        },
    ];

    // Inicializando las variables: 
    const auth = getAuthToken();
    const lang = getLanguageId();
    const referer = "http://localhost:8080/titulaciones";

    const reset = () => {
        setItem({id:0,codigo:"",descripcion:""});
    }

    const confirmDelete = async () => {
        const endpoint = "/silefe.titulacion/remove-titulaciones";
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
            "body": `{\"${endpoint}\":{\"titulaciones\":[${s}]}}`,
            "method": "REMOVE",
            "mode": "cors"
        });

        setShowform(false);
        setToastItems([...toastItems, { title: "Borrar", type: "error", text: "Elemento borrado correctamente" }]);
        fetchData();
    }

    const handleDelete = () => {
        if (items.filter(item => item.checked).length > 0)
            onOpenChange(true);        
    }

    const handleCheck = (index) => {        
        let tmp = items.slice();
        tmp[index].checked = !items[index].checked;
        setItems(tmp);
      }
    
    const handleAllCheck = () => {
        paginate({type:PAGINATION_ACTIONS.CHECK_ALL, allCheck:!paginate.allCheck});
        setItems(items.map(i => {return {...i,checked:paginate.allCheck}}));
    }

    const handleEdit = () => {
        let sel = items.filter(i => i.checked);
        if (sel.length > 0) {
            setItem(sel[0]);
            setShowform(true);
        }
    }

    const handleNew = () => {
        reset();
        setItems(items.map( t => {return ({...t,checked:false})}));
        setShowform(true);
    }
    
    const fetchData = async () => {
        console.log("Titulaciones: solicitud hecha por fetch");
        const endpoint = "/silefe.titulacion/filter";
        const searchtext = '';

        const postdata = {
            page:        pagination.page,
            descripcion: searchtext,
            languageId:  lang
        };
        console.log(postdata);

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
        console.log(data);
        await setItems(await data.map(i => {return({...i,id:i.titulacionId,checked:false})}));
        await paginate({type:PAGINATION_ACTIONS.TOTAL_PAGES,pages:totalPages});
        setShowform(false);
    }

    const handleSave = async () => {
        const data = {
            titulacionId:item.id,
            codigo:      item.codigo,
            descripcion: item.descripcion,
            userId:      Liferay.ThemeDisplay.getUserId(),
            userName:    Liferay.ThemeDisplay.getUserName(),
            languageId:  lang
        }
        let endpoint = "/silefe.titulacion/save-titulacion";
        if (item.id == 0)
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
        await console.log("Recibidos resutlados: ");
        await console.log(res);


        await fetchData();
        await reset()
        await setShowform(false);
        await setToastItems([...toastItems,{title: "Guardar", type:"info", text:"Elemento añadido correctamente"}]);
    }

    const handleCancel = () => {
        console.log("Cancelando el guardado");
        setShowform(false);
        setItems( items.map( i => {return ({...i,checked:false})}));
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
                handleEdit={handleEdit}
                handleNew={handleNew}
            />
            { showform && <TitulacionForm setItem={setItem} item={item} cancel={handleCancel} save={handleSave} />}
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

export default Titulaciones;