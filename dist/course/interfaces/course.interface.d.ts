import { Document } from "mongoose";
export interface Course extends Document {
    courseId: string;
    title: string;
    description: string;
    ratingScore: number;
    ratingNumber: number;
    createdAt: Date;
    updatedAt: Date;
    image: string;
    price: number;
    sale: number;
    authorId: string;
    category: string[];
}
