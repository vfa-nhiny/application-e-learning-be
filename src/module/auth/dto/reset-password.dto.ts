import { Matches, MaxLength, MinLength } from "class-validator";

export class ResetPasswordDto {
  readonly email: string;
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: "password too weak",
  })
  readonly newPassword: string;
  readonly newPasswordToken: string;
  readonly currentPassword: string;
}
