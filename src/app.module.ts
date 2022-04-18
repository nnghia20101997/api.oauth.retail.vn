import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { ConfigModule } from "@nestjs/config";
import { ConfigLoginController } from "./config-login/config-login.controller";
import { ConfigLoginService } from "./config-login/config-login.service";
import { ConfigLoginModule } from "./config-login/config-login.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: ["dist/**/*.entity{.ts,.js}"],
      multipleStatements: true,
      dateStrings: true,
    }),
    AuthModule,
    UsersModule,
    ConfigLoginModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
