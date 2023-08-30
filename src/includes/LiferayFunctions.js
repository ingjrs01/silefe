//import React from "react";

export const url_api = "http://lfdevapps01.depo.es:8080/api/jsonws/invoke";
export const url_referer = "http://lfdevapps01.depo.es:8080";

export function getAuthToken() {
    return Liferay.authToken;
}

export function getLanguageId() {
    return Liferay.ThemeDisplay.getLanguageId();
}

export const getUserId = () => Liferay.ThemeDisplay.getUserId();


//export {getAuthToken, getLanguageId,url_api};