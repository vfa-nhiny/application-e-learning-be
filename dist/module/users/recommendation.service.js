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
exports.RecommendationService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_redis_1 = require("nestjs-redis");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let RecommendationService = class RecommendationService {
    constructor(courseModel, rateModel, redisService) {
        this.courseModel = courseModel;
        this.rateModel = rateModel;
        this.redisService = redisService;
        this.redisClient = this.redisService.getClient();
    }
    async getUserRatings(userId) {
        const userRatings = {};
        const ratings = await this.rateModel.find({ userId }).exec();
        for (const rating of ratings) {
            if (!userRatings[rating.userId]) {
                userRatings[rating.userId] = {};
            }
            userRatings[rating.userId][rating.courseId] = rating.score;
        }
        return userRatings;
    }
    async getAllCourses() {
        const courses = await this.courseModel.find().exec();
        return courses;
    }
    async getUserSimilarityMatrix() {
        const userSimilarityMatrix = {};
        const similarityMatrix = await this.redisClient.hgetall("userSimilarity");
        for (const user1 in similarityMatrix) {
            if (!userSimilarityMatrix[user1]) {
                userSimilarityMatrix[user1] = {};
            }
            for (const user2 in similarityMatrix[user1]) {
                const similarity = parseFloat(similarityMatrix[user1][user2]);
                userSimilarityMatrix[user1][user2] = similarity;
            }
        }
        return userSimilarityMatrix;
    }
    train(data) {
        const { courses, rates } = data;
        const userRatings = this.prepareUserRatings(courses, rates);
        const userSimilarityMatrix = this.calculateUserSimilarityMatrix(userRatings);
        this.saveUserSimilarityMatrix(userSimilarityMatrix);
        this.saveUserRatings(userRatings);
    }
    prepareUserRatings(courses, rates) {
        const userRatings = {};
        for (const rate of rates) {
            if (!userRatings[rate.userId]) {
                userRatings[rate.userId] = {};
            }
            const course = courses.find(c => c.courseId === rate.courseId);
            if (course) {
                userRatings[rate.userId][rate.courseId] = rate.score;
            }
        }
        return userRatings;
    }
    recommendCoursesForUser(userId, courses, userRatings, userSimilarityMatrix) {
        const userCourses = userRatings[userId];
        const similarUsers = userSimilarityMatrix[userId];
        const recommendedCourses = [];
        for (const user in similarUsers) {
            if (user !== userId) {
                const similarity = similarUsers[user];
                const ratedCourses = userRatings[user];
                for (const courseId in ratedCourses) {
                    if (!userCourses.hasOwnProperty(courseId) && ratedCourses[courseId] > 0) {
                        const course = courses.find(c => c.courseId === courseId);
                        if (course && course.isPublished && course.joinNumber > 0) {
                            course.recommendationScore = similarity * ratedCourses[courseId];
                            recommendedCourses.push(course);
                        }
                    }
                }
            }
        }
        recommendedCourses.sort((a, b) => b.recommendationScore - a.recommendationScore);
        return recommendedCourses;
    }
    calculateUserSimilarityMatrix(userRatings) {
        const userSimilarityMatrix = {};
        for (const user1 in userRatings) {
            if (!userSimilarityMatrix[user1]) {
                userSimilarityMatrix[user1] = {};
            }
            for (const user2 in userRatings) {
                if (!userSimilarityMatrix[user2]) {
                    userSimilarityMatrix[user2] = {};
                }
                if (user1 !== user2) {
                    const similarity = this.calculateUserSimilarity(userRatings[user1], userRatings[user2]);
                    userSimilarityMatrix[user1][user2] = similarity;
                    userSimilarityMatrix[user2][user1] = similarity;
                }
                else {
                    userSimilarityMatrix[user1][user2] = 1;
                }
            }
        }
        return userSimilarityMatrix;
    }
    calculateUserSimilarity(ratings1, ratings2) {
        const sharedItems = [];
        for (const item in ratings1) {
            if (ratings2.hasOwnProperty(item)) {
                sharedItems.push(item);
            }
        }
        if (sharedItems.length === 0) {
            return 0;
        }
        let dotProduct = 0;
        let magnitude1 = 0;
        let magnitude2 = 0;
        for (const item of sharedItems) {
            const rating1 = ratings1[item];
            const rating2 = ratings2[item];
            dotProduct += rating1 * rating2;
            magnitude1 += rating1 * rating1;
            magnitude2 += rating2 * rating2;
        }
        const similarity = dotProduct / (Math.sqrt(magnitude1) * Math.sqrt(magnitude2));
        return similarity;
    }
    saveUserSimilarityMatrix(userSimilarityMatrix) {
        for (const user1 in userSimilarityMatrix) {
            for (const user2 in userSimilarityMatrix[user1]) {
                const similarity = userSimilarityMatrix[user1][user2];
                this.redisClient.hset("userSimilarity", `${user1}:${user2}`, similarity);
            }
        }
    }
    saveUserRatings(userRatings) {
        for (const user in userRatings) {
            for (const course in userRatings[user]) {
                const rating = userRatings[user][course];
                this.redisClient.hset("userRatings", `${user}:${course}`, rating);
            }
        }
    }
};
RecommendationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)("Course")),
    __param(1, (0, mongoose_1.InjectModel)("Rate")),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        nestjs_redis_1.RedisService])
], RecommendationService);
exports.RecommendationService = RecommendationService;
//# sourceMappingURL=recommendation.service.js.map