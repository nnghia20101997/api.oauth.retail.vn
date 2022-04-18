import { Controller, Get, Query, Res } from "@nestjs/common";
import { Response } from "express";
import { BaseResponseData } from "src/utils.common/utils.response.common/utils.base.response.common";
import { ConfigLoginQueryDTO } from "./config-login.dto/config-login-query.dto";
import { ConfigLoginService } from "./config-login.service";

@Controller("config-login")
export class ConfigLoginController {
  constructor(private configLoginService: ConfigLoginService) {}

  @Get()
  async getConfig(
    @Query() configLoginQueryDTO: ConfigLoginQueryDTO,
    @Res() res: Response
  ) {
    let response: BaseResponseData = new BaseResponseData();
    let infoConfig: Object =
      await this.configLoginService.verifyApiKeyGetConfig(configLoginQueryDTO);

    // note waring: created config response
    response.setData(infoConfig);
    return res.status(200).send(response);
  }
}
