import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class AuthUserResponse {
  @ApiProperty({ description: "User`s JWT token", nullable: false })
  @IsString()
  token: string;
}
