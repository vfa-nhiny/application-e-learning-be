"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const payments_controller_1 = require("./payments.controller");
const payments_service_1 = require("./payments.service");
const logger_middleware_1 = require("../../common/middlewares/logger.middleware");
const user_schema_1 = require("../users/schemas/user.schema");
const users_service_1 = require("../users/users.service");
const course_schema_1 = require("../courses/schemas/course.schema");
let PaymentsModule = class PaymentsModule {
    configure(consumer) {
        consumer
            .apply(logger_middleware_1.LoggerMiddleware)
            .forRoutes(payments_controller_1.PaymentsController);
    }
};
PaymentsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: "User", schema: user_schema_1.UserSchema },
                { name: "Course", schema: course_schema_1.CourseSchema },
            ]),
        ],
        controllers: [payments_controller_1.PaymentsController],
        providers: [payments_service_1.PaymentsService, users_service_1.UsersService],
    })
], PaymentsModule);
exports.PaymentsModule = PaymentsModule;
//# sourceMappingURL=payments.module.js.map