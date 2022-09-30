import { CurrentProjectInterface } from "../e2e/ascend/interfaces/CurrentProjectInterfaceInterface";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const cookiesToObject = (): any => {
    const cookiesObject: any = {};
    document.cookie.split(';').forEach((x)=>{
        const cookieValue = x.split("=");
        cookiesObject[cookieValue[0].trim()] = cookieValue[1];
    })
    return cookiesObject;
}

export const getCurrentProject = (): CurrentProjectInterface => {
    let currentProject = JSON.parse(sessionStorage.getItem('current-project'));
    const {lastKnownAccountId, lastKnownProjectId} = cookiesToObject();
    currentProject = {...currentProject, lastKnownAccountId, lastKnownProjectId};
    return currentProject;
}