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
    questions: [QuestionDto],
    results: {
      type: [ResultExamDto],
      default: null,
    },
    time: Number,
  },
  {
    timestamps: true,
  },
);
