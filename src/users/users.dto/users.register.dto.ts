import { IsDate, IsInt, IsString } from 'class-validator';

export class UsersRegisterDTO {
  @IsString()
  first_name: string = '';

  @IsString()
  last_name: string = '';

  @IsString()
  full_name: string = '';

  @IsInt()
  gender: number = 0;

  @IsDate()
  birthday: Date = new Date();

  @IsString()
  email: string = '';

  @IsInt()
  is_expire: number = 0;

  @IsString()
  avatar: string = '';

  @IsInt()
  ward_id: number = 0;

  @IsInt()
  city_id: number = 0;

  @IsInt()
  district_id: number = 0;

  @IsString()
  fb_uid: string = '';

  @IsString()
  gg_uid: string = '';

  @IsString()
  apple_uid: string = '';

  @IsString()
  phone: string = '';

  @IsString()
  password: string = '';

  @IsInt()
  auth_type: number = 0;

  @IsString()
  verify_code: string = '';

  @IsInt()
  verify_fail_count: number = 0;

  @IsInt()
  is_verified: number = 0;

  @IsString()
  access_token: string = '';

  @IsString()
  refesh_token: string = '';

  @IsDate()
  last_activity_at: Date = new Date();

  @IsDate()
  last_login_at: Date = new Date();

  @IsDate()
  is_verify_code_at: Date = new Date();
}
