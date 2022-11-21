import { Model } from "mongoose";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Section } from "./interfaces/section.interface";
import { InjectModel } from "@nestjs/mongoose";
import * as crypto from "crypto";
import { CreateSectionDto } from "./dto/create-section.dto";
import { UpdateLessonDto } from "./dto/update-lesson.dto";
import { CreateLessonDto } from "./dto/create-lesson.dto";
import { LessonDto } from "./dto/lesson.dto";
import { UpdateSectionDto } from "./dto/update-section.dto";

@Injectable()
export class SectionsService {
  constructor(@InjectModel("Section") private readonly sectionModel: Model<Section>) {}

  async findSections(id: string): Promise<Section[]> {
    const sectionArray = await this.sectionModel.find({ courseId: id });
    return await sectionArray.sort((first, second) => first.order - second.order);
  }

  async createNewSection(newSection: CreateSectionDto): Promise<Section> {
    const createdSection = new this.sectionModel({ sectionId: crypto.randomUUID(), ...newSection });
    const sectionArray = await this.sectionModel.find({ courseId: newSection.courseId });
    if (newSection.order !== sectionArray.length) {
      sectionArray.map(item => {
        if (item.order >= newSection.order) {
          item.order++;
          item.save();
        }
      });
    }
    return await createdSection.save();
  }

  async updateSection(sectionDto: UpdateSectionDto): Promise<Section> {
    const sectionFromDb = await this.sectionModel.findOne({ sectionId: sectionDto.sectionId }).exec();
    if (!sectionFromDb) throw new HttpException("COMMON.SECTION_NOT_FOUND", HttpStatus.NOT_FOUND);
    if (sectionDto.title) sectionFromDb.title = sectionDto.title;
    if (sectionDto.lessons) sectionFromDb.lessons = sectionDto.lessons;
    if (sectionDto.order) {
      if (!sectionDto.courseId) throw new HttpException("COMMON.COURSE_NOT_FOUND", HttpStatus.NOT_FOUND);
      if (sectionDto.order < sectionFromDb.order) {
        const sectionArrayFromDb = await this.sectionModel.find({ courseId: sectionDto.courseId });
        sectionArrayFromDb.map(item => {
          if (item.order < sectionFromDb.order && item.order >= sectionDto.order) {
            item.order++;
            item.save();
            console.log(item);
          }
        });
      } else if (sectionDto.order > sectionFromDb.order) {
        const sectionArrayFromDb = await this.sectionModel.find({ courseId: sectionDto.courseId });
        sectionArrayFromDb.map(item => {
          if (item.order > sectionFromDb.order && item.order <= sectionDto.order) {
            item.order--;
            item.save();
          }
        });
      }
      sectionFromDb.order = sectionDto.order;
    }
    await sectionFromDb.save();
    return sectionFromDb;
  }

  async createNewLesson(lessonDto: CreateLessonDto): Promise<Section> {
    const sectionDto = await this.sectionModel.findOne({ sectionId: lessonDto.sectionId }).exec();
    if (!sectionDto) throw new HttpException("COMMON.SECTION_NOT_FOUND", HttpStatus.NOT_FOUND);
    sectionDto.lessons = await this.getOrderLessonCreated(lessonDto, sectionDto.lessons);
    await sectionDto.save();
    return sectionDto;
  }

  async updateLesson(lessonDto: UpdateLessonDto): Promise<Section> {
    const sectionDto = await this.sectionModel.findOne({ sectionId: lessonDto.sectionId }).exec();
    if (!sectionDto) throw new HttpException("COMMON.SECTION_NOT_FOUND", HttpStatus.NOT_FOUND);
    const index = sectionDto.lessons.findIndex(lesson => lesson.lessonId === lessonDto.lessonId);
    if (index) {
      if (lessonDto.title) {
        sectionDto.lessons[index].title = lessonDto.title;
      }
      if (lessonDto.url) {
        sectionDto.lessons[index].url = lessonDto.url;
      }
      sectionDto.lessons[index].date = new Date();
    }
    await sectionDto.save();
    return sectionDto;
  }

  async deleteLesson(lessonDto: UpdateLessonDto): Promise<Section> {
    const sectionDto = await this.sectionModel.findOne({ sectionId: lessonDto.sectionId }).exec();
    if (!sectionDto) throw new HttpException("COMMON.SECTION_NOT_FOUND", HttpStatus.NOT_FOUND);
    const lessonDtoFromDb = sectionDto.lessons.find(item => item.lessonId === lessonDto.lessonId);
    const filterLesson = sectionDto.lessons.filter(lesson => lesson.lessonId !== lessonDto.lessonId);
    const newLesson = filterLesson.map(item => {
      if (item.order > lessonDtoFromDb.order) {
        item.order--;
      }
      return item;
    });

    await sectionDto.update({ lessons: newLesson });
    await sectionDto.save();
    return sectionDto;
  }

  async deleteSection(id: string) {
    const sectionFromDb = await this.sectionModel.findOne({ sectionId: id });
    const sectionArrayFromDb = await this.sectionModel.find({ courseId: sectionFromDb.courseId });
    if (sectionFromDb.order !== sectionArrayFromDb.length) {
      sectionArrayFromDb.map(item => {
        if (item.order > sectionFromDb.order) {
          item.order--;
          item.save();
        }
      });
    }
    sectionFromDb.remove();
    return sectionFromDb;
  }

  async getOrderLessonCreated(data, arrayData): Promise<[]> {
    if (data.order !== arrayData.length) {
      arrayData.map(item => {
        if (item.order >= data.order) {
          item.order++;
        }
      });
    } else {
      data.order++;
    }
    arrayData.push({ lessonId: crypto.randomUUID(), ...data });
    arrayData.sort((first, second) => first.order - second.order);
    return arrayData;
  }
}
