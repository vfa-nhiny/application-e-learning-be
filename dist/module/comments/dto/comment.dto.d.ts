export declare class CommentDto {
    constructor(object: any);
    lessonId: string;
    comment: [
        {
            commentId: string;
            userId: string;
            clientId: string;
            image: string;
            content: string;
            createdAt: Date;
        }
    ];
}
