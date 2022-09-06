import React, {useState,useEffect} from 'react';
import ColectivoForm from './ColectivoForm';
import Menu from '../Menu';
import Table from '../Table';
import ClayAlert from '@clayui/alert';
import ClayModal, {useModal} from '@clayui/modal';
import ClayButton from '@clayui/button';
import axios from 'axios';
import XMLParser from 'react-xml-parser';
import {getAuthToken,getLanguageId} from '../../includes/LiferayFunctions';

const spritemap = '../icons.svg';

const Colectivos = () => {
    const [items,setItems] = useState([]);
    const [item,setItem]                 = useState({id:0,descripcion:""});
    const [pagination,setPagination]     = useState({page:0,totalPages:0,allCheck:false});
    const [toastItems,setToastItems]     = useState([]);    
    const {observer, onOpenChange, open} = useModal();

    const columns = [
        {
            columnName: "colectivoId",
            columnTitle: "Id",
            columnType: "checkbox",
        },
        {
            columnName: "descripcion",
            columnTitle: "Descripción",
            columnType: "string",//"localized",
        },
    ];

    const prevPage = () => {
        console.log("prevPage");
    }

    const nextPage= () => {
        console.log("nextPage");
    }

    const handleSave = () => {
        console.log("handleSave");
        
        console.log(item);
        if (item.colectivoId == null || item.colectivoId == 0) {         
            
            
            const url = '/silefe.colectivo/add-colectivo';
            Liferay.Service(url, {
                "descripcion": item.descripcion,
                "userId"     : Liferay.ThemeDisplay.getUserId(),
                "userName"   : Liferay.ThemeDisplay.getUserName()
            }, obj => {
                setToastItems([...toastItems,{title: "Guardar", type:"info", text:"Elemento añadido correctamente"}]);
                setPagination({...pagination,page:pagination.totalPages})
                console.log("Se acaba de guardar");
                console.log(pagination);
                fetchData();
            }
            );
        }
        else {
            console.log("Voy a guardar lo qu eya está");
            Liferay.Service( '/silefe.titulacion/save-titulacion',item,obj => {
                console.log(obj);
                setToastItems([...toastItems,{title: "Guardar", type:"info", text:"Elemento guardado correctamente"}]);
                fetchData();
                });
        }

    }

    const handleDelete = () => {
        console.log("handleDelete");
        if (items.filter(item => item.checked).length > 0)
            onOpenChange(true);        

    }

    const confirmDelete = () => {
        console.log("Y ahora borro de verdad");

        const url = `http://localhost:8080/api/jsonws/silefe.colectivo/remove-colectivo&p_auth:${getAuthToken()}`;

        
        //const url = `http://localhost:8080/api/jsonws/silefe.colectivo/get-colectivos?page=${pagination.page}&languageId=${languageId}&p_auth=${auth}`;


        let data = {
            colectivoId: 1
        }

        const token = 'anVhbnJpdmVpcm9AZ21haWwuY29tOmxlbGVsZQo=';
        axios.post(url,data).then(response => {
            console.log(response);
            setToastItems([...toastItems, { title: "Borrar", type: "error", text: "Elemento borrado correctamente" }]);
            fetchData();

            //let data2 = response.data.data.map( i => {    
            //    let d = new XMLParser().parseFromString(i.descripcion);
            //    return {...i,checked:false,descripcion:d.getElementsByTagName('Descripcion')[0].value};
            //});
            //console.log(data2);
            //setItems(data2);
            //setPagination({...pagination,totalPages:response.data.totalPages})
        });


    }

    const handleEdit = () => {
        let sel = items.filter(i => i.checked);
        if (sel.length > 0) {
            setItem(sel[0]);
        }
    }

    const handleNew = () => {
        setItem({id: 0, descripcion: ""})
        setItems(items.map( t => {return ({...t,checked:false})}));
    }

    const handleCheck = (index) => {
        let tmp = items.slice();
        tmp[index].checked = !items[index].checked;
        setItems(tmp);
    }

    const handleAllCheck = () => {
        setPagination({...pagination,allCheck:!pagination.allCheck})
        setItems(items.map( i => {return ({...i,checked:pagination.allCheck})}));

    }

    const fetchData = () => {
        console.log("Colectivos: solicitud hecha por axios");
        const languageId = getLanguageId();
        const auth       = getAuthToken();

        //console.log("Version lele: ");
        //console.log(process.env.REACT_APP_API_URL);
        
        const url = `http://localhost:8080/api/jsonws/silefe.colectivo/get-colectivos?page=${pagination.page}&languageId=${languageId}&p_auth=${auth}`;
        const token = 'anVhbnJpdmVpcm9AZ21haWwuY29tOmxlbGVsZQo=';
        axios.get(url,{
          headers: {
              'Authorization': `Basic ${token}`
          }}).then(response => {
            console.log(response.data.data);
            let data2 = response.data.data.map( i => {    
                let d = new XMLParser().parseFromString(i.descripcion);
                return {...i,checked:false,descripcion:d.getElementsByTagName('Descripcion')[0].value};
            });
            console.log(data2);
            setItems(data2);
            setPagination({...pagination,totalPages:response.data.totalPages})
        });
    }

    useEffect(()=>{
        fetchData();
    },[])



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
            />

            <ColectivoForm setItem={setItem} item={item} />
            <Table 
                columns={columns}
                rows={items} 
                handleCheck={handleCheck} 
                handleAllCheck={handleAllCheck}  
                allCheck={pagination.allCheck}
             />

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