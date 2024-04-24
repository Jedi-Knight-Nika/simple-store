export interface QueryParams {
  [key: string]: any;
}

export type BodyParams = any;

export enum RequestMethods {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}
