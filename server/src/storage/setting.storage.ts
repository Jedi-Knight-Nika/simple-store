import { Injectable, Scope } from "../configuration/container";
import { SettingStorageToken } from "../model";

@Injectable(SettingStorageToken, Scope.Singleton)
export class SettingStorage {
    #widgetEnabled: boolean = true;

    #productsIdsToShow: number[] = [];

    public getWidgetEnabled(): boolean {
        return this.#widgetEnabled;
    }

    public setWidgetEnabled(value: boolean): void {
        this.#widgetEnabled = value;
    }

    public getProductsIdsToShow(): Array<number> {
        return this.#productsIdsToShow;
    }

    public addProductIdToShow(id: number): void {
        this.#productsIdsToShow.push(id);
    }
}