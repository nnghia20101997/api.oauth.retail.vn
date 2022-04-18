import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { ExceptionResponseDetail } from "src/utils.common/utils.exception.common/utils.exception.common";
import { Password } from "src/utils.common/utils.password.common/utils.password.common";
import { Repository } from "typeorm";
import { VerifyCodeDTO } from "./users.dto/user.verify.dto";
import { UsersLoginDTO } from "./users.dto/users.login.dto";
import { UsersRegisterDTO } from "./users.dto/users.register.dto";
import { Users } from "./users.entity/users.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private users: Repository<Users>,
    private jwtService: JwtService
  ) {}

  async register(usersRegisterDTO: UsersRegisterDTO): Promise<Users> {
    let userRegistered: Users = await this.users.findOne({
      phone: usersRegisterDTO.phone,
    });

    if (userRegistered) {
      throw new HttpException(
        new ExceptionResponseDetail(
          HttpStatus.BAD_REQUEST,
          "Số điện thoại đã được đăng ký !!!"
        ),
        HttpStatus.OK
      );
    }

    let newUserEntity = new Users(usersRegisterDTO);

    await newUserEntity.setPassword(usersRegisterDTO.password);

    const user: Users = await this.users.create(newUserEntity);

    await this.users.save(user);
    return user;
  }

  async login(usersLoginDTO: UsersLoginDTO): Promise<any> {
    let user: Users = await this.users.findOne({
      phone: usersLoginDTO.phone,
    });

    if (!user) {
      throw new HttpException(
        new ExceptionResponseDetail(
          HttpStatus.BAD_REQUEST,
          "Số điện thoại chưa được đăng ký. Vui lòng kiểm tra lại !!!"
        ),
        HttpStatus.OK
      );
    }

    // compare password
    let isValid = await Password.comparePassword(
      usersLoginDTO.password,
      user.password
    );

    if (!isValid) {
      throw new HttpException(
        new ExceptionResponseDetail(HttpStatus.BAD_REQUEST, "Sai mật khẩu !!!"),
        HttpStatus.OK
      );
    }

    let payload = {
      phone: user.phone,
    };
    return { access_token: await this.jwtService.sign(payload) };
  }

  async findOneUser(phone: string): Promise<Users> {
    let user: Users = await this.users.findOne({
      phone: phone,
    });

    if (!user) {
      throw new HttpException(
        new ExceptionResponseDetail(
          HttpStatus.UNAUTHORIZED,
          "token không hợp lệ !!!"
        ),
        HttpStatus.OK
      );
    }
    return user;
  }

  async verifyCode(verifyCodeDTO: VerifyCodeDTO): Promise<Users> {
    let user: Users = await this.users.findOne({
      phone: verifyCodeDTO.phone,
    });

    if (!user) {
      throw new HttpException(
        new ExceptionResponseDetail(
          HttpStatus.UNAUTHORIZED,
          "số điện thoại không đúng !!!"
        ),
        HttpStatus.OK
      );
    }

    if (user.verify_fail_count > 3) {
      throw new HttpException(
        new ExceptionResponseDetail(
          HttpStatus.UNAUTHORIZED,
          "Vui lòng nhận mã xác thực mới !!!"
        ),
        HttpStatus.OK
      );
    }

    if (user.verify_code != verifyCodeDTO.verify_code) {
      await this.users.update(
        {
          phone: verifyCodeDTO.phone,
        },
        {
          verify_fail_count: ++user.verify_fail_count,
        }
      );

      throw new HttpException(
        new ExceptionResponseDetail(
          HttpStatus.UNAUTHORIZED,
          "Mã xác thực không hợp lệ!!!"
        ),
        HttpStatus.OK
      );
    }

    await this.users.update(
      {
        phone: verifyCodeDTO.phone,
        verify_code: verifyCodeDTO.verify_code,
      },
      {
        is_verified: 1,
      }
    );

    return user;
  }
}
