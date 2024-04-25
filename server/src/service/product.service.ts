import { Injectable } from "../configuration/container";
import {
  Product,
  ProductDetails,
  ProductDetailsResponse,
  ProductImage,
  ProductImageDetails,
  ProductListItem,
  ProductListResponse,
  ProductServiceToken,
} from "../model";
import BaseApiService from "./base-api.service";

@Injectable(ProductServiceToken)
export class ProductService extends BaseApiService {
  public ping(): string {
    return "pong!";
  }

  constructor() {
    super();

    this.transformToProduct = this.transformToProduct.bind(this);
    this.transformToProductDetails = this.transformToProductDetails.bind(this);
    this.mapImages = this.mapImages.bind(this);
  }

  public async list(): Promise<Product[]> {
    const result = await this.get<ProductListResponse>("products");

    return result?.items?.map(this.transformToProduct) ?? [];
  }

  public async details(id: number): Promise<ProductDetails | null> {
    const result = await this.get<ProductDetailsResponse>(`products/${id}`);

    return result ? this.transformToProductDetails(result) : null;
  }

  private transformToProduct(item: ProductListItem): Product {
    return {
      id: item.id,
      name: item.name,
      price: item.price,
      images: this.mapImages(item.media.images),
      createdAt: new Date(item.created),
      updatedAt: new Date(item.updated),
    };
  }

  private transformToProductDetails(details: ProductDetailsResponse): ProductDetails {
    return {
      id: details.id,
      name: details.name,
      price: details.price,
      images: this?.mapImages(details.media?.images),
      inStock: details.inStock,
      weight: details.weight,
      createdAt: new Date(details.created),
      updatedAt: new Date(details.updated),
    };
  }

  private mapImages(images?: ProductImageDetails[]): ProductImage[] {
    return (
      images?.map(({ id, isMain, imageOriginalUrl }) => ({
        id,
        isMain,
        url: imageOriginalUrl,
      })) ?? []
    );
  }
}
