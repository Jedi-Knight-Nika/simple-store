import { Get, JsonController, Param, Put } from "routing-controllers";
import { inject, Injectable } from "../configuration/container";

import { SettingServiceToken } from "../model";
import { SettingService } from "../service";

@Injectable()
@JsonController("/settings")
export class SettingController {
  constructor(@inject(SettingServiceToken) private readonly settingService: SettingService) {}

  @Get("/widget-enabled")
  public getWidgetEnabled() {
    return this.settingService.getWidgetEnabled();
  }

  @Put("/widget-enabled/:enabled")
  public setWidgetEnabled(@Param("enabled") enabled: boolean) {
    this.settingService.setWidgetEnabled(enabled);

    return enabled;
  }
}
