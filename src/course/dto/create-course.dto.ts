export class CreateCourseDto {
  course_id: string;
  title: string;
  description: string;
  rates: number;
  votes: number;
  image: string;
  price: number;
  sale: number;
  author_id: string;
  category: string[];
}
