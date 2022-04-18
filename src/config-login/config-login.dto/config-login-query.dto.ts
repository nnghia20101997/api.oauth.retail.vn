import { IsString } from "class-validator";

export class ConfigLoginQueryDTO {
  @IsString()
  secret_key: string = "";
}
