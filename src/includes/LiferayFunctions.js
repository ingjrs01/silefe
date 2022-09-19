import React from "react";

const url_api = "http://localhost:8080/api/jsonws/invoke";

function getAuthToken() {
    return Liferay.authToken;
}

function getLanguageId() {
    return Liferay.ThemeDisplay.getLanguageId();
}


export {getAuthToken, getLanguageId,url_api};