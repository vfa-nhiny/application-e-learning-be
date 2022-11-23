import { IsNotEmpty } from "class-validator";

export class UpdateCourseDto {
  @IsNotEmpty()
  courseId: string;
  title: string;
  description: string;
  ratingScore: number;
  ratingNumber: number;
  image: string;
  price: number;
  sale: number;
  authorId: string;
  category: string[];
}
