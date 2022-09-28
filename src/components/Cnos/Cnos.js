import React,{useEffect,useReducer,useState} from "react";
import CnoForm from "./CnoForm";
import Menu from '../Menu';
import Table from '../Table';
import ClayAlert from '@clayui/alert';
import ClayModal, {useModal} from '@clayui/modal';
import ClayButton from '@clayui/button';
import {getAuthToken,getLanguageId,url_api} from '../../includes/LiferayFunctions';
import {reducer,PAGINATION_ACTIONS} from '../../includes/reducers/paginate.reducer';

const spritemap = '../icons.svg';

const Cnos = () => {
    const [pagination,paginate]          = useReducer(reducer,{page:0,totalPages:0,allCheck:false});
    const [showform,setShowform]         = useState(false);
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
        fetchData();
    },[pagination.page]);

    const handleSave = async () => {
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
        });

        await fetchData();
        await reset();
        await setShowform(false);
    }

    const handleDelete = () => {
        if (items.filter(item => item.checked).length > 0)
            onOpenChange(true);        
    }

    const confirmDelete = async () => {
        const endpoint = '/silefe.cno/remove-cnos';
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
        paginate({type:PAGINATION_ACTIONS.CHECK_ALL,allCheck:!paginate.allCheck});
        setItems( items.map(i => { return({...i,checked:pagination.allCheck}) }) );
    }

    const reset = () => {
        setItem({id:0,codigo:'',descripcion:''});
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
        await setItems(await data.map(i => {return({...i,id:i.cnoId,checked:false})}));
        await paginate({type:PAGINATION_ACTIONS.TOTAL_PAGES,totalPages:totalPages});
    }

    const handleCancel = () => {
        setItems(items.map(i => { return ({...i,checked:false})}));
        setShowform(false);        
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

            {showform && <CnoForm setItem={setItem} item={item} save={ handleSave} cancel={handleCancel} /> }
            
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

export default Cnos;