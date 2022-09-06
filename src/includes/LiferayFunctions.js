import React from "react";


function getAuthToken() {
    return Liferay.authToken;
}

function getLanguageId() {
    return Liferay.ThemeDisplay.getLanguageId();
}


export {getAuthToken, getLanguageId};