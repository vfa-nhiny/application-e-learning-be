import { QuestionDto } from "./question-exam.dto";
import { ResultExamDto } from "./result-exam.dto";

export class UpdateExamDto {
  constructor(object: any) {
    this.examId = object.examId;
    this.examTitle = object.examTitle;
    this.userId = object.userId;
    this.lessonId = object.lessonId;
    this.questions = object.questions;
    this.results = object.results;
  }

  examId: string;

  examTitle: string;

  userId: string;

  lessonId: string;

  questions: [
    {
      id: string;
      title: string;
      options: string[];
      answer: string;
    },
  ];

  results: [{ userId: string; score: number }];
}
