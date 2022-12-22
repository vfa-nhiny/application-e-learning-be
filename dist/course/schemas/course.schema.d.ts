import * as mongoose from "mongoose";
export declare const CourseSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    category: mongoose.Types.DocumentArray<any> | any[];
    description?: string;
    courseId?: string;
    title?: string;
    ratingScore?: number;
    ratingNumber?: number;
    image?: string;
    price?: number;
    sale?: number;
    authorId?: string;
}>;
