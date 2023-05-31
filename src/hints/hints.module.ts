import { Module } from "@nestjs/common";
import { HintsService } from "./hints.service";
import { HintsController } from "./hints.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Hint } from "./models/hint.models";
import { User } from "../users/models/user.model";
import { HintUsers } from "./models/hintUsers.model";
import { UsersModule } from "../users/users.module";

@Module({
  controllers: [HintsController],
  providers: [HintsService],
  exports: [HintsService],
  imports: [SequelizeModule.forFeature([Hint, User, HintUsers]), UsersModule],
})
export class HintsModule {}
