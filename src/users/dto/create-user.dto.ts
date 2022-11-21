import { IsEmail, MinLength, MaxLength, Matches } from "class-validator";

export class CreateUserDto {
  userId: string;

  @IsEmail()
  email: string;

  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: "password too weak",
  })
  password: string;

  name: string;

  birthday: string;

  gender: string;

  role: string;

  phone: string;

  avatar: string;
}
