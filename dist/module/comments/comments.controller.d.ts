import { CommentsService } from "./comments.service";
import { IResponse } from "../../common/interfaces/response.interface";
export declare class CommentsController {
    private readonly commentsService;
    constructor(commentsService: CommentsService);
    getCommentOfLesson(body: any): Promise<IResponse>;
}
