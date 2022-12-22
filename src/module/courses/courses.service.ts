import { Model } from "mongoose";
import { ConsoleLogger, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Course } from "./interfaces/course.interface";
import { InjectModel } from "@nestjs/mongoose";
import * as crypto from "crypto";
import { CreateCourseDto } from "./dto/create-course.dto";
import { Section } from "src/module/sections/interfaces/section.interface";
import { CreateCourseSectionLessonDto } from "./dto/create-course-section-lesson.dto";
import { SectionsService } from "../sections/sections.service";
import { UsersService } from "../users/users.service";

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel("Course") private readonly courseModel: Model<Course>,
    @InjectModel("Section") private readonly sectionModel: Model<Section>,
    private readonly sectionService: SectionsService,
    private readonly userService: UsersService,
  ) {}

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

  async createNewCourseWithSectionLesson(newCourse: CreateCourseSectionLessonDto): Promise<Course> {
    const userFromDb = await this.userService.findByUserId(newCourse.authorId);
    const newCourseDto = {
      courseId: crypto.randomUUID(),
      title: newCourse.title,
      description: newCourse.description,
      authorId: newCourse.authorId,
      ratingNumber: null,
      image: null,
      category: null,
      price: null,
      sale: null,
    };
    if (newCourse.ratingNumber) newCourseDto.ratingNumber = newCourse.ratingNumber;
    if (newCourse.image) newCourseDto.image = newCourse.image;
    if (newCourse.category) newCourseDto.category = newCourse.category;
    if (newCourse.price) newCourseDto.price = newCourse.price;
    if (newCourse.sale) newCourseDto.sale = newCourse.sale;
    const createdCourse = new this.courseModel(newCourse);
    if (newCourse.sections) {
      newCourse.sections.map(async section => {
        const newSection = { courseId: newCourseDto.courseId, ...section };
        newSection.lessons = [];
        const newSectionDto = await this.sectionService.createNewSection(newSection);
        console.log(newSection);
        section.lessons.map(async lesson => {
          await this.sectionService.createNewLessonWithoutOrder({ sectionId: newSectionDto.sectionId, ...lesson });
        });
      });
    }

    return await createdCourse.save();
  }

  async updateCourse(courseDto: CreateCourseDto): Promise<Course> {
    console.log(courseDto);
    const courseFromDb = await this.courseModel.findOne({ courseId: courseDto.courseId }).exec();
    if (!courseFromDb) throw new HttpException("Course not found", HttpStatus.NOT_FOUND);

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
    if (!courseFromDb) throw new HttpException("Course not found", HttpStatus.NOT_FOUND);
    const sectionArrayFromDb = await this.sectionModel.find({ courseId: id });
    sectionArrayFromDb?.map(item => {
      item.remove();
    });
    return await courseFromDb.remove();
  }

  async joinCourse(id: string) {
    const courseFromDb = await this.courseModel.findOne({ courseId: id }).exec();
    if (!courseFromDb) throw new HttpException("Course not found", HttpStatus.NOT_FOUND);
    courseFromDb.joinNumber++;
    return await courseFromDb.save();
  }
}
