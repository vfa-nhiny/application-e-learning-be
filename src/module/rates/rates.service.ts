import { Model } from "mongoose";
import * as bcrypt from "bcryptjs";
import * as crypto from "crypto";
import { Injectable, HttpStatus, HttpException } from "@nestjs/common";
import { Rate } from "./interfaces/rate.interface";
import { InjectModel } from "@nestjs/mongoose";
import * as fs from "fs";
import { CreateRateDto } from "./dto/create-rate.dto";
import { Course } from "../courses/interfaces/course.interface";
import { User } from "../users/interfaces/user.interface";

const saltRounds = 10;

@Injectable()
export class RatesService {
  constructor(
    @InjectModel("Rate") private readonly rateModel: Model<Rate>,
    @InjectModel("Course") private readonly courseModel: Model<Course>,
    @InjectModel("User") private readonly userModel: Model<User>,
  ) {}

  async createNewRate(newRate: CreateRateDto): Promise<Rate> {
    console.log(newRate);
    const rateDto = await new this.rateModel({ rateId: crypto.randomUUID(), ...newRate });
    console.log(rateDto);

    if (newRate?.courseId) {
      const courseDto = await this.courseModel.findOne({ courseId: newRate.courseId });
      courseDto.ratingScore = (courseDto.ratingScore * courseDto.ratingNumber + newRate.score) / (courseDto.ratingNumber + 1);
      courseDto.ratingNumber = courseDto.ratingNumber + 1;
      console.log(courseDto);
      await courseDto.save();
    } else if (newRate?.teacherId) {
      const userDto = await this.userModel.findOne({ userId: newRate.userId });
      userDto.ratingScore = (userDto.ratingScore * userDto.ratingNumber + newRate.score) / (userDto.ratingNumber + 1);
      userDto.ratingNumber = userDto.ratingNumber + 1;
      await userDto.save();
    }

    return await rateDto.save();
  }

  async findRateByUserId(userId: string, courseId: string): Promise<Rate> {
    const rateDto = await this.rateModel.findOne({ courseId: courseId, userId: userId });
    return rateDto;
  }

  async findRateByCourseId(courseId: string): Promise<Rate[]> {
    const rateDto = await this.rateModel.find({ courseId: courseId });
    return rateDto;
  }
}
