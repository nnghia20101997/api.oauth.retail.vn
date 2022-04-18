import {
  createParamDecorator,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from "class-validator";
import { ExceptionResponseDetail } from "../utils.exception.common/utils.exception.common";
import { HandleBase64 } from "../utils.handle-base64.common/utils.handle-base64.common";

export const RequestHeaderVerifyApiKey = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    console.log(data);
    const request = ctx.switchToHttp().getRequest();
    switch (data) {
      case "authorization":
        let verifyApiKey: string = HandleBase64.verifyApiKey(
          request.headers.authorization
        );
        if (!verifyApiKey) {
          throw new HttpException(
            new ExceptionResponseDetail(
              HttpStatus.FORBIDDEN,
              "Vui lòng truyền api_key!"
            ),
            HttpStatus.OK
          );
        } else {
          return verifyApiKey;
        }
      default:
        throw new HttpException(
          new ExceptionResponseDetail(HttpStatus.FORBIDDEN),
          HttpStatus.OK
        );
    }
  }
);

export function IsInt(validationOptions?: ValidationOptions) {
  return (object: unknown, propertyName: string) => {
    registerDecorator({
      name: "isInt",
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate: (value: any): boolean => !isNaN(value) || !value,
        defaultMessage: (validationArguments?: ValidationArguments): string => {
          throw new HttpException(
            new ExceptionResponseDetail(
              HttpStatus.BAD_REQUEST,
              `[${validationArguments.property}] phải là kiêu số nguyên!`
            ),
            HttpStatus.OK
          );
        },
      },
    });
  };
}
