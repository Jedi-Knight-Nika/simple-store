import { Injectable, Scope } from "../configuration/container";

import { Product, SettingStorageToken } from "../model";

@Injectable(SettingStorageToken, Scope.Singleton)
export class SettingStorage {
  #widgetEnabled: boolean = true;

  #productsToShow: Product[] = [];

  // widget settings

  public getWidgetEnabled(): boolean {
    return this.#widgetEnabled;
  }

  public setWidgetEnabled(value: boolean): void {
    this.#widgetEnabled = value;
  }

  // products in widget settings

  public getProductsToShow(): Product[] {
    return this.#productsToShow;
  }

  public addProductToShow(product: Product): void {
    this.#productsToShow.push(product);
  }

  public clearProductsToShow(): void {
    this.#productsToShow = [];
  }

  public removeProductFromShow(id: number): void {
    this.#productsToShow = this.#productsToShow.filter((p) => p.id !== id);
  }
}
