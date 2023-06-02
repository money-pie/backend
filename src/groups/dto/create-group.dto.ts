import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class CreateGroupDto {
  @ApiProperty({
    example: "user@mail.ru",
    description: "Existing user's mail",
    nullable: false,
  })
  @IsString({ message: "Должно быть строкой" })
  @IsEmail({}, { message: "Некорректный e-mail" })
  email: string;
}
