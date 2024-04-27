export const CartServiceToken = Symbol("CartService");

export type CartId = string;
export type cartItemId = number;

type Price = string | number;

export interface CartItemBase {
  id: cartItemId;
  productId: number;
  quantity: number;
  price: Price;
  shortDescription: string;
}

export interface CartItem extends CartItemBase {
  createdAt: string;
  upodatedAt: string;
  images: string[];
}

export interface CartItemDetailsResponse extends CartItem {
  [key: string]: unknown;
}

export interface CartBase {
  id: CartId;
  total: Price;
  items: CartItem[];
  paymentMethod: string;
}

export interface Cart extends CartBase {
  createdAt: string;
  upodatedAt: string;
}

export interface CartDetailsResponse extends CartBase {
  createDate: string | Date;
  updateDate: string | Date;
  items: CartItemDetailsResponse[];
  [key: string]: unknown;
}

export interface CartListResponse {
  total: number;
  count: number;
  offset: number;
  limit: number;
  items: CartDetailsResponse[];
}
