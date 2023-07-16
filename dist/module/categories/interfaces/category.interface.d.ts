import { Document } from "mongoose";
export interface Category extends Document {
    categoryId: string;
    title: string;
    imageUrl: string;
    color: string;
}
