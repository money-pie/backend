import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./models/user.model";
import { Hint } from "../hints/models/hint.models";
import { HintUsers } from "../hints/models/hintUsers.model";
import Group from "../groups/models/group.model";
import { Subscription } from "../subscriptions/models/subscription.model";
import { Transaction } from "../transactions/models/transaction.model";
import { JwtStrategy } from "../auth/strategies/jwt.strategy";
import { TokenModule } from "../token/token.module";

@Module({
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy],
  imports: [
    SequelizeModule.forFeature([
      User,
      Hint,
      HintUsers,
      Group,
      Subscription,
      Transaction,
    ]),
    TokenModule,
  ],
  exports: [UsersService],
})
export class UsersModule {}
