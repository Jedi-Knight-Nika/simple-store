import { Injectable } from "../configuration/container";
import { ProductServiceToken } from "../model";
import { ApiService } from "./api.service";

@Injectable(ProductServiceToken)
export class ProductService extends ApiService {
  public ping(): string {
    console.info("pongg");

    return "pong!";
  }
}
