import { Model } from "mongoose";
import * as bcrypt from "bcryptjs";
import * as crypto from "crypto";
import { Injectable, HttpStatus, HttpException } from "@nestjs/common";
import { Exam } from "./interfaces/exam.interface";
import { InjectModel } from "@nestjs/mongoose";
import * as fs from "fs";
import { CreateExamDto } from "./dto/create-exam.dto";
import { ExamDto } from "./dto/exam.dto";
import { UpdateExamDto } from "./dto/update-exam.dto";
import { ResultExamDto } from "./dto/result-exam.dto";
import { UpdateResultExamDto } from "./dto/update-result-exam.dto";

const saltRounds = 10;

@Injectable()
export class ExamsService {
  constructor(@InjectModel("Exam") private readonly examModel: Model<Exam>) {}

  async createNewExam(newExam: CreateExamDto): Promise<Exam> {
    const examDto = new this.examModel({ examId: crypto.randomUUID(), ...newExam });
    return await examDto.save();
  }

  async updateExam(exam: UpdateExamDto): Promise<Exam> {
    const examFromDB = await this.examModel.findOne({ lessonId: exam.lessonId });
    if (!examFromDB) throw new HttpException("Exam not found", HttpStatus.NOT_FOUND);
    if (exam.questions) examFromDB.questions = exam.questions;
    if (exam.results) examFromDB.results = exam.results;
    return await examFromDB.save();
  }

  async updateResultExam(exam: UpdateResultExamDto) {
    const examFromDB = await this.examModel.findOne({ lessonId: exam.lessonId });
    if (!examFromDB) throw new HttpException("Exam not found", HttpStatus.NOT_FOUND);
    if (examFromDB.results) await examFromDB.results.push({ userId: exam.userId, score: exam.score });
    const result = await examFromDB.save();
    return result.results[result.results.length - 1];
  }

  async findExamByLessonId(lessonId: string): Promise<Exam> {
    const examFromDB = await this.examModel.findOne({ lessonId: lessonId });
    if (!examFromDB) throw new HttpException("Exam not found", HttpStatus.NOT_FOUND);
    return examFromDB;
  }
}
