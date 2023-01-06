import { HttpException, HttpStatus, Injectable, UseGuards, UseInterceptors } from "@nestjs/common";
import { LivestreamDto } from "../livestreams/dto/livestream.dto";
import { Livestream } from "./interfaces/livestream.interface";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateLiveStreamDto } from "./dto/create-user-livestream.dto";

@Injectable()
export class LivestreamsService {
  constructor(@InjectModel("Livestream") private readonly livestreamModel: Model<Livestream>) {}

  async findLivestream(): Promise<Livestream[]> {
    const livestreamFromDb = await this.livestreamModel.find().exec();
    if (!livestreamFromDb) throw new HttpException("Livestream not found", HttpStatus.NOT_FOUND);
    return livestreamFromDb;
  }

  async createNewLivestream(newLivestream: CreateLiveStreamDto): Promise<Livestream> {
    console.log(newLivestream);
    const livestreamFromDb = await this.livestreamModel.findOne({ userId: newLivestream.userId }).exec();
    if (livestreamFromDb) {
      throw new HttpException("Livestream already registered", HttpStatus.FORBIDDEN);
    } else {
      const newLivestreamDto = new this.livestreamModel(newLivestream);
      return await newLivestreamDto.save();
    }
  }

  async deleteLivestream(id: string) {
    const livestreamFromDb = await this.livestreamModel.findOne({ userId: id }).exec();
    if (!livestreamFromDb) throw new HttpException("Livestream not found", HttpStatus.NOT_FOUND);
    return await livestreamFromDb.remove();
  }
}
