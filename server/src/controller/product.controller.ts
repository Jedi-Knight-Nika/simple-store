import { Get, JsonController } from "routing-controllers";

import { inject } from "../configuration/container";
import { ProductServiceToken } from "../model";
import { ProductService } from "../service";

@JsonController("/products")
export class ProductController {
  constructor(@inject(ProductServiceToken) private readonly productService: ProductService){}

  @Get("/ping")
  async ping() {
    return await this.productService.ping();
  }
}
