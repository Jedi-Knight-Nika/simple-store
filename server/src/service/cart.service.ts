import { inject, Injectable } from "../configuration/container";

import {
  Cart,
  CartItem,
  CartItemAddDto,
  CartItemId,
  CartServiceToken,
  CartStorageToken,
  ProductDetailsResponse,
} from "../model";
import BaseApiService from "./base-api.service";
import { CartStorage } from "../storage";
import { Cacheable, CacheName, convertToNumber, formatDate } from "../util";

@Injectable(CartServiceToken)
export class CartService extends BaseApiService {
  constructor(@inject(CartStorageToken) private readonly cartStorage: CartStorage) {
    super();
  }

  public list(): Cart {
    const cartItems = this.cartStorage.list();

    return {
      total: cartItems.reduce((total, item) => total + convertToNumber(item.price) * item.quantity, 0),
      items: cartItems,
    };
  }

  public details(id: CartItemId): CartItem | undefined {
    return this.cartStorage.getById(id);
  }

  public async add(cartItem: CartItemAddDto): Promise<void> {
    const product = await this.getProductDetails(cartItem.productId);

    if (!product) return;

    const cartItemToAdd = {
      id: this.cartStorage.getLastItemId() + 1,
      productId: product.id,
      quantity: cartItem.quantity,
      price: product.price,
      description: product.description,
      addedAt: formatDate(new Date()),
    };

    this.cartStorage.add(cartItemToAdd);
  }

  public remove(id: CartItemId): void {
    this.cartStorage.remove(id);
  }

  public clear(): void {
    this.cartStorage.clear();
  }

  @Cacheable(CacheName.PRODUCT_DETAILS)
  private async getProductDetails(productId: number): Promise<ProductDetailsResponse | null> {
    const result = await this.get<ProductDetailsResponse>(`products/${productId}`);

    return result ?? null;
  }
}
