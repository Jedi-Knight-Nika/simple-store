export const ProductServiceToken = Symbol("ProductService");

export type ProductId = number;

export interface ProductImage {
  id: number;
  isMain: boolean;
  url: string;
}

export interface ProductImageDetails extends ProductImage {
  [key: string]: unknown;
}

export interface MediaFiles {
  images: ProductImageDetails[];
  [key: string]: unknown;
}

export interface ProductBase {
  id: number;
  name: string;
  price: number | string;
}

export interface Product extends ProductBase {
  images: ProductImage[];
  description: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface ProductDetails extends ProductBase {
  images: ProductImage[];
  description: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  [key: string]: unknown;
}

export interface ProductDetailsResponse extends ProductBase {
  media: MediaFiles;
  description: string;
  created: string;
  updated: string;
  [key: string]: unknown;
}

export interface ProductListItem extends ProductDetailsResponse {}

export interface ProductListResponse {
  total: number;
  count: number;
  offset: number;
  limit: number;
  items: ProductListItem[];
}
