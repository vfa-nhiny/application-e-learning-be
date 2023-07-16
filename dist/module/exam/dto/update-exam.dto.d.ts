export declare class UpdateExamDto {
    constructor(object: any);
    examId: string;
    examTitle: string;
    userId: string;
    lessonId: string;
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
