import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  async generateToken(user) {
    const payload = { user };
    return {
      token: this.jwtService.sign(payload, {
        secret: process.env.PRIVATE_KEY,
        expiresIn: "24h",
      }),
    };
  }
}
