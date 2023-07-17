import { ScoresService } from "./scores.service";
import { IResponse } from "../../common/interfaces/response.interface";
export declare class ScoresController {
    private readonly scoresService;
    constructor(scoresService: ScoresService);
    findScoreByUserId(body: any): Promise<IResponse>;
    findScoreByCourseId(body: any): Promise<IResponse>;
    createNewScore(body: any): Promise<IResponse>;
}
