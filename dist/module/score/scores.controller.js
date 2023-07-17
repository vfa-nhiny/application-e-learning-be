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
exports.ScoresController = void 0;
const common_1 = require("@nestjs/common");
const scores_service_1 = require("./scores.service");
const response_dto_1 = require("../../common/dto/response.dto");
const roles_guard_1 = require("../../common/guards/roles.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const logging_interceptor_1 = require("../../common/interceptors/logging.interceptor");
const transform_interceptor_1 = require("../../common/interceptors/transform.interceptor");
const passport_1 = require("@nestjs/passport");
const constants_1 = require("../auth/constants");
const score_dto_1 = require("./dto/score.dto");
let ScoresController = class ScoresController {
    constructor(scoresService) {
        this.scoresService = scoresService;
    }
    async findScoreByUserId(body) {
        try {
            const score = await this.scoresService.findScoreByUserId(body.userId, body.lessonId);
            return new response_dto_1.ResponseSuccess("Success", new score_dto_1.ScoreDto(score));
        }
        catch (error) {
            return new response_dto_1.ResponseError("Error: generic error", error);
        }
    }
    async findScoreByCourseId(body) {
        try {
            const score = await this.scoresService.findScoreByCourseId(body.courseId);
            return new response_dto_1.ResponseSuccess("Success", new score_dto_1.ScoreDto(score));
        }
        catch (error) {
            return new response_dto_1.ResponseError("Error: generic error", error);
        }
    }
    async createNewScore(body) {
        try {
            const score = await this.scoresService.createNewScore(body);
            return new response_dto_1.ResponseSuccess("Success", new score_dto_1.ScoreDto(score));
        }
        catch (error) {
            return new response_dto_1.ResponseError("Error: generic error", error);
        }
    }
};
__decorate([
    (0, common_1.Post)("score"),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(constants_1.role.student, constants_1.role.teacher),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ScoresController.prototype, "findScoreByUserId", null);
__decorate([
    (0, common_1.Post)("scoreByCourse"),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(constants_1.role.student, constants_1.role.teacher),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ScoresController.prototype, "findScoreByCourseId", null);
__decorate([
    (0, common_1.Post)("create"),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(constants_1.role.student, constants_1.role.teacher),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ScoresController.prototype, "createNewScore", null);
ScoresController = __decorate([
    (0, common_1.Controller)("scores"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    (0, common_1.UseInterceptors)(logging_interceptor_1.LoggingInterceptor, transform_interceptor_1.TransformInterceptor),
    __metadata("design:paramtypes", [scores_service_1.ScoresService])
], ScoresController);
exports.ScoresController = ScoresController;
//# sourceMappingURL=scores.controller.js.map