export interface CustomObjectResponse {
    categories: Category[];
    criteria: Criterion2[];
    requests: CustomObjectRequest[];
    requestTypes: RequestType[];
    classes: Class[];
  }
  
  interface RequestType {
    typeid: number;
    type: string;
  }
  
  export interface CustomObjectRequest {
    requestID: number;
    description: string;
    requestIdentifier: string;
    state: number;
    modifiedBy: number;
    dateCreated: string;
    dateModified: string;
    categoryID: number;
    typeID: number;
    customProjectID: string;
    projectID: string;
    typeName: string;
    applicable: boolean;
    dueDate: string;
    criteriaIDs?: string;
    requirementIDs?: string;
    serviceNames: string[];
    locationIDs?: string;
    category: Category;
    class: Class;
    criteria: Criterion3[];
    locations: Location[];
  }
  
  interface Location {
    locationid: number;
    locationname: string;
    description: string;
    state: number;
    accountID: string;
    addressStreet: string;
    addressState: string;
    addressZip: string;
    deletable: boolean;
  }
  
  interface Criterion3 {
    criteriaID: number;
    auditID: number;
    requirementID: string;
    requirement?: string;
    reqTestProcedure?: string;
    requiredSamplingGuidance?: string;
    templateTestLanguage?: string;
    state: number;
    createdBy: number;
    modifiedBy: number;
    dateCreated?: string;
    dateModified?: string;
    deletedAt?: string;
    description: string;
    familyID?: string;
    familyName?: string;
    categoryName?: string;
    auditSheetID: string;
    customProjectAuditID?: string;
    irlRevisionDateID: number;
    grouping: string;
    auditName: string;
    projectsCriteriaID?: string;
    applicable?: boolean|number;
    projectAuditID?: string;
    justification?: string;
    serviceMapped: boolean;
    criteriaMap: string;
    type: string;
    criteriaGroup: string;
  }
  
  interface Class {
    classID: number;
    class: string;
    description?: string;
    state: number;
    createdBy: number;
    modifiedBy: number;
    dateCreated: string;
    dateModified?: string;
    sheetID: string;
    deletedAt?: string;
    customProjectID?: string;
    irlRevisionDateID: number;
    encryptedCustomProjectID?: string;
  }
  
  interface Criterion2 {
    serviceName: string;
    criteria: Criterion[];
  }
  
  interface Criterion {
    criteriaID: number;
    auditID: number;
    requirementID: string;
    requirement?: string;
    reqTestProcedure?: string;
    requiredSamplingGuidance?: string;
    templateTestLanguage?: string;
    state: number;
    createdBy?: string;
    modifiedBy?: string;
    dateCreated?: string;
    dateModified?: string;
    deletedAt?: string;
    description: string;
    familyID?: number;
    familyName?: string;
    categoryName?: string;
    auditSheetID?: string;
    customProjectAuditID?: string;
    irlRevisionDateID?: string;
    grouping: string;
    auditName: string;
    projectsCriteriaID: number;
    applicable: boolean;
    projectAuditID: number;
    justification?: string;
    serviceMapped: boolean;
    criteriaMap: string;
    type: string;
    criteriaGroup: string;
  }
  
  interface Category {
    categoryID: number;
    classID: number;
    category: string;
    description: string;
    state: number;
    createdBy: number;
    modifiedBy: number;
    dateCreated: string;
    dateModified?: string;
    sheetID: string;
    prefix: string;
    deletedAt?: string;
    customProjectID?: string;
    irlRevisionDateID: number;
  }