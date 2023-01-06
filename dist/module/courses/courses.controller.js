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
exports.CoursesController = void 0;
const common_1 = require("@nestjs/common");
const course_dto_1 = require("./dto/course.dto");
const courses_service_1 = require("./courses.service");
const response_dto_1 = require("../../common/dto/response.dto");
const roles_guard_1 = require("../../common/guards/roles.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const logging_interceptor_1 = require("../../common/interceptors/logging.interceptor");
const transform_interceptor_1 = require("../../common/interceptors/transform.interceptor");
const passport_1 = require("@nestjs/passport");
const constants_1 = require("../auth/constants");
const create_course_dto_1 = require("./dto/create-course.dto");
const create_course_section_lesson_dto_1 = require("./dto/create-course-section-lesson.dto");
let CoursesController = class CoursesController {
    constructor(courseService) {
        this.courseService = courseService;
    }
    async findAll() {
        try {
            const course = await this.courseService.findAll();
            return new response_dto_1.ResponseSuccess("Success", course);
        }
        catch (error) {
            return new response_dto_1.ResponseError("Error: generic error", error);
        }
    }
    async findById(body) {
        try {
            const course = await this.courseService.findById(body.courseId);
            return new response_dto_1.ResponseSuccess("Success", new course_dto_1.CourseDto(course));
        }
        catch (error) {
            return new response_dto_1.ResponseError("Error: generic error", error);
        }
    }
    async findByUserId(body) {
        try {
            const course = await this.courseService.findByUserId(body.authorId);
            return new response_dto_1.ResponseSuccess("Success", course);
        }
        catch (error) {
            return new response_dto_1.ResponseError("Error: generic error", error);
        }
    }
    async joinCourse(body) {
        try {
            const course = await this.courseService.joinCourse(body.courseId);
            return new response_dto_1.ResponseSuccess("Success", new course_dto_1.CourseDto(course));
        }
        catch (error) {
            return new response_dto_1.ResponseError("Error: generic error", error);
        }
    }
    async publishCourse(body) {
        try {
            const course = await this.courseService.publishCourse(body.courseId, body.isPublished);
            return new response_dto_1.ResponseSuccess("Success", new course_dto_1.CourseDto(course));
        }
        catch (error) {
            return new response_dto_1.ResponseError("Error: generic error", error);
        }
    }
    async createNewCourse(body) {
        console.log(body);
        try {
            const course = await this.courseService.createNewCourse(body);
            return new response_dto_1.ResponseSuccess("Course created successfully", new course_dto_1.CourseDto(course));
        }
        catch (error) {
            return new response_dto_1.ResponseError("Error: generic error", error);
        }
    }
    async createNewCourseWithSectionAndLesson(body) {
        console.log(body);
        try {
            const course = await this.courseService.createNewCourseWithSectionLesson(body);
            return new response_dto_1.ResponseSuccess("Course created successfully", new course_dto_1.CourseDto(course));
        }
        catch (error) {
            return new response_dto_1.ResponseError("Error: generic error", error);
        }
    }
    async updateCourse(body) {
        try {
            const course = await this.courseService.updateCourse(body);
            return new response_dto_1.ResponseSuccess("Course updated successfully", new course_dto_1.CourseDto(course));
        }
        catch (error) {
            return new response_dto_1.ResponseError("Error: generic error", error);
        }
    }
    async deleteCourse(body) {
        try {
            const course = await this.courseService.deleteCourse(body.courseId);
            return new response_dto_1.ResponseSuccess("Course deleted successfully", null);
        }
        catch (error) {
            return new response_dto_1.ResponseError("Error: generic error", error);
        }
    }
};
__decorate([
    (0, common_1.Get)("courses"),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(constants_1.role.teacher, constants_1.role.student),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)("course"),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(constants_1.role.teacher, constants_1.role.student),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "findById", null);
__decorate([
    (0, common_1.Post)("getCourseByTeacher"),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(constants_1.role.teacher, constants_1.role.student),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "findByUserId", null);
__decorate([
    (0, common_1.Post)("join"),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(constants_1.role.teacher, constants_1.role.student),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "joinCourse", null);
__decorate([
    (0, common_1.Post)("publish"),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(constants_1.role.teacher, constants_1.role.student),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "publishCourse", null);
__decorate([
    (0, common_1.Post)("create"),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(constants_1.role.teacher),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_course_dto_1.CreateCourseDto]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "createNewCourse", null);
__decorate([
    (0, common_1.Post)("createCourseWithSectionAndLesson"),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(constants_1.role.teacher),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_course_section_lesson_dto_1.CreateCourseSectionLessonDto]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "createNewCourseWithSectionAndLesson", null);
__decorate([
    (0, common_1.Post)("update"),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(constants_1.role.teacher),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "updateCourse", null);
__decorate([
    (0, common_1.Post)("delete"),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(constants_1.role.teacher),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "deleteCourse", null);
CoursesController = __decorate([
    (0, common_1.Controller)("courses"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    (0, common_1.UseInterceptors)(logging_interceptor_1.LoggingInterceptor, transform_interceptor_1.TransformInterceptor),
    __metadata("design:paramtypes", [courses_service_1.CoursesService])
], CoursesController);
exports.CoursesController = CoursesController;
//# sourceMappingURL=courses.controller.js.map