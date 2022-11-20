import { IsNotEmpty } from "class-validator";

export class UpdateCourseDto {
  @IsNotEmpty()
  course_id: string;
  title: string;
  description: string;
  rates_point: number;
  rates_number: number;
  image: string;
  price: number;
  sale: number;
  author_id: string;
  category: string[];
}
