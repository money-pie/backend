import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { IUser } from "./token.constants";

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  async generateUsrToken(user: IUser): Promise<{ token: string }> {
    const payload = {
      id: user.id,
      email: user.email,
      login: user.login,
    };
    return {
      token: this.jwtService.sign(payload, {
        secret: process.env.PRIVATE_KEY,
        expiresIn: process.env.EXPIRES_IN,
      }),
    };
  }
}
