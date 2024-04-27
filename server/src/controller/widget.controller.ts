import { Response } from "express";
import { Delete, Get, JsonController, Param, Post, Res } from "routing-controllers";
import { inject, Injectable } from "../configuration/container";

import { ProductId, ProductServiceToken } from "../model";
import { ProductService } from "../service";

@Injectable()
@JsonController("/widget")
export class WidgetController {
  constructor(@inject(ProductServiceToken) private readonly productService: ProductService) {}

  @Get("/")
  productsToShowinWidget() {
    return this.productService.productsToShowinWidget();
  }

  @Get("/export")
  async exportProductsToShow(@Res() response: Response) {
    const result = await this.productService.productsToShowinWidgetCsv();

    response.header("Content-Type", "text/csv");
    response.header("Content-Disposition", 'attachment; filename="export.csv"');

    return response.send(result);
  }

  @Post("/:id")
  async addProductToShow(@Param("id") id: ProductId) {
    await this.productService.addProductToShow(id);
    return true;
  }

  @Delete("/clear")
  clearProductsToShow() {
    this.productService.clearProductsToShow();
    return true;
  }

  @Delete("/:id/remove")
  removeProductFromShow(@Param("id") id: ProductId) {
    this.productService.removeProductFromShow(id);
    return true;
  }
}
