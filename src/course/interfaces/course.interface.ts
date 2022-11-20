import { Document } from "mongoose";

export interface Course extends Document {
  course_id: string;
  title: string;
  description: string;
  rates: number;
  votes: number;
  image: string;
  price: number;
  sale: number;
  author_id: string;
  category: string[];
}
