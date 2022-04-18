import { HandleBase64 } from "src/utils.common/utils.handle-base64.common/utils.handle-base64.common";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
@Entity({
  name: "config_logins",
})
export class ConfigLogin extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: "" })
  secret_key: string;

  @Column({ default: "" })
  api_key: string;

  @Column({ default: "" })
  oauth_domain: string;

  @Column({ default: "" })
  material_domain: string;

  @Column({ default: "" })
  warehouse_domain: string;

  @Column({ default: "" })
  order_domain: string;

  @Column({ default: "" })
  report_domain: string;

  @Column({ default: "" })
  api_upload: string;

  @CreateDateColumn()
  updated_at: Date;

  @UpdateDateColumn()
  created_at: Date;

  constructor(configLogin: ConfigLogin) {
    super();
    this.secret_key = configLogin ? configLogin.secret_key : "";
    this.api_key = configLogin
      ? HandleBase64.generateApiKey(configLogin.api_key)
      : "";
    this.oauth_domain = configLogin ? configLogin.oauth_domain : "";
    this.material_domain = configLogin ? configLogin.material_domain : "";
    this.warehouse_domain = configLogin ? configLogin.warehouse_domain : "";
    this.order_domain = configLogin ? configLogin.order_domain : "";
    this.report_domain = configLogin ? configLogin.report_domain : "";
    this.api_upload = configLogin ? configLogin.api_upload : "";
  }
}
