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
exports.RatesService = void 0;
const mongoose_1 = require("mongoose");
const crypto = require("crypto");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const saltRounds = 10;
let RatesService = class RatesService {
    constructor(rateModel, courseModel, userModel) {
        this.rateModel = rateModel;
        this.courseModel = courseModel;
        this.userModel = userModel;
    }
    async createNewRate(newRate) {
        console.log(newRate);
        const rateDto = await new this.rateModel(Object.assign({ rateId: crypto.randomUUID() }, newRate));
        console.log(rateDto);
        if (newRate === null || newRate === void 0 ? void 0 : newRate.courseId) {
            const courseDto = await this.courseModel.findOne({ courseId: newRate.courseId });
            courseDto.ratingScore = (courseDto.ratingScore * courseDto.ratingNumber + newRate.score) / (courseDto.ratingNumber + 1);
            courseDto.ratingNumber = courseDto.ratingNumber + 1;
            console.log(courseDto);
            await courseDto.save();
        }
        else if (newRate === null || newRate === void 0 ? void 0 : newRate.teacherId) {
            const userDto = await this.userModel.findOne({ userId: newRate.userId });
            userDto.ratingScore = (userDto.ratingScore * userDto.ratingNumber + newRate.score) / (userDto.ratingNumber + 1);
            userDto.ratingNumber = userDto.ratingNumber + 1;
            await userDto.save();
        }
        return await rateDto.save();
    }
    async findRateByUserId(userId, courseId) {
        const rateDto = await this.rateModel.findOne({ courseId: courseId, userId: userId });
        return rateDto;
    }
    async findRateByCourseId(courseId) {
        const rateDto = await this.rateModel.find({ courseId: courseId });
        return rateDto;
    }
};
RatesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)("Rate")),
    __param(1, (0, mongoose_2.InjectModel)("Course")),
    __param(2, (0, mongoose_2.InjectModel)("User")),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Model])
], RatesService);
exports.RatesService = RatesService;
//# sourceMappingURL=rates.service.js.map