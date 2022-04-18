import { IsString } from "class-validator";

export class VerifyCodeDTO {
  @IsString()
  phone: string = "";

  @IsString()
  verify_code: string = "";

  @IsString()
  password: string = "";
}
