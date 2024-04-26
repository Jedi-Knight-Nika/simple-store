export const ProductServiceToken = Symbol("ProductService");

export type ProductId = number;

export interface ProductImage {
  id: number;
  isMain: boolean;
  url: string;
}

export interface ProductImageDetails extends ProductImage {
  [key: string]: any;
}

export interface ProductBase {
  id: number;
  name: string;
  price: number | string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface Product extends ProductBase {
  images: ProductImage[];
}

export interface ProductDetails extends ProductBase {
  images: ProductImage[];
  [key: string]: any;
}

export interface ProductDetailsResponse extends ProductBase {
  [key: string]: any;
}

export interface ProductListItem extends ProductDetailsResponse {}

export interface ProductListResponse {
  total: number;
  count: number;
  offset: number;
  limit: number;
  items: ProductListItem[];
}
