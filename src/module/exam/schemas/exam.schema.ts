import * as mongoose from "mongoose";
import { QuestionDto } from "../dto/question-exam.dto";
import { ResultExamDto } from "../dto/result-exam.dto";
// import { PhotoSchema } from 'common/schemas/photo.schema';

export const ExamSchema = new mongoose.Schema(
  {
    examId: String,
    examTitle: String,
    lessonId: String,
    userId: String,
    questions: [
      {
        id: String,
        title: String,
        options: [String],
        answer: String,
      },
    ],
    results: {
      type: [{ userId: String, score: Number }],
      default: [],
    },
    time: Number,
  },
  {
    timestamps: true,
  },
);
