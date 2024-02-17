import { RequestMethod } from "constants/common";

export interface Query {
  [key: string]: any;
}

export interface Body {
  [key: string]: any;
}

export interface GenerateSignatureParams {
  currentUrl: string;
  requestMethod: RequestMethod;
  queryParams?: Query;
  body?: Body;
  authToken: string;
}
