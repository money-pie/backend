import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsInt, IsNumber, IsString } from "class-validator";

export class UserResponse {
  @ApiProperty({
    description: "User id",
    nullable: false,
  })
  @IsString()
  id: string;

  @ApiProperty({
    description: "User e-mail",
    example: "test@mail.com",
    nullable: false,
  })
  @IsString()
  email: string;

  @ApiProperty({
    description: "User login",
    example: "TestUser",
    nullable: false,
  })
  @IsString()
  login: string;

  @ApiProperty({
    description: "Notification settings",
    example: true,
    nullable: false,
  })
  @IsBoolean()
  notification: boolean;

  @ApiProperty({
    description: "Aim per month",
    example: 0,
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
    description: "User group id",
    example: null,
    nullable: true,
  })
  @IsString()
  groupId: string;
}
