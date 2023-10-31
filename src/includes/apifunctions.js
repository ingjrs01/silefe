import { getAuthToken, url_api } from "./LiferayFunctions";

export const fetchAPIData = async (endpoint, postdata, referer) => {

//    if (controllerRef.current) {
//        controllerRef.current.abort();
//    }
//
//    const controller = new AbortController();
//    controllerRef.current = controller;
    //debugger;
    const auth = getAuthToken();
    const response = await fetch(url_api, {
  //      signal: controllerRef.current?.signal,
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
    //debugger;

    let { data, totalPages, page, error, totalItems } = await JSON.parse(await response.json());
    return {data, error,totalPages, page, totalItems}
}

export const fetchAPIRow = async (endpoint, postdata, referer) => {
        const auth = getAuthToken();
        
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
        try {
            let { data, status } = await JSON.parse(await response.json());
            return {data,status}
        } catch (e) {
            console.error(e);
        }
    }


export const deleteAPI = async (endpoint,ids,referer) => {
    const auth = getAuthToken();

    let response = await fetch(url_api, {
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
    "body": `{\"${endpoint}\":{\"identifiers\":[${ids}]}}`,
    "method": "REMOVE",
    "mode": "cors"
    });

    const {status,error,msg} = await response.json();
    return {status,error,msg};
}

export const deleteAPIParams = async (endpoint,params,referer) => {
    const auth = getAuthToken();

    let response = await fetch(url_api, {
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
    "body": `{\"${endpoint}\": ${JSON.stringify(params)}  }`,
    "method": "REMOVE",
    "mode": "cors"
    });

    const {status,error,msg} = await response.json();
    return {status,error,msg};
}

export const saveAPI = async (endpoint,postdata,referer) => {
    const auth = getAuthToken();
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
    let { data, status, error } = await response.json();
    return { data, status, error };
}

export const  saveFileAPI = async (endpoint, file, referer) => {
    console.log("saveFileAPI");
    //fetch(endpoint, {
    //  method: 'POST',
    //  body: file,
    //  headers: {
    //    'content-type': file.type,
    //    'content-length': `${file.size}`, // 👈 Headers need to be a string
    //  },
    //})
    //  .then((res) => {        
    //    console.log("llego hasta aquí");
    //    console.log(res);
    //    debugger;
    //    res.json();
    //})
    //.then((data) => console.log(data))
    //.catch((err) => console.error(err));
    const auth = getAuthToken();
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
        "body": `{\"${endpoint}\":${file}}`,
        "method": "POST",
        "mode": "cors"
    });
    let { data, status, error } = await response.json();
    return { data, status, error };

}

export const batchAPI = async (endpoint,ttmp,referer) => {
    const auth = getAuthToken();

    const res2 = await fetch(url_api, {
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
        "body": `{\"${endpoint}\":${JSON.stringify(ttmp)}}`,
        "method": "POST",
        "mode": "cors"
    });

    let { status, error } = await res2.json();
    return {status,error};

}
