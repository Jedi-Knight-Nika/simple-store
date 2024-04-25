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

export interface Product {
  id: number;
  name: string;
  price: number;
  images: ProductImage[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductDetails {
  id: number;
  name: string;
  price: number;
  images: ProductImage[];
  createdAt: Date;
  updatedAt: Date;
  [key: string]: any;
}

export interface ProductDetailsResponse {
  id: number;
  name: string;
  price: number;
  created: Date | string;
  updated: Date | string;
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
