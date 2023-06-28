import * as mongoose from "mongoose";
export declare const CourseSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    ratingNumber: number;
    ratingScore: number;
    courseId: string;
    title: string;
    description: string;
    joinNumber: number;
    image: string;
    price: number;
    sale: number;
    authorId: string;
    isPublished: boolean;
    category?: mongoose.Types.DocumentArray<any> | any[];
}>;
