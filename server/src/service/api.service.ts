import fetch, { HeadersInit, RequestInit, Response } from "node-fetch";
import config from "../config";

export abstract class ApiService {
  private readonly token: string = `Bearer ${process.env.ECWID_TOKEN}`;
  private readonly baseUrl: string = config.STORE.BASE_URL;

  private getHeaders(): HeadersInit {
    return {
      Accept: "application/json",
      Authorization: this.token,
    };
  }

  private handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json() as Promise<T>;
  }

  private async httpRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
    const defaultOptions: RequestInit = {
      headers: this.getHeaders(),
    };
    const finalOptions = { ...defaultOptions, ...options };

    const response: Response = await fetch(`${this.baseUrl}/${path}`, finalOptions);
    return this.handleResponse<T>(response);
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
