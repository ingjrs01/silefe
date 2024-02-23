import { useModal } from '@clayui/modal';
import React, { useEffect, useReducer, useRef, useState } from "react";
import { Liferay } from '../../common/services/liferay/liferay';
import { getAuthToken, getUserId, url_referer } from '../../includes/LiferayFunctions';
import { deleteAPI, fetchAPIData, saveAPI } from "../../includes/apifunctions";
import DefaultForm from '../../includes/interface/DefaultForm';
import { FAvisos } from '../../includes/interface/FAvisos';
import { FModal } from '../../includes/interface/FModal';
import { LoadFiles } from '../../includes/interface/LoadFiles';
import { Paginator } from "../../includes/interface/Paginator";
import Table from '../../includes/interface/Table';
import { ITEMS_ACTIONS, initialState, red_items } from '../../includes/reducers/main.reducer';
import { formatPost } from '../../includes/utils';
import Menu from '../Menu';
import { form } from "./Form";

const Convocatorias = () => {
    const [items, itemsHandle]             = useReducer(red_items, initialState);
    const [toastItems, setToastItems]      = useState([]);
    const { observer, onOpenChange, open } = useModal();
    const [file, setFile]                  = useState();
    const isInitialized                    = useRef(null);
    const referer = `${url_referer}/cnos`;

    useEffect(() => {
        if (!isInitialized.current) {
            initForm();
            fetchData();
            isInitialized.current = true;
        } else {
            const timeoutId = setTimeout(fetchData, 350);
            return () => clearTimeout(timeoutId);
        }
    }, [items.load]);

    const loadCsv = () => {
        console.log("Cargando un csv");
        itemsHandle({ type: ITEMS_ACTIONS.LOAD })
    }

    const initForm = () => {
        itemsHandle({type: ITEMS_ACTIONS.SET_FIELDS, form: form});
    }

    const processCsv = () => {
        console.log("esto es processCsv, y vou a guardar");
        //sendFile();
        //downloadFile2();
        lelele();
        //downloadFile();
        //if (file) {
        //    const reader = new FileReader();
//
        //    reader.onload = async ({ target }) => {
        //        const csv = Papa.parse(target.result, { header: true, delimiter: ";", delimitersToGuess: [";"] });
        //        const parsedData = csv?.data;
        //        let end = '/silefe.cno/add-multiple';
        //        let ttmp = { cnos: parsedData, userId: Liferay.ThemeDisplay.getUserId() };
//
        //        batchAPI(end, ttmp, referer).then(res2 => {
        //            if (res2.ok) {
        //                setToastItems([...toastItems, { title: Liferay.Language.get("Carga_Masiva"), type: "info", text: Liferay.Language.get('Elementos_cargados') }]);
        //                fetchData();
        //            }
        //            else {
        //                setToastItems([...toastItems, { title: Liferay.Liferay.get("Carga_Masiva"), type: "danger", text: Liferay.Language.get("Elementos_no_cargados") }]);
        //            }
        //        });
        //    };
        //    reader.readAsText(file);
        //}
        //else {
        //    console.log("fichero no cargado")
        //}
    }

    const handleSave = async () => {
        console.log("enviaando los datos con fichero adjunto");

        const reader = new FileReader();
        reader.onload = async ({ target }) => {
            const ficheroEnvio = target.result;
            const data = {
                convocatoriaId : items.item.id,
                obj:{
                    ...items.item,
                    userId : getUserId(),
                    fichero: ficheroEnvio,
                    filename: file.name??"probando1.jpg",
                },
            }
    
            let { status, error } = await saveAPI('/silefe.convocatoria/save-convocatoria', data, referer);
            if (status) {
                fetchData();
                setToastItems([...toastItems, { title: Liferay.Language.get("Guardar"), type: "info", text: Liferay.Language.get('Guardado_correctamente') }]);
            }
        }
        reader.readAsDataURL(file);

        //else {
        //    setToastItems([...toastItems, { title: Liferay.Language.get("Guardar"), type: "danger", text: Errors[error] }]);
        //}
    }

    //const handleSave = async () => {
        //const data = {
        //    convocatoriaId: items.item.id,
        //    obj: items.item,
        //    userId: getUserId(),
        //}
        //let endpoint = '/silefe.convocatoria/save-convocatoria';
        //if (items.status === 'new')
        //    endpoint = '/silefe.convocatoria/add-convocatoria';
        //let { status, error } = await saveAPI(endpoint, data, referer);
        //if (status) {
        //    fetchData();
        //    setToastItems([...toastItems, { title: Liferay.Language.get("Guardar"), type: "info", text: Liferay.Language.get('Guardado_correctamente') }]);
        //}
        //else {
        //    setToastItems([...toastItems, { title: Liferay.Language.get("Guardar"), type: "danger", text: Errors[error] }]);
        //}
    //}

    const confirmDelete = async () => {
        let s = items.arr.filter(item => item.checked).map(i => { return i.convocatoriaId });
        deleteAPI('/silefe.convocatoria/remove-convocatoria', s, referer).then(res => {
            if (res) {
                setToastItems([...toastItems, { title: Liferay.Language.get('Borrar'), type: "info", text: Liferay.Language.get('Borrado_ok') }]);
                fetchData();
            }
            else {
                setToastItems([...toastItems, { title: Liferay.Language.get('Borrar'), type: "danger", text: Liferay.Language.get('Borrado_no') }]);
            }
        })
    }

    const uploadFile = () => {
        console.log("subiendo el fichero");
        //if (file) {
        //    const reader = new FileReader();
        //    reader.onload = async ({ target }) => {
        //        const csv = Papa.parse(target.result, { header: true, delimiter: ";", delimitersToGuess: [";"] });
        //        const parsedData = csv?.data;
        //        let end = '/silefe.cno/add-multiple';
        //        let ttmp = { cnos: parsedData, userId: Liferay.ThemeDisplay.getUserId() };
        //        
        //    };
        //    reader.readAsText(file);
        //}
        //else {
        //    console.log("fichero no cargado")
        //}

    }

    const downloadFile = async () => {
        const reader = new FileReader();
        reader.onload = async ({ target }) => {
            //const Liferay = window.Liferay;            
            const pdata = {
                filedata: target.result.toString('base64')
            }
            const endpoint = '/silefe.convocatoria/get-file';
            const { status, error } = await saveAPI(endpoint, pdata, referer);
            await console.log(status);

            
        }
        //reader.readAsText(file);
        reader.readAsBinaryString(file);
        console.log("leído en binario");

    }


    //const bla = () => {
    //    try {
    //        image = atob(e.target.result.split("data:image/jpeg;base64,")[1]);
  //
    //      } catch (e) {
    //        jpg = false;
    //      }
    //      if (jpg == false) {
    //        try {
    //          image = atob(e.target.result.split("data:image/png;base64,")[1]);
    //        } catch (e) {
    //          alert("Not an image file Rekognition can process");
    //          return;
    //        }
    //      }
    //      //unencode image bytes for Rekognition DetectFaces API 
    //      var length = image.length;
    //      imageBytes = new ArrayBuffer(length);
    //      var ua = new Uint8Array(imageBytes);
    //      for (var i = 0; i < length; i++) {
    //        ua[i] = image.charCodeAt(i);
    //      }
    //      //Call Rekognition  
    //      DetectFaces(ua);
    //}



    const lelele = () => {
        console.log("lelele con imágenes array buffer");
        console.log("tratando de enviar el fihcero atop");
        
        
        if (file) {
            const reader = new FileReader();
            reader.onload = async ({ target }) => {
                console.debug(target);
                var image = atob(target.result.split("data:image/jpeg;base64,")[1]);
                
                Liferay.Service(
                    '/dlapp/add-file-entry',
                    {
                        repositoryId: 20119,
                        folderId: 39909,
                        sourceFileName: 'aaa.jpg',
                        mimeType: 'image/jpg',
                        title: 'prueba',
                        description: '',
                        changeLog: '',
                        file: image//target.result,
                    },
                    function(obj) {
                        console.log(obj);
                    },
                    function(e) {
                        console.log("Error trabajando");
                        console.error(e);
                    }
                );
                

            }
            //reader.readAsArrayBuffer(file);  //readAsBinaryString(file);//   .readAsDataURL(file);
            //reader.readAsText(file);
            reader.readAsDataURL(file);
        }

    }





    const sendFile = () => {
		//event.preventDefault();
        if (file) {
            const reader = new FileReader();
            reader.onload = async ({ target }) => {
                console.log("leyendo cosas");
                const data = new FormData();        
                data.set('file', target);
                data.set('folderId', 39909);
                data.set('repositoryId', 20119);
                data.set('sourceFileName', file.name);
                data.set('mimeType', 'image/jpeg');
                data.set('description', '');
                data.set('changeLog', '');
                data.set('p_auth',   getAuthToken() ); 

                console.log("todo listo para enviar");
                console.debug(data);
                const url = 'http://lfdevapps01.depo.es:8080/api/jsonws/invoke'; 

                const endpoint = "/dlapp/add-file-entry";
                fetch(url, {
                    "credentials": "include",
                    "headers": {
                        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:104.0) Gecko/20100101 Firefox/104.0",
                        "Accept": "*/*",
                        "Accept-Language": "es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3",
                        "x-csrf-token": getAuthToken(),
                        "Content-Type":  "multipart/form-data",     //"text/plain;charset=UTF-8",
                        //"Sec-Fetch-Dest": "empty",
                        "Sec-Fetch-Mode": "cors",
                        "Sec-Fetch-Site": "same-origin"
                    },
                    "referrer": `\"${referer}\"`,
                    "body": `${data}`,//`{\"${endpoint}\":${data}}`,      //${JSON.stringify(data)}}`,
                    "method": "POST",
                    "cmd": `{\"${endpoint}\"`,
                    "mode": "cors"
                }).then(response => {
                    console.log("se han recibido datos");
                    console.debug(response);
                });
                    //{
                    //"method": "POST",
                    //"body": data,
                    //"cmd": "/dlapp/add-file-entry",
                    //"Content-Type": 'multipart/form-data',
                    //}
            }
            reader.readAsDataURL(file);
        }
        else {
            console.log("el fihcero no funciona");
        }

    }

    const downloadFile2 = async() => {
        console.log("downloadFile6");
        const reader = new FileReader();
        reader.onload = async ({ target }) => {
            const Liferay = window.Liferay;
            
            Liferay.Service(
                '/dlapp/add-file-entry',
                {
                //    externalReferenceCode: "AAAA",
                    repositoryId: 20119,
                    folderId: 39909,
                    sourceFileName: file.name,
                    mimeType: file.type,
                    title: file.name,
                    description: '',
                    changeLog: '',
                    bytes: target.result,
                    file: target,
                    expirationDate : null,
                    reviewDate: null,
                    cmd: {"/dlapp/add-file-entry":{}},
                },
                function(obj) {
                    console.log("algo se hace en binario");
                    console.log(obj);
                }
                );        
        }
        //reader.readAsText(file);
        //reader.readAsBinaryString(file);
        reader.readAsDataURL(file);
        console.log("leído en texto");
    }

    form.downloadFunc = downloadFile;
    form.handleSave = handleSave;
    form.loadCsv = loadCsv;

    const fetchData = async () => {
        let { data, totalPages, totalItems, page } = await fetchAPIData('/silefe.convocatoria/filter', formatPost(items), referer);
        const tmp = await data.map(i => { return ({ ...i, id: i.convocatoriaId, checked: false }) });
        await itemsHandle({ type: ITEMS_ACTIONS.LOAD_ITEMS, items: tmp, totalPages: totalPages, total: totalItems, page: page });
    }

    if (!items)
        return (<div>{Liferay.Language.get('Cargando')}</div>)

    return (
        <>
            <Menu
                itemsHandle={itemsHandle}
                items={items}
                onOpenChange={onOpenChange}
                handleSave={handleSave}
                download={downloadFile}
            />
            {(items.status === 'load') &&
                <LoadFiles
                    setFile={setFile}
                    processCsv={processCsv}
                    itemsHandle={itemsHandle}
                />}
            {(items.status === 'edit' || items.status === 'new') &&
                <DefaultForm
                    handleSave={handleSave}
                    itemsHandle={itemsHandle}
                    items={items}
                />
            }
            {
                (items.status === 'list') &&
                <>
                    <Table
                        items={items}
                        itemsHandle={itemsHandle}
                        onOpenChange={onOpenChange}
                    />
                    <Paginator
                        items={items}
                        itemsHandle={itemsHandle}
                    />
                </>
            }
            <FAvisos toastItems={toastItems} setToastItems={setToastItems} />
            {open && <FModal onOpenChange={onOpenChange} confirmDelete={confirmDelete} observer={observer} />}
        </>
    )
}
export default Convocatorias;