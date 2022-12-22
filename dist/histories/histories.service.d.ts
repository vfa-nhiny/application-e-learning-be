import { Model } from "mongoose";
import { History } from "./interfaces/history.interface";
import { CreateHistoryDto } from "./dto/create-history.dto";
export declare class HistoriesService {
    private readonly historyModel;
    constructor(historyModel: Model<History>);
    findAll(): Promise<History[]>;
    findByEmail(email: string): Promise<History>;
    createNewHistory(newHistory: CreateHistoryDto): Promise<History>;
}
