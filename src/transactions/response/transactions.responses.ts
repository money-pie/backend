import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsInt, IsString } from "class-validator";

export class ListTransactionsResponse {
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
  transactions: [TransactionResponse];
}

export class InfoListResponse {
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
  transactionsInfo: [TransactionInfoResponse];
}

export class TransactionInfoResponse {
  @ApiProperty({
    description: "Transaction group category",
    example: "Продукты",
    nullable: false,
  })
  @IsString()
  category: string;

  @ApiProperty({
    description: "Transaction counter",
    nullable: false,
  })
  @IsInt()
  count: number;

  @ApiProperty({
    description: "Transaction sum",
    nullable: false,
  })
  @IsInt()
  sum: number;
}

export class TransactionResponse {
  @ApiProperty({
    description: "Demo transaction id",
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
  userId: string;

  @ApiProperty({
    description: "Group id if its group transaction",
    example: "Ева Ивановна",
    nullable: true,
  })
  @IsString()
  groupId: string;

  @ApiProperty({
    nullable: true,
  })
  @IsDate()
  time: Date;
}
