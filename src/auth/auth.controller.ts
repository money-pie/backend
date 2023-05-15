import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto/auth.dto";

@ApiTags("Authorization")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/login")
  login(@Body() userDto: AuthDto) {
    return this.authService.login(userDto);
  }

  @Post("/registration")
  registration(@Body() userDto: AuthDto) {
    return this.authService.registration(userDto);
  }
}
