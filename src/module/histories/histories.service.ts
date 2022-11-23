import { Model } from "mongoose";
import * as crypto from "crypto";
import { Injectable, HttpStatus, HttpException } from "@nestjs/common";
import { History } from "./interfaces/history.interface";
import { InjectModel } from "@nestjs/mongoose";
import * as fs from "fs";
import { CreateHistoryDto } from "./dto/create-history.dto";

@Injectable()
export class HistoriesService {
  constructor(@InjectModel("History") private readonly historyModel: Model<History>) {}

  async findAll(): Promise<History[]> {
    return await this.historyModel.find().exec();
  }

  async findByEmail(email: string): Promise<History> {
    return await this.historyModel.findOne({ email: email }).exec();
  }

  async createNewHistory(newHistory: CreateHistoryDto): Promise<History> {
    const historyFromDb = await this.historyModel.findOne({ userId: newHistory.userId });
    if (historyFromDb) {
    }
    const historyDto = new this.historyModel({ historyId: crypto.randomUUID(), ...newHistory });

    return await historyDto.save();
  }
}
