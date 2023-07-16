import { RatesService } from "./rates.service";
import { IResponse } from "../../common/interfaces/response.interface";
export declare class RatesController {
    private readonly ratesService;
    constructor(ratesService: RatesService);
    findRateByUserId(body: any): Promise<IResponse>;
    findRateByCourseId(body: any): Promise<IResponse>;
    createNewRate(body: any): Promise<IResponse>;
}
