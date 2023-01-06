"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const exams_controller_1 = require("./exams.controller");
const exams_service_1 = require("./exams.service");
const exam_schema_1 = require("./schemas/exam.schema");
const logger_middleware_1 = require("../../common/middlewares/logger.middleware");
let ExamsModule = class ExamsModule {
    configure(consumer) {
        consumer
            .apply(logger_middleware_1.LoggerMiddleware)
            .forRoutes(exams_controller_1.ExamsController);
    }
};
ExamsModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: "Exam", schema: exam_schema_1.ExamSchema }])],
        controllers: [exams_controller_1.ExamsController],
        providers: [exams_service_1.ExamsService],
    })
], ExamsModule);
exports.ExamsModule = ExamsModule;
//# sourceMappingURL=exams.module.js.map