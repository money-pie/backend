import { Body, Controller, Post, UnauthorizedException } from "@nestjs/common";
import { BadRequestException } from "@nestjs/common/exceptions";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/auth.dto";
import { AuthUserResponse } from "./response/auth.responses";

@ApiTags("Log in and sign up endpoints")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: "User authorization" })
  @ApiResponse({ status: 201, type: AuthUserResponse })
  @Post("/login")
  login(
    @Body() userDto: LoginDto,
  ): Promise<AuthUserResponse | UnauthorizedException> {
    return this.authService.login(userDto);
  }

  @ApiOperation({ summary: "User registration" })
  @ApiResponse({ status: 201, type: AuthUserResponse })
  @Post("/registration")
  registration(
    @Body() userDto: CreateUserDto,
  ): Promise<AuthUserResponse | UnauthorizedException | BadRequestException> {
    return this.authService.registration(userDto);
  }
}
