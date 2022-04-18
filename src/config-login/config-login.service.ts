import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ExceptionResponseDetail } from "src/utils.common/utils.exception.common/utils.exception.common";
import { HandleBase64 } from "src/utils.common/utils.handle-base64.common/utils.handle-base64.common";
import { Repository } from "typeorm";
import { ConfigLoginQueryDTO } from "./config-login.dto/config-login-query.dto";
import { ConfigLogin } from "./config-login.entity/config-login.entity";

@Injectable()
export class ConfigLoginService {
  private info_config = {
    api_key: "login.resale.traditional",
    project_name: "project.resaletraditional.key",
    domain_order: "https://localhost:1234",
    domain_category: "https://localhost:5678",
  };

  constructor(
    @InjectRepository(ConfigLogin)
    private configLogin: Repository<ConfigLogin>
  ) {}

  async verifyApiKeyGetConfig(
    configLoginQueryDTO: ConfigLoginQueryDTO
  ): Promise<ConfigLogin> {
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

    let infoConfigLogin: ConfigLogin = await this.configLogin.findOne({
      api_key: projectId,
    });

    if (!infoConfigLogin) {
      throw new HttpException(
        new ExceptionResponseDetail(
          HttpStatus.BAD_REQUEST,
          "Project not found"
        ),
        HttpStatus.OK
      );
    }

    let response: ConfigLogin = new ConfigLogin(infoConfigLogin);

    // this.info_config.api_key = HandleBase64.generateApiKey(
    //   this.info_config.api_key
    // );

    return response;
  }
}
