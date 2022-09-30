import { Env, UsersListType, UserType } from "../e2e/ascend/interfaces/UserTypeInterfaces";
import * as pod from '../../env/pod.json';
import * as dev from '../../env/dev.json';
import * as staging from '../../env/staging.json';

const getAssignableUsernames = (): string[] =>{
  return Cypress.env('assignableUsers')
}

const getAccounts = (): UsersListType =>{
  const envs = { pod, dev, staging };
  return envs[Cypress.env('sub')].users;
}

const getAccount = (userType: string): UserType =>{
  return getAccounts()[userType.toLowerCase()];
}

const getEnvURL = (): string =>{
   return  Cypress.config().baseUrl+'/'; // Cypress.env('host');
}

const getCurrentEnv = (): Env =>{
  return Cypress.env('env');
}

//FIXME: I don't think these belong here.
export const CLIENT_NAME = 'A-SCEND Demo';
export const IDP_URL = '/idp/login';
export const ENGAGEMENT_CYPRESS1 = 'CYPRESS01';
export const ENGAGEMENT_NAME_CYPRESS1 = 'CYPRESS01_2021_TYPE1SOC2_TYPE2SOC1_PCIDSSROC_ISO27001_FISMASECURITYASSESSMENT_TYPE1HIPAA';
export const ENGAGEMENT_CYPRESS3 = 'CYPRESS03';
export const ENGAGEMENT_NAME_CYPRESS3 = 'CYPRESS03_2022_2022_Cypress Service 01_';

export { getAccounts, getAccount, getAssignableUsernames, getEnvURL, getCurrentEnv };

