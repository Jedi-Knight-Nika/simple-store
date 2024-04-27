import { Injectable } from "../configuration/container";

import { CartItem, CartItemId, CartStorageToken } from "../model";

@Injectable(CartStorageToken)
export class CartStorage {
  #cartItems: CartItem[] = [];

  public list(): CartItem[] {
    return this.#cartItems;
  }

  public getById(id: CartItemId): CartItem | undefined {
    return this.#cartItems.find((item) => item.productId === id);
  }

  public getLastItemId(): CartItemId {
    return this.#cartItems.length ? this.#cartItems[this.#cartItems.length - 1].id : 0;
  }

  public add(cartItem: CartItem): void {
    this.#cartItems.push(cartItem);
  }

  public remove(id: CartItemId): void {
    this.#cartItems = this.#cartItems.filter((item) => item.id !== id);
  }

  public clear(): void {
    this.#cartItems = [];
  }
}
