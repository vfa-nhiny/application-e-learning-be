import * as mongoose from "mongoose";
export declare const SectionSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    title: string;
    order: number;
    lessons: any[];
    courseId?: string;
    sectionId?: string;
}>;
