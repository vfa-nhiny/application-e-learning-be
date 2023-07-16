import { JWTService } from "./jwt.service";
import { Model } from "mongoose";
import { User } from "../users/interfaces/user.interface";
import { UserDto } from "../users/dto/user.dto";
import { EmailVerification } from "./interfaces/emailVerification.interface";
import { ForgottenPassword } from "./interfaces/forgottenPassword.interface";
import { ConsentRegistry } from "./interfaces/consentRegistry.interface";
import { HttpService } from "@nestjs/axios";
export declare class AuthService {
    private readonly userModel;
    private readonly emailVerificationModel;
    private readonly forgottenPasswordModel;
    private readonly consentRegistryModel;
    private readonly jwtService;
    private readonly httpService;
    constructor(userModel: Model<User>, emailVerificationModel: Model<EmailVerification>, forgottenPasswordModel: Model<ForgottenPassword>, consentRegistryModel: Model<ConsentRegistry>, jwtService: JWTService, httpService: HttpService);
    validateLogin(email: any, password: any): Promise<{
        token: {
            expires_in: string;
            access_token: string;
        };
        user: UserDto;
    }>;
    createEmailToken(email: string): Promise<boolean>;
    saveUserConsent(email: string): Promise<ConsentRegistry>;
    createForgottenPasswordToken(email: string): Promise<ForgottenPassword>;
    verifyEmail(token: string): Promise<boolean>;
    getForgottenPasswordModel(newPasswordToken: string): Promise<ForgottenPassword>;
    sendEmailVerification(email: string): Promise<boolean>;
    checkPassword(email: string, password: string): Promise<any>;
    sendEmailForgotPassword(email: string, tokenModel: {
        newPasswordToken: string;
    }): Promise<boolean>;
}
