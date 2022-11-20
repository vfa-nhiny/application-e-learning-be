export class CourseDto {
  constructor(object: any) {
    this.course_id = object.course_id;
    this.title = object.title;
    this.description = object.description;
    this.rates_point = object.rates_point;
    this.rates_number = object.rates_number;
    this.image = object.image;
    this.category = object.category;
    this.price = object.price;
    this.sale = object.sale;
    this.author_id = object.author_id;
  }
  readonly course_id: string;
  readonly title: string;
  readonly description: string;
  readonly rates_point: number;
  readonly rates_number: number;
  readonly image: string;
  readonly category: string[];
  readonly price: number;
  readonly sale: number;
  readonly author_id: string;
}
