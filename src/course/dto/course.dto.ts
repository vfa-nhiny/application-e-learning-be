export class CourseDto {
  constructor(object: any) {
    this.course_id = object.course_id;
    this.title = object.title;
    this.description = object.description;
    this.rates = object.rates;
    this.votes = object.votes;
    this.image = object.image;
    this.category = object.category;
    this.price = object.price;
    this.sale = object.sale;
    this.author_id = object.author_id;
  }
  readonly course_id: string;
  readonly title: string;
  readonly description: string;
  readonly rates: number;
  readonly votes: number;
  readonly image: string;
  readonly category: string[];
  readonly price: number;
  readonly sale: number;
  readonly author_id: string;
}
