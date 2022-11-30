//import React from "react";

export const url_api = "http://localhost:8080/api/jsonws/invoke";

export function getAuthToken() {
    return Liferay.authToken;
}

export function getLanguageId() {
    return Liferay.ThemeDisplay.getLanguageId();
}

export const getUserId = () => Liferay.ThemeDisplay.getUserId();


//export {getAuthToken, getLanguageId,url_api};