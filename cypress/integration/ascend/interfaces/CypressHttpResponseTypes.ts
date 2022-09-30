export interface CypressHttpResponse {
    id: string;
    browserRequestId: string;
    routeId: string;
    request: Request;
    state: string;
    requestWaited: boolean;
    responseWaited: boolean;
    subscriptions: unknown[];
    response: Response;
  }
  
  export interface Response {
    method?: string;
    httpVersion: string;
    statusCode: number;
    statusMessage: string;
    body: Body;
  }
  
  export interface Body {
    count: number;
    data: unknown[];
  }
  
  export interface Request {
    httpVersion: string;
    body: string;
    responseTimeout: number;
  }
  