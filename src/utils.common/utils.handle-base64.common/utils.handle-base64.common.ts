import {
  BadRequestException,
  HttpCode,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { ExceptionResponseDetail } from "../utils.exception.common/utils.exception.common";

export class HandleBase64 {
  private api_key: string;
  private password: string;

  constructor(api_key?: string, password?: string) {
    this.api_key = api_key;
    this.password = password;
  }

  static generateApiKey(api_key: string): string {
    if (!api_key) {
      throw new HttpException(
        new ExceptionResponseDetail(
          HttpStatus.FORBIDDEN,
          "api_key không hợp lệ!"
        ),
        HttpStatus.OK
      );
    } else {
      let buff = Buffer.from(api_key);
      let base64data = buff.toString("base64");
      return base64data + "&sd";
    }
  }

  static verifyApiKeyGetConfig(secret_key: string): string {
    let buff = Buffer.from(secret_key, "base64");
    let text = buff.toString("ascii");
    let slitProjectId = text.split("$");
    let response = slitProjectId[0].split("&");
    return response[0];
  }

  static verifyApiKey(api_key: string): string {
    if (!api_key) {
      throw new HttpException(
        new ExceptionResponseDetail(
          HttpStatus.FORBIDDEN,
          "api_key không hợp lệ!"
        ),
        HttpStatus.OK
      );
    } else {
      let splitAPIKey = api_key.split(" ");
      if (splitAPIKey[0] !== "Basic") {
        throw new HttpException(
          new ExceptionResponseDetail(
            HttpStatus.FORBIDDEN,
            "api_key không hợp lệ!"
          ),
          HttpStatus.OK
        );
      } else {
        let response = splitAPIKey[1].split("&sd");
        let buff = Buffer.from(response[0], "base64");
        let text = buff.toString("ascii");
        return text;
      }
    }
  }

  static splitRefeshToken(api_key: string): string {
    let splitAPIKey = api_key.split(" ");
    return splitAPIKey[0];
  }

  /**
   *
   * @param password password đưuọc truyền dưới dạng base64
   * @returns
   */
  static async decodePasswordBase64(password: string): Promise<string> {
    if (!password) {
      throw new HttpException(
        new ExceptionResponseDetail(
          HttpStatus.BAD_REQUEST,
          "password không được rỗng!"
        ),
        HttpStatus.OK
      );
    } else {
      let buff = Buffer.from(password, "base64");
      let text: string = buff.toString("ascii");
      return text;
    }
  }

  /**
   *
   * @param api_key client sẽ gửi đoạn mã base64 sau đó API sẽ decode lại thành chuỗi bình thường
   * @returns
   */

  static decodeSecretKey(api_key: string): string {
    if (!api_key) {
      throw new HttpException(
        new ExceptionResponseDetail(
          HttpStatus.BAD_REQUEST,
          "api_key không hợp lệ!"
        ),
        HttpStatus.OK
      );
    } else {
      let buff = Buffer.from(api_key, "base64");
      let text = buff.toString("ascii");
      return text;
    }
  }

  public getApi_key(): string {
    return this.api_key;
  }

  public setApi_key(api_key: string): void {
    this.api_key = api_key;
  }

  public getPassword(): string {
    return this.password;
  }

  public setPassword(password: string): void {
    this.password = password;
  }
}
