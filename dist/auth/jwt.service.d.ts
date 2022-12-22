import { Model } from "mongoose";
import { User } from "../module/users/interfaces/user.interface";
export declare class JWTService {
    private readonly userModel;
    constructor(userModel: Model<User>);
    createToken(email: any, role: any): Promise<{
        expires_in: number;
        access_token: string;
    }>;
    validateUser(signedUser: any): Promise<User>;
}
