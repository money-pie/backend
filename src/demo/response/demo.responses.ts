import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsInt, IsString } from "class-validator";

export class DemoUserResponse {
  @ApiProperty({
    description: "Demo user login",
    example: "TestUser",
    nullable: false,
  })
  @IsString()
  login: string;

  @ApiProperty({
    description: "Demo user e-mail",
    example: "test@mail.com",
    nullable: false,
  })
  @IsString()
  email: string;

  @ApiProperty({
    description: "Notification settings",
    example: true,
    nullable: false,
  })
  @IsBoolean()
  notification: boolean;

  @ApiProperty({
    description: "Aim per month",
    example: 64000,
    nullable: false,
  })
  @IsInt()
  aim: number;

  @ApiProperty({
    description: "Subscription id",
    example: null,
    nullable: true,
  })
  @IsString()
  subId: string;

  @ApiProperty({
    description: "Demo user group id",
    example: null,
    nullable: true,
  })
  @IsString()
  groupId: string;
}

export class DemoListTransactionsResponse {
  @ApiProperty({
    description: "Total sum for category",
    nullable: false,
  })
  @IsInt()
  sum: number;

  @ApiProperty({
    description: "List of transaction for picked category",
    nullable: false,
  })
  transactions: [DemoTransactionResponse];
}

export class DemoInfoListResponse {
  @ApiProperty({
    description: "Total income/costs sum",
    nullable: false,
  })
  @IsInt()
  sum: number;

  @ApiProperty({
    description: "List of transaction for picked category",
    nullable: false,
  })
  transactionsInfo: [DemoTransactionInfoResponse];
}

export class DemoTransactionInfoResponse {
  @ApiProperty({
    description: "Transaction group category",
    example: "Продукты",
    nullable: false,
  })
  @IsString()
  category: string;

  @ApiProperty({
    description: "Transaction sum",
    nullable: false,
  })
  @IsInt()
  sum: number;

  @ApiProperty({
    description: "Transaction counter",
    nullable: false,
  })
  @IsInt()
  count: number;
}

export class DemoTransactionResponse {
  @ApiProperty({
    description: "Demo transaction id",
    example: "65bb5a94-0385-4d97-983b-089faff71788",
    nullable: false,
  })
  @IsString()
  id: string;

  @ApiProperty({
    description: "Transaction sum",
    example: "5200",
    nullable: false,
  })
  @IsInt()
  sum: number;

  @ApiProperty({
    description: "Transaction category",
    example: "Налоги",
    nullable: false,
  })
  @IsString()
  category: string;

  @ApiProperty({
    description: "Income or costs",
    example: "Расходы",
    nullable: false,
  })
  @IsString()
  kind: string;

  @ApiProperty({
    description: "Date in YYYY-MM-DD",
    example: "2023-05-30",
    nullable: false,
  })
  @IsString()
  date: string;

  @ApiProperty({
    description: "Personal or group transactions",
    example: true,
    nullable: false,
  })
  @IsBoolean()
  personal: boolean;

  @ApiProperty({
    description: "Description",
    example: "Налог",
    nullable: true,
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: "Transaction author",
    example: "Ева Ивановна",
    nullable: false,
  })
  @IsString()
  author: string;
}
