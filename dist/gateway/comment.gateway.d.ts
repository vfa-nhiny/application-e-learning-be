import { Socket, Server } from "socket.io";
import { CommentsService } from "src/module/comments/comments.service";
export declare class CommentGateway {
    private readonly commentService;
    private rooms;
    private clients;
    server: Server;
    constructor(commentService: CommentsService);
    handleMessage(client: Socket, message: {
        lessonId: string;
        comment: {
            userId: string;
            username: string;
            avatar: string;
            image: string;
            content: string;
        };
    }): Promise<void>;
    handleLessonJoin(client: Socket, lessonInfo: {
        lessonId: string;
        userId: string;
    }): void;
    handleLessonLeave(client: Socket, lessonId: string): void;
    handleGetMessageOfLesson(client: Socket, lessonId: string): void;
}
