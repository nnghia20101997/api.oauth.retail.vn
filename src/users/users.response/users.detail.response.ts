import { UtilsDate } from 'src/utils.common/utils.format-time.common/utils.format-time.common';
import { Users } from '../users.entity/users.entity';

export class UsersDetailResponse {
  id: number;

  first_name: string;

  last_name: string;

  full_name: string;

  gender: number;

  birthday: string;

  email: string;

  is_expire: number;

  avatar: string;

  ward_id: number;

  city_id: number;

  district_id: number;

  fb_uid: string;

  gg_uid: string;

  apple_uid: string;

  phone: string;

  auth_type: number;

  verify_code: string;

  verify_fail_count: number;

  is_verified: number;

  refesh_token: string;

  last_activity_at: string;

  last_login_at: string;

  is_verify_code_at: string;

  updated_at: string;

  created_at: string;

  constructor(users: Users) {
    this.id = users ? +users.id : 0;
    this.first_name = users ? users.first_name : '';
    this.last_name = users ? users.last_name : '';
    this.full_name = users ? users.full_name : '';
    this.gender = users ? +users.gender : 0;
    this.birthday = users
      ? UtilsDate.formatDateTimeVNToString(users.birthday)
      : '';

    this.email = users ? users.email : '';

    this.is_expire = users ? users.is_expire : 0;

    this.avatar = users ? users.avatar : '';

    this.ward_id = users ? +users.ward_id : 0;

    this.city_id = users ? +users.city_id : 0;

    this.district_id = users ? +users.district_id : 0;

    this.fb_uid = users ? users.fb_uid : '';

    this.gg_uid = users ? users.gg_uid : '';

    this.apple_uid = users ? users.apple_uid : '';

    this.phone = users ? users.phone : '';

    this.auth_type = users ? +users.auth_type : 0;

    this.verify_code = users ? users.verify_code : '';

    this.verify_fail_count = users ? +users.verify_fail_count : 0;

    this.is_verified = users ? +users.is_verified : 0;

    this.refesh_token = users ? users.refesh_token : '';

    this.last_activity_at = users
      ? UtilsDate.formatDateTimeVNToString(users.last_activity_at)
      : '';

    this.last_login_at = users
      ? UtilsDate.formatDateTimeVNToString(users.last_login_at)
      : '';

    this.is_verify_code_at = users
      ? UtilsDate.formatDateTimeVNToString(users.is_verify_code_at)
      : '';

    this.updated_at = users
      ? UtilsDate.formatDateTimeVNToString(users.updated_at)
      : '';

    this.created_at = users
      ? UtilsDate.formatDateTimeVNToString(users.created_at)
      : '';
  }

  public mapToList(data: Users[]): Promise<Users[]> {
    let response: UsersDetailResponse[] = [];
    data.forEach((user) => {
      response.push(new UsersDetailResponse(user));
    });
    return;
  }
}
