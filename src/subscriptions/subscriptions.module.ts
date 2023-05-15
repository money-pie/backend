import { Module } from "@nestjs/common";
import { SubscriptionsService } from "./subscriptions.service";
import { SubscriptionsController } from "./subscriptions.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Subscription } from "./models/subscription.model";
import { User } from "src/users/models/user.model";

@Module({
  controllers: [SubscriptionsController],
  providers: [SubscriptionsService],
  imports: [SequelizeModule.forFeature([Subscription, User])],
})
export class SubscriptionsModule {}
