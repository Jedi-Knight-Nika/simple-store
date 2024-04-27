import { IsInt, Min } from "class-validator";

import { Product, ProductId } from "./product.model";

export const CartServiceToken = Symbol("CartService");
export const CartStorageToken = Symbol("CartStorage");

type Price = string | number;
export type CartItemId = number;

export interface CartItem {
  id: CartItemId;
  productId: ProductId;
  quantity: number;
  price: Price;
  description: string;
  product?: Product;
  addedAt: string;
}

export interface Cart {
  total: Price;
  items: CartItem[];
  itemsCount?: number;
}

export class CartItemAddDto {
  @IsInt()
  public productId!: ProductId;

  @IsInt()
  @Min(1)
  public quantity!: number;
}
