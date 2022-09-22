import React,{useEffect,useState} from "react";
//import ProvinciaForm from './ProvinciaForm';
import CnoForm from "./CnoForm";
import Menu from '../Menu';
import Table from '../Table';
import ClayAlert from '@clayui/alert';
import ClayModal, {useModal} from '@clayui/modal';
import ClayButton from '@clayui/button';
import {getAuthToken,getLanguageId,url_api} from '../../includes/LiferayFunctions';

const spritemap = '../icons.svg';

const Cnos = () => {
    const [pagination,setPagination]     = useState({page:0,totalPages:0,allCheck:false});
    const [show,setShow]                 = useState(true);
    const [items,setItems]               = useState([]);
    const [item,setItem]                 = useState({id:0,nombre:""});
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

    useEffect(()=>{
        console.log("Cargando datos");
        fetchData();
    },[]);

    const prevPage = () => { 
        console.log("prevPage");
    }
    const nextPage = () => { 
        console.log("nextPage");
    }

    const handleSave = async () => {
        console.log("handleSave");
        const data = {
            cnoId:          item.id,
            codigo:      item.codigo,
            descripcion: item.descripcion,
            userId:      Liferay.ThemeDisplay.getUserId(),
            userName:    Liferay.ThemeDisplay.getUserName(),
            languageId:  lang            
        }

        let endpoint = '/silefe.cno/save-cno';
        if (item.id == 0)
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
        }).then(res => {
            console.log("llego a la respuesta");
            console.log(res);
        }).catch(err => {
            console.log("error")
            console.log(err);
        });

        await console.log(res);
        await fetchData();
        handleNew();
        reset()
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
            "referrer": `\"${referrer}\"`,
            "body": `{\"${endpoint}\":{\"provincias\":[${s}]}}`,
            "method": "REMOVE",
            "mode": "cors"
        });
        console.log(res);

        setToastItems([...toastItems, { title: "Borrar", type: "error", text: "Elemento borrado correctamente" }]);
        fetchData();

    }


    const handleEdit = () => { 
        console.log("edit");
        const sel = items.filter(i => i.checked)
        if (sel.length > 0){
            //console.log(sel);
            //console.log("Dato a mostrar");
            //console.log(items[index]);
            setItem({...item,id:sel[0].cnoId,codigo:sel[0].codigo,descripcion:sel[0].descripcion});
            setShow(true);
        }
    }
    const handleNew = () => { 
        console.log("new");
        setItem({id:0,codigo:'',descripcion:''});
    }
    const handleSearch = () => { 
        console.log("search");
    }
    const handleCheck = (index) => { 
        let tmp = items.slice();
        tmp[index].checked = !items[index].checked;
        setItems(tmp);
    }
    const handleAllCheck = () => { 
        console.log("allcheck");
        setPagination({...pagination,allCheck:!pagination.allCheck});
        setItems( items.map(i => { return({...i,checked:pagination.allCheck}) }) );
    }

    const reset = () => {
        console.log("reset");
    }

    const fetchData = async () => {
        const endpoint = "/silefe.cno/filter";  
        
        const data = {
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
            "body": `{\"${endpoint}\":${JSON.stringify(data)}}`,
            "method": "POST"
        });
        await console.log("Respuesta: " + response);
        let dd = await response.json();
        let datos = await JSON.parse (dd);
        let d2 = await datos.data.map(i => {return({...i,id:i.cnoId,checked:false})})
        await setItems(d2);//await setItems(datos.data);

    }

    return (
        <>
            <Menu 
                prevPage={prevPage} 
                nextPage={nextPage} 
                handleSave={handleSave} 
                handleDelete={handleDelete} 
                handleEdit={handleEdit}
                handleNew={handleNew}
                handleSearch={handleSearch}
            />

            {show ? <CnoForm setItem={setItem} item={item} setShow={setShow} /> : null}
            
            {
             !show ?
            <Table 
                columns={columns}
                rows={items} 
                handleCheck={handleCheck} 
                handleAllCheck={handleAllCheck}  
                allCheck={pagination.allCheck}
             /> : null
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

export default Cnos;