import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ErrorResponse } from "src/exceptions/response/exceptions.responses";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/auth.dto";
import { AuthUserResponse } from "./response/auth.responses";

@ApiTags("Log in and sign up endpoints")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: "User authorization" })
  @ApiResponse({
    status: 200,
    description: "JWT was created",
    type: AuthUserResponse,
  })
  @ApiResponse({ status: 400, type: ErrorResponse })
  @ApiResponse({ status: 401, type: ErrorResponse })
  @ApiResponse({ status: 404, type: ErrorResponse })
  @ApiResponse({ status: 500, type: ErrorResponse })
  @Post("/login")
  @HttpCode(HttpStatus.OK)
  login(@Body() userDto: LoginDto) {
    return this.authService.login(userDto);
  }

  @ApiOperation({ summary: "User registration" })
  @ApiResponse({
    status: 200,
    description: "JWT was created",
    type: AuthUserResponse,
  })
  @ApiResponse({ status: 400, type: ErrorResponse })
  @ApiResponse({ status: 401, type: ErrorResponse })
  @ApiResponse({ status: 404, type: ErrorResponse })
  @ApiResponse({ status: 500, type: ErrorResponse })
  @Post("/registration")
  @HttpCode(HttpStatus.OK)
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
  }
}
