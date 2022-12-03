import { Document } from "mongoose";
import { ResultExamDto } from "../dto/result-exam.dto";

export interface Exam extends Document {
  examId: string;
  lessonId: string;
  userId: string;
  questions: [{ question: string; answer: [string] }];
  results: [ResultExamDto];
}
