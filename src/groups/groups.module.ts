import { Module } from "@nestjs/common";
import { GroupsService } from "./groups.service";
import { GroupsController } from "./groups.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import Group from "./models/group.model";
import { Transaction } from "../transactions/models/transaction.model";
import { UsersModule } from "src/users/users.module";

@Module({
  controllers: [GroupsController],
  providers: [GroupsService],
  imports: [SequelizeModule.forFeature([Group, Transaction]), UsersModule],
})
export class GroupsModule {}
