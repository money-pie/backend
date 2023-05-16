import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TokenModule } from "../token/token.module";
import { UsersModule } from "../users/users.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [UsersModule, TokenModule, ConfigModule],
})
export class AuthModule {}
