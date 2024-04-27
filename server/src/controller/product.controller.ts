import { Get, JsonController, Param } from "routing-controllers";
import { inject, Injectable } from "../configuration/container";

import { ProductId, ProductServiceToken } from "../model";
import { ProductService } from "../service";

@Injectable()
@JsonController("/products")
export class ProductController {
  constructor(@inject(ProductServiceToken) private readonly productService: ProductService) {}

  @Get("/ping")
  public ping() {
    return this.productService.ping();
  }

  @Get()
  public async list() {
    return await this.productService.list();
  }

  @Get("/:id")
  public async details(@Param("id") id: ProductId) {
    return await this.productService.details(id);
  }
}
