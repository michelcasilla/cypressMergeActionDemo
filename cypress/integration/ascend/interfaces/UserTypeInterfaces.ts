import { AuthInterface } from "../../../DataGenerator/AuthInterface";

export type UserType = {
  username: string;
  password: string;
  name: string;
  description?: string;
  firstname?: string;
  lastname?: string;
  title?: string;
  phonenumber?: string;
  role?: string;
};

export interface User {
  username: string;
  password: string;
  name: string;
  description: string;
  role: string;
}
export interface EnvList {
  dev: Env;
  staging: Env;
  pod: Env;
}
export interface Env {
  host: string;
  users: UsersListType | unknown;
  assignableUsers?: string[];
  adminUser?: AuthInterface;
}

export type UsersListType = {
  e1?: UserType;
  e2?: UserType;
  e3?: UserType;
  e4?: UserType;
  e5?: UserType;
  i1?: UserType;
  i2?: UserType;
  i3?: UserType;
  i4?: UserType;

};
