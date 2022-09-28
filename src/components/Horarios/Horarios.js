import React,{useEffect,useState} from "react";
import DefaultForm from "../DefaultForm";
import Menu from '../Menu';
import Table from '../Table';
import ClayAlert from '@clayui/alert';
import ClayModal, {useModal} from '@clayui/modal';
import ClayButton from '@clayui/button';
import {getAuthToken,getLanguageId,url_api} from '../../includes/LiferayFunctions';

const spritemap = '../icons.svg';

const Horarios = () => {
    const [pagination,setPagination]     = useState({page:0,totalPages:0,allCheck:false});
    const [showform,setShowform]         = useState(false);
    const [items,setItems]               = useState([]);
    const [item,setItem]                 = useState({id:0,descripcion:""});
    const [toastItems,setToastItems]     = useState([]);    
    const {observer, onOpenChange, open} = useModal();
    const [form,setForm]                 = useState( {
        title: "Título del formulario",
        rows: [
            {key:1,label: "ID",     name: "id",          value:"lalala", placeholder:"Identifier"},
            {key:2,label: "nombre", name: "descripcion", value:"lelele", placeholder:"nombre"},
            {key:3,label: "otros",  name: "otros",       value:"lilili", placeholder:"otros datos"}
        ]
    })

    const referrer = "http://localhost:8080/horarios";
    const auth = getAuthToken();
    const lang = getLanguageId();

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



    useEffect(()=>{
        fetchData();
    },[pagination.page]);

    const prevPage = () => { 
        if (pagination.page > 0)
            setPagination({...pagination,page: pagination.page - 1});            
    }
    const nextPage = () => { 
        if (pagination.page < pagination.totalPages - 1)
            setPagination({...pagination,page:pagination.page + 1});
    }

    const handleSave = async () => {
        const postdata = {
            horarioId:   item.id,
            descripcion: item.descripcion,
            userId:      Liferay.ThemeDisplay.getUserId(),
            userName:    Liferay.ThemeDisplay.getUserName(),
            languageId:  lang            
        }

        let endpoint = '/silefe.horario/save-horario';
        if (item.id == 0)
            endpoint = '/silefe.horario/add-horario';

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

        await console.log(res);
        await fetchData();
        await reset();
        await setShowform(false);
    }

    const handleDelete = () => {
        if (items.filter(item => item.checked).length > 0)
            onOpenChange(true);        
    }

    const confirmDelete = async () => {
        const endpoint = '/silefe.horario/remove-horarios';
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
            "body": `{\"${endpoint}\":{\"cnos\":[${s}]}}`,
            "method": "REMOVE",
            "mode": "cors"
        });
        setToastItems([...toastItems, { title: "Borrar", type: "error", text: "Elemento borrado correctamente" }]);
        fetchData();
    }

    const handleEdit = () => { 
        const sel = items.filter(i => i.checked)
        if (sel.length > 0){
            setItem({...item,id:sel[0].cnoId,codigo:sel[0].codigo,descripcion:sel[0].descripcion});
            setShowform(true);
        }
    }

    const handleNew = () => { 
        reset();
        setShowform(true);
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
        setPagination({...pagination,allCheck:!pagination.allCheck});
        setItems( items.map(i => { return({...i,checked:pagination.allCheck}) }) );
    }

    const reset = () => {
        setItem({id:0,descripcion:''});
    }

    const fetchData = async () => {
        const endpoint = "/silefe.horario/filter";  
        console.log(endpoint);
        
        const postdata = {
            page:         pagination.page,
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

        let {data} = await JSON.parse (await response.json());
        await setItems(await data.map(i => {return({...i,id:i.cnoId,checked:false})}));
    }

    const handleCancel = () => {
        setItems(items.map(i => { return ({...i,checked:false})}));
        setShowform(false);        
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

            {showform && <DefaultForm form={form} setItem={setItem} item={item} save={ handleSave} cancel={handleCancel} /> }
            
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

export default Horarios;