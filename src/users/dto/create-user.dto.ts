import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto {
  @ApiProperty({
    example: "user@mail.ru",
    description: "User`s email",
    nullable: false,
  })
  @IsString({ message: "Должно быть строкой" })
  @IsEmail({}, { message: "Некорректный e-mail" })
  email: string;

  @ApiProperty({
    example: "Ivan K.",
    description: "User`s login",
    nullable: false,
  })
  @IsString({ message: "Должно быть строкой" })
  login: string;

  @ApiProperty({
    example: "Your_password",
    description: "User`s password",
    nullable: false,
  })
  @IsString({ message: "Должно быть строкой" })
  @Length(6, 16, { message: "Не меньше 6 и не больше 16 знаков" })
  password: string;
}
