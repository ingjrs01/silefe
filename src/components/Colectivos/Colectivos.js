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

    const prevPage = () => {
        console.log("prevPage");
    }

    const nextPage= () => {
        console.log("nextPage");
    }

    const handleSave2 = () => {
        //console.log("handleSave");
        
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

    const handleSave = async () => {
        const auth = getAuthToken()
        console.log("Guardando con método nuevo");
        console.debug(item);

        const data = {
            colectivoId: item.colectivosId,
            descripcion: item.descripcion,
            userId: Liferay.ThemeDisplay.getUserId(),
            userName: Liferay.ThemeDisplay.getUserName()
        }

        const lala = JSON.stringify(data);
        console.log(lala);

        if (item.colectivosId == 0) {
            console.log("Guardando uno nuevo");
            console.debug(item);

            const res = await fetch("http://localhost:8080/api/jsonws/invoke", {
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
            "body": `{\"/silefe.colectivo/add-colectivo\":${lala}}`,
            "method": "POST",
            "mode": "cors"
            });

        }
        else {
            console.log("actualizando colectivo");
            console.log("voy a actuailzar");
            console.debug(item);

            const res = await fetch("http://localhost:8080/api/jsonws/invoke", {
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
            "referrer": "http://localhost:8080/colectivos",
            "body": `{\"/silefe.colectivo/save-colectivo\":${lala}}`,
            "method": "POST",
            "mode": "cors"
            });

            fetchData();



        }

    }

    const handleDelete = () => {
        console.log("handleDelete");
        if (items.filter(item => item.checked).length > 0)
            onOpenChange(true);        

    }


    const confirmDelete = async () => {
        const auth = getAuthToken()
        let s = items.filter(item => item.checked).map( i => {return i.colectivosId});

        console.log();
        const res = await fetch("http://localhost:8080/api/jsonws/invoke", {
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

        console.debug(res);
        setToastItems([...toastItems, { title: "Borrar", type: "error", text: "Elemento borrado correctamente" }]);
        fetchData();

    }




    const confirmDelete2 = () => {
        console.log("Y ahora borro de verdad con axios");

        const auth = getAuthToken();

        console.log(items);
        let s = items.filter(item => item.checked).map( i => {return i.colectivosId});
        console.log(s);

        //const url = `http://localhost:8080/api/jsonws/silefe.colectivo/remove-colectivos`;
        axios.post(`http://localhost:8080/api/jsonws/silefe.colectivo/remove-colectivos`,{colectivos:[504]},{
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
            "mode": "cors"
        }).then(response => {
            console.log("response");
            console.log(response);
            setToastItems([...toastItems, { title: "Borrar", type: "error", text: "Elemento borrado correctamente" }]);
            fetchData();

        }).catch(err => {
            console.log("Error haciendo petición");
            console.log(err);
        });


    }

    const handleEdit = () => {
        let sel = items.filter(i => i.checked);
        if (sel.length > 0) {
            setItem(sel[0]);

            console.log(item);
        }
    }

    const handleNew = () => {
        setItem({colectivosId: 0, descripcion: ""})
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
            //console.log(response.data.data);
            //let data2 = response.data.data.map( i => {    
            //    let d = new XMLParser().parseFromString(i.descripcion);
            //    return {...i,checked:false,descripcion:d.getElementsByTagName('Descripcion')[0].value};
            //});
            //console.log(data2);
            setItems(response.data.data);
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