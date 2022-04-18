import { IsInt } from "src/utils.common/utils.decorator.common/utils.decorator.common";

export class UsersParamsDTO {
  @IsInt()
  readonly id: number = 0;
}
