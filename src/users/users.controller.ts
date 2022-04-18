import {
  Body,
  Controller,
  Get,
  Request,
  HttpStatus,
  Param,
  Post,
  Res,
  UseGuards,
  ValidationPipe,
} from "@nestjs/common";
import { BaseResponseData } from "src/utils.common/utils.response.common/utils.base.response.common";

import { UsersLoginDTO } from "./users.dto/users.login.dto";
import { UsersRegisterDTO } from "./users.dto/users.register.dto";
import { Users } from "./users.entity/users.entity";
import { UsersDetailResponse } from "./users.response/users.detail.response";
import { UsersService } from "./users.service";
import { Response } from "express";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { UsersParamsDTO } from "./users.dto/users.params.dto";
import { VerifyCodeDTO } from "./users.dto/user.verify.dto";

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post("/register")
  async register(
    @Body(new ValidationPipe()) usersRegisterDTO: UsersRegisterDTO,
    @Res() res: Response
  ): Promise<any> {
    let response: BaseResponseData = new BaseResponseData();

    let user: Users = await this.usersService.register(usersRegisterDTO);

    response.setData(new UsersDetailResponse(user));

    return res.status(HttpStatus.OK).send(response);
  }

  @Post("/login")
  async login(
    @Body(new ValidationPipe()) usersLoginDTO: UsersLoginDTO,
    @Res() res: Response
  ): Promise<any> {
    let response: BaseResponseData = new BaseResponseData();

    let access_token: Object = await this.usersService.login(usersLoginDTO);

    response.setData(access_token);

    return res.status(HttpStatus.OK).send(response);
  }

  @Get("/detail/:id")
  @UseGuards(JwtAuthGuard)
  async getDetail(
    @Param(new ValidationPipe()) usersParamsDTO: UsersParamsDTO,
    @Res() res: Response,
    @Request() req
  ): Promise<any> {
    return res
      .status(200)
      .send({ status: 200, message: "mesage", data: req.user });
  }

  @Post("/verify-code")
  async verifyCode(
    @Body(new ValidationPipe()) verifyCodeDTO: VerifyCodeDTO,
    @Res() res: Response,
    @Request() req
  ): Promise<any> {
    let response: BaseResponseData = new BaseResponseData();
    await this.usersService.verifyCode(verifyCodeDTO);
    return res.status(HttpStatus.OK).send(response);
  }
}
