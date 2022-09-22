import React, {useEffect, useState} from "react";
import CnaeForm from "./CnaeForm";
import Menu from '../Menu';
import Table from '../Table';
//import ClayAlert from '@clayui/alert';
import ClayModal, {useModal} from '@clayui/modal';
import ClayButton from '@clayui/button';
import {getAuthToken,getLanguageId,url_api} from '../../includes/LiferayFunctions';

const spritemap = '../icons.svg';

const Cnaes = () => {
    const [items,setItems] = useState([]);
    const [item,setItem]   = useState({id:0,descripcion:""});
    const [pagination,setPagination] = useState({page:0,totalPages:0,allCheck:false})
    const {observer, onOpenChange, open} = useModal();


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

    ]
    // Inicio las varibles para la api:    
    const auth = getAuthToken()
    const lang = getLanguageId();
    const referer = "http://localhost:8080/cnaes";

    const prevPage = ()  => {
        if (pagination.page > 0)
            setPagination({...pagination,page:pagination.page - 1})
    }

    const nextPage = ()  => {
        console.log("prevPage");
        if (pagination.page < pagination.totalPages - 1)
            setPagination({...pagination,page:pagination.page + 1})
    }

    const handleCheck = (index) => {
        console.log("handleCheck");

        let tmp = items.slice();
        tmp[index] = !items[index].checked;
        setItems(tmp);
    }

    const handleAllCheck =  () => {
        console.log("handleAllCheck");
        setPagination({...pagination,allCheck:!pagination.allCheck});
        setItems(items.map(i => {return({...i,checked:pagination.allCheck})}));
    }

    const handleSave = async () => {
        const data = {
            id: item.id,
            descripcion: item.descripcion,
            userId: Liferay.ThemeDisplay.getUserId(),
            userName: Liferay.ThemeDisplay.getUserName(),
            languageId: lang            
        }

        const lala = JSON.stringify(data);
        let endpoint = '/silefe.cnae/save-cnae';

        if (item.id == 0)
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
        "body": `{\"${endpoint}\":${lala}}`,
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
        onOpenChange(false);
    }

    const handleDelete = () => {
        console.log("delete");

    }

    const handleEdit = () => {
        console.log("edit");
        //setShowform(true);
        onOpenChange(true);

    }

    const handleNew = () => {
        console.log("handlenew");
        onOpenChange(true);
    }

    const handleSearch = () => {
        console.log("handlesearch");

    }

    const fetchData = async () => {
        const endpoint = "/silefe.cnae/filter";
        const data = {
            languageId : lang,
            descripcion : '',
            page: pagination.page
        }
        let response = await fetch(url_api, {
            "credentials": "include",
            "headers": {
                "x-csrf-token": auth,
            },
            "referrer": `\"${referer}\"`,
            "body": `{\"${endpoint}\":${JSON.stringify(data)}}`,
            "method": "POST"
        });

        let dd = await response.json();
        let datos = await JSON.parse (dd);
        let d2 = await datos.data.map(i => {return({...i,id:i.cnaeId,checked:false})});
        await setItems(d2);
    }

    useEffect(()=>{
        fetchData();
    },[pagination.page]);

    if (!items) 
        return (<div>Cargando</div>)


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
            <CnaeForm setItem={setItem} item={item} />
            
            {open && (
                <ClayModal
                    observer={observer}
                    size="lg"
                    spritemap={spritemap}
                    status="info"
                >
                    <ClayModal.Header>{"Confirmación"}</ClayModal.Header>
                    <ClayModal.Body>
                        <CnaeForm setItem={setItem} item={item} />
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


            {/* Probando a borrar cosas aquí*/}

            <Table 
                columns={columns}
                rows={items} 
                handleCheck={handleCheck} 
                handleAllCheck={handleAllCheck}  
                allCheck={pagination.allCheck}
             />

        </>
    )
}

export default Cnaes;