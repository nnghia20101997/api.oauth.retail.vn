import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { BaseResponseData } from 'src/utils.common/utils.response.common/utils.base.response.common';

import { UsersLoginDTO } from './users.dto/users.login.dto';
import { UsersRegisterDTO } from './users.dto/users.register.dto';
import { Users } from './users.entity/users.entity';
import { UsersDetailResponse } from './users.response/users.detail.response';
import { UsersService } from './users.service';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/register')
  async register(
    @Body(new ValidationPipe()) usersRegisterDTO: UsersRegisterDTO,
    @Res() res: Response,
  ): Promise<any> {
    let response: BaseResponseData = new BaseResponseData();

    let user: Users = await this.usersService.register(usersRegisterDTO);

    response.setData(new UsersDetailResponse(user));

    return res.status(HttpStatus.OK).send(response);
  }

  @Post('/login')
  async login(
    @Body(new ValidationPipe()) usersLoginDTO: UsersLoginDTO,
    @Res() res: Response,
  ): Promise<any> {
    let response: BaseResponseData = new BaseResponseData();

    let access_token: Object = await this.usersService.login(usersLoginDTO);

    response.setData(access_token);

    return res.status(HttpStatus.OK).send(response);
  }
}
