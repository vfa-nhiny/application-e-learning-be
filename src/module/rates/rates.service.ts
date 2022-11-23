import { Model } from "mongoose";
import * as bcrypt from "bcryptjs";
import * as crypto from "crypto";
import { Injectable, HttpStatus, HttpException } from "@nestjs/common";
import { Rate } from "./interfaces/rate.interface";
import { InjectModel } from "@nestjs/mongoose";
import * as fs from "fs";
import { CreateRateDto } from "./dto/create-rate.dto";

const saltRounds = 10;

@Injectable()
export class RatesService {
  constructor(@InjectModel("Rate") private readonly rateModel: Model<Rate>, @InjectModel("History") private readonly historyModel: Model<Rate>) {}

  // async createNewRate(newRate: CreateRateDto): Promise<Rate> {
  //   const rateDto = new this.rateModel({ rateId: crypto.randomUUID(), ...newRate });
  //   const historyDto =
  //   return await rateDto.save();
  // }
}
