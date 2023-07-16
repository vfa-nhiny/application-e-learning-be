"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const login_interface_1 = require("./interfaces/login.interface");
const response_dto_1 = require("../../common/dto/response.dto");
const users_service_1 = require("../users/users.service");
const reset_password_dto_1 = require("./dto/reset-password.dto");
const create_user_dto_1 = require("../users/dto/create-user.dto");
let AuthController = class AuthController {
    constructor(authService, userService) {
        this.authService = authService;
        this.userService = userService;
    }
    async login(login) {
        try {
            const response = await this.authService.validateLogin(login.email, login.password);
            return new response_dto_1.ResponseSuccess("Login success", response);
        }
        catch (error) {
            return new response_dto_1.ResponseError("Login error", error);
        }
    }
    async register(createUserDto) {
        console.log(createUserDto);
        const newUser = await this.userService.createNewUser(createUserDto);
        await this.authService.createEmailToken(newUser.email);
        const sent = await this.authService.sendEmailVerification(newUser.email);
        if (sent) {
            return new response_dto_1.ResponseSuccess("User registered successfully");
        }
        else {
            return new response_dto_1.ResponseError("Error: Mail not send");
        }
    }
    async verifyEmail(params) {
        try {
            const isEmailVerified = await this.authService.verifyEmail(params.token);
            return new response_dto_1.ResponseSuccess("Email verified", isEmailVerified);
        }
        catch (error) {
            return new response_dto_1.ResponseError("Login error", error);
        }
    }
    async sendEmailVerification(body) {
        try {
            await this.authService.createEmailToken(body.email);
            const isEmailSent = await this.authService.sendEmailVerification(body.email);
            if (isEmailSent) {
                return new response_dto_1.ResponseSuccess("Email resent");
            }
            else {
                return new response_dto_1.ResponseError("Mail not sent");
            }
        }
        catch (error) {
            return new response_dto_1.ResponseError("Error send mail", error);
        }
    }
    async sendEmailForgotPassword(body) {
        console.log(body);
        try {
            const tokenModel = await this.authService.createForgottenPasswordToken(body.email);
            const isEmailSent = await this.authService.sendEmailForgotPassword(body.email, tokenModel);
            console.log(isEmailSent);
            if (isEmailSent) {
                return new response_dto_1.ResponseSuccess("Email resent", null);
            }
            else {
                return new response_dto_1.ResponseError("Email not sent");
            }
        }
        catch (error) {
            return new response_dto_1.ResponseError("Error send email", error);
        }
    }
    async setNewPassword(resetPassword) {
        try {
            let isNewPasswordChanged = false;
            if (resetPassword.email && resetPassword.currentPassword) {
                const isValidPassword = await this.authService.checkPassword(resetPassword.email, resetPassword.currentPassword);
                if (isValidPassword) {
                    isNewPasswordChanged = await this.userService.setPassword(resetPassword.email, resetPassword.newPassword);
                }
                else {
                    return new response_dto_1.ResponseError("Error reset password: wrong current password");
                }
            }
            else if (resetPassword.newPasswordToken) {
                const forgottenPasswordModel = await this.authService.getForgottenPasswordModel(resetPassword.newPasswordToken);
                isNewPasswordChanged = await this.userService.setPassword(forgottenPasswordModel.email, resetPassword.newPassword);
                if (isNewPasswordChanged)
                    await forgottenPasswordModel.remove();
            }
            else {
                return new response_dto_1.ResponseError("Change password error");
            }
            return new response_dto_1.ResponseSuccess("Password changed", isNewPasswordChanged);
        }
        catch (error) {
            return new response_dto_1.ResponseError("Change password error", error);
        }
    }
};
__decorate([
    (0, common_1.Post)("email/login"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_interface_1.Login]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)("email/register"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Get)("email/verify/:token"),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyEmail", null);
__decorate([
    (0, common_1.Post)("email/resendVerification"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "sendEmailVerification", null);
__decorate([
    (0, common_1.Post)("email/getCodeResetPassword"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "sendEmailForgotPassword", null);
__decorate([
    (0, common_1.Post)("email/resetPassword"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reset_password_dto_1.ResetPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "setNewPassword", null);
AuthController = __decorate([
    (0, common_1.Controller)("auth"),
    __metadata("design:paramtypes", [auth_service_1.AuthService, users_service_1.UsersService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map