export declare class CreateExamDto {
    constructor(object: any);
    examId: string;
    userId: string;
    examTitle: string;
    lessonTitle: string;
    lessonId: string;
    time: number;
    questions: [
        {
            id: string;
            title: string;
            options: string[];
            answer: string;
        }
    ];
    results: [{
        userId: string;
        score: number;
    }];
}
