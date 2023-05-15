import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./models/user.model";
import { Hint } from "src/hints/models/hint.models";
import { HintUsers } from "src/hints/models/hintUsers.model";
import Group from "src/groups/models/group.model";
import { Subscription } from "src/subscriptions/models/subscription.model";
import { Transaction } from "src/transactions/models/transaction.model";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([
      User,
      Hint,
      HintUsers,
      Group,
      Subscription,
      Transaction,
    ]),
  ],
})
export class UsersModule {}
