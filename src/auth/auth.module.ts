import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { HintsModule } from "../hints/hints.module";
import { TokenModule } from "../token/token.module";
import { UsersModule } from "../users/users.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [UsersModule, TokenModule, ConfigModule, HintsModule],
})
export class AuthModule {}
