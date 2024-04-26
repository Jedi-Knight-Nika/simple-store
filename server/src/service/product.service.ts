import { inject, Injectable } from "../configuration/container";

import {
  Product,
  ProductDetails,
  ProductDetailsResponse,
  ProductId,
  ProductImage,
  ProductImageDetails,
  ProductListItem,
  ProductListResponse,
  ProductServiceToken,
  SettingStorageToken,
} from "../model";
import BaseApiService from "./base-api.service";
import { Cacheable, CacheEvict } from "../util/cache.util";
import { SettingStorage } from "../storage";

@Injectable(ProductServiceToken)
export class ProductService extends BaseApiService {
  public ping(): string {
    return "pong!";
  }

  constructor(@inject(SettingStorageToken) private readonly settingStorage: SettingStorage) {
    super();

    this.transformToProduct = this.transformToProduct.bind(this);
    this.transformToProductDetails = this.transformToProductDetails.bind(this);
    this.mapImages = this.mapImages.bind(this);
  }

  @Cacheable("product_list")
  public async list(): Promise<Product[]> {
    const result = await this.get<ProductListResponse>("products");

    return result?.items?.map(this.transformToProduct) ?? [];
  }

  @Cacheable("product_details")
  public async details(id: ProductId): Promise<ProductDetails | null> {
    const result = await this.get<ProductDetailsResponse>(`products/${id}`);

    return result ? this.transformToProductDetails(result) : null;
  }

  @Cacheable("widget_products")
  public productsToShowinWidget(): Product[] {
    return this.settingStorage.getProductsToShow();
  }

  @CacheEvict("widget_products")
  public async addProductToShow(id: ProductId): Promise<void> {
    const product = await this.details(id);

    if (!product) return;

    const products = await this.productsToShowinWidget();

    if (!products.some((p) => p.id === id)) {
      this.settingStorage.addProductToShow(product);
    }
  }

  @CacheEvict("widget_products")
  public clearProductsToShow(): void {
    this.settingStorage.clearProductsToShow();
  }

  @CacheEvict("widget_products")
  public removeProductFromShow(id: ProductId): void {
    this.settingStorage.removeProductFromShow(id);
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
