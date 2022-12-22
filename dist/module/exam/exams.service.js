"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamsService = void 0;
const mongoose_1 = require("mongoose");
const crypto = require("crypto");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const saltRounds = 10;
let ExamsService = class ExamsService {
    constructor(examModel) {
        this.examModel = examModel;
    }
    async createNewExam(newExam) {
        const examDto = new this.examModel(Object.assign({ examId: crypto.randomUUID() }, newExam));
        return await examDto.save();
    }
    async updateExam(exam) {
        const examFromDB = await this.examModel.findOne({ lessonId: exam.lessonId });
        if (!examFromDB)
            throw new common_1.HttpException("Exam not found", common_1.HttpStatus.NOT_FOUND);
        if (exam.questions)
            examFromDB.questions = exam.questions;
        if (exam.results)
            examFromDB.results = exam.results;
        return await examFromDB.save();
    }
    async updateResultExam(exam) {
        const examFromDB = await this.examModel.findOne({ examId: exam.examId });
        if (!examFromDB)
            throw new common_1.HttpException("Exam not found", common_1.HttpStatus.NOT_FOUND);
        if (examFromDB.results)
            await examFromDB.results.push({ userId: exam.userId, score: exam.score });
        const result = await examFromDB.save();
        return result.results[result.results.length - 1];
    }
    async findExamById(examId) {
        const examFromDB = await this.examModel.findOne({ examId: examId });
        if (!examFromDB)
            throw new common_1.HttpException("Exam not found", common_1.HttpStatus.NOT_FOUND);
        return examFromDB;
    }
};
ExamsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)("Exam")),
    __metadata("design:paramtypes", [mongoose_1.Model])
], ExamsService);
exports.ExamsService = ExamsService;
//# sourceMappingURL=exams.service.js.map