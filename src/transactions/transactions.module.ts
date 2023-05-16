import { Module } from "@nestjs/common";
import { TransactionsService } from "./transactions.service";
import { TransactionsController } from "./transactions.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Transaction } from "./models/transaction.model";
import { User } from "../users/models/user.model";
import Group from "../groups/models/group.model";

@Module({
  controllers: [TransactionsController],
  providers: [TransactionsService],
  imports: [SequelizeModule.forFeature([Transaction, User, Group])],
})
export class TransactionsModule {}
