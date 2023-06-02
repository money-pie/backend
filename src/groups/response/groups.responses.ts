import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsInt, IsString } from "class-validator";

export class GroupResponse {
  @ApiProperty({
    description: "Group id",
    nullable: false,
  })
  @IsString()
  id: string;

  @ApiProperty({
    description: "Group aim",
    nullable: false,
  })
  @IsInt()
  aim: number;

  @ApiProperty({
    description: "Premium status",
    example: false,
    nullable: false,
  })
  @IsBoolean()
  premium: boolean;

  @ApiProperty({
    description: "Max group capacity ",
    nullable: false,
  })
  @IsInt()
  maxCapacity: number;

  @ApiProperty({
    description: "Current group capacity ",
    nullable: false,
  })
  @IsInt()
  curCapacity: number;
}
