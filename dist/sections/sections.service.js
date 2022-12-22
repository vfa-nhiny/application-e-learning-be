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
exports.SectionsService = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const crypto = require("crypto");
let SectionsService = class SectionsService {
    constructor(sectionModel) {
        this.sectionModel = sectionModel;
    }
    async findSections(id) {
        const sectionArray = await this.sectionModel.find({ courseId: id });
        return await sectionArray.sort((first, second) => first.order - second.order);
    }
    async createNewSection(newSection) {
        const createdSection = new this.sectionModel(Object.assign({ sectionId: crypto.randomUUID() }, newSection));
        const sectionArray = await this.sectionModel.find({ courseId: newSection.courseId });
        if (newSection.order !== sectionArray.length) {
            sectionArray.map(item => {
                if (item.order >= newSection.order) {
                    item.order++;
                    item.save();
                }
            });
        }
        return await createdSection.save();
    }
    async updateSection(sectionDto) {
        const sectionFromDb = await this.sectionModel.findOne({ sectionId: sectionDto.sectionId }).exec();
        if (!sectionFromDb)
            throw new common_1.HttpException("COMMON.SECTION_NOT_FOUND", common_1.HttpStatus.NOT_FOUND);
        if (sectionDto.title)
            sectionFromDb.title = sectionDto.title;
        if (sectionDto.lessons)
            sectionFromDb.lessons = sectionDto.lessons;
        if (sectionDto.order) {
            if (!sectionDto.courseId)
                throw new common_1.HttpException("COMMON.COURSE_NOT_FOUND", common_1.HttpStatus.NOT_FOUND);
            if (sectionDto.order < sectionFromDb.order) {
                const sectionArrayFromDb = await this.sectionModel.find({ courseId: sectionDto.courseId });
                sectionArrayFromDb.map(item => {
                    if (item.order < sectionFromDb.order && item.order >= sectionDto.order) {
                        item.order++;
                        item.save();
                        console.log(item);
                    }
                });
            }
            else if (sectionDto.order > sectionFromDb.order) {
                const sectionArrayFromDb = await this.sectionModel.find({ courseId: sectionDto.courseId });
                sectionArrayFromDb.map(item => {
                    if (item.order > sectionFromDb.order && item.order <= sectionDto.order) {
                        item.order--;
                        item.save();
                    }
                });
            }
            sectionFromDb.order = sectionDto.order;
        }
        await sectionFromDb.save();
        return sectionFromDb;
    }
    async createNewLesson(lessonDto) {
        const sectionDto = await this.sectionModel.findOne({ sectionId: lessonDto.sectionId }).exec();
        if (!sectionDto)
            throw new common_1.HttpException("COMMON.SECTION_NOT_FOUND", common_1.HttpStatus.NOT_FOUND);
        sectionDto.lessons = await this.getOrderLessonCreated(lessonDto, sectionDto.lessons);
        await sectionDto.save();
        return sectionDto;
    }
    async updateLesson(lessonDto) {
        const sectionDto = await this.sectionModel.findOne({ sectionId: lessonDto.sectionId }).exec();
        if (!sectionDto)
            throw new common_1.HttpException("COMMON.SECTION_NOT_FOUND", common_1.HttpStatus.NOT_FOUND);
        const index = sectionDto.lessons.findIndex(lesson => lesson.lessonId === lessonDto.lessonId);
        if (index) {
            if (lessonDto.title) {
                sectionDto.lessons[index].title = lessonDto.title;
            }
            if (lessonDto.url) {
                sectionDto.lessons[index].url = lessonDto.url;
            }
            sectionDto.lessons[index].date = new Date();
        }
        await sectionDto.save();
        return sectionDto;
    }
    async deleteLesson(lessonDto) {
        const sectionDto = await this.sectionModel.findOne({ sectionId: lessonDto.sectionId }).exec();
        if (!sectionDto)
            throw new common_1.HttpException("COMMON.SECTION_NOT_FOUND", common_1.HttpStatus.NOT_FOUND);
        const lessonDtoFromDb = sectionDto.lessons.find(item => item.lessonId === lessonDto.lessonId);
        const filterLesson = sectionDto.lessons.filter(lesson => lesson.lessonId !== lessonDto.lessonId);
        const newLesson = filterLesson.map(item => {
            if (item.order > lessonDtoFromDb.order) {
                item.order--;
            }
            return item;
        });
        await sectionDto.update({ lessons: newLesson });
        await sectionDto.save();
        return sectionDto;
    }
    async deleteSection(id) {
        const sectionFromDb = await this.sectionModel.findOne({ sectionId: id });
        const sectionArrayFromDb = await this.sectionModel.find({ courseId: sectionFromDb.courseId });
        if (sectionFromDb.order !== sectionArrayFromDb.length) {
            sectionArrayFromDb.map(item => {
                if (item.order > sectionFromDb.order) {
                    item.order--;
                    item.save();
                }
            });
        }
        sectionFromDb.remove();
        return sectionFromDb;
    }
    async getOrderLessonCreated(data, arrayData) {
        if (data.order !== arrayData.length) {
            arrayData.map(item => {
                if (item.order >= data.order) {
                    item.order++;
                }
            });
        }
        else {
            data.order++;
        }
        arrayData.push(Object.assign({ lessonId: crypto.randomUUID() }, data));
        arrayData.sort((first, second) => first.order - second.order);
        return arrayData;
    }
};
SectionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)("Section")),
    __metadata("design:paramtypes", [mongoose_1.Model])
], SectionsService);
exports.SectionsService = SectionsService;
//# sourceMappingURL=sections.service.js.map