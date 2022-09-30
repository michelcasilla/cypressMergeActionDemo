export interface CurrentProjectInterface{
    accountId: string;
    client: string;
    dateCreated: string;
    projectId: string;
    engagement: string;
    status: string;
    state: number;
    lastKnownAccountId?: string;
    lastKnownProjectId?: string;
}