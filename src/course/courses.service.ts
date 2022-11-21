import { Model } from "mongoose";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Course } from "./interfaces/course.interface";
import { InjectModel } from "@nestjs/mongoose";
import * as crypto from "crypto";
import { CreateCourseDto } from "./dto/create-course.dto";

@Injectable()
export class CoursesService {
  constructor(@InjectModel("Course") private readonly courseModel: Model<Course>) {}

  async findAll(): Promise<Course[]> {
    return await this.courseModel.find().exec();
  }

  async findById(id: string): Promise<Course> {
    return await this.courseModel.findOne({ courseId: id }).exec();
  }

  async createNewCourse(newCourse: CreateCourseDto): Promise<Course> {
    const createdCourse = new this.courseModel({ courseId: crypto.randomUUID(), ...newCourse });
    return await createdCourse.save();
  }

  async updateCourse(courseDto: CreateCourseDto): Promise<Course> {
    console.log(courseDto);
    const courseFromDb = await this.courseModel.findOne({ courseId: courseDto.courseId }).exec();
    if (!courseFromDb) throw new HttpException("COMMON.COURSE_NOT_FOUND", HttpStatus.NOT_FOUND);

    if (courseDto.title) courseFromDb.title = courseDto.title;
    if (courseDto.description) courseFromDb.description = courseDto.description;
    if (courseDto.ratingScore) courseFromDb.ratingScore = courseDto.ratingScore;
    if (courseDto.ratingNumber) courseFromDb.ratingNumber = courseDto.ratingNumber;
    if (courseDto.image) courseFromDb.image = courseDto.image;
    if (courseDto.category) courseFromDb.category = courseDto.category;
    if (courseDto.price) courseFromDb.price = courseDto.price;
    if (courseDto.sale) courseFromDb.sale = courseDto.sale;
    if (courseDto.authorId) courseFromDb.authorId = courseDto.authorId;

    await courseFromDb.save();
    return courseFromDb;
  }

  async deleteCourse(id: string) {
    const courseFromDb = await this.courseModel.findOne({ courseId: id }).exec();
    if (!courseFromDb) throw new HttpException("COMMON.COURSE_NOT_FOUND", HttpStatus.NOT_FOUND);
    return courseFromDb;
  }
}
