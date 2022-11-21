export class CourseDto {
  constructor(object: any) {
    this.courseId = object.courseId;
    this.title = object.title;
    this.description = object.description;
    this.ratingScore = object.ratingScore;
    this.ratingNumber = object.ratingNumber;
    this.image = object.image;
    this.createdAt = object.createdAt;
    this.updatedAt = object.updatedAt;
    this.category = object.category;
    this.price = object.price;
    this.sale = object.sale;
    this.authorId = object.authorId;
  }
  readonly courseId: string;
  readonly title: string;
  readonly description: string;
  readonly ratingScore: number;
  readonly ratingNumber: number;
  readonly image: string;
  readonly date: Date;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly category: string[];
  readonly price: number;
  readonly sale: number;
  readonly authorId: string;
}
