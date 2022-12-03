import { ResultExamDto } from "./result-exam.dto";

export class UpdateExamDto {
  constructor(object: any) {
    this.examId = object.examId;
    this.userId = object.userId;
    this.lessonId = object.lessonId;
    this.questions = object.questions;
    this.results = object.results;
  }

  examId: string;

  userId: string;

  lessonId: string;

  questions: [{ question: string; answer: [string] }];

  results: [ResultExamDto];
}
