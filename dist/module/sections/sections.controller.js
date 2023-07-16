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
exports.SectionsController = void 0;
const common_1 = require("@nestjs/common");
const section_dto_1 = require("./dto/section.dto");
const sections_service_1 = require("./sections.service");
const response_dto_1 = require("../../common/dto/response.dto");
const roles_guard_1 = require("../../common/guards/roles.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const logging_interceptor_1 = require("../../common/interceptors/logging.interceptor");
const transform_interceptor_1 = require("../../common/interceptors/transform.interceptor");
const passport_1 = require("@nestjs/passport");
const constants_1 = require("../auth/constants");
const create_section_dto_1 = require("./dto/create-section.dto");
const update_lesson_dto_1 = require("./dto/update-lesson.dto");
const create_lesson_dto_1 = require("./dto/create-lesson.dto");
let SectionsController = class SectionsController {
    constructor(sectionService) {
        this.sectionService = sectionService;
    }
    async findByIdCourse(body) {
        try {
            const section = await this.sectionService.findSections(body.courseId);
            return new response_dto_1.ResponseSuccess("Success", section);
        }
        catch (error) {
            return new response_dto_1.ResponseError("Error: generic error", error);
        }
    }
    async createNewSection(body) {
        console.log(body);
        try {
            const section = await this.sectionService.createNewSection(body);
            return new response_dto_1.ResponseSuccess("Section created successfully", new section_dto_1.SectionDto(section));
        }
        catch (error) {
            return new response_dto_1.ResponseError("Error: generic error", error);
        }
    }
    async updateSection(body) {
        try {
            const section = await this.sectionService.updateSection(body);
            return new response_dto_1.ResponseSuccess("Section updated successfully", new section_dto_1.SectionDto(section));
        }
        catch (error) {
            return new response_dto_1.ResponseError("Error: generic error", error);
        }
    }
    async deleteSection(body) {
        try {
            await this.sectionService.deleteSection(body.sectionId);
            return new response_dto_1.ResponseSuccess("Section deleted successfully", null);
        }
        catch (error) {
            return new response_dto_1.ResponseError("Error: generic error", error);
        }
    }
    async createNewLesson(body) {
        console.log(body);
        try {
            const section = await this.sectionService.createNewLesson(body);
            return new response_dto_1.ResponseSuccess("Lesson created successfully", new section_dto_1.SectionDto(section));
        }
        catch (error) {
            return new response_dto_1.ResponseError("Error: generic error", error);
        }
    }
    async updateLesson(body) {
        console.log(body);
        try {
            const section = await this.sectionService.updateLesson(body);
            return new response_dto_1.ResponseSuccess("Lesson updated successfully", new section_dto_1.SectionDto(section));
        }
        catch (error) {
            return new response_dto_1.ResponseError("Error: generic error", error);
        }
    }
    async deleteLesson(body) {
        console.log(body);
        try {
            const section = await this.sectionService.deleteLesson(body);
            return new response_dto_1.ResponseSuccess("Lesson deleted successfully", new section_dto_1.SectionDto(section));
        }
        catch (error) {
            return new response_dto_1.ResponseError("Error: generic error", error);
        }
    }
};
__decorate([
    (0, common_1.Post)("course"),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(constants_1.role.teacher, constants_1.role.student),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SectionsController.prototype, "findByIdCourse", null);
__decorate([
    (0, common_1.Post)("create"),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(constants_1.role.teacher),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_section_dto_1.CreateSectionDto]),
    __metadata("design:returntype", Promise)
], SectionsController.prototype, "createNewSection", null);
__decorate([
    (0, common_1.Post)("update"),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(constants_1.role.teacher),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SectionsController.prototype, "updateSection", null);
__decorate([
    (0, common_1.Post)("delete"),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(constants_1.role.teacher),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SectionsController.prototype, "deleteSection", null);
__decorate([
    (0, common_1.Post)("createLesson"),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(constants_1.role.teacher),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_lesson_dto_1.CreateLessonDto]),
    __metadata("design:returntype", Promise)
], SectionsController.prototype, "createNewLesson", null);
__decorate([
    (0, common_1.Post)("updateLesson"),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(constants_1.role.teacher),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_lesson_dto_1.UpdateLessonDto]),
    __metadata("design:returntype", Promise)
], SectionsController.prototype, "updateLesson", null);
__decorate([
    (0, common_1.Post)("deleteLesson"),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(constants_1.role.teacher),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_lesson_dto_1.UpdateLessonDto]),
    __metadata("design:returntype", Promise)
], SectionsController.prototype, "deleteLesson", null);
SectionsController = __decorate([
    (0, common_1.Controller)("sections"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    (0, common_1.UseInterceptors)(logging_interceptor_1.LoggingInterceptor, transform_interceptor_1.TransformInterceptor),
    __metadata("design:paramtypes", [sections_service_1.SectionsService])
], SectionsController);
exports.SectionsController = SectionsController;
//# sourceMappingURL=sections.controller.js.map