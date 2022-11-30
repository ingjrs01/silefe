import { url_api, getAuthToken } from "./LiferayFunctions";

export const fetchAPIData = async (endpoint, postdata, referer) => {

//    if (controllerRef.current) {
//        controllerRef.current.abort();
//    }
//
//    const controller = new AbortController();
//    controllerRef.current = controller;
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

    let { data, totalPages } = await JSON.parse(await response.json());
    return {data,totalPages}
}


export const deleteAPI = async (endpoint,ids,referer) => {
    const auth = getAuthToken();

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
    "body": `{\"${endpoint}\":{\"identifiers\":[${ids}]}}`,
    "method": "REMOVE",
    "mode": "cors"
    });
    
    return res.ok;
}

export const saveAPI = async (endpoint,data,referer) => {
    const auth = getAuthToken();
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
        "body": `{\"${endpoint}\":${JSON.stringify(data)}}`,
        "method": "POST",
        "mode": "cors"
    });
    return res.ok;
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

    return res2.ok

}