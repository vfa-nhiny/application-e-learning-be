import { ResultExamDto } from "./result-exam.dto";

export class ExamDto {
  constructor(object: any) {
    this.examId = object.examId;
    this.userId = object.userId;
    this.lessonId = object.lessonId;
    this.questions = object.questions;
    this.results = object.results;
  }

  examId: string;
  lessonId: string;
  userId: string;
  questions: [{ question: string; answer: string }];
  results: [ResultExamDto];
}
