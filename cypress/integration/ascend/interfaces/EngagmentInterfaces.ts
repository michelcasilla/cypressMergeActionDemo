export interface EngagementListResponse {
  count: number;
  data: Engagement[];
}

export interface Engagement {
  projectid: string;
  accountid: string;
  client: string;
  engagement: string;
  statusid: number;
  status: string;
  date_created: string;
  serviceType: string;
}