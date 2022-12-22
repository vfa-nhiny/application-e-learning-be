import * as mongoose from "mongoose";
export declare const UserSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    date: Date;
    userId?: string;
    name?: string;
    email?: string;
    phone?: string;
    birthday?: string;
    password?: string;
    role?: string;
    gender?: string;
    auth?: {
        email?: {
            valid: boolean;
        };
        gmail?: {
            userid?: string;
        };
        facebook?: {
            userid?: string;
        };
    };
    settings?: any;
    avatar?: string;
}>;
