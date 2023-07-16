import * as mongoose from "mongoose";
export declare const PhotoSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    date: Date;
    tags: unknown[];
    url?: string;
    photo?: string;
}>;
