import * as mongoose from "mongoose";
export declare const UserSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    name: string;
    email: string;
    phone: string;
    birthday: string;
    password: string;
    role: string;
    gender: string;
    ratingNumber: string;
    ratingScore: string;
    avatar: string;
    isPremium: boolean;
    startUsingPremiumDate: string;
    courseJoined: string[];
    date: Date;
    userId?: string;
    auth?: {
        gmail?: {
            userid?: string;
        };
        email?: {
            valid: boolean;
        };
        facebook?: {
            userid?: string;
        };
    };
    settings?: any;
}>;
