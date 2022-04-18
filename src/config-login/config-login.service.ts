import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ExceptionResponseDetail } from "src/utils.common/utils.exception.common/utils.exception.common";
import { HandleBase64 } from "src/utils.common/utils.handle-base64.common/utils.handle-base64.common";
import { ConfigLoginQueryDTO } from "./config-login.dto/config-login-query.dto";

@Injectable()
export class ConfigLoginService {
  private info_config = {
    api_key: "login.resale.traditional",
    project_name: "project.resaletraditional.key",
    domain_order: "https://localhost:1234",
    domain_category: "https://localhost:5678",
  };

  constructor() {}

  async verifyApiKeyGetConfig(
    configLoginQueryDTO: ConfigLoginQueryDTO
  ): Promise<Object> {
    let projectId: string = HandleBase64.verifyApiKeyGetConfig(
      configLoginQueryDTO.secret_key
    );

    if (!projectId) {
      throw new HttpException(
        new ExceptionResponseDetail(
          HttpStatus.BAD_REQUEST,
          "data invalid, cannot get info config"
        ),
        HttpStatus.OK
      );
    }

    if (this.info_config.project_name !== projectId) {
      throw new HttpException(
        new ExceptionResponseDetail(
          HttpStatus.BAD_REQUEST,
          "Project not found"
        ),
        HttpStatus.OK
      );
    }

    this.info_config.api_key = HandleBase64.generateApiKey(
      this.info_config.api_key
    );

    return this.info_config;
  }
}
