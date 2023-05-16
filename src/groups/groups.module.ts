import { Module } from "@nestjs/common";
import { GroupsService } from "./groups.service";
import { GroupsController } from "./groups.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import Group from "./models/group.model";
import { Transaction } from "../transactions/models/transaction.model";

@Module({
  controllers: [GroupsController],
  providers: [GroupsService],
  imports: [SequelizeModule.forFeature([Group, Transaction])],
})
export class GroupsModule {}
