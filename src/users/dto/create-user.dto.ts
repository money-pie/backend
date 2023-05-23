import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateUserDto {
  @ApiProperty({ description: "User`s email", nullable: false })
  @IsString()
  email: string;

  @ApiProperty({ description: "User`s login", nullable: false })
  @IsString()
  login: string;

  @ApiProperty({ description: "User`s password", nullable: false })
  @IsString()
  password: string;
}
