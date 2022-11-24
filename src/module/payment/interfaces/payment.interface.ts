import { Document } from "mongoose";

export interface Payment extends Document {
  rateId: string;
  userId: string;
  courseId: string;
  teacherId: string;
  score: number;
  comment: string;
}
