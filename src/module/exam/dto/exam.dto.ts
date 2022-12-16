import { QuestionDto } from "./question-exam.dto";
import { ResultExamDto } from "./result-exam.dto";

export class ExamDto {
  constructor(object: any) {
    this.examId = object.examId;
    this.examTitle = object.examTitle;
    this.userId = object.userId;
    this.lessonId = object.lessonId;
    this.questions = object.questions;
    this.results = object.results;
    this.time = object.time;
  }

  examId: string;
  examTitle: string;
  lessonId: string;
  userId: string;
  time: number;
  questions: [QuestionDto];
  results: [ResultExamDto];
}
