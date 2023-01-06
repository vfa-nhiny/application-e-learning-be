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
exports.ExamsController = void 0;
const common_1 = require("@nestjs/common");
const exams_service_1 = require("./exams.service");
const response_dto_1 = require("../../common/dto/response.dto");
const exam_dto_1 = require("./dto/exam.dto");
let ExamsController = class ExamsController {
    constructor(examsService) {
        this.examsService = examsService;
    }
    async findExamByLessonId(body) {
        try {
            const exam = await this.examsService.findExamById(body.lessonId);
            return new response_dto_1.ResponseSuccess("Success", new exam_dto_1.ExamDto(exam));
        }
        catch (error) {
            return new response_dto_1.ResponseError("Error: generic error", error);
        }
    }
    async createNewExam(body) {
        try {
            const exam = await this.examsService.createNewExam(body);
            return new response_dto_1.ResponseSuccess("Success", new exam_dto_1.ExamDto(exam));
        }
        catch (error) {
            return new response_dto_1.ResponseError("Error: generic error", error);
        }
    }
    async updateExam(body) {
        try {
            const exam = await this.examsService.updateExam(body.examId);
            return new response_dto_1.ResponseSuccess("Success", new exam_dto_1.ExamDto(exam));
        }
        catch (error) {
            return new response_dto_1.ResponseError("Error: generic error", error);
        }
    }
};
__decorate([
    (0, common_1.Post)("exam"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ExamsController.prototype, "findExamByLessonId", null);
__decorate([
    (0, common_1.Post)("create"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ExamsController.prototype, "createNewExam", null);
__decorate([
    (0, common_1.Post)("updateExam"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ExamsController.prototype, "updateExam", null);
ExamsController = __decorate([
    (0, common_1.Controller)("exams"),
    __metadata("design:paramtypes", [exams_service_1.ExamsService])
], ExamsController);
exports.ExamsController = ExamsController;
//# sourceMappingURL=exams.controller.js.map