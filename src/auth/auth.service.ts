import { Injectable } from "@nestjs/common";
import { UnauthorizedException } from "@nestjs/common/exceptions";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { UsersService } from "../users/users.service";
import * as bcrypt from "bcryptjs";
import { USER_NOT_FOUND_ERROR, WRONG_PASSWORD_ERROR } from "./auth.constants";
import { BadRequestException } from "@nestjs/common/exceptions/bad-request.exception";
import { TokenService } from "../token/token.service";
import { LoginDto } from "./dto/auth.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly tokenService: TokenService,
  ) {}

  async login(userDto: LoginDto) {
    const user = await this.validateUser(userDto);
    return this.tokenService.generateUsrToken({
      id: user.id,
      email: user.email,
      login: user.login,
    });
  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email);

    if (candidate) {
      throw new BadRequestException(USER_NOT_FOUND_ERROR);
    }

    const hashPassword = await this.userService.hashPassword(userDto.password);
    const user = await this.userService.create({
      ...userDto,
      password: hashPassword,
    });
    return this.tokenService.generateUsrToken({
      id: user.id,
      email: user.email,
      login: user.login,
    });
  }

  private async validateUser(userDto: LoginDto) {
    const user = await this.userService.getUserByEmail(userDto.email);

    if (!user) {
      throw new UnauthorizedException(USER_NOT_FOUND_ERROR);
    }

    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );

    if (!passwordEquals) {
      throw new UnauthorizedException(WRONG_PASSWORD_ERROR);
    }

    return user;
  }
}
