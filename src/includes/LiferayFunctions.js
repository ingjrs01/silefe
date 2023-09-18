//import React from "react";

export const url_api = "http://lfdevapps01.depo.es:8080/api/jsonws/invoke";
export const url_referer = "http://lfdevapps01.depo.es:8080";
export const spritemap = `${url_referer}/o/my-project/icons.svg`;

export function getAuthToken() {
    return Liferay.authToken;
}

export function getLanguageId() {
    return Liferay.ThemeDisplay.getLanguageId();
}

export const getUserId = () => Liferay.ThemeDisplay.getUserId();

export const getRolesUser = () => {
    return Liferay.Service('/role/get-user-roles',{userId: getUserId()}, (response) => {
        const l = response.map(e => (e.name) );
        console.log("esto es l");
        console.log(l);
        return l;
    } );
}

