import * as mongoose from "mongoose";
export declare const UserSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    name: string;
    email: string;
    phone: string;
    password: string;
    avatar: string;
    birthday: string;
    role: string;
    gender: string;
    ratingNumber: string;
    ratingScore: string;
    isPremium: boolean;
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
