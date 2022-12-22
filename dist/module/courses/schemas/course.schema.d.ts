import * as mongoose from "mongoose";
export declare const CourseSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    courseId: string;
    title: string;
    description: string;
    ratingScore: number;
    ratingNumber: number;
    joinNumber: number;
    isPublished: boolean;
    image: string;
    price: number;
    sale: number;
    authorId: string;
    category?: mongoose.Types.DocumentArray<any> | any[];
}>;
