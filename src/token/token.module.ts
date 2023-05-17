import { Module } from "@nestjs/common";
import { TokenService } from "./token.service";
import { JwtModule, JwtService } from "@nestjs/jwt";

@Module({
  providers: [TokenService, JwtService],
  exports: [TokenService],
  imports: [
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || "SECRET",
      signOptions: {
        expiresIn: process.env.EXPIRES_IN,
      },
    }),
  ],
})
export class TokenModule {}
