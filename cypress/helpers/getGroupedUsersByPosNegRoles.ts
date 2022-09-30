/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAccounts } from "./environment";
import { UsersListType } from "../e2e/ascend/interfaces/UserTypeInterfaces";
export const allRoles = ['e1','e2','e3','e4','e5','i1','i2','i3','i4'];
/**
 * 
 * @param positiveRoles Roles that can perform action. Define 'all' to indicate all roles can do this option.
 * @returns return an object with positive and negative role arrays.
 */
export const getGroupedUsersByPosNegRoles = (positiveRoles: Array<string> | 'all' = allRoles): GroupedRoles=>{
    const users: UsersListType = getAccounts();
    if(typeof positiveRoles === 'string' && positiveRoles === 'all'){
        positiveRoles = allRoles;
    }
    return Object.keys(users).reduce((typeAcc, role)=>{
        if(positiveRoles.includes(role)){
            typeAcc.positive.push({
                role,
                ...users[role],
            });
        }else{
            typeAcc.negative.push({
                role,
                ...users[role],
            })
        }
        return typeAcc;
    },{ positive : [], negative : [] });
}

export interface GroupedRoles{
    positive: any[];
    negative: any[];
}