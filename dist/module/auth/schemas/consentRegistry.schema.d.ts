import * as mongoose from "mongoose";
export declare const ConsentRegistrySchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    registrationForm: any[][];
    date?: Date;
    email?: string;
    checkboxText?: string;
    privacyPolicy?: string;
    cookiePolicy?: string;
    acceptedPolicy?: string;
}>;
