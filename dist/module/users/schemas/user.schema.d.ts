import * as mongoose from "mongoose";
export declare const UserSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    date: Date;
    ratingScore: string;
    ratingNumber: string;
    name: string;
    email: string;
    phone: string;
    birthday: string;
    password: string;
    role: string;
    gender: string;
    avatar: string;
    isPremium: boolean;
    startUsingPremiumDate: string;
    userId?: string;
    auth?: {
        email?: {
            valid: boolean;
        };
        facebook?: {
            userid?: string;
        };
        gmail?: {
            userid?: string;
        };
    };
    settings?: any;
}>;
