import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { ExceptionResponseDetail } from 'src/utils.common/utils.exception.common/utils.exception.common';
import { Password } from 'src/utils.common/utils.password.common/utils.password.common';
import { Repository } from 'typeorm';
import { UsersLoginDTO } from './users.dto/users.login.dto';
import { UsersRegisterDTO } from './users.dto/users.register.dto';
import { Users } from './users.entity/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private users: Repository<Users>,
    private jwtService: JwtService,
  ) {}

  async register(usersRegisterDTO: UsersRegisterDTO): Promise<Users> {
    usersRegisterDTO.password = await Password.bcryptPassword(
      usersRegisterDTO.password,
    );

    const payload = {
      username: usersRegisterDTO.phone,
    };

    usersRegisterDTO.access_token = await this.jwtService.sign(payload);

    const user: Users = await this.users.create(usersRegisterDTO);

    await this.users.save(user);
    return user;
  }

  async login(usersLoginDTO: UsersLoginDTO): Promise<any> {
    let user: Users = await this.users.findOne({
      phone: usersLoginDTO.phone,
    });

    if (user) {
      // compare password
      let isValid = await Password.comparePassword(
        usersLoginDTO.password,
        user.password,
      );

      if (isValid) {
        let payload = {
          phone: user.phone,
        };
        return { access_token: await this.jwtService.sign(payload) };
      } else {
        throw new HttpException(
          new ExceptionResponseDetail(
            HttpStatus.BAD_REQUEST,
            'Sai mật khẩu !!!',
          ),
          HttpStatus.OK,
        );
      }
    } else {
      throw new HttpException(
        new ExceptionResponseDetail(
          HttpStatus.BAD_REQUEST,
          'Số điện thoại chưa được đăng ký. Vui lòng kiểm tra lại !!!',
        ),
        HttpStatus.OK,
      );
    }
  }
}
