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
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let RecommendationService = class RecommendationService {
    constructor(courseModel, rateModel) {
        this.courseModel = courseModel;
        this.rateModel = rateModel;
        this.splitToObject = inputObj => {
            const result = {};
            for (const key in inputObj) {
                const [userId1, userId2] = key.split(":");
                const score = parseFloat(inputObj[key]);
                if (!result[userId1]) {
                    result[userId1] = {};
                }
                result[userId1][userId2] = score;
            }
            return result;
        };
        this.calculateAverageRating = (userRatings, userId) => {
            const userRatingsForUser = userRatings[userId];
            if (!userRatingsForUser || Object.keys(userRatingsForUser).length === 0) {
                return 0;
            }
            const ratingValues = Object.values(userRatingsForUser);
            const sum = ratingValues.reduce((acc, rating) => Number(acc) + Number(rating), 0);
            const average = Number(sum) / ratingValues.length;
            return average;
        };
    }
    async getUserRatings(courses, rates, userId) {
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
    async getAllCourses() {
        const courses = await this.courseModel.find().exec();
        return courses;
    }
    async getAllRating() {
        const rates = await this.rateModel.find().exec();
        return rates;
    }
    train(data) {
        const { courses, rates } = data;
        const userRatings = this.prepareUserRatings(courses, rates);
        const userSimilarityMatrix = this.calculateUserSimilarityMatrix(userRatings);
        return {
            userSimilarityMatrix: userSimilarityMatrix,
            userRatings: userRatings,
        };
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
        const userIds = Object.keys(userRatings);
        const courseIds = Object.values(userRatings)
            .map(courseObj => Object.keys(courseObj))
            .flat()
            .filter((value, index, self) => self.indexOf(value) === index);
        for (const userId of userIds) {
            for (const courseId of courseIds) {
                if (userRatings[userId][courseId]) {
                    userRatings[userId][courseId] = userRatings[userId][courseId];
                }
                else {
                    userRatings[userId][courseId] = 0;
                }
            }
        }
        for (const userId of userIds) {
            const avg = this.calculateAverageRating(userRatings, userId);
            console.log(avg);
            for (const courseId of courseIds) {
                if (userRatings[userId][courseId] !== 0) {
                    userRatings[userId][courseId] = userRatings[userId][courseId] - avg;
                }
            }
        }
        return userRatings;
    }
    async recommendCoursesForUser(userId, courses, userRatings, userCourseRatings, userSimilarityMatrix) {
        const userCourses = userRatings[userId];
        let recommendedCourses = [];
        const userIds = Object.keys(userCourseRatings);
        const courseIds = Object.values(userCourseRatings)
            .map(courseObj => Object.keys(courseObj))
            .flat()
            .filter((value, index, self) => self.indexOf(value) === index);
        for (const courseId of courseIds) {
            if (!userCourses.hasOwnProperty(courseId)) {
                console.log("course misss:", courseId);
                let max1 = -2;
                let userIdMax1 = "";
                let max2 = -2;
                let userIdMax2 = "";
                for (const userIdItem of userIds) {
                    if (userIdItem !== userId) {
                        const listRateUserIdItem = userRatings[userIdItem];
                        if (listRateUserIdItem.hasOwnProperty(courseId)) {
                            const rating = userSimilarityMatrix[userIdItem][userId];
                            console.log(`rating: ${rating}`);
                            if (rating > max1) {
                                max2 = max1;
                                max1 = rating;
                                userIdMax1 = userIdItem;
                                userIdMax2 = userIdMax1;
                            }
                            else if (rating > max2) {
                                max2 = rating;
                                userIdMax2 = userIdItem;
                            }
                        }
                    }
                }
                console.log("max:", max1, max2);
                userCourseRatings[userId][courseId] = (max1 * userCourseRatings[userIdMax1][courseId] + max2 * userCourseRatings[userIdMax2][courseId]) / (Math.abs(max1) + Math.abs(max2));
                console.log("count:", userCourseRatings[userId][courseId]);
            }
        }
        userCourseRatings[userId] = Object.fromEntries(Object.entries(userCourseRatings[userId]).sort(([, valueA], [, valueB]) => Number(valueB) - Number(valueA)));
        const courseIdIdRecommends = Object.keys(userCourseRatings[userId]);
        recommendedCourses = await this.courseModel.find({ courseId: courseIdIdRecommends }).exec();
        console.log(courseIdIdRecommends);
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
};
RecommendationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)("Course")),
    __param(1, (0, mongoose_1.InjectModel)("Rate")),
    __metadata("design:paramtypes", [mongoose_2.Model, mongoose_2.Model])
], RecommendationService);
exports.RecommendationService = RecommendationService;
//# sourceMappingURL=recommendation.service.js.map