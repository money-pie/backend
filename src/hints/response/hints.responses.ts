import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class HintsResponse {
  @ApiProperty({
    description: "Hint id",
    nullable: false,
  })
  @IsNumber()
  id: number;

  @ApiProperty({
    description: "Hint theme",
    example: "savings",
    nullable: false,
  })
  @IsString()
  theme: string;

  @ApiProperty({
    description: "Hint title",
    example: "Совет",
    nullable: false,
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: "Hint text",
    example: "Some text here",
    nullable: false,
  })
  @IsString()
  text: string;
}
