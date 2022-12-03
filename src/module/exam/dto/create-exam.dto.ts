import { IsNotEmpty } from "class-validator";
import { ResultExamDto } from "./result-exam.dto";

export class CreateExamDto {
  constructor(object: any) {
    this.examId = object.examId;
    this.userId = object.userId;
    this.lessonId = object.lessonId;
    this.questions = object.questions;
    this.results = object.results;
  }

  examId: string;

  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  lessonId: string;

  @IsNotEmpty()
  questions: [{ question: string; answer: [string] }];

  results: [ResultExamDto];
}
