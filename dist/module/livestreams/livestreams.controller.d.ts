import { LivestreamsService } from "./livestreams.service";
import { IResponse } from "../../common/interfaces/response.interface";
export declare class LivestreamsController {
    private readonly livestreamsService;
    constructor(livestreamsService: LivestreamsService);
    createLivestream(body: any): Promise<IResponse>;
    getLivestream(body: any): Promise<IResponse>;
    deleteCourse(body: any): Promise<IResponse>;
}
