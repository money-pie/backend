import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDateString, IsInt, IsString } from "class-validator";
import { Category, Kind } from "../transactions.constants";

export class CreateTransactionDto {
  @ApiProperty({
    example: "4300",
    description: "Transaction sum",
    nullable: false,
  })
  @IsInt({ message: "Должно быть числом" })
  readonly sum: number;

  @ApiProperty({
    example: "Продукты",
    description: "Category name",
    nullable: false,
  })
  @IsString({ message: "Должно быть строкой" })
  readonly category: Category;

  @ApiProperty({
    example: "Расходы",
    description: "Income or costs",
    nullable: false,
  })
  @IsString({ message: "Должно быть строкой" })
  readonly kind: Kind;

  @ApiProperty({
    example: "YYYY-MM-DD",
    description: "Transaction date",
    nullable: false,
  })
  @IsDateString()
  readonly date: Date;

  @ApiProperty({
    example: "true",
    description: "Personal or by group",
    nullable: false,
  })
  @IsBoolean({ message: "Должно быть логическим значением" })
  readonly personal: boolean;

  @ApiProperty({
    example: "Transaction description",
    description: "Transaction description",
    nullable: true,
  })
  @IsString({ message: "Должно быть строкой" })
  readonly description: string;
}
