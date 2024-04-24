import { Injectable } from "../configuration/container";
import {
  Product,
  ProductDetails,
  ProductHttpResponse,
  ProductImage,
  ProductImageDetails,
  ProductServiceToken,
} from "../model";
import { BaseApiService } from "./base-api.service";

@Injectable(ProductServiceToken)
export class ProductService extends BaseApiService {
  public ping(): string {
    return "pong!";
  }

  public async list(): Promise<Product[]> {
    const result = await this.get<ProductHttpResponse>("products");

    const items = result?.items;

    if (items.length === 0) {
      return [];
    }

    return items.map<Product>(
      (item: ProductDetails): Product => ({
        id: item.id,
        name: item.name,
        price: item.price,
        images: (item.media?.images as ProductImageDetails[])?.map<ProductImage>((image) => ({
          id: image.id,
          isMain: image.isMain,
          url: image.imageOriginalUrl,
        })),
      }),
    );
  }

  public async details(): Promise<ProductDetails | null> {
    return null;
  }
}
