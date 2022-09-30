import { ascendUnknown } from "../../../DataGenerator/ASCENDTypes";

export interface ASCENDLocation {
    projectid: string;
    locationid: number;
    locationname: string;
    description: string;
    state?: string;
    accountID: string;
    addressStreet: string;
    addressState: string;
    addressZip: string;
    deletable: boolean;
  }