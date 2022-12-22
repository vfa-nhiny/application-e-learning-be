import * as mongoose from "mongoose";
export declare const SectionSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    lessons: any[];
    courseId?: string;
    title?: string;
    sectionId?: string;
    order?: number;
}>;
