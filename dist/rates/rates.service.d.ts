import { Model } from "mongoose";
import { Rate } from "./interfaces/rate.interface";
export declare class RatesService {
    private readonly rateModel;
    private readonly historyModel;
    constructor(rateModel: Model<Rate>, historyModel: Model<Rate>);
}
