import { IsNotEmpty } from "class-validator";
import { QuestionDto } from "./question-exam.dto";
import { ResultExamDto } from "./result-exam.dto";

export class CreateExamDto {
  constructor(object: any) {
    this.examId = object.examId;
    this.examTitle = object.examTitle;
    this.userId = object.userId;
    this.lessonId = object.lessonId;
    this.lessonTitle = object.lessonTitle;
    this.questions = object.questions;
    this.results = object.results;
    this.time = object.time;
  }

  examId: string;

  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  examTitle: string;

  @IsNotEmpty()
  lessonTitle: string;

  @IsNotEmpty()
  lessonId: string;

  @IsNotEmpty()
  time: number;

  @IsNotEmpty()
  questions: [QuestionDto];

  results: [ResultExamDto];
}
