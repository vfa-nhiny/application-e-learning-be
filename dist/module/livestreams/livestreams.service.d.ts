import { Livestream } from "./interfaces/livestream.interface";
import { Model } from "mongoose";
import { CreateLiveStreamDto } from "./dto/create-user-livestream.dto";
export declare class LivestreamsService {
    private readonly livestreamModel;
    constructor(livestreamModel: Model<Livestream>);
    findByLivestreamId(userId: string): Promise<Livestream>;
    createNewLivestream(newLivestream: CreateLiveStreamDto): Promise<Livestream>;
    deleteLivestream(id: string): Promise<Livestream & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
