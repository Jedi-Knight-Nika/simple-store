import { Get, JsonController } from "routing-controllers";

import { inject, Injectable } from "../configuration/container";
import { ProductServiceToken } from "../model";
import { ProductService } from "../service";

@Injectable()
@JsonController("/products")
export class ProductController {
  constructor(@inject(ProductServiceToken) private readonly productService: ProductService) {}

  @Get("/ping")
  async ping() {
    console.log("productService", this.productService);
    return await this.productService.ping();
  }

  @Get()
  async list() {
    return await this.productService.list();
  }
}
