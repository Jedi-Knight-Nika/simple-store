import { Injectable } from "../configuration/container";
import { Product, ProductDetails, ProductHttpResponse, ProductImageDetails, ProductServiceToken } from "../model";
import BaseApiService from "./base-api.service";

@Injectable(ProductServiceToken)
export class ProductService extends BaseApiService {
  public ping(): string {
    return "pong!";
  }

  public async list(): Promise<Product[]> {
    const result = await this.get<ProductHttpResponse>("products");

    const items = result?.items ?? [];

    return items.map(
      (item: ProductDetails): Product => ({
        id: item.id,
        name: item.name,
        price: item.price,
        images:
          item.media?.images?.map((image: ProductImageDetails) => ({
            id: image.id,
            isMain: image.isMain,
            url: image.imageOriginalUrl,
          })) ?? [],
      }),
    );
  }

  public async details(): Promise<ProductDetails | null> {
    return null;
  }
}
