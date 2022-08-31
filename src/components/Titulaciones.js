import React, {useState,useEffect} from 'react';
import Table from './Table';
import TitulacionForm from './TitulacionForm';
import Menu from './Menu';
import ClayAlert from '@clayui/alert';
import ClayModal, {useModal} from '@clayui/modal';
import ClayButton from '@clayui/button';
import axios from 'axios';

const spritemap = '/icons.svg';

const Titulaciones = () => {
    const [titulaciones, setTitulaciones] = useState([]);
    const [toastItems,setToastItems]      = useState([]);    
    const [item, setItem]                 = useState({id:0,codigo:"",descripcion:""});
    const [allCheck,setAllCheck]          = useState(false);
    const [pagination, setPagination]     = useState({page:0,totalPages:0,allCheck:false})
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

    const confirmDelete = () => {
        const url = '/silefe.titulacion/remove-titulacion';
        let s = titulaciones.filter(item => item.checked).map( i => {return i.titulacionId});
        Liferay.Service(url,
        {
            titulaciones: s
        }, obj => {
            console.log(obj);
            setToastItems([...toastItems, { title: "Borrar", type: "error", text: "Elemento borrado correctamente" }]);
            fetchData();
        });
    }

    const handleDelete = () => {
        if (titulaciones.filter(item => item.checked).length > 0)
            onOpenChange(true);        
    }

    const handleCheck = (index) => {        
        let tmp = titulaciones.slice();
        tmp[index].checked = !titulaciones[index].checked;
        setTitulaciones(tmp);
      }
    
    const handleAllCheck = () => {
        setAllCheck(!allCheck);
        let tmp = titulaciones.map( i => {return ({...i,checked:allCheck})});
        setTitulaciones(tmp);
    }

    const handleEdit = () => {
        let sel = titulaciones.filter(i => i.checked);
        if (sel.length > 0) {
            setItem(sel[0]);
        }
    }

    const handleNew = () => {
        setItem({id: 0, codigo: "", descripcion: ""})
        setTitulaciones(titulaciones.map( t => {return ({...t,checked:false})}));
    }
    
    const prevPage = () => {
        if (pagination.page > 0)
            setPagination({...pagination, page:pagination.page-1})
    }

    const nextPage = () => {
        console.log("Cambiando de página");
        console.debug(pagination);
        if (pagination.page <= pagination.totalPages - 1) {
            setPagination({...pagination, page:pagination.page+1})
        }
    }

    const fetchData2 = () => {
        const url ="/silefe.titulacion/get-titulaciones/";
        Liferay.Service(url,{page:pagination.page},obj => {
            console.log("datos recibidos fetch 2");
            console.debug(obj);
            //setTitulaciones(obj.map(item=>{return ({...item,checked:false})}));
        });
    }

    const fetchData = () => {
    //    const token = 'anVhbnJpdmVpcm9AZ21haWwuY29tOmxlbGVsZQo=';
    //    const url = `http://localhost:8080/api/jsonws/silefe.titulacion/get-titulaciones?page=1`;
    //    axios.get(url,{
    //        headers: {
    //            'Authorization': `Basic ${token}`
    //        }
    //    }).then( response => {
    //        console.log(response)
    //        //setTitulaciones(response.data);
    //    }).catch (err => {
    //        console.error(err);
    //    })

        // vamos aqui

        const url = `http://localhost:8080/api/jsonws/silefe.titulacion/get-titulaciones?page=${pagination.page}`;
        const token = 'anVhbnJpdmVpcm9AZ21haWwuY29tOmxlbGVsZQo=';
        axios.get(url,{
          headers: {
              'Authorization': `Basic ${token}`
          }}).then(response => {
            setTitulaciones(response.data.data);
            setPagination({...pagination,totalPages:response.data.totalPages})
        });
    }

    const handleSave = () => {
        const userId = Liferay.ThemeDisplay.getUserId();
        const userName = Liferay.ThemeDisplay.getUserName();
        
        console.log(item);
        if (item.titulacionId == null || item.titulacionId == 0) {            
            const url = '/silefe.titulacion/add-titulacion';
            Liferay.Service(url, {
                "codigo"     : item.codigo,
                "descripcion": item.descripcion,
                "userId"     : userId,
                "userName"   : userName
            }, obj => {
                setToastItems([...toastItems,{title: "Guardar", type:"info", text:"Elemento añadido correctamente"}]);
                setPagination({...pagination,page:pagination.totalPages})
                console.log("Se acaba de guardar");
                console.log(pagination);
                //fetchData();
            }
            );
        }
        else {
            Liferay.Service( '/silefe.titulacion/save-titulacion',item,obj => {
                console.log(obj);
                setToastItems([...toastItems,{title: "Guardar", type:"info", text:"Elemento guardado correctamente"}]);
                fetchData();
                });
        }
    }

    useEffect(()=>{
        fetchData();
        //fetchData2();
    },[pagination.page]);

    if (!titulaciones) 
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

            <TitulacionForm setItem={setItem} item={item} />
            <Table 
                columns={columns}
                rows={titulaciones} 
                handleCheck={handleCheck} 
                handleAllCheck={handleAllCheck}  
                allCheck={allCheck}
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
    )
}

export default Titulaciones;