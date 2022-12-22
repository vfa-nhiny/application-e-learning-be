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
exports.AuthService = void 0;
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const config_1 = require("../config");
const common_1 = require("@nestjs/common");
const jwt_service_1 = require("./jwt.service");
const mongoose_1 = require("mongoose");
const user_dto_1 = require("../module/users/dto/user.dto");
const mongoose_2 = require("@nestjs/mongoose");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
let AuthService = class AuthService {
    constructor(userModel, emailVerificationModel, forgottenPasswordModel, consentRegistryModel, jwtService, httpService) {
        this.userModel = userModel;
        this.emailVerificationModel = emailVerificationModel;
        this.forgottenPasswordModel = forgottenPasswordModel;
        this.consentRegistryModel = consentRegistryModel;
        this.jwtService = jwtService;
        this.httpService = httpService;
    }
    async validateLogin(email, password) {
        const userFromDb = await this.userModel.findOne({ email: email });
        if (!userFromDb)
            throw new common_1.HttpException("LOGIN.USER_NOT_FOUND", common_1.HttpStatus.NOT_FOUND);
        if (!userFromDb.auth.email.valid)
            throw new common_1.HttpException("LOGIN.EMAIL_NOT_VERIFIED", common_1.HttpStatus.FORBIDDEN);
        const isValidPass = await bcrypt.compare(password, userFromDb.password);
        if (isValidPass) {
            const accessToken = await this.jwtService.createToken(email, userFromDb.role);
            return { token: accessToken, user: new user_dto_1.UserDto(userFromDb) };
        }
        else {
            throw new common_1.HttpException("LOGIN.ERROR", common_1.HttpStatus.UNAUTHORIZED);
        }
    }
    async createEmailToken(email) {
        const emailVerification = await this.emailVerificationModel.findOne({
            email: email,
        });
        if (emailVerification && (new Date().getTime() - emailVerification.timestamp.getTime()) / 60000 < 15) {
            throw new common_1.HttpException("LOGIN.EMAIL_SENT_RECENTLY", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        else {
            const emailVerificationModel = await this.emailVerificationModel.findOneAndUpdate({ email: email }, {
                email: email,
                emailToken: (Math.floor(Math.random() * 9000000) + 1000000).toString(),
                timestamp: new Date(),
            }, { upsert: true });
            return true;
        }
    }
    async saveUserConsent(email) {
        const privacyPolicyURL = "https://www.[yoursite].com/api/privacy-policy";
        const cookiePolicyURL = "https://www.[yoursite].com/api/cookie-policy";
        try {
            const newConsent = new this.consentRegistryModel();
            newConsent.email = email;
            newConsent.date = new Date();
            newConsent.registrationForm = ["name", "email", "birthday date", "password"];
            newConsent.checkboxText = "I accept privacy policy";
            const privacyPolicyResponse = await (0, rxjs_1.lastValueFrom)(this.httpService.get(privacyPolicyURL));
            newConsent.privacyPolicy = privacyPolicyResponse.data;
            const cookiePolicyResponse = await (0, rxjs_1.lastValueFrom)(this.httpService.get(cookiePolicyURL));
            newConsent.cookiePolicy = cookiePolicyResponse.data;
            newConsent.acceptedPolicy = "Y";
            return await newConsent.save();
        }
        catch (error) {
            console.error(error);
        }
    }
    async createForgottenPasswordToken(email) {
        const forgottenPassword = await this.forgottenPasswordModel.findOne({
            email: email,
        });
        if (forgottenPassword && (new Date().getTime() - forgottenPassword.timestamp.getTime()) / 60000 < 15) {
            throw new common_1.HttpException("RESET_PASSWORD.EMAIL_SENT_RECENTLY", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        else {
            const forgottenPasswordModel = await this.forgottenPasswordModel.findOneAndUpdate({ email: email }, {
                email: email,
                newPasswordToken: (Math.floor(Math.random() * 9000000) + 1000000).toString(),
                timestamp: new Date(),
            }, { upsert: true, new: true });
            if (forgottenPasswordModel) {
                return forgottenPasswordModel;
            }
            else {
                throw new common_1.HttpException("LOGIN.ERROR.GENERIC_ERROR", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
    async verifyEmail(token) {
        const emailVerif = await this.emailVerificationModel.findOne({
            emailToken: token,
        });
        if (emailVerif && emailVerif.email) {
            const userFromDb = await this.userModel.findOne({
                email: emailVerif.email,
            });
            if (userFromDb) {
                userFromDb.auth.email.valid = true;
                const savedUser = await userFromDb.save();
                await emailVerif.remove();
                return !!savedUser;
            }
        }
        else {
            throw new common_1.HttpException("LOGIN.EMAIL_CODE_NOT_VALID", common_1.HttpStatus.FORBIDDEN);
        }
    }
    async getForgottenPasswordModel(newPasswordToken) {
        return await this.forgottenPasswordModel.findOne({
            newPasswordToken: newPasswordToken,
        });
    }
    async sendEmailVerification(email) {
        const model = await this.emailVerificationModel.findOne({ email: email });
        console.log(email, model);
        if (model && model.emailToken) {
            const transporter = nodemailer.createTransport({
                service: config_1.default.mail.host,
                auth: {
                    user: config_1.default.mail.user,
                    pass: config_1.default.mail.pass,
                },
                tls: {
                    rejectUnauthorized: false,
                },
            });
            const mailOptions = {
                from: "EHEHE LEARNING",
                to: email,
                subject: "Verify Email",
                text: "Verify Email",
                html: "Hi! <br><br> Thanks for your registration<br><br>" + "<br><br>Your code is: <br><br>" + model.emailToken,
            };
            const sent = await new Promise(async function (resolve, reject) {
                return await transporter.sendMail(mailOptions, async (error, info) => {
                    if (error) {
                        console.log("Message sent: %s", error);
                        return reject(false);
                    }
                    console.log("Message sent: %s", info.messageId);
                    resolve(true);
                });
            });
            return sent;
        }
        else {
            throw new common_1.HttpException("REGISTER.USER_NOT_REGISTERED", common_1.HttpStatus.FORBIDDEN);
        }
    }
    async checkPassword(email, password) {
        const userFromDb = await this.userModel.findOne({ email: email });
        if (!userFromDb)
            throw new common_1.HttpException("LOGIN.USER_NOT_FOUND", common_1.HttpStatus.NOT_FOUND);
        return await bcrypt.compare(password, userFromDb.password);
    }
    async sendEmailForgotPassword(email, tokenModel) {
        const userFromDb = await this.userModel.findOne({ email: email });
        console.log(email);
        if (!userFromDb)
            throw new common_1.HttpException("LOGIN.USER_NOT_FOUND", common_1.HttpStatus.NOT_FOUND);
        if (tokenModel && tokenModel.newPasswordToken) {
            const transporter = nodemailer.createTransport({
                service: config_1.default.mail.host,
                auth: {
                    user: config_1.default.mail.user,
                    pass: config_1.default.mail.pass,
                },
                tls: {
                    rejectUnauthorized: false,
                },
            });
            const mailOptions = {
                from: "EHEHE LEARNING",
                to: email,
                subject: "Forgotten Password",
                text: "Forgot Password",
                html: "Hi! <br><br> If you requested to reset your password<br><br>" + "<br><br>Your code is: <br><br>" + tokenModel.newPasswordToken,
            };
            const sent = await new Promise(async function (resolve, reject) {
                return await transporter.sendMail(mailOptions, async (error, info) => {
                    if (error) {
                        console.log("Message sent: %s", error);
                        return reject(false);
                    }
                    console.log("Message sent: %s", info.messageId);
                    resolve(true);
                });
            });
            return sent;
        }
        else {
            throw new common_1.HttpException("REGISTER.USER_NOT_REGISTERED", common_1.HttpStatus.FORBIDDEN);
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)("User")),
    __param(1, (0, mongoose_2.InjectModel)("EmailVerification")),
    __param(2, (0, mongoose_2.InjectModel)("ForgottenPassword")),
    __param(3, (0, mongoose_2.InjectModel)("ConsentRegistry")),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Model,
        jwt_service_1.JWTService,
        axios_1.HttpService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map