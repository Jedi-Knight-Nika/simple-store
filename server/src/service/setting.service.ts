import { inject, Injectable } from "../configuration/container";

import { SettingServiceToken, SettingStorageToken } from "../model";
import { SettingStorage } from "../storage";

@Injectable(SettingServiceToken)
export class SettingService {
  constructor(@inject(SettingStorageToken) private readonly settingStorage: SettingStorage) {}

  public getWidgetEnabled(): boolean {
    return this.settingStorage.getWidgetEnabled();
  }

  public setWidgetEnabled(enabled: boolean): void {
    this.settingStorage.setWidgetEnabled(enabled);
  }
}
