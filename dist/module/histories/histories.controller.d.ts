import { HistoriesService } from "./histories.service";
import { IResponse } from "../../common/interfaces/response.interface";
export declare class HistoriesController {
    private readonly historiesService;
    constructor(historiesService: HistoriesService);
    findById(body: any): Promise<IResponse>;
}
