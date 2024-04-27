import { Body, Delete, Get, JsonController, Param, Post } from "routing-controllers";
import { inject, Injectable } from "../configuration/container";

import { CartItemAddDto, CartItemId, CartServiceToken } from "../model";
import { CartService } from "../service";

@Injectable()
@JsonController("/carts")
export class CartController {
  constructor(@inject(CartServiceToken) private readonly cartService: CartService) {}

  @Get()
  public list() {
    return this.cartService.list();
  }

  @Get("/:id")
  public details(@Param("id") id: CartItemId) {
    return this.cartService.details(id);
  }

  @Post()
  public async add(@Body() cartItem: CartItemAddDto) {
    return await this.cartService.add(cartItem);
  }

  @Delete()
  public clear() {
    return this.cartService.clear();
  }

  @Delete("/:id")
  public remove(@Param("id") id: CartItemId) {
    return this.cartService.remove(id);
  }
}
