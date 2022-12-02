import * as mongoose from "mongoose";
import { ResultExamDto } from "../dto/result-exam.dto";
// import { PhotoSchema } from 'common/schemas/photo.schema';

export const ExamSchema = new mongoose.Schema(
  {
    examId: String,
    lessonId: String,
    userId: String,
    questions: [{ question: String, answer: String }],
    results: {
      type: [ResultExamDto],
      default: null,
    },
  },
  {
    timestamps: true,
  },
);
