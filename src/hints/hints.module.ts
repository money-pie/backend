import { Module } from "@nestjs/common";
import { HintsService } from "./hints.service";
import { HintsController } from "./hints.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Hint } from "./models/hint.models";
import { User } from "src/users/models/user.model";
import { HintUsers } from "./models/hintUsers.model";

@Module({
  controllers: [HintsController],
  providers: [HintsService],
  imports: [SequelizeModule.forFeature([Hint, User, HintUsers])],
})
export class HintsModule {}
