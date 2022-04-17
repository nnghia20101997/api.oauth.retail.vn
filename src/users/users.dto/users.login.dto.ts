import { IsNotEmpty, IsString } from 'class-validator';

export class UsersLoginDTO {
  @IsString()
  phone: string = '';

  @IsString()
  password: string = '';
}
