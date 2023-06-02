import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class ErrorResponse {
  @ApiProperty({
    description: "Error status",
    nullable: false,
  })
  @IsNumber()
  statusCode: number;

  @ApiProperty({
    description: "Error message",
    example: "Some message",
    nullable: false,
  })
  @IsString()
  message: string;
}
