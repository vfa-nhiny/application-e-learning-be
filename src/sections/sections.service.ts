import { Model } from "mongoose";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Section } from "./interfaces/section.interface";
import { InjectModel } from "@nestjs/mongoose";
import * as crypto from "crypto";
import { CreateSectionDto } from "./dto/create-section.dto";
import { UpdateLessonDto } from "./dto/update-lesson.dto";

@Injectable()
export class SectionsService {
  constructor(@InjectModel("Section") private readonly sectionModel: Model<Section>) {}

  async findById(id: string): Promise<Section> {
    return await this.sectionModel.findOne({ course_id: id }).exec();
  }

  async createNewSection(newSection: CreateSectionDto): Promise<Section> {
    const createdSection = new this.sectionModel({ section_id: crypto.randomUUID(), ...newSection });
    return await createdSection.save();
  }

  async updateSection(sectionDto: CreateSectionDto): Promise<Section> {
    console.log(sectionDto);
    const sectionFromDb = await this.sectionModel.findOne({ section_id: sectionDto.section_id }).exec();
    if (!sectionFromDb) throw new HttpException("COMMON.COURSE_NOT_FOUND", HttpStatus.NOT_FOUND);

    if (sectionDto.title) sectionFromDb.title = sectionDto.title;
    if (sectionDto.title) sectionFromDb.lessons = sectionDto.lessons;

    await sectionFromDb.save();
    return sectionFromDb;
  }

  async createNewLesson(lessonDto: UpdateLessonDto): Promise<Section> {
    console.log(lessonDto);
    const sectionDto = await this.sectionModel.findOne({ section_id: lessonDto.section_id }).exec();
    if (!sectionDto) throw new HttpException("COMMON.COURSE_NOT_FOUND", HttpStatus.NOT_FOUND);
    await sectionDto.lessons.push({ lesson_id: crypto.randomUUID(), url: lessonDto.url, title: lessonDto.title });
    await sectionDto.save();
    return sectionDto;
  }

  async updateLesson(lessonDto: UpdateLessonDto): Promise<Section> {
    console.log(lessonDto);
    const sectionDto = await this.sectionModel.findOne({ section_id: lessonDto.section_id }).exec();
    if (!sectionDto) throw new HttpException("COMMON.COURSE_NOT_FOUND", HttpStatus.NOT_FOUND);
    const index = sectionDto.lessons.findIndex(lesson => lesson.lesson_id === lessonDto.lesson_id);
    if (index) {
      if (lessonDto.title) {
        sectionDto.lessons[index].title = lessonDto.title;
      }
      if (lessonDto.url) {
        sectionDto.lessons[index].url = lessonDto.url;
      }
    }
    await sectionDto.save();
    return sectionDto;
  }

  async deleteLesson(lessonDto: UpdateLessonDto): Promise<Section> {
    console.log(lessonDto);
    const sectionDto = await this.sectionModel.findOne({ section_id: lessonDto.section_id }).exec();
    if (!sectionDto) throw new HttpException("COMMON.COURSE_NOT_FOUND", HttpStatus.NOT_FOUND);
    const newLesson = await sectionDto.lessons.filter(lesson => lesson.lesson_id !== lessonDto.lesson_id);
    console.log(newLesson);
    await sectionDto.update({ lessons: newLesson });
    await sectionDto.save();
    return sectionDto;
  }

  async deleteSection(id: string) {
    const sectionFromDb = await this.sectionModel.findOne({ section_id: id }).exec();
    if (!sectionFromDb) throw new HttpException("COMMON.COURSE_NOT_FOUND", HttpStatus.NOT_FOUND);
    return sectionFromDb;
  }
}
