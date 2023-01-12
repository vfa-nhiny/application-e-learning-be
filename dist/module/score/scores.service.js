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
exports.ScoresService = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const saltRounds = 10;
let ScoresService = class ScoresService {
    constructor(scoreModel, courseModel, userModel) {
        this.scoreModel = scoreModel;
        this.courseModel = courseModel;
        this.userModel = userModel;
    }
    async createNewScore(newScore) {
        const scoreDto = await this.scoreModel.findOne({ lessonId: newScore.lessonId, userId: newScore.userId });
        if (!scoreDto) {
            const newScoreDto = await new this.scoreModel(newScore);
            return await newScoreDto.save();
        }
        else {
            scoreDto.score = newScore.score;
            return await scoreDto.save();
        }
    }
    async findScoreByUserId(userId, courseId) {
        const scoreDto = await this.scoreModel.findOne({ courseId: courseId, userId: userId });
        return scoreDto;
    }
    async findScoreByCourseId(courseId) {
        const scoreDto = await this.scoreModel.findOne({ courseId: courseId });
        return scoreDto;
    }
};
ScoresService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)("Score")),
    __param(1, (0, mongoose_2.InjectModel)("Course")),
    __param(2, (0, mongoose_2.InjectModel)("User")),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Model])
], ScoresService);
exports.ScoresService = ScoresService;
//# sourceMappingURL=scores.service.js.map