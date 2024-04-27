import fetch, { HeadersInit, RequestInit, Response } from "node-fetch";
import { BadRequestError, InternalServerError, NotFoundError } from "routing-controllers";
import { url } from "inspector";

import config from "../config";

export interface QueryParams {
  [key: string]: any;
}

export type BodyParams = any;

enum RequestMethods {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export default abstract class BaseApiService {
  #bearerToken: string = `Bearer ${process.env.STORE_TOKEN}`;
  #storeId: string = process.env.STORE_ID || "";

  private getHeaders(): HeadersInit {
    return {
      Accept: "application/json",
      Authorization: this.#bearerToken,
    };
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (response.ok) {
      return response.json() as Promise<T>;
    } else {
      const errorResponse = await response.json();

      switch (response.status) {
        case 400:
          throw new BadRequestError(errorResponse.message || "Bad request error");
        case 404:
          throw new NotFoundError(errorResponse.message || "Resource not found");
        default:
          throw new InternalServerError(errorResponse.message || "Internal server error");
      }
    }
  }

  private getUrl(path: string, queryParams?: QueryParams): URL {
    const baseUrl = `${config.STORE_BASE_URL}/${this.#storeId}`;
    const url = new URL(`${baseUrl}/${path}`.replace(/([^:]\/)\/+/g, "$1"));

    if (queryParams) {
      Object.entries(queryParams).forEach(([key, value]) => {
        url.searchParams.append(key, encodeURIComponent(value));
      });
    }

    return url;
  }

  private async httpRequest<T>(path: string, options: RequestInit = {}, queryParams?: QueryParams): Promise<T> {
    try {
      const url = this.getUrl(path, queryParams);
      const finalOptions: RequestInit = {
        headers: this.getHeaders(),
        ...options,
      };

      const response: Response = await fetch(url.toString(), finalOptions);

      return this.handleResponse<T>(response);
    } catch (error) {
      console.error(`Error making HTTP request to ${url.toString()}:`, error);

      console.log("sdsdsd");
      throw new InternalServerError(
        `Failed to make HTTP request: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  public async get<T>(path: string, queryParams?: QueryParams): Promise<T> {
    return this.httpRequest<T>(path, { method: RequestMethods.GET }, queryParams);
  }

  public async post<T>(path: string, body: BodyParams): Promise<T> {
    return this.httpRequest<T>(path, { method: RequestMethods.POST, body: JSON.stringify(body) });
  }

  public async put<T>(path: string, body: BodyParams): Promise<T> {
    return this.httpRequest<T>(path, { method: RequestMethods.PUT, body: JSON.stringify(body) });
  }

  public async delete<T>(path: string): Promise<T> {
    return this.httpRequest<T>(path, { method: RequestMethods.DELETE });
  }
}
