export declare class ExamDto {
    constructor(object: any);
    examId: string;
    examTitle: string;
    lessonId: string;
    userId: string;
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
