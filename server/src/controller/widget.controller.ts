import { Delete, Get, JsonController, Param, Post } from "routing-controllers";
import { inject, Injectable } from "../configuration/container";

import { ProductId, ProductServiceToken } from "../model";
import { ProductService } from "../service";

@Injectable()
@JsonController("/widget")
export class WidgetController {
  constructor(@inject(ProductServiceToken) private readonly productService: ProductService) {}

  @Get("/")
  async productsToShowinWidget() {
    return this.productService.productsToShowinWidget();
  }

  @Post("/:id")
  async addProductToShow(@Param("id") id: ProductId) {
    this.productService.addProductToShow(id);
    return true;
  }

  @Delete("/clear")
  async clearProductsToShow() {
    this.productService.clearProductsToShow();
    return true;
  }

  @Delete("/:id/remove")
  async removeProductFromShow(@Param("id") id: ProductId) {
    this.productService.removeProductFromShow(id);
    return true;
  }
}
