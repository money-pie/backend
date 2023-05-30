import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
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
import { AuthModule } from "./auth/auth.module";
import { TokenModule } from "./token/token.module";
import { DemoModule } from "./demo/demo.module";
import config from "./configs/config";

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dialect: "postgres",
        host: configService.get("POSTGRES_HOST"),
        port: configService.get("POSTGRES_PORT"),
        username: configService.get("POSTGRES_USER"),
        password: configService.get("POSTGRES_PASSWORD"),
        database: configService.get("POSTGRES_DB"),
        models: [User, Hint, Transaction, Subscription, Group, HintUsers],
        autoLoadModels: true,
      }),
    }),
    UsersModule,
    GroupsModule,
    HintsModule,
    SubscriptionsModule,
    TransactionsModule,
    AuthModule,
    TokenModule,
    DemoModule,
  ],
})
export class AppModule {}
