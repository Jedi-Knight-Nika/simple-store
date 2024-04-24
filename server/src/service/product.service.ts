import { Injectable } from "../configuration/container";
import { ProductServiceToken } from "../model";
import { BaseApiService } from "./base-api.service";

@Injectable(ProductServiceToken)
export class ProductService extends BaseApiService {
  public ping(): string {
    console.info("pongg");

    return "pong!";
  }
}
