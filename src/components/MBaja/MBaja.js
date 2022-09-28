import React, {useState,useEffect, useReducer} from "react";
import CnaeForm from "../DefaultForm";
import Menu from '../Menu';
import Table from '../Table';
import ClayAlert from '@clayui/alert';
import ClayModal, {useModal} from '@clayui/modal';
import ClayButton from '@clayui/button';
import {getAuthToken,getLanguageId,url_api} from '../../includes/LiferayFunctions';
import {reducer,PAGINATION_ACTIONS} from '../../includes/reducers/paginate.reducer';

const spritemap = '../icons.svg';

const MBaja = () => {
    const [pagination,paginate]          = useReducer(reducer,{page:0,totalPages:0,allCheck:false})
    const [items,setItems]               = useState([]);
    const [item,setItem]                 = useState({id:0,descripcion:""});
    const [showform,setShowform]         = useState(false);
    const [toastItems,setToastItems]     = useState([]);    
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
    const referer = "http://localhost:8080/mbaja";

    const fetchData = async () => {
        const endpoint = "/silefe.mbaja/filter";
        const postdata = {
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
            "body": `{\"${endpoint}\":${JSON.stringify(postdata)}}`,
            "method": "POST"
        });

        let {data,totalPages} = await JSON.parse (await response.json());
        await setItems(await data.map(i => {return({...i,id:i.mBajaId,checked:false})}));
        await paginate({type:PAGINATION_ACTIONS.TOTAL_PAGES,pages:totalPages});
    }

    useEffect(()=>{
        fetchData();
    },[]);


    const handleSave = () => {

    }

    const handleDelete = () => {

    }

    const handleEdit = () => {

    }

    const handleNew = () => {

    }

    const handleSearch = () => {

    }

    const handleCheck = (index) => {

    }

    const handleAllCheck = () => {
        paginate({type:PAGINATION_ACTIONS.CHECK_ALL,checkAll:!pagination.checkAll});
        setItems(items.map(i => {return ({...i,checked: pagination.checkAll})}));
    }

    const handleCancel = () => {

    }


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
           
            { showform && <DefaultForm setItem={setItem} item={item} cancel={handleCancel} save={handleSave} /> }

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

export default MBaja;