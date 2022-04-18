import { Password } from "src/utils.common/utils.password.common/utils.password.common";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { UsersRegisterDTO } from "../users.dto/users.register.dto";

@Entity({
  name: "users",
})
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: "" })
  first_name: string;

  @Column({ default: "" })
  last_name: string;

  @Column({ default: "" })
  full_name: string;

  @Column({ default: 0 })
  gender: number;

  @Column({ type: "date" })
  birthday: Date;

  @Column({ default: "" })
  email: string;

  @Column({ default: 0 })
  is_expire: number;

  @Column({ default: "" })
  avatar: string;

  @Column({ default: 0 })
  ward_id: number;

  @Column({ default: 0 })
  city_id: number;

  @Column({ default: 0 })
  district_id: number;

  @Column({ default: "" })
  fb_uid: string;

  @Column({ default: "" })
  gg_uid: string;

  @Column({ default: "" })
  apple_uid: string;

  @Column({ default: "" })
  phone: string;

  @Column({ default: "" })
  password: string;

  @Column({ default: 0 })
  auth_type: number;

  @Column({ default: "" })
  verify_code: string;

  @Column({ default: 0 })
  verify_fail_count: number;

  @Column({ default: 0 })
  is_verified: number;

  @Column({ default: "" })
  access_token: string;

  @Column({ default: "" })
  refesh_token: string;

  @Column({ type: "date" })
  last_activity_at: Date;

  @Column({ type: "date" })
  last_login_at: Date;

  @Column({ type: "date" })
  is_verify_code_at: Date;

  @CreateDateColumn()
  updated_at: Date;

  @UpdateDateColumn()
  created_at: Date;

  constructor(usersRegisterDTO: UsersRegisterDTO) {
    super();
    this.password = usersRegisterDTO ? usersRegisterDTO.password : "";
    this.first_name = usersRegisterDTO ? usersRegisterDTO.first_name : "";
    this.last_name = usersRegisterDTO ? usersRegisterDTO.last_name : "";
    this.gender = usersRegisterDTO ? +usersRegisterDTO.gender : 0;
    this.phone = usersRegisterDTO ? usersRegisterDTO.phone : "";
    this.verify_code = usersRegisterDTO
      ? String(Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000)
      : "";
  }

  public async setPassword(password: string) {
    this.password = await Password.bcryptPassword(password);
  }
}
