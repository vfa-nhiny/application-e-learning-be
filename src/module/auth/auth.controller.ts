import { Controller, Post, HttpStatus, HttpCode, Get, Body, Param } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Login } from "./interfaces/login.interface";
import { ResponseSuccess, ResponseError } from "../../common/dto/response.dto";
import { IResponse } from "../../common/interfaces/response.interface";
import { UsersService } from "../users/users.service";
import { ResetPasswordDto } from "./dto/reset-password.dto";
import { CreateUserDto } from "src/module/users/dto/create-user.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly userService: UsersService) {}

  @Post("email/login")
  @HttpCode(HttpStatus.OK)
  public async login(@Body() login: Login): Promise<IResponse> {
    try {
      const response = await this.authService.validateLogin(login.email, login.password);
      return new ResponseSuccess("Login success", response);
    } catch (error) {
      return new ResponseError("Login error", error);
    }
  }

  @Post("email/register")
  @HttpCode(HttpStatus.OK)
  async register(@Body() createUserDto: CreateUserDto): Promise<IResponse> {
    console.log(createUserDto);
    const newUser = await this.userService.createNewUser(createUserDto);
    await this.authService.createEmailToken(newUser.email);
    // await this.authService.saveUserConsent(newUser.email); //[GDPR user content]
    const sent = await this.authService.sendEmailVerification(newUser.email);
    if (sent) {
      return new ResponseSuccess("User registered successfully");
    } else {
      return new ResponseError("Error: Mail not send");
    }
  }

  @Get("email/verify/:token")
  public async verifyEmail(@Param() params): Promise<IResponse> {
    try {
      const isEmailVerified = await this.authService.verifyEmail(params.token);
      return new ResponseSuccess("Email verified", isEmailVerified);
    } catch (error) {
      return new ResponseError("Login error", error);
    }
  }

  @Post("email/resendVerification")
  public async sendEmailVerification(@Body() body): Promise<IResponse> {
    try {
      await this.authService.createEmailToken(body.email);
      const isEmailSent = await this.authService.sendEmailVerification(body.email);
      if (isEmailSent) {
        return new ResponseSuccess("Email resent");
      } else {
        return new ResponseError("Mail not sent");
      }
    } catch (error) {
      return new ResponseError("Error send mail", error);
    }
  }

  @Post("email/getCodeResetPassword")
  public async sendEmailForgotPassword(@Body() body): Promise<IResponse> {
    console.log(body);
    try {
      const tokenModel = await this.authService.createForgottenPasswordToken(body.email);

      const isEmailSent = await this.authService.sendEmailForgotPassword(body.email, tokenModel);

      console.log(isEmailSent);
      if (isEmailSent) {
        return new ResponseSuccess("Email resent", null);
      } else {
        return new ResponseError("Email not sent");
      }
    } catch (error) {
      return new ResponseError("Error send email", error);
    }
  }

  @Post("email/resetPassword")
  @HttpCode(HttpStatus.OK)
  public async setNewPassword(@Body() resetPassword: ResetPasswordDto): Promise<IResponse> {
    try {
      let isNewPasswordChanged = false;
      if (resetPassword.email && resetPassword.currentPassword) {
        const isValidPassword = await this.authService.checkPassword(resetPassword.email, resetPassword.currentPassword);
        if (isValidPassword) {
          isNewPasswordChanged = await this.userService.setPassword(resetPassword.email, resetPassword.newPassword);
        } else {
          return new ResponseError("Error reset password: wrong current password");
        }
      } else if (resetPassword.newPasswordToken) {
        const forgottenPasswordModel = await this.authService.getForgottenPasswordModel(resetPassword.newPasswordToken);
        isNewPasswordChanged = await this.userService.setPassword(forgottenPasswordModel.email, resetPassword.newPassword);
        if (isNewPasswordChanged) await forgottenPasswordModel.remove();
      } else {
        return new ResponseError("Change password error");
      }
      return new ResponseSuccess("Password changed", isNewPasswordChanged);
    } catch (error) {
      return new ResponseError("Change password error", error);
    }
  }
}
