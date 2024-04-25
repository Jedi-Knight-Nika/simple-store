import { Injectable, Scope } from "../configuration/container";
import { SettingStorageToken } from "../model";

@Injectable(SettingStorageToken, Scope.Singleton)
export class SettingStorage {
    #widgetEnabled: boolean = true;

    #productsIdsToShow: number[] = [];

    getWidgetEnabled(): boolean {
        return this.#widgetEnabled;
    }

    setWidgetEnabled(value: boolean): void {
        this.#widgetEnabled = value;
    }

    getProductsIdsToShow(): Array<number> {
        return this.#productsIdsToShow;
    }

    addProductIdToShow(id: number): void {
        this.#productsIdsToShow.push(id);
    }
}