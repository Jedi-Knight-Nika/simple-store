import { inject, Injectable } from "../configuration/container";

import {
  Product,
  ProductBase,
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
import { Cacheable, CacheName, formatDate, generateCsv } from "../util";
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

  // Products methods

  @Cacheable(CacheName.PRODUCT_LIST)
  public async list(): Promise<Product[]> {
    const result = await this.get<ProductListResponse>("products");

    return result?.items?.map((item) => this.transformToProduct(item)) ?? [];
  }

  @Cacheable(CacheName.PRODUCT_DETAILS)
  public async details(id: ProductId): Promise<ProductDetails | null> {
    const result = await this.get<ProductDetailsResponse>(`products/${id}`);

    return result ? this.transformToProductDetails(result) : null;
  }

  public async productsToShowinWidgetCsv(): Promise<string | null> {
    const result = this.productsToShowinWidget();

    const products = result.map<ProductBase>((item) => ({
      id: item.id,
      name: item.name,
      price: `$${item.price}`,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    }));

    return await generateCsv(products);
  }

  // Wdiget producsts methods

  public productsToShowinWidget(): Product[] {
    return this.settingStorage.getProductsToShow();
  }

  public async addProductToShow(id: ProductId): Promise<Product | null> {
    const product = await this.details(id);

    if (!product) return null;

    const products = this.productsToShowinWidget();
    console.log(products, "____");

    if (!products.some((p) => p.id === id)) {
      this.settingStorage.addProductToShow(product);
    }

    return product;
  }

  public clearProductsToShow(): void {
    this.settingStorage.clearProductsToShow();
  }

  public removeProductFromShow(id: ProductId): void {
    this.settingStorage.removeProductFromShow(id);
  }

  // Helpers

  private transformToProduct(item: ProductListItem): Product {
    return {
      id: item.id,
      name: item.name,
      price: item.price,
      description: item.description,
      images: this.mapImages(item.media.images),
      createdAt: formatDate(item.created),
      updatedAt: formatDate(item.updated),
    };
  }

  private transformToProductDetails(details: ProductDetailsResponse): ProductDetails {
    return {
      id: details.id,
      name: details.name,
      price: details.price,
      description: details.description,
      images: this.mapImages(details.media?.images),
      inStock: details.inStock as boolean,
      weight: details.weight,
      createdAt: formatDate(details.created),
      updatedAt: formatDate(details.updated),
    };
  }

  private mapImages(images?: ProductImageDetails[]): ProductImage[] {
    return (
      images?.map(({ id, isMain, imageOriginalUrl }: ProductImageDetails) => ({
        id,
        isMain,
        url: imageOriginalUrl as string,
      })) ?? []
    );
  }
}
