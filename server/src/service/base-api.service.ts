import { HeadersInit, RequestInit, Response } from "node-fetch";
import config from "../config";

export abstract class BaseApiService {
  private readonly bearerToken: string = `Bearer ${config.STORE.TOKEN}`;
  private readonly baseUrl: string = config.STORE.BASE_URL;

  private fetch!: typeof import("node-fetch").default;

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

  private async initFetch(): Promise<void> {
    if (!this.fetch) {
      const { default: fetchModule } = await import("node-fetch");
      this.fetch = fetchModule;
    }
  }

  private async httpRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
    await this.initFetch();

    const finalOptions: RequestInit = {
      headers: this.getHeaders(),
      ...options,
    };

    const response: Response = await this.fetch(`${this.baseUrl}/${path}`, finalOptions);

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
