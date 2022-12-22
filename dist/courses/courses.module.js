"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const courses_controller_1 = require("./courses.controller");
const courses_service_1 = require("./courses.service");
const course_schema_1 = require("./schemas/course.schema");
const logger_middleware_1 = require("../common/middlewares/logger.middleware");
const sections_service_1 = require("../sections/sections.service");
const section_schema_1 = require("../sections/schemas/section.schema");
let CourseModule = class CourseModule {
    configure(consumer) {
        consumer
            .apply(logger_middleware_1.LoggerMiddleware)
            .forRoutes(courses_controller_1.CoursesController);
    }
};
CourseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: "Course", schema: course_schema_1.CourseSchema },
                { name: "Section", schema: section_schema_1.SectionSchema },
            ]),
        ],
        controllers: [courses_controller_1.CoursesController],
        providers: [courses_service_1.CoursesService, sections_service_1.SectionsService],
    })
], CourseModule);
exports.CourseModule = CourseModule;
//# sourceMappingURL=courses.module.js.map