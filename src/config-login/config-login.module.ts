import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { jwtConstants } from "src/auth/constants";
import { ConfigLoginController } from "./config-login.controller";
import { ConfigLogin } from "./config-login.entity/config-login.entity";
import { ConfigLoginService } from "./config-login.service";

@Module({
  imports: [TypeOrmModule.forFeature([ConfigLogin])],
  providers: [ConfigLoginService],
  exports: [ConfigLoginService],
  controllers: [ConfigLoginController],
})
export class ConfigLoginModule {}
