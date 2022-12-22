import { AuthService } from "./auth.service";
import { Login } from "./interfaces/login.interface";
import { IResponse } from "../../common/interfaces/response.interface";
import { UsersService } from "../users/users.service";
import { ResetPasswordDto } from "./dto/reset-password.dto";
import { CreateUserDto } from "src/module/users/dto/create-user.dto";
export declare class AuthController {
    private readonly authService;
    private readonly userService;
    constructor(authService: AuthService, userService: UsersService);
    login(login: Login): Promise<IResponse>;
    register(createUserDto: CreateUserDto): Promise<IResponse>;
    verifyEmail(params: any): Promise<IResponse>;
    sendEmailVerification(body: any): Promise<IResponse>;
    sendEmailForgotPassword(body: any): Promise<IResponse>;
    setNewPassword(resetPassword: ResetPasswordDto): Promise<IResponse>;
}
