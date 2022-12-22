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
exports.CoursesService = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const crypto = require("crypto");
const sections_service_1 = require("../sections/sections.service");
const users_service_1 = require("../users/users.service");
let CoursesService = class CoursesService {
    constructor(courseModel, sectionModel, sectionService, userService) {
        this.courseModel = courseModel;
        this.sectionModel = sectionModel;
        this.sectionService = sectionService;
        this.userService = userService;
    }
    async findAll() {
        return await this.courseModel.find().exec();
    }
    async findById(id) {
        return await this.courseModel.findOne({ courseId: id }).exec();
    }
    async createNewCourse(newCourse) {
        const createdCourse = new this.courseModel(Object.assign({ courseId: crypto.randomUUID() }, newCourse));
        return await createdCourse.save();
    }
    async createNewCourseWithSectionLesson(newCourse) {
        const userFromDb = await this.userService.findByUserId(newCourse.authorId);
        const newCourseDto = {
            courseId: await crypto.randomUUID(),
            title: newCourse.title,
            description: newCourse.description,
            authorId: newCourse.authorId,
            ratingNumber: null,
            image: null,
            category: null,
            price: null,
            sale: null,
        };
        if (newCourse.ratingNumber)
            newCourseDto.ratingNumber = newCourse.ratingNumber;
        if (newCourse.image)
            newCourseDto.image = newCourse.image;
        if (newCourse.category)
            newCourseDto.category = newCourse.category;
        if (newCourse.price)
            newCourseDto.price = newCourse.price;
        if (newCourse.sale)
            newCourseDto.sale = newCourse.sale;
        const createdCourse = new this.courseModel(newCourseDto);
        if (newCourse.sections) {
            newCourse.sections.map(async (section) => {
                const newSection = Object.assign({ courseId: newCourseDto.courseId }, section);
                newSection.lessons = [];
                const newSectionDto = await this.sectionService.createNewSection(newSection);
                console.log(newSection);
                section.lessons.map(async (lesson) => {
                    await this.sectionService.createNewLessonWithoutOrder(Object.assign({ sectionId: newSectionDto.sectionId }, lesson));
                });
            });
        }
        return await createdCourse.save();
    }
    async updateCourse(courseDto) {
        console.log(courseDto);
        const courseFromDb = await this.courseModel.findOne({ courseId: courseDto.courseId }).exec();
        if (!courseFromDb)
            throw new common_1.HttpException("Course not found", common_1.HttpStatus.NOT_FOUND);
        if (courseDto.title)
            courseFromDb.title = courseDto.title;
        if (courseDto.description)
            courseFromDb.description = courseDto.description;
        if (courseDto.ratingScore)
            courseFromDb.ratingScore = courseDto.ratingScore;
        if (courseDto.ratingNumber)
            courseFromDb.ratingNumber = courseDto.ratingNumber;
        if (courseDto.image)
            courseFromDb.image = courseDto.image;
        if (courseDto.category)
            courseFromDb.category = courseDto.category;
        if (courseDto.price)
            courseFromDb.price = courseDto.price;
        if (courseDto.sale)
            courseFromDb.sale = courseDto.sale;
        if (courseDto.authorId)
            courseFromDb.authorId = courseDto.authorId;
        await courseFromDb.save();
        return courseFromDb;
    }
    async deleteCourse(id) {
        const courseFromDb = await this.courseModel.findOne({ courseId: id }).exec();
        if (!courseFromDb)
            throw new common_1.HttpException("Course not found", common_1.HttpStatus.NOT_FOUND);
        const sectionArrayFromDb = await this.sectionModel.find({ courseId: id });
        sectionArrayFromDb === null || sectionArrayFromDb === void 0 ? void 0 : sectionArrayFromDb.map(item => {
            item.remove();
        });
        return await courseFromDb.remove();
    }
    async joinCourse(id) {
        const courseFromDb = await this.courseModel.findOne({ courseId: id }).exec();
        if (!courseFromDb)
            throw new common_1.HttpException("Course not found", common_1.HttpStatus.NOT_FOUND);
        courseFromDb.joinNumber++;
        return await courseFromDb.save();
    }
    async publishCourse(id, isPublished) {
        const courseFromDb = await this.courseModel.findOne({ courseId: id }).exec();
        if (!courseFromDb)
            throw new common_1.HttpException("Course not found", common_1.HttpStatus.NOT_FOUND);
        courseFromDb.isPublished = isPublished;
        return await courseFromDb.save();
    }
};
CoursesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)("Course")),
    __param(1, (0, mongoose_2.InjectModel)("Section")),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model,
        sections_service_1.SectionsService,
        users_service_1.UsersService])
], CoursesService);
exports.CoursesService = CoursesService;
//# sourceMappingURL=courses.service.js.map