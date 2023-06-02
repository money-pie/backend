import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { IUser, TOKEN_GENERATION_ERROR } from "./token.constants";

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  async generateUsrToken(user: IUser): Promise<{ token: string }> {
    try {
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
    } catch (err) {
      throw new HttpException(
        TOKEN_GENERATION_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
