import fetch, { HeadersInit, RequestInit, Response } from "node-fetch";

import config from "../config";
import { InternalServerError } from "../model";

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
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json() as Promise<T>;
  }
  private async httpRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
    try {
      const finalOptions: RequestInit = {
        headers: this.getHeaders(),
        ...options,
      };

      const response: Response = await fetch(`${this.baseUrl}/${path}`, finalOptions);
      return this.handleResponse<T>(response);
    } catch (error) {
      console.error(`Error making HTTP request to ${path}:`, error);

      throw new InternalServerError(
        `Failed to make HTTP request: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  public async get<T>(path: string, options?: RequestInit): Promise<T> {
    return this.httpRequest<T>(path, { method: "GET", ...options });
  }

  public async post<T>(path: string, body: any, options?: RequestInit): Promise<T> {
    return this.httpRequest<T>(path, { method: "POST", body: JSON.stringify(body), ...options });
  }

  public async put<T>(path: string, body: any, options?: RequestInit): Promise<T> {
    return this.httpRequest<T>(path, { method: "PUT", body: JSON.stringify(body), ...options });
  }

  public async delete<T>(path: string, options?: RequestInit): Promise<T> {
    return this.httpRequest<T>(path, { method: "DELETE", ...options });
  }
}
