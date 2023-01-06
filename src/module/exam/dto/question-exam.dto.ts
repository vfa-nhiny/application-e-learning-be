export class QuestionDto {
  constructor(object: any) {
    this.id = object.id;
    this.title = object.title;
    this.options = object.options;
    this.answer = object.answer;
  }
  id: string;
  title: string;
  options: string[];
  answer: string;
}
