export const ProductServiceToken = Symbol("ProductService");

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
}

export interface ProductDetails {
  id: number;
  name: string;
  price: number;
  [key: string]: any;
}

export interface ProductHttpResponse {
  total: number;
  count: number;
  offset: number;
  limit: number;
  items: ProductDetails[];
}
