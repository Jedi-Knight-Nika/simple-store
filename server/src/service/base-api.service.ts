import fetch, { HeadersInit, RequestInit, Response } from "node-fetch";
import { url } from "inspector";

import { BodyParams, InternalServerError, RequestMethods, QueryParams } from "../model";
import config from "../config";

export abstract class BaseApiService {
  private readonly bearerToken: string = `Bearer ${config.STORE.TOKEN}`;
  private readonly baseUrl: string = `${config.STORE.BASE_URL}/${config.STORE.ID}`;

  private getHeaders(): HeadersInit {
    return {
      Accept: "application/json",
      Authorization: this.bearerToken,
    };
  }

  private handleResponse<T>(response: Response): Promise<T> {
    return response.json() as Promise<T>;
  }

  private getUrl(path: string, queryParams?: QueryParams): URL {
    const url = new URL(`${this.baseUrl}/${path}`.replace(/([^:]\/)\/+/g, "$1"));

    if (queryParams) {
      Object.entries(queryParams).forEach(([key, value]) => {
        url.searchParams.append(key, value);
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
