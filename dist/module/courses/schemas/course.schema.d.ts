import * as mongoose from "mongoose";
export declare const CourseSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    ratingNumber: number;
    ratingScore: number;
    description: string;
    courseId: string;
    title: string;
    joinNumber: number;
    isPublished: boolean;
    image: string;
    price: number;
    sale: number;
    authorId: string;
    category?: mongoose.Types.DocumentArray<any> | any[];
}>;
