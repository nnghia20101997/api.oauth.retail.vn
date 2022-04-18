import { HttpException, HttpStatus } from "@nestjs/common";
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from "class-validator";
import { ExceptionResponseDetail } from "../utils.exception.common/utils.exception.common";

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
