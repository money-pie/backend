import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./users/models/user.model";
import { UsersModule } from "./users/users.module";
import { GroupsModule } from "./groups/groups.module";
import { HintsModule } from "./hints/hints.module";
import { TransactionsModule } from "./transactions/transactions.module";
import { SubscriptionsModule } from "./subscriptions/subscriptions.module";
import { Transaction } from "./transactions/models/transaction.model";
import { Hint } from "./hints/models/hint.models";
import { Subscription } from "./subscriptions/models/subscription.model";
import Group from "./groups/models/group.model";
import { HintUsers } from "./hints/models/hintUsers.model";

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSTGRES_HOST || "localhost",
      port: process.env.POSTGRES_PORT || 5432,
      username: process.env.POSTGRES_USER || "postgres",
      password: process.env.POSTGRES_PASSWORD || "root",
      database: process.env.POSTGRES_DB,
      models: [User, Hint, Transaction, Subscription, Group, HintUsers],
      autoLoadModels: true,
    }),
    UsersModule,
    GroupsModule,
    HintsModule,
    SubscriptionsModule,
    TransactionsModule,
  ],
})
export class AppModule {}
