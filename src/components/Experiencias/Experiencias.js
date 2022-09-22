import React, {useState,useEffect} from 'react';
import ExperienciaForm from './ExperienciaForm';
import Menu from '../Menu';
import Table from '../Table';
import ClayAlert from '@clayui/alert';
import ClayModal, {useModal} from '@clayui/modal';
import ClayButton from '@clayui/button';
import {getAuthToken,getLanguageId,url_api} from '../../includes/LiferayFunctions';

const spritemap = '../icons.svg';

const Experiencias = () => {
    const [items,setItems] = useState([]);
    const [item,setItem]                 = useState({id:0,descripcion:""});
    const [showform,setShowform]         = useState(false);
    const [pagination,setPagination]     = useState({page:0,totalPages:0,allCheck:false});
    const [toastItems,setToastItems]     = useState([]);    
    const {observer, onOpenChange, open} = useModal();

    const auth = getAuthToken();
    const lang = getLanguageId();
    const referer = "http://localhost:8080/experiencias";

    const columns = [
        {
            columnName: "id",
            columnTitle: "Id",
            columnType: "checkbox",
        },
        {
            columnName: "descripcion",
            columnTitle: "Descripción",
            columnType: "string",
        },
    ];


    const prevPage = () => {        
        if (pagination.page > 0)
            setPagination({...pagination,page:pagination.page - 1});
    }

    const nextPage = () => {
        if (pagination.page > pagination.totalPages - 1)
            setPagination({...pagination,page:pagination.page + 1});
    }

    const handleSave = async () => {
        const data = {
            id:         item.id,
            descripcion:item.nombre,
            userId:     Liferay.ThemeDisplay.getUserId(),
            userName:   Liferay.ThemeDisplay.getUserName(),
            languageId: lang
        }
        let endpoint = "/silefe.experiencia/add-experiencia";

        const lala = JSON.stringify(data);
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
        "body": `{\"${endpoint}\":${lala}}`,
        "method": "POST",
        "mode": "cors"
        });
        fetchData();
        reset()
        setShowform(false);
    }

    const reset = () => {
        setItem({id:0,descripcion:""});
    }

    const handleDelete = () => {
        console.log("delete");
        if (items.filter(item => item.checked).length > 0)
            onOpenChange(true);        
    }

    const confirmDelete = async () => {
        const endpoint = "/silefe.experiencia/remove-experiencias";
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
            "body": `{\"${endpoint}\":{\"experiencias\":[${s}]}}`,
            "method": "REMOVE",
            "mode": "cors"
        });

        setShowform(false);
        setToastItems([...toastItems, { title: "Borrar", type: "error", text: "Elemento borrado correctamente" }]);
        fetchData();

    }



    const handleEdit = () => {
        console.log("edit");
        
        let sel = items.filter(i => i.checked);
        setItem({id:sel[0].id,descripcion:sel[0].descripcion});
        console.log(sel);
        setShowform(true);
    }

    const handleNew = () => {
        setItem({id:0,descripcion:''});
        //onOpnChange(true);
        
        //onOpenChange(true);
        setShowform(true);
    }

    const handleSearch = () => {
        console.log("SEARCH");
    }

    const handleCheck = (index) => {
        console.log("check");
        let tmp = items.slice();
        tmp[index].checked = !items[index].checked;
        setItems(tmp)
    }

    const handleAllCheck = () => {
        console.log("allcheck");
    }

    const fetchData = async () => {
        console.log("Experiencia: solicitud hecha por fetch");
        const endpoint = "/silefe.experiencia/filter";
        const searchtext = '';

        const data = {
            page: pagination.page,
            descripcion: searchtext,
            languageId:  lang
        };

        let response = await fetch(url_api, {
            "credentials": "include",
            "headers": {
                "x-csrf-token": auth,
            },
            "referrer": `\"${referer}\"`,
            "body": `{\"${endpoint}\":${JSON.stringify(data)}}`,
            "method": "POST"
        });

        await console.log(response);
        let dd = await response.json();
        let datos = await JSON.parse (dd);
        await console.log(datos);
        let d2 = await datos.data.map(i => {return({...i,id:i.experienciaId,checked:false})})
        await setItems(d2);
    }

    useEffect( ()=> {
        console.log("Dentro de useEffect");
        fetchData();
    },[pagination.page]);

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


            { showform && (<ExperienciaForm setItem={setItem} item={item} save={handleSave} /> ) }
            
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

export default Experiencias;