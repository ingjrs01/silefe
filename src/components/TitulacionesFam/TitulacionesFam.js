import React, { useEffect } from "react";
import { getUserId,getAuthToken, url_api } from '../../includes/LiferayFunctions';


const TitulacionesFam = () => {


    const fetchAPIData = async () => {
        const auth = getAuthToken();
        const referer = 'lalala';
        const endpoint = "/silefe.titulacionfam/filter";
        const postdata = {
            page: 0,
            descripcion: ""
        };

        const response = await fetch(url_api, {
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
            "body": `{\"${endpoint}\":${JSON.stringify(postdata)}}`,
            "method": "POST",
            "mode": "cors"
        });
        await console.debug(response);
    
        //let { data, totalPages, page } = await JSON.parse(await response.json());
        //return {data,totalPages, page}
    }

    useEffect(()=>{
        fetchAPIData().then(res=>{
            console.log("lalala");
        })
    },[]);
        

    return (
        <>
            <p>only for your eyes</p>
        </>
    )
}

export default TitulacionesFam;