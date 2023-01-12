import { Model } from "mongoose";
import * as bcrypt from "bcryptjs";
import * as crypto from "crypto";
import { Injectable, HttpStatus, HttpException } from "@nestjs/common";
import { Score } from "./interfaces/score.interface";
import { InjectModel } from "@nestjs/mongoose";
import * as fs from "fs";
import { CreateScoreDto } from "./dto/create-score.dto";
import { Course } from "../courses/interfaces/course.interface";
import { User } from "../users/interfaces/user.interface";

const saltRounds = 10;

@Injectable()
export class ScoresService {
  constructor(
    @InjectModel("Score") private readonly scoreModel: Model<Score>,
    @InjectModel("Course") private readonly courseModel: Model<Course>,
    @InjectModel("User") private readonly userModel: Model<User>,
  ) {}

  async createNewScore(newScore: CreateScoreDto): Promise<Score> {
    const scoreDto = await this.scoreModel.findOne({ lessonId: newScore.lessonId, userId: newScore.userId });
    if (!scoreDto) {
      const newScoreDto = await new this.scoreModel(newScore);
      return await newScoreDto.save();
    } else {
      scoreDto.score = newScore.score;
      return await scoreDto.save();
    }
  }

  async findScoreByUserId(userId: string, lessonId: string): Promise<Score> {
    const scoreDto = await this.scoreModel.findOne({ lessonId: lessonId, userId: userId });
    return scoreDto;
  }

  async findScoreByCourseId(courseId: string): Promise<Score> {
    const scoreDto = await this.scoreModel.findOne({ courseId: courseId });
    return scoreDto;
  }
}
